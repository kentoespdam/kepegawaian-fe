"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { LampiranCard } from "@/components/lampiran-card";
import { Button } from "@/components/ui/button";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { useAuth } from "@/hooks/useAuth";
import { usePegawaiSession } from "@/hooks/usePegawaiSession";
import { usePendukungTable } from "@/hooks/usePendukungTable";
// ponytail: import modul langsung — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { throwIfNotOk } from "@/lib/utils";
import type { PageResultPagePengalamanKerjaQuery, PengalamanKerjaQuery } from "@/types/profil/pengalaman-kerja";
import { PengalamanKerjaFormSheet } from "./pengalaman-kerja-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (W2: No | Perusahaan | Jabatan | Lokasi | Periode | Aksi) ──

const PENGALAMAN_KOLOM: Column<PengalamanKerjaQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "namaPerusahaan",
		header: "Perusahaan",
		primary: true,
		cell: (row) => val(row.namaPerusahaan),
	},
	{ id: "jabatan", header: "Jabatan", cell: (row) => val(row.jabatan) },
	{ id: "lokasi", header: "Lokasi", cell: (row) => val(row.lokasi) },
	{
		id: "periode",
		header: "Periode",
		cell: (row) => {
			const masuk = row.tahunMasuk ? String(row.tahunMasuk) : "";
			const keluar = row.tahunKeluar ? String(row.tahunKeluar) : "";
			if (keluar) return masuk ? `${masuk}–${keluar}` : keluar;
			return masuk ? `${masuk}–sekarang` : "—";
		},
	},
];

// ── Toolbar (W3: namaPerusahaan + jabatan, keduanya teks) ──

function PengalamanToolbar({
	namaPerusahaan,
	jabatan,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	namaPerusahaan: string;
	jabatan: string;
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[
				{ name: "namaPerusahaan", label: "Perusahaan" },
				{ name: "jabatan", label: "Jabatan" },
			]}
			values={{ namaPerusahaan, jabatan }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Pengalaman
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function PengalamanKerjaPage() {
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

	const namaPerusahaan = sp.get("namaPerusahaan") ?? "";
	const jabatan = sp.get("jabatan") ?? "";
	const hasActive = !!(namaPerusahaan || jabatan);

	const table = usePendukungTable<PengalamanKerjaQuery>({
		pegawaiId,
		entityPath: "pengalaman-kerja",
		entityLabel: "Pengalaman kerja",
		queryKeyPrefix: profilKeys.pengalamanKerja.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.pengalamanKerja.list(pegawaiId, {
			page: table.page,
			size: table.size,
			namaPerusahaan,
			jabatan,
			nik,
		}),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (namaPerusahaan) params.namaPerusahaan = namaPerusahaan;
			if (jabatan) params.jabatan = jabatan;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pengalaman-kerja?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pengalaman kerja");
			const body = (await res.json()) as PageResultPagePengalamanKerjaQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(PENGALAMAN_KOLOM);

	return (
		<>
			<DataTable<PengalamanKerjaQuery>
				toolbar={
					<PengalamanToolbar
						namaPerusahaan={namaPerusahaan}
						jabatan={jabatan}
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
				emptyMessage="Belum ada data pengalaman kerja"
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
			<PengalamanKerjaFormSheet
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
						ref="PROFIL_PENGALAMAN_KERJA"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pengalaman-kerja/lampiran/${selectedRow.id}/list`}
						uploadUrl="/api/proxy/admin/profil/pengalaman-kerja/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/pengalaman-kerja/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pengalaman-kerja/lampiran/${id}/file`}
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
				itemLabel="pengalaman kerja"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/pengalaman-kerja/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
