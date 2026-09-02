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
import { JENIS_MUTASI_OPTIONS, labelJenisMutasi } from "@/lib/riwayat-constants";
import { formatDate, rupiah, throwIfNotOk } from "@/lib/utils";
import type { RiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";
import { MutasiLampiranCard } from "./lampiran-card";
import { MutasiFormSheet } from "./mutasi-form-sheet";

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

function SkCell({ row }: { row: RiwayatMutasiQuery }) {
	const sk = row.skMutasi;
	return (
		<div className="space-y-0.5 text-xs leading-snug">
			<div>
				<span className="text-muted-foreground">Efektif : </span>
				<span>{formatDate(sk?.tmtBerlaku)}</span>
			</div>
			<div>
				<span className="text-muted-foreground">Nomor : </span>
				<span>{val(sk?.nomorSk)}</span>
			</div>
			<div>
				<span className="text-muted-foreground">Gaji Pokok : </span>
				<span>{rp(sk?.gajiPokok)}</span>
			</div>
		</div>
	);
}

function PairCell({ lama, baru }: { lama: unknown; baru: unknown }) {
	return (
		<div className="space-y-0.5 text-xs leading-snug">
			<div>
				<span className="text-muted-foreground">Lama : </span>
				<span>{val(lama)}</span>
			</div>
			<div>
				<span className="text-muted-foreground">Baru : </span>
				<span>{val(baru)}</span>
			</div>
		</div>
	);
}

const MUTASI_COLUMNS: Column<RiwayatMutasiQuery>[] = [
	{ id: "no", header: "No" },
	{ id: "skMutasi", header: "SK", cell: (row) => <SkCell row={row} /> },
	{ id: "jenisMutasi", header: "Jenis Mutasi", cell: (row) => labelJenisMutasi(row.jenisMutasi) },
	{
		id: "golongan",
		header: "Golongan",
		cell: (row) => (
			<PairCell
				lama={
					row.golonganLama?.golongan ? `${row.golonganLama.golongan} - ${String(row.golonganLama.pangkat ?? "")}` : "—"
				}
				baru={row.golongan?.golongan ? `${row.golongan.golongan} - ${String(row.golongan.pangkat ?? "")}` : "—"}
			/>
		),
	},
	{
		id: "organisasi",
		header: "Unit Kerja",
		cell: (row) => (
			<PairCell
				lama={row.namaOrganisasiLama ?? row.organisasiLama?.nama}
				baru={row.namaOrganisasi ?? row.organisasi?.nama}
			/>
		),
	},
	{
		id: "jabatan",
		header: "Jabatan",
		cell: (row) => (
			<PairCell lama={row.namaJabatanLama ?? row.jabatanLama?.nama} baru={row.namaJabatan ?? row.jabatan?.nama} />
		),
	},
	{ id: "notes", header: "Notes", cell: (row) => val(row.notes) },
];

function MutasiToolbar({
	nomorSk,
	jenisMutasi,
	hasActive,
	onFilterChange,
	onReset,
	onTambah,
}: {
	nomorSk: string;
	jenisMutasi: string;
	hasActive: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah?: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorSk", label: "SK" }]}
			values={{ nomorSk }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			<Select
				value={jenisMutasi}
				onValueChange={(val) => onFilterChange("jenisMutasi", val === "__all__" ? undefined : (val ?? undefined))}
			>
				<SelectTrigger className="h-11 w-48">
					<SelectValue placeholder="Pilih Jenis Mutasi" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="__all__">Semua Jenis Mutasi</SelectItem>
					{JENIS_MUTASI_OPTIONS.map((o) => (
						<SelectItem key={o.value} value={o.value}>
							{o.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{onTambah && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah Mutasi
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function MutasiPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const nomorSk = sp.get("nomorSk") ?? "";
	const jenisMutasiFilter = sp.get("jenisMutasi") ?? "";

	const table = useRiwayatTable<RiwayatMutasiQuery>({
		pegawaiId,
		entityPath: "mutasi",
		entityLabel: "Mutasi",
		queryKeyPrefix: riwayatKeys.mutasi.all(),
	});

	const hasActive = !!(nomorSk || jenisMutasiFilter);

	const query = useQuery({
		queryKey: riwayatKeys.mutasi.list(pegawaiId, { page: table.page, size: table.size, nomorSk, jenisMutasiFilter }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page: table.page, size: table.size }) };
			if (nomorSk) params.nomorSk = nomorSk;
			if (jenisMutasiFilter) params.jenisMutasi = jenisMutasiFilter;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/mutasi/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data mutasi");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);
	const selectedRow = table.findSelectedRow(pageView.rows as RiwayatMutasiQuery[]);
	const columns = table.resolveColumns(MUTASI_COLUMNS);

	return (
		<>
			<DataTable<RiwayatMutasiQuery>
				toolbar={
					<MutasiToolbar
						nomorSk={nomorSk}
						jenisMutasi={jenisMutasiFilter}
						hasActive={hasActive}
						onFilterChange={table.onFilterChange}
						onReset={table.onReset}
						onTambah={canWrite ? table.handleOpenForm : undefined}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatMutasiQuery[]) ?? []}
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
				emptyMessage="Belum ada data mutasi"
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
			/>{" "}
			<MutasiFormSheet
				pegawaiId={pegawaiId}
				editingId={table.editingId}
				isOpen={table.isFormOpen || table.editingId !== null}
				onClose={() => {
					table.setEditingId(null);
					table.setIsFormOpen(false);
				}}
			/>
			<MutasiLampiranCard selectedRow={selectedRow} hideUpload={!canWrite} hideDelete={!canDelete} />
			<ConfirmDeleteDialog
				open={table.deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						table.setDeleteId(null);
						table.setDeleteError(null);
					}
				}}
				itemLabel="mutasi"
				onConfirm={() => table.handleDelete(`/api/proxy/kepegawaian/riwayat/mutasi/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
