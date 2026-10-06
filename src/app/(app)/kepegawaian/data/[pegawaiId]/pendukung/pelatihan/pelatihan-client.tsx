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
import { useFkOptions } from "@/hooks/useFkOptions";
import { usePegawaiSession } from "@/hooks/usePegawaiSession";
import { usePendukungTable } from "@/hooks/usePendukungTable";
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate, throwIfNotOk } from "@/lib/utils";
import type { PageResultPagePelatihanQuery, PelatihanQuery } from "@/types/profil/pelatihan";
import { PelatihanFormSheet } from "./pelatihan-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (PL1 flat: No | Nama Pelatihan | Jenis | Lembaga | Tgl Mulai | Tgl Selesai | Lulus | Nilai | Ikatan Dinas | Tgl Akhir Ikatan | Notes | Aksi) ──

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
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenisPelatihanOpts = useFkOptions("jenis-pelatihan");

	const sessionQuery = usePegawaiSession(pegawaiId);
	const nik = sessionQuery.data?.nik;

	const nama = sp.get("nama") ?? "";
	const jenisPelatihanId = sp.get("jenisPelatihanId") ?? "";
	const lembaga = sp.get("lembaga") ?? "";
	const hasActive = !!(nama || jenisPelatihanId || lembaga);

	const table = usePendukungTable<PelatihanQuery>({
		pegawaiId,
		entityPath: "pelatihan",
		entityLabel: "Pelatihan",
		queryKeyPrefix: profilKeys.pelatihan.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.pelatihan.list(pegawaiId, {
			page: table.page,
			size: table.size,
			nama,
			jenisPelatihanId,
			lembaga,
			nik,
		}),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (nama) params.nama = nama;
			if (jenisPelatihanId) params.jenisPelatihanId = jenisPelatihanId;
			if (lembaga) params.lembaga = lembaga;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pelatihan?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pelatihan");
			const body = (await res.json()) as PageResultPagePelatihanQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(PELATIHAN_COLUMNS);

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
				emptyMessage="Belum ada data pelatihan"
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
			<PelatihanFormSheet
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
						ref="PROFIL_PELATIHAN"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pelatihan/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/admin/profil/pelatihan/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/pelatihan/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pelatihan/lampiran/${id}/file`}
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
				itemLabel="pelatihan"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/pelatihan/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
