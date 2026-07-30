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
import { Button } from "@/components/ui/button";
import { fromPage, toApiParams } from "@/lib/paging";
import { labelAksiKontrak } from "@/lib/riwayat-constants";
import { formatDate } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { RiwayatKontrakQuery } from "@/types/kepegawaian/riwayat";
import { KontrakFormSheet } from "./kontrak-form-sheet";

// ── Formatter helpers (panen dari sk/page.tsx) ──

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Column definitions ──

const KONTRAK_COLUMNS: Column<RiwayatKontrakQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "nomorKontrak",
		header: "Nomor Kontrak",
		primary: true,
		cell: (row) => val(row.nomorKontrak),
	},
	{
		id: "jenisKontrak",
		header: "Jenis Aksi",
		cell: (row) => labelAksiKontrak(row.jenisKontrak),
	},
	{
		id: "tanggalSk",
		header: "Tgl. SK",
		cell: (row) => formatDate(row.tanggalSk) ?? "—",
	},
	{
		id: "tanggalMulai",
		header: "Mulai",
		cell: (row) => formatDate(row.tanggalMulai) ?? "—",
	},
	{
		id: "tanggalSelesai",
		header: "Selesai",
		cell: (row) => formatDate(row.tanggalSelesai) ?? "—",
	},
	{
		id: "notes",
		header: "Notes",
		cell: (row) => val(row.notes),
	},
];

// ── Toolbar ──

function KontrakToolbar({
	nomorKontrak,
	canEdit,
	hasActive,
	onFilterChange,
	onReset,
	onTambah,
}: {
	nomorKontrak: string;
	canEdit: boolean;
	hasActive: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorKontrak", label: "Nomor Kontrak" }]}
			values={{ nomorKontrak }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{/* ponytail: gate statusPegawai — hanya KONTRAK bisa tambah/edit/hapus */}
			{canEdit && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Kontrak
				</Button>
			)}
		</DataTableToolbar>
	);
}

// ── Page ──

export default function KontrakPage() {
	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nomorKontrak = sp.get("nomorKontrak") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	// ponytail: dedupe dengan layout — queryKey sama, cache hit, zero extra network
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
	const isKontrak = sessionQuery.data?.statusPegawai === "KONTRAK";

	const hasActive = !!nomorKontrak;

	const query = useQuery({
		queryKey: ["riwayat-kontrak", pegawaiId, page, size, nomorKontrak],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }) };
			if (nomorKontrak) params.nomorKontrak = nomorKontrak;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${pegawaiId}?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data kontrak");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/kontrak?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/kontrak`);
	};

	const columns = KONTRAK_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: RiwayatKontrakQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/kontrak/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Kontrak berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["riwayat-kontrak", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e;
		}
	};

	return (
		<>
			<DataTable<RiwayatKontrakQuery>
				toolbar={
					<KontrakToolbar
						nomorKontrak={nomorKontrak}
						canEdit={isKontrak}
						hasActive={hasActive}
						onFilterChange={onFilterChange}
						onReset={onReset}
						onTambah={() => {
							setEditingId(null);
							setIsFormOpen(true);
						}}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatKontrakQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => nav({ sel: String(item.id ?? "") })}
				selectedRowId={selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				// ponytail: gate — null callback = no action buttons rendered
				onEdit={isKontrak ? (item) => setEditingId(String(item.id ?? "")) : undefined}
				onDelete={isKontrak ? (item) => setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data kontrak"
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
			<KontrakFormSheet
				pegawaiId={pegawaiId}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="Kontrak"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
