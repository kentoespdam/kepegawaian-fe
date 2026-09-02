"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { Column } from "@/components/data-table";

interface UsePendukungTableOpts {
	pegawaiId: string;
	entityPath: string;
	entityLabel: string;
	queryKeyPrefix: readonly unknown[];
}

/**
 * Generic hook for all 6 pendukung CRUD pages.
 * Handles: form state, delete, row selection nav, filter nav, column resolution.
 * Pages keep their own useQuery (queryKey depends on entity-specific filters).
 */
export function usePendukungTable<T extends { id?: string | number | null }>({
	pegawaiId,
	entityPath,
	entityLabel,
	queryKeyPrefix,
}: UsePendukungTableOpts) {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const selectedRowId = sp.get("sel") ?? undefined;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/${entityPath}?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/${entityPath}`);
	};

	const resolveColumns = (cols: Column<T>[]) =>
		cols.map((col) =>
			col.id === "no" ? { ...col, cell: (_item: T, i: number) => String((page - 1) * size + i + 1) } : col,
		);

	const findSelectedRow = (rows: T[] | undefined) =>
		selectedRowId ? (rows?.find((r) => String(r.id) === selectedRowId) ?? null) : null;

	const handleOpenForm = () => {
		setEditingId(null);
		setIsFormOpen(true);
	};

	const handleDelete = async (deleteUrl: string, onSuccess?: () => void) => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(deleteUrl, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success(`${entityLabel} berhasil dihapus`);
			qc.invalidateQueries({ queryKey: queryKeyPrefix });
			setDeleteId(null);
			onSuccess?.();
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e;
		}
	};

	return {
		page,
		size,
		selectedRowId,
		nav,
		onFilterChange,
		onReset,
		resolveColumns,
		findSelectedRow,
		editingId,
		setEditingId,
		isFormOpen,
		setIsFormOpen,
		deleteId,
		setDeleteId,
		deleteError,
		setDeleteError,
		handleOpenForm,
		handleDelete,
	};
}
