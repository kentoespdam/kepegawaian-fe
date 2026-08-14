"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { LampiranCard } from "@/components/lampiran-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFkOptions } from "@/hooks/useFkOptions";
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { KeahlianQuery, PageResultPageKeahlianQuery } from "@/types/profil/keahlian";
import { KeahlianFormSheet } from "./keahlian-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ponytail: label enum kualifikasi — belum ada helper shared, map lokal cukup (K1)
const TINGKAT_LABEL: Record<string, string> = { KURANG: "Kurang", BAIK: "Baik", CUKUP: "Cukup" };

// ── Kolom tabel (K1: No | Keahlian | Tingkat | Sertifikasi | Institusi | Tahun | Status | Aksi) ──
// ponytail: kolom Status (disetujui) ditambahkan atas instruksi user 2026-08-12 (override K1 "tanpa Status")

const KEAHLIAN_COLUMNS: Column<KeahlianQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "keahlian",
		header: "Keahlian",
		primary: true,
		cell: (row) => row.jenisKeahlian?.nama ?? "—",
	},
	{ id: "tingkat", header: "Tingkat", cell: (row) => TINGKAT_LABEL[row.kualifikasi ?? ""] ?? val(row.kualifikasi) },
	{
		id: "sertifikasi",
		header: "Sertifikasi",
		cell: (row) => (row.sertifikasi ? <Badge>Ya</Badge> : <span className="text-muted-foreground">—</span>),
	},
	{ id: "institusi", header: "Institusi", cell: (row) => val(row.institusi) },
	{ id: "tahun", header: "Tahun", cell: (row) => val(row.tahun) },
	{
		id: "status",
		header: "Status",
		cell: (row) =>
			row.disetujui ? (
				<Badge variant="outline" className="text-success border-success/30 bg-success/10">
					Disetujui
				</Badge>
			) : (
				<Badge variant="outline">Belum</Badge>
			),
	},
];

// ── Toolbar (K2: 1 combobox jenisKeahlianId) ──

function KeahlianToolbar({
	jenisKeahlianId,
	jenisKeahlianOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	jenisKeahlianId: string;
	jenisKeahlianOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			fkSources={[{ field: "jenisKeahlianId", entity: "jenis-keahlian", label: "Jenis Keahlian" }]}
			fkOptions={{ jenisKeahlianId: jenisKeahlianOpts }}
			values={{ jenisKeahlianId }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Keahlian
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function KeahlianPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenisKeahlianOpts = useFkOptions("jenis-keahlian");

	// Session cache layout (queryKey sama → satu fetch) — nik gratis untuk biodataId (P6)
	const sessionQuery = useQuery({
		queryKey: ["pegawai-session", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/session`);
			if (!res.ok) throw new Error("Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseSession;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});
	const nik = sessionQuery.data?.nik;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const jenisKeahlianId = sp.get("jenisKeahlianId") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!jenisKeahlianId;

	const query = useQuery({
		queryKey: ["profil-keahlian", pegawaiId, page, size, jenisKeahlianId, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (jenisKeahlianId) params.jenisKeahlianId = jenisKeahlianId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keahlian?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data keahlian");
			const body = (await res.json()) as PageResultPageKeahlianQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as KeahlianQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/keahlian?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/keahlian`);
	};

	const columns = KEAHLIAN_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: KeahlianQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/admin/profil/keahlian/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Keahlian berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-keahlian", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<KeahlianQuery>
				toolbar={
					<KeahlianToolbar
						jenisKeahlianId={jenisKeahlianId}
						jenisKeahlianOpts={jenisKeahlianOpts}
						hasActive={hasActive}
						canCreate={canCreate}
						onFilterChange={onFilterChange}
						onReset={onReset}
						onTambah={() => {
							setEditingId(null);
							setIsFormOpen(true);
						}}
					/>
				}
				columns={columns}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => nav({ sel: String(item.id ?? "") })}
				selectedRowId={selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canUpdate ? (item) => setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data keahlian"
				isFiltered={hasActive}
				onResetFilter={onReset}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => nav({ page: String(p) })}
						onSizeChange={(s) => nav({ size: String(s), page: "1" })}
					/>
				}
			/>
			<KeahlianFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			{/* Kartu Lampiran — menempel ke baris terpilih; list pola /{refId}/lampiran (spike B, P5) */}
			{selectedRow ? (
				<div className="mt-4">
					<LampiranCard
						ref="PROFIL_KEAHLIAN"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/keahlian/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/admin/profil/keahlian/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/keahlian/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/keahlian/lampiran/${id}/file`}
						hideUpload={!canUpdate}
						hideDelete={!canDelete}
					/>
				</div>
			) : null}
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="keahlian"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
