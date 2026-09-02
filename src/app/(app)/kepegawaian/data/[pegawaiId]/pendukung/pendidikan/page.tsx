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
import type { PageResultPagePendidikanQuery, PendidikanQuery } from "@/types/profil/pendidikan";
import { PendidikanFormSheet } from "./pendidikan-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

// ── Kolom tabel (D1 terkunci: No | Jenjang | Institusi | Jurusan | Kota | Tahun | IPK | Gelar | Status | Aksi) ──

const PENDIDIKAN_COLUMNS: Column<PendidikanQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "jenjang",
		header: "Jenjang",
		cell: (row) => row.jenjangPendidikan?.nama ?? val(row.jenjangId),
	},
	{
		id: "institusi",
		header: "Institusi",
		primary: true,
		cell: (row) => val(row.institusi),
	},
	{ id: "jurusan", header: "Jurusan", cell: (row) => val(row.jurusan) },
	{ id: "kota", header: "Kota", cell: (row) => val(row.kota) },
	{
		id: "tahun",
		header: "Tahun",
		cell: (row) => {
			const masuk = row.tahunMasuk ? String(row.tahunMasuk) : "";
			const lulus = row.tahunLulus ? String(row.tahunLulus) : "";
			if (masuk && lulus) return `${masuk}–${lulus}`;
			return masuk || lulus || "—";
		},
	},
	{ id: "ipk", header: "IPK", cell: (row) => (row.gpa != null ? String(row.gpa) : "—") },
	{
		id: "gelar",
		header: "Gelar",
		cell: (row) => {
			const gelar = [row.gelarDepan, row.gelarBelakang].filter(Boolean).join(" ");
			return gelar || "—";
		},
	},
	{
		id: "status",
		header: "Status",
		cell: (row) => (
			<span className="inline-flex items-center gap-1.5">
				{row.disetujui ? (
					<Badge variant="outline" className="text-success border-success/30 bg-success/10">
						Disetujui
					</Badge>
				) : (
					<Badge variant="outline">Belum</Badge>
				)}
				{row.isLatest ? <Badge>Terakhir</Badge> : null}
			</span>
		),
	},
];

// ── Toolbar (D2 terkunci: institusi teks + jenjangId combobox) ──

function PendidikanToolbar({
	institusi,
	jenjangId,
	jenjangOpts,
	hasActive,
	canCreate,
	onFilterChange,
	onReset,
	onTambah,
}: {
	institusi: string;
	jenjangId: string;
	jenjangOpts: { value: string; label: string }[];
	hasActive: boolean;
	canCreate: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "institusi", label: "Institusi" }]}
			fkSources={[{ field: "jenjangId", entity: "jenjang-pendidikan", label: "Jenjang" }]}
			fkOptions={{ jenjangId: jenjangOpts }}
			values={{ institusi, jenjangId }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canCreate && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Pendidikan
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function PendidikanPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const canCreate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canUpdate = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const jenjangOpts = useFkOptions("jenjang-pendidikan");

	const sessionQuery = usePegawaiSession(pegawaiId);
	const nik = sessionQuery.data?.nik;

	const institusi = sp.get("institusi") ?? "";
	const jenjangId = sp.get("jenjangId") ?? "";
	const hasActive = !!(institusi || jenjangId);

	const table = usePendukungTable<PendidikanQuery>({
		pegawaiId,
		entityPath: "pendidikan",
		entityLabel: "Pendidikan",
		queryKeyPrefix: profilKeys.pendidikan.all(),
	});

	const query = useQuery({
		queryKey: profilKeys.pendidikan.list(pegawaiId, { page: table.page, size: table.size, institusi, jenjangId, nik }),
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page: table.page, size: table.size }),
				biodataId: nik ?? "",
			};
			if (institusi) params.institusi = institusi;
			if (jenjangId) params.jenjangId = jenjangId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/profil/pendidikan?${qs}`);
			throwIfNotOk(res, "Gagal memuat data pendidikan");
			const body = (await res.json()) as PageResultPagePendidikanQuery;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows);
	const columns = table.resolveColumns(PENDIDIKAN_COLUMNS);

	return (
		<>
			<DataTable<PendidikanQuery>
				toolbar={
					<PendidikanToolbar
						institusi={institusi}
						jenjangId={jenjangId}
						jenjangOpts={jenjangOpts}
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
				emptyMessage="Belum ada data pendidikan"
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
			<PendidikanFormSheet
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
						ref="PROFIL_PENDIDIKAN"
						refId={selectedRow.id ?? ""}
						queryKey={["lampiran"]}
						listUrl={`/api/proxy/profil/pendidikan/lampiran/${selectedRow.id}/list`}
						uploadUrl="/api/proxy/admin/profil/pendidikan/lampiran"
						deleteUrl={(id) => `/api/proxy/admin/profil/pendidikan/lampiran/${id}`}
						viewUrl={(id) => `/api/proxy/profil/pendidikan/lampiran/${id}/file`}
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
				itemLabel="pendidikan"
				onConfirm={() => table.handleDelete(`/api/proxy/admin/profil/pendidikan/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
