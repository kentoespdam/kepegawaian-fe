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
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import {
	hubunganKeluargaFilterOptions,
	labelAgama,
	labelHubunganKeluarga,
	labelJk,
	labelStatusPendidikanKeluarga,
} from "@/lib/enum-labels";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate, throwIfNotOk } from "@/lib/utils";
import type { SingleResultPegawaiResponseSession } from "@/types/pegawai/pegawai";
import type { PageResultPageProfilKeluargaQuery, ProfilKeluargaQuery } from "@/types/profil/keluarga";
import { KeluargaFormSheet } from "./keluarga-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (K1 flat: No | Nama | Hubungan | Jenis Kelamin | Agama | Tgl Lahir |
//    Tempat Lahir | NIK | Tanggungan | Pendidikan | Status Pendidikan | Status Kawin | Notes | Aksi) ──

const KELUARGA_COLUMNS: Column<ProfilKeluargaQuery>[] = [
	{ id: "no", header: "No" },
	{ id: "nama", header: "Nama", primary: true, cell: (row) => val(row.nama) },
	{ id: "hubungan", header: "Hubungan", cell: (row) => labelHubunganKeluarga(row.hubunganKeluarga) },
	{ id: "jenisKelamin", header: "Jenis Kelamin", cell: (row) => labelJk(row.jenisKelamin) },
	{ id: "agama", header: "Agama", cell: (row) => labelAgama(row.agama) },
	{ id: "tanggalLahir", header: "Tgl Lahir", cell: (row) => formatDate(row.tanggalLahir) },
	{ id: "tempatLahir", header: "Tempat Lahir", cell: (row) => val(row.tempatLahir) },
	{ id: "nik", header: "NIK", cell: (row) => <span className="tabular-nums">{val(row.nik)}</span> },
	{
		id: "tanggungan",
		header: "Tanggungan",
		cell: (row) => (row.tanggungan ? <Badge>Ya</Badge> : <span className="text-muted-foreground">—</span>),
	},
	{ id: "pendidikan", header: "Pendidikan", cell: (row) => row.jenjangPendidikan?.nama ?? val(row.pendidikanId) },
	{
		id: "statusPendidikan",
		header: "Status Pendidikan",
		cell: (row) => labelStatusPendidikanKeluarga(row.statusPendidikan),
	},
	{
		id: "statusKawin",
		header: "Status Kawin",
		cell: (row) => (row.statusKawin ? <Badge>Ya</Badge> : <span className="text-muted-foreground">—</span>),
	},
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

// ── Toolbar (K2: select Hubungan Keluarga enum → angka) ──

function KeluargaToolbar({
	hubunganKeluarga,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	hubunganKeluarga: string;
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			fkSources={[{ field: "hubunganKeluarga", entity: "", label: "Hubungan Keluarga" }]}
			fkOptions={{ hubunganKeluarga: hubunganKeluargaFilterOptions() }}
			values={{ hubunganKeluarga }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Keluarga
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function KeluargaPage() {
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

	// Session cache layout (queryKey sama → satu fetch) — nik gratis untuk biodataId (P6)
	const sessionQuery = useQuery({
		queryKey: ["pegawai-session", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/session`);
			throwIfNotOk(res, "Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseSession;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});
	const nik = sessionQuery.data?.nik;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const hubunganKeluarga = sp.get("hubunganKeluarga") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!hubunganKeluarga;

	const query = useQuery({
		queryKey: ["profil-keluarga", pegawaiId, page, size, hubunganKeluarga, nik],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), biodataId: nik ?? "" };
			if (hubunganKeluarga) params.hubunganKeluarga = hubunganKeluarga; // angka (spike fnfh.5)
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keluarga?${qs}`);
			throwIfNotOk(res, "Gagal memuat data keluarga");
			const body = (await res.json()) as PageResultPageProfilKeluargaQuery;
			return body.data;
		},
		enabled: !!nik,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = selectedRowId
		? ((pageView.rows as ProfilKeluargaQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/keluarga?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/pendukung/keluarga`);
	};

	const columns = KELUARGA_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: ProfilKeluargaQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/admin/profil/keluarga/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Keluarga berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["profil-keluarga", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<ProfilKeluargaQuery>
				toolbar={
					<KeluargaToolbar
						hubunganKeluarga={hubunganKeluarga}
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
				emptyMessage="Belum ada data keluarga"
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
			<KeluargaFormSheet
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
						ref="PROFIL_KELUARGA"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/keluarga/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/admin/profil/keluarga/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/keluarga/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/keluarga/lampiran/${id}/file`}
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
				itemLabel="anggota keluarga"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
