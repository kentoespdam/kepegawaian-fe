"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { LampiranCard } from "@/components/lampiran-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { useAuth } from "@/hooks/useAuth";
import { usePegawaiSession } from "@/hooks/usePegawaiSession";
import { usePendukungTable } from "@/hooks/usePendukungTable";
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
import type { PageResultPageProfilKeluargaQuery, ProfilKeluargaQuery } from "@/types/profil/keluarga";
import { KeluargaFormSheet } from "./keluarga-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (K1 flat: No | Nama | Hubungan | Jenis Kelamin | Agama | Tgl Lahir | Tempat Lahir | NIK | Tanggungan | Pendidikan | Status Pendidikan | Status Kawin | Notes | Aksi) ──

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
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const sessionQuery = usePegawaiSession(pegawaiId);
	const nik = sessionQuery.data?.nik;

	const hubunganKeluarga = sp.get("hubunganKeluarga") ?? "";
	const hasActive = !!hubunganKeluarga;

	const table = usePendukungTable<ProfilKeluargaQuery>({
		pegawaiId,
		entityPath: "keluarga",
		entityLabel: "Keluarga",
		queryKeyPrefix: profilKeys.keluarga.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.keluarga.list(pegawaiId, { page: table.page, size: table.size, hubunganKeluarga, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (hubunganKeluarga) params.hubunganKeluarga = hubunganKeluarga; // angka (spike fnfh.5)
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keluarga?${qs}`);
			throwIfNotOk(res, "Gagal memuat data keluarga");
			const body = (await res.json()) as PageResultPageProfilKeluargaQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(KELUARGA_COLUMNS);

	return (
		<>
			<DataTable<ProfilKeluargaQuery>
				toolbar={
					<KeluargaToolbar
						hubunganKeluarga={hubunganKeluarga}
						hasActive={hasActive}
						canCreate={canCreate}
						onFilterChange={table.onFilterChange}
						onReset={table.onReset}
						onTambah={table.handleOpenForm}
					/>
				}
				columns={columns}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => table.nav({ sel: String(item.id ?? "") })}
				selectedRowId={table.selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canUpdate ? (item) => table.setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => table.setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data keluarga"
				isFiltered={hasActive}
				onResetFilter={table.onReset}
				pagination={
					<DataTablePagination
						page={table.page}
						size={table.size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => table.nav({ page: String(p) })}
						onSizeChange={(s) => table.nav({ size: String(s), page: "1" })}
					/>
				}
			/>
			<KeluargaFormSheet
				pegawaiId={pegawaiId}
				nik={nik}
				editingId={table.editingId}
				isOpen={table.isFormOpen || table.editingId !== null}
				onClose={() => {
					table.setEditingId(null);
					table.setIsFormOpen(false);
				}}
			/>
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
				open={table.deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						table.setDeleteId(null);
						table.setDeleteError(null);
					}
				}}
				itemLabel="anggota keluarga"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/keluarga/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
