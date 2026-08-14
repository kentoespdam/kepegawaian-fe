"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, Plus } from "lucide-react";
import { forbidden, useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { FKComboboxFilter } from "@/components/fk-combobox-filter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useFkOptions } from "@/hooks/useFkOptions";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { formatDate } from "@/lib/utils";
import type { RiwayatSpQuery } from "@/types/kepegawaian/riwayat";
import { SpFormSheet } from "./sp-form-sheet";

// ── Helpers ──

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

// ── Column definitions ──

const SP_COLUMNS: Column<RiwayatSpQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "nomorSp",
		header: "Nomor SP",
		primary: true,
		cell: (row) => val(row.nomorSp),
	},
	{
		id: "jenisSp",
		header: "Jenis SP",
		cell: (row) => row.jenisSp?.nama ?? "—",
	},
	{
		id: "tanggalSp",
		header: "Tgl SP",
		cell: (row) => formatDate(row.tanggalSp) ?? "—",
	},
	{
		id: "sanksi",
		header: "Sanksi",
		cell: (row) => row.sanksi?.keterangan ?? "—",
	},
	{
		id: "tanggalMulai",
		header: "Tgl Mulai",
		cell: (row) => formatDate(row.tanggalMulai) ?? "—",
	},
	{
		id: "tanggalSelesai",
		header: "Tgl Selesai",
		cell: (row) => formatDate(row.tanggalSelesai) ?? "—",
	},
	{
		id: "notes",
		header: "Notes",
		cell: (row) => val(row.notes),
	},
	{
		id: "file",
		header: "File",
		// cell di-set dinamis di render
	},
];

// ponytail: file viewer — open pdf/image in new tab, others download via anchor-with-button-style
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

// ── Toolbar ──

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

// ── Page ──

export default function SpPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();
	const canWrite = hasPermission(permissions, PERMISSION.PEGAWAI_WRITE);
	const canDelete = hasPermission(permissions, PERMISSION.PEGAWAI_DELETE);

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nomorSp = sp.get("nomorSp") ?? "";
	const jenisSpId = sp.get("jenisSpId") ?? "";

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(nomorSp || jenisSpId);

	const query = useQuery({
		queryKey: ["riwayat-sp", pegawaiId, page, size, nomorSp, jenisSpId],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }) };
			if (nomorSp) params.nomorSp = nomorSp;
			if (jenisSpId) params.jenisSpId = jenisSpId;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/pegawai/${pegawaiId}?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data SP");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	// ponytail: fetch jenis SP options for filter — reuse useFkOptions with custom label
	const jenisSpOptions = useFkOptions("jenis-sp", (i) => String(i.nama ?? ""));

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/sp?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/sp`);
	};

	// ponytail: inject No + File cells after building columns
	const columns = SP_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: RiwayatSpQuery, i: number) => String((page - 1) * size + i + 1),
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

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("SP berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["riwayat-sp", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e;
		}
	};

	return (
		<>
			<DataTable<RiwayatSpQuery>
				toolbar={
					<SpToolbar
						nomorSp={nomorSp}
						jenisSpId={jenisSpId}
						jenisSpOptions={jenisSpOptions}
						hasActive={hasActive}
						onFilterChange={onFilterChange}
						onReset={onReset}
						onTambah={
							canWrite
								? () => {
										setEditingId(null);
										setIsFormOpen(true);
									}
								: undefined
						}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatSpQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				// ponytail: K-SP6 — no onRowClick, no selectedRowId
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canWrite ? (item) => setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data SP"
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => nav({ page: String(p) })}
						onSizeChange={(s) => nav({ size: String(s), page: "1" })}
					/>
				}
			/>
			<SpFormSheet
				pegawaiId={pegawaiId}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="SP"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
