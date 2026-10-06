"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { forbidden, useParams, useSearchParams } from "next/navigation";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { useAuth } from "@/hooks/useAuth";
import { usePegawaiSession } from "@/hooks/usePegawaiSession";
import { useRiwayatTable } from "@/hooks/useRiwayatTable";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { labelAksiKontrak } from "@/lib/riwayat-constants";
import { formatDate, throwIfNotOk } from "@/lib/utils";
import type { RiwayatKontrakQuery } from "@/types/kepegawaian/riwayat";
import { KontrakFormSheet } from "./kontrak-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

const KONTRAK_COLUMNS: Column<RiwayatKontrakQuery>[] = [
	{ id: "no", header: "No" },
	{ id: "nomorKontrak", header: "Nomor Kontrak", primary: true, cell: (row) => val(row.nomorKontrak) },
	{ id: "jenisKontrak", header: "Jenis Aksi", cell: (row) => labelAksiKontrak(row.jenisKontrak) },
	{ id: "tanggalSk", header: "Tgl. SK", cell: (row) => formatDate(row.tanggalSk) ?? "—" },
	{ id: "tanggalMulai", header: "Mulai", cell: (row) => formatDate(row.tanggalMulai) ?? "—" },
	{ id: "tanggalSelesai", header: "Selesai", cell: (row) => formatDate(row.tanggalSelesai) ?? "—" },
	{ id: "notes", header: "Notes", cell: (row) => val(row.notes) },
];

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
	onTambah?: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorKontrak", label: "Nomor Kontrak" }]}
			values={{ nomorKontrak }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			{canEdit && onTambah && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Kontrak
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function KontrakPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const nomorKontrak = sp.get("nomorKontrak") ?? "";

	const table = useRiwayatTable<RiwayatKontrakQuery>({
		pegawaiId,
		entityPath: "kontrak",
		entityLabel: "Kontrak",
		queryKeyPrefix: riwayatKeys.kontrak.all(),
	});

	const sessionQuery = usePegawaiSession(pegawaiId);
	const isKontrak = sessionQuery.data?.statusPegawai === "KONTRAK";

	const hasActive = !!nomorKontrak;

	const query = useQuery({
		queryKey: riwayatKeys.kontrak.list(pegawaiId, { page: table.page, size: table.size, nomorKontrak }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page: table.page, size: table.size }) };
			if (nomorKontrak) params.nomorKontrak = nomorKontrak;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/kontrak/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data kontrak");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const columns = table.resolveColumns(KONTRAK_COLUMNS);

	return (
		<>
			<DataTable<RiwayatKontrakQuery>
				toolbar={
					<KontrakToolbar
						nomorKontrak={nomorKontrak}
						canEdit={isKontrak}
						hasActive={hasActive}
						onFilterChange={table.onFilterChange}
						onReset={table.onReset}
						onTambah={canWrite ? table.handleOpenForm : undefined}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatKontrakQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => table.nav({ sel: String(item.id ?? "") })}
				selectedRowId={table.selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={isKontrak && canWrite ? (item) => table.setEditingId(String(item.id ?? "")) : undefined}
				onDelete={isKontrak && canDelete ? (item) => table.setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data kontrak"
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
			<KontrakFormSheet
				pegawaiId={pegawaiId}
				editingId={table.editingId}
				isOpen={table.isFormOpen || table.editingId !== null}
				onClose={() => {
					table.setEditingId(null);
					table.setIsFormOpen(false);
				}}
			/>
			<ConfirmDeleteDialog
				open={table.deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						table.setDeleteId(null);
						table.setDeleteError(null);
					}
				}}
				itemLabel="Kontrak"
				onConfirm={() => table.handleDelete(`/api/proxy/kepegawaian/riwayat/kontrak/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
