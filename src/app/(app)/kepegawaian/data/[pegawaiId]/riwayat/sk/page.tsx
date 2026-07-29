"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fromPage, toApiParams } from "@/lib/paging";
import { JENIS_SK_OPTIONS, labelJenisSk } from "@/lib/riwayat-constants";
import { formatDate, rupiah } from "@/lib/utils";
import type { RiwayatSkQuery } from "@/types/kepegawaian/riwayat";
import { SkFormSheet } from "./sk-form-sheet";
import { SkLampiranCard } from "./lampiran-card";

// ── Formatter helpers ──

function val(s: unknown): string {
	if (s == null || s === "") return "—";
	return String(s);
}

function rp(n: unknown): string {
	if (n == null || n === "") return "—";
	const v = Number(n);
	if (!Number.isFinite(v)) return val(n);
	const f = rupiah(v);
	return f ?? "—";
}

function mkgStr(t: unknown, b: unknown): string {
	return `${t ?? ""} Thn – ${b ?? ""} Bln`;
}

// ── Column definitions ──

const SK_COLUMNS: Column<RiwayatSkQuery>[] = [
	{ id: "no", header: "No" },
	{
		id: "nomorSk",
		header: "Nomor SK",
		primary: true,
		cell: (row) => val(row.nomorSk),
	},
	{
		id: "jenisSk",
		header: "Jenis SK",
		cell: (row) => labelJenisSk(row.jenisSk),
	},
	{
		id: "tanggalSk",
		header: "Tgl. SK",
		cell: (row) => formatDate(row.tanggalSk) ?? "—",
	},
	{
		id: "tmtBerlaku",
		header: "Tgl. Berlaku",
		cell: (row) => formatDate(row.tmtBerlaku) ?? "—",
	},
	{
		id: "golongan",
		header: "Golongan",
		cell: (row) => row.golongan?.golongan ?? "—",
	},
	{
		id: "gajiPokok",
		header: "Gaji Pokok",
		cell: (row) => rp(row.gajiPokok),
	},
	{
		id: "mkg",
		header: "MKG",
		cell: (row) => mkgStr(row.mkgTahun, row.mkgBulan),
	},
	{
		id: "kenaikanBerikutnya",
		header: "Kenaikan Berikutnya",
		cell: (row) => formatDate(row.kenaikanBerikutnya) ?? "—",
	},
	{
		id: "mkgb",
		header: "MKGB",
		cell: (row) => mkgStr(row.mkgbTahun, row.mkgbBulan),
	},
	{
		id: "notes",
		header: "Notes",
		cell: (row) => val(row.notes),
	},
];

// ── Toolbar ──

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
	onTambah: () => void;
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
			<Button onClick={onTambah}>
				<Plus />
				Tambah SK
			</Button>
		</DataTableToolbar>
	);
}

// ── Page ──

export default function SkPage() {
	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();
	const pegawaiId = params.pegawaiId;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nomorSk = sp.get("nomorSk") ?? "";
	const jenisSkFilter = sp.get("jenisSk") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(nomorSk || jenisSkFilter);

	const query = useQuery({
		queryKey: ["riwayat-sk", pegawaiId, page, size, nomorSk, jenisSkFilter],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }) };
			if (nomorSk) params.nomorSk = nomorSk;
			if (jenisSkFilter) params.jenisSk = jenisSkFilter;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sk/pegawai/${pegawaiId}?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data SK");
			const body = await res.json();
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const selectedRow = selectedRowId
		? ((pageView.rows as RiwayatSkQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/sk?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/sk`);
	};

	const columns = SK_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: RiwayatSkQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sk/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("SK berhasil dihapus");
			qc.invalidateQueries({ queryKey: ["riwayat-sk", pegawaiId] });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e;
		}
	};

	return (
		<>
			<DataTable<RiwayatSkQuery>
				toolbar={
					<SkToolbar
						nomorSk={nomorSk}
						jenisSk={jenisSkFilter}
						hasActive={hasActive}
						onFilterChange={onFilterChange}
						onReset={onReset}
						onTambah={() => {
							setEditingId(null);
							setIsFormOpen(true);
						}}
					/>
				}
				columns={columns}
				data={(pageView.rows as RiwayatSkQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => nav({ sel: String(item.id ?? "") })}
				selectedRowId={selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={(item) => {
					setEditingId(String(item.id ?? ""));
					setIsFormOpen(true);
				}}
				onDelete={(item) => setDeleteId(String(item.id ?? ""))}
				emptyMessage="Belum ada data SK"
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
			<SkFormSheet
				pegawaiId={pegawaiId}
				editingId={editingId}
				isOpen={isFormOpen}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			<SkLampiranCard selectedRow={selectedRow} />
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="SK"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
