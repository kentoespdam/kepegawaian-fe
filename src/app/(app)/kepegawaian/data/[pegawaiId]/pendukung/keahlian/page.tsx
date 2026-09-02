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
import { throwIfNotOk } from "@/lib/utils";
import type { KeahlianQuery, PageResultPageKeahlianQuery } from "@/types/profil/keahlian";
import { KeahlianFormSheet } from "./keahlian-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ponytail: label enum kualifikasi — belum ada helper shared, map lokal cukup (K1)
const TINGKAT_LABEL: Record<string, string> = { KURANG: "Kurang", BAIK: "Baik", CUKUP: "Cukup" };

// ── Kolom tabel (K1: No | Keahlian | Tingkat | Sertifikasi | Institusi | Tahun | Status | Aksi) ──

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
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenisKeahlianOpts = useFkOptions("jenis-keahlian");

	const sessionQuery = usePegawaiSession(pegawaiId);
	const nik = sessionQuery.data?.nik;

	const jenisKeahlianId = sp.get("jenisKeahlianId") ?? "";
	const hasActive = !!jenisKeahlianId;

	const table = usePendukungTable<KeahlianQuery>({
		pegawaiId,
		entityPath: "keahlian",
		entityLabel: "Keahlian",
		queryKeyPrefix: profilKeys.keahlian.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.keahlian.list(pegawaiId, { page: table.page, size: table.size, jenisKeahlianId, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (jenisKeahlianId) params.jenisKeahlianId = jenisKeahlianId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/keahlian?${qs}`);
			throwIfNotOk(res, "Gagal memuat data keahlian");
			const body = (await res.json()) as PageResultPageKeahlianQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(KEAHLIAN_COLUMNS);

	return (
		<>
			<DataTable<KeahlianQuery>
				toolbar={
					<KeahlianToolbar
						jenisKeahlianId={jenisKeahlianId}
						jenisKeahlianOpts={jenisKeahlianOpts}
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
				emptyMessage="Belum ada data keahlian"
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
			<KeahlianFormSheet
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
				open={table.deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						table.setDeleteId(null);
						table.setDeleteError(null);
					}
				}}
				itemLabel="keahlian"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/keahlian/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
