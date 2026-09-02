"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { forbidden, useParams, useSearchParams } from "next/navigation";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { useAuth } from "@/hooks/useAuth";
import { useRiwayatTable } from "@/hooks/useRiwayatTable";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { JENIS_SK_OPTIONS, labelJenisSk } from "@/lib/riwayat-constants";
import { formatDate, rupiah, throwIfNotOk } from "@/lib/utils";
import type { RiwayatSkQuery } from "@/types/kepegawaian/riwayat";
import { SkLampiranCard } from "./lampiran-card";
import { SkFormSheet } from "./sk-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

function rp(n: unknown): string {
	if (n == null || n === "") return "—";
	const v = Number(n);
	if (!Number.isFinite(v)) return val(n);
	return rupiah(v) ?? "—";
}

function mkgStr(t: unknown, b: unknown): string {
	return `${t ?? ""} Thn – ${b ?? ""} Bln`;
}

const SK_COLUMNS: Column<RiwayatSkQuery>[] = [
	{ id: "no", header: "No" },
	{ id: "nomorSk", header: "Nomor SK", primary: true, cell: (row) => val(row.nomorSk) },
	{ id: "jenisSk", header: "Jenis SK", cell: (row) => labelJenisSk(row.jenisSk) },
	{ id: "tanggalSk", header: "Tgl. SK", cell: (row) => formatDate(row.tanggalSk) ?? "—" },
	{ id: "tmtBerlaku", header: "Tgl. Berlaku", cell: (row) => formatDate(row.tmtBerlaku) ?? "—" },
	{ id: "golongan", header: "Golongan", cell: (row) => row.golongan?.golongan ?? "—" },
	{ id: "gajiPokok", header: "Gaji Pokok", cell: (row) => rp(row.gajiPokok) },
	{ id: "mkg", header: "MKG", cell: (row) => mkgStr(row.mkgTahun, row.mkgBulan) },
	{ id: "kenaikanBerikutnya", header: "Kenaikan Berikutnya", cell: (row) => formatDate(row.kenaikanBerikutnya) ?? "—" },
	{ id: "mkgb", header: "MKGB", cell: (row) => mkgStr(row.mkgbTahun, row.mkgbBulan) },
	{ id: "notes", header: "Notes", cell: (row) => val(row.notes) },
];

function SkToolbar({
	nomorSk,
	jenisSk,
	hasActive,
	onFilterChange,
	onReset,
	onTambah,
}: {
	nomorSk: string;
	jenisSk: string;
	hasActive: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah?: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorSk", label: "Nomor SK" }]}
			values={{ nomorSk }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			<Select
				value={jenisSk}
				onValueChange={(val) => onFilterChange("jenisSk", val === "__all__" ? undefined : (val ?? undefined))}
			>
				<SelectTrigger className="h-11 w-48">
					<SelectValue placeholder="Pilih Jenis Surat Kepu..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="__all__">Semua Jenis SK</SelectItem>
					{JENIS_SK_OPTIONS.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{onTambah && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah SK
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function SkPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const nomorSk = sp.get("nomorSk") ?? "";
	const jenisSkFilter = sp.get("jenisSk") ?? "";

	const table = useRiwayatTable<RiwayatSkQuery>({
		pegawaiId,
		entityPath: "sk",
		entityLabel: "SK",
		queryKeyPrefix: riwayatKeys.sk.all(),
	});

	const hasActive = !!(nomorSk || jenisSkFilter);

	const query = useQuery({
		queryKey: riwayatKeys.sk.list(pegawaiId, { page: table.page, size: table.size, nomorSk, jenisSkFilter }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page: table.page, size: table.size }) };
			if (nomorSk) params.nomorSk = nomorSk;
			if (jenisSkFilter) params.jenisSk = jenisSkFilter;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sk/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SK");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows as RiwayatSkQuery[]);
	const columns = table.resolveColumns(SK_COLUMNS);

	return (
		<>
			<DataTable<RiwayatSkQuery>
				toolbar={
					<SkToolbar
						nomorSk={nomorSk}
						jenisSk={jenisSkFilter}
						hasActive={hasActive}
						onFilterChange={table.onFilterChange}
						onReset={table.onReset}
						onTambah={canWrite ? table.handleOpenForm : undefined}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatSkQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => table.nav({ sel: String(item.id ?? "") })}
				selectedRowId={table.selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canWrite ? (item) => table.setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => table.setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data SK"
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
			<SkFormSheet
				pegawaiId={pegawaiId}
				editingId={table.editingId}
				isOpen={table.isFormOpen || table.editingId !== null}
				onClose={() => {
					table.setEditingId(null);
					table.setIsFormOpen(false);
				}}
			/>
			<SkLampiranCard selectedRow={selectedRow} hideUpload={!canWrite} hideDelete={!canDelete} />
			<ConfirmDeleteDialog
				open={table.deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						table.setDeleteId(null);
						table.setDeleteError(null);
					}
				}}
				itemLabel="SK"
				onConfirm={() => table.handleDelete(`/api/proxy/kepegawaian/riwayat/sk/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
