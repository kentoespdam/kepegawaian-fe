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
import { useFkOptions } from "@/hooks/useFkOptions";
import { useRoles } from "@/hooks/useRoles";
// ponytail: import modul langsung — verifySession server-only
import { can, forbidden } from "@/lib/auth/can";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { PageResultPagePelatihanQuery, PelatihanQuery } from "@/types/profil/pelatihan";
import { PelatihanFormSheet } from "./pelatihan-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (PL1 flat: No | Nama Pelatihan | Jenis | Lembaga | Tgl Mulai | Tgl Selesai |
//    Lulus | Nilai | Ikatan Dinas | Tgl Akhir Ikatan | Notes | Aksi) — tabel lebar, scroll horizontal di region ──

const PELATIHAN_COLUMNS: Column<PelatihanQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "nama",
		header: "Nama Pelatihan",
		primary: true,
		cell: (row) => val(row.nama),
	},
	{ id: "jenis", header: "Jenis", cell: (row) => row.jenisPelatihanNama ?? val(row.jenisPelatihanId) },
	{ id: "lembaga", header: "Lembaga", cell: (row) => val(row.lembaga) },
	{ id: "tanggalMulai", header: "Tgl Mulai", cell: (row) => formatDate(row.tanggalMulai) },
	{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (row) => formatDate(row.tanggalSelesai) },
	{
		id: "lulus",
		header: "Lulus",
		cell: (row) => (row.lulus ? <Badge>Lulus</Badge> : <span className="text-muted-foreground">—</span>),
	},
	{ id: "nilai", header: "Nilai", cell: (row) => val(row.nilai) },
	{
		id: "ikatanDinas",
		header: "Ikatan Dinas",
		cell: (row) => (row.ikatanDinas ? <Badge>Ya</Badge> : <span className="text-muted-foreground">—</span>),
	},
	{ id: "tanggalAkhirIkatan", header: "Tgl Akhir Ikatan", cell: (row) => formatDate(row.tanggalAkhirIkatan) },
	{
		id: "notes",
		header: "Notes",
		cell: (row) =>
			row.notes ? (
				<span className="block max-w-48 truncate" title={row.notes}>
					{row.notes}
				</span>
			) : (
				<span className="text-muted-foreground">—</span>
			),
	},
];

// ── Toolbar (PL2: nama + jenisPelatihanId + lembaga) ──

function PelatihanToolbar({
	nama,
	jenisPelatihanId,
	lembaga,
	jenisPelatihanOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	nama: string;
	jenisPelatihanId: string;
	lembaga: string;
	jenisPelatihanOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[
				{ name: "nama", label: "Pelatihan" },
				{ name: "lembaga", label: "Lembaga" },
			]}
			fkSources={[{ field: "jenisPelatihanId", entity: "jenis-pelatihan", label: "Jenis Pelatihan" }]}
			fkOptions={{ jenisPelatihanId: jenisPelatihanOpts }}
			values={{ nama, jenisPelatihanId, lembaga }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Pelatihan
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function PelatihanPage() {
	const roles = useRoles();
	if (!can(roles, "view", "pegawai")) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const canCreate = can(roles, "create", "pegawai");
	const canUpdate = can(roles, "update", "pegawai");
	const canDelete = can(roles, "delete", "pegawai");

	const jenisPelatihanOpts = useFkOptions("jenis-pelatihan");

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
	const nama = sp.get("nama") ?? "";
	const jenisPelatihanId = sp.get("jenisPelatihanId") ?? "";
	const lembaga = sp.get("lembaga") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(nama || jenisPelatihanId || lembaga);

	const query = useQuery({
		queryKey: ["profil-pelatihan", pegawaiId, page, size, nama, jenisPelatihanId, lembaga, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (nama) params.nama = nama;
			if (jenisPelatihanId) params.jenisPelatihanId = jenisPelatihanId;
			if (lembaga) params.lembaga = lembaga;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pelatihan?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data pelatihan");
			const body = (await res.json()) as PageResultPagePelatihanQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as PelatihanQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pelatihan?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/pelatihan`);
	};

	const columns = PELATIHAN_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: PelatihanQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/profil/pelatihan/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Pelatihan berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-pelatihan", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<PelatihanQuery>
				toolbar={
					<PelatihanToolbar
						nama={nama}
						jenisPelatihanId={jenisPelatihanId}
						lembaga={lembaga}
						jenisPelatihanOpts={jenisPelatihanOpts}
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
				emptyMessage="Belum ada data pelatihan"
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
			<PelatihanFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			{/* Kartu Lampiran — list pola /{refId}/lampiran (spike B, P5) */}
			{selectedRow ? (
				<div className="mt-4">
					<LampiranCard
						ref="PROFIL_PELATIHAN"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pelatihan/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/profil/pelatihan/lampiran"
						deleteUrl={(id) => `/api/proxy/profil/pelatihan/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pelatihan/lampiran/${id}/file`}
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
				itemLabel="pelatihan"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
