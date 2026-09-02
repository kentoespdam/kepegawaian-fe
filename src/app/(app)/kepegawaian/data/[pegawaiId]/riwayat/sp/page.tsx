"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FileText, Plus } from "lucide-react";
import { forbidden, useParams, useSearchParams } from "next/navigation";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
import { Button } from "@/components/ui/button";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { useAuth } from "@/hooks/useAuth";
import { useFkOptions } from "@/hooks/useFkOptions";
import { useRiwayatTable } from "@/hooks/useRiwayatTable";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate, throwIfNotOk } from "@/lib/utils";
import type { RiwayatSpQuery } from "@/types/kepegawaian/riwayat";
import { SpFormSheet } from "./sp-form-sheet";

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

function isPdf(mime?: string) {
	return mime === "application/pdf";
}
function isImage(mime?: string) {
	return mime?.startsWith("image/") ?? false;
}

const SP_COLUMNS: Column<RiwayatSpQuery>[] = [
	{ id: "no", header: "No" },
	{ id: "nomorSp", header: "Nomor SP", primary: true, cell: (row) => val(row.nomorSp) },
	{ id: "jenisSp", header: "Jenis SP", cell: (row) => row.jenisSp?.nama ?? "—" },
	{ id: "tanggalSp", header: "Tgl SP", cell: (row) => formatDate(row.tanggalSp) ?? "—" },
	{ id: "sanksi", header: "Sanksi", cell: (row) => row.sanksi?.keterangan ?? "—" },
	{ id: "tanggalMulai", header: "Tgl Mulai", cell: (row) => formatDate(row.tanggalMulai) ?? "—" },
	{ id: "tanggalSelesai", header: "Tgl Selesai", cell: (row) => formatDate(row.tanggalSelesai) ?? "—" },
	{ id: "notes", header: "Notes", cell: (row) => val(row.notes) },
	{ id: "file", header: "File" },
];

function FileCell({ row }: { row: RiwayatSpQuery }) {
	if (!row.fileName) return <span className="text-muted-foreground">—</span>;

	const url = `/api/proxy/kepegawaian/riwayat/sp/${String(row.id ?? "")}/file`;
	const mime = row.mimeType;
	const commonClass =
		"inline-flex items-center justify-center size-9 rounded-md hover:bg-accent transition-colors text-foreground";

	if (isPdf(mime) || isImage(mime)) {
		return (
			<button
				type="button"
				className={commonClass}
				title={`Lihat ${row.fileName}`}
				onClick={() => window.open(url, "_blank")}
			>
				<FileText className="size-4" />
			</button>
		);
	}

	return (
		<a href={url} download={row.fileName} className={commonClass} title={`Unduh ${row.fileName}`}>
			<FileText className="size-4" />
		</a>
	);
}

function SpToolbar({
	nomorSp,
	jenisSpId,
	jenisSpOptions,
	hasActive,
	onFilterChange,
	onReset,
	onTambah,
}: {
	nomorSp: string;
	jenisSpId: string;
	jenisSpOptions: { value: string; label: string }[];
	hasActive: boolean;
	onFilterChange: (key: string, val: string | undefined) => void;
	onReset: () => void;
	onTambah?: () => void;
}) {
	return (
		<DataTableToolbar
			searchFields={[{ name: "nomorSp", label: "Nomor SP" }]}
			values={{ nomorSp }}
			onFilterChange={onFilterChange}
			hasActive={hasActive}
			onReset={onReset}
		>
			<FKComboboxFilter
				label="Jenis SP"
				options={jenisSpOptions}
				value={jenisSpId}
				onChange={(v) => onFilterChange("jenisSpId", v)}
			/>
			{onTambah && (
				<Button onClick={onTambah}>
					<Plus />
					Tambah SP
				</Button>
			)}
		</DataTableToolbar>
	);
}

export default function SpPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const pegawaiId = params.pegawaiId;

	const nomorSp = sp.get("nomorSp") ?? "";
	const jenisSpId = sp.get("jenisSpId") ?? "";

	const table = useRiwayatTable<RiwayatSpQuery>({
		pegawaiId,
		entityPath: "sp",
		entityLabel: "SP",
		queryKeyPrefix: riwayatKeys.sp.all(),
	});

	const hasActive = !!(nomorSp || jenisSpId);

	const query = useQuery({
		queryKey: riwayatKeys.sp.list(pegawaiId, { page: table.page, size: table.size, nomorSp, jenisSpId }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page: table.page, size: table.size }) };
			if (nomorSp) params.nomorSp = nomorSp;
			if (jenisSpId) params.jenisSpId = jenisSpId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/pegawai/${pegawaiId}?${qs}`);
			throwIfNotOk(res, "Gagal memuat data SP");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const jenisSpOptions = useFkOptions("jenis-sp", (i) => String(i.nama ?? ""));

	const pageView = fromPage(query.data);

	const columns = SP_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: RiwayatSpQuery, i: number) => String((table.page - 1) * table.size + i + 1),
			};
		}
		if (col.id === "file") {
			return {
				...col,
				cell: (item: RiwayatSpQuery) => <FileCell row={item} />,
			};
		}
		return col;
	});

	return (
		<>
			<DataTable<RiwayatSpQuery>
				toolbar={
					<SpToolbar
						nomorSp={nomorSp}
						jenisSpId={jenisSpId}
						jenisSpOptions={jenisSpOptions}
						hasActive={hasActive}
						onFilterChange={table.onFilterChange}
						onReset={table.onReset}
						onTambah={canWrite ? table.handleOpenForm : undefined}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatSpQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canWrite ? (item) => table.setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => table.setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data SP"
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
			<SpFormSheet
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
				itemLabel="SP"
				onConfirm={() => table.handleDelete(`/api/proxy/kepegawaian/riwayat/sp/${table.deleteId}`)}
				error={table.deleteError}
			/>
		</>
	);
}
