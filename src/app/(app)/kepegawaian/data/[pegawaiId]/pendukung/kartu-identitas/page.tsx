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
import type { KartuIdentitasQuery, PageResultPageKartuIdentitasQuery } from "@/types/profil/kartu-identitas";
import { KartuIdentitasFormSheet } from "./kartu-identitas-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ponytail: komputasi kadaluarsa murni klien — banding string YYYY-MM-DD (format date BE), tanpa field status
function isExpired(tanggalExpired: string | undefined): boolean {
	if (!tanggalExpired) return false;
	// pakai tanggal lokal, bukan UTC — Indonesia UTC+7, dini hari UTC masih hari kemarin
	const now = new Date();
	const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
	return tanggalExpired < today;
}

// ── Kolom tabel (KI1: No | Jenis Kartu | Nomor | Tgl Terima | Masa Berlaku | Aksi) ──

const KARTU_COLUMNS: Column<KartuIdentitasQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "jenisKartu",
		header: "Jenis Kartu",
		primary: true,
		cell: (row) => row.jenisKartuNama ?? val(row.jenisKartuId),
	},
	{ id: "nomorKartu", header: "Nomor", cell: (row) => val(row.nomorKartu) },
	{ id: "tanggalTerima", header: "Tgl Terima", cell: (row) => formatDate(row.tanggalTerima) },
	{
		id: "masaBerlaku",
		header: "Masa Berlaku",
		cell: (row) => (
			<div className="flex items-center gap-2">
				<span>{formatDate(row.tanggalExpired)}</span>
				{isExpired(row.tanggalExpired) && (
					<Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">
						Kadaluarsa
					</Badge>
				)}
			</div>
		),
	},
];

// ── Toolbar (KI2: jenisKartuId combobox + nomorKartu teks) ──

function KartuToolbar({
	jenisKartuId,
	nomorKartu,
	jenisKartuOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	jenisKartuId: string;
	nomorKartu: string;
	jenisKartuOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorKartu", label: "Nomor" }]}
			fkSources={[{ field: "jenisKartuId", entity: "jenis-kitas", label: "Jenis Kartu" }]}
			fkOptions={{ jenisKartuId: jenisKartuOpts }}
			values={{ jenisKartuId, nomorKartu }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Kartu
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function KartuIdentitasPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenisKartuOpts = useFkOptions("jenis-kitas");

	const sessionQuery = usePegawaiSession(pegawaiId);
	const nik = sessionQuery.data?.nik;

	const jenisKartuId = sp.get("jenisKartuId") ?? "";
	const nomorKartu = sp.get("nomorKartu") ?? "";
	const hasActive = !!(jenisKartuId || nomorKartu);

	const table = usePendukungTable<KartuIdentitasQuery>({
		pegawaiId,
		entityPath: "kartu-identitas",
		entityLabel: "Kartu identitas",
		queryKeyPrefix: profilKeys.kartuIdentitas.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.kartuIdentitas.list(pegawaiId, {
			page: table.page,
			size: table.size,
			jenisKartuId,
			nomorKartu,
			nik,
		}),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (jenisKartuId) params.jenisKartuId = jenisKartuId;
			if (nomorKartu) params.nomorKartu = nomorKartu;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/kartu-identitas?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kartu identitas");
			const body = (await res.json()) as PageResultPageKartuIdentitasQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(KARTU_COLUMNS);

	return (
		<>
			<DataTable<KartuIdentitasQuery>
				toolbar={
					<KartuToolbar
						jenisKartuId={jenisKartuId}
						nomorKartu={nomorKartu}
						jenisKartuOpts={jenisKartuOpts}
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
				emptyMessage="Belum ada data kartu identitas"
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
			<KartuIdentitasFormSheet
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
						ref="KARTU_IDENTITAS"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/kartu-identitas/${selectedRow.id}/lampiran`}
						uploadUrl="/api/proxy/admin/profil/kartu-identitas/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/kartu-identitas/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/kartu-identitas/lampiran/${id}/file`}
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
				itemLabel="kartu identitas"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/kartu-identitas/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
