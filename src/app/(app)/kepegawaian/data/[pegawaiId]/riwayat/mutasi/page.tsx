"use client";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { forbidden, useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import { JENIS_MUTASI_OPTIONS, labelJenisMutasi } from "@/lib/riwayat-constants";
import { formatDate, rupiah, throwIfNotOk } from "@/lib/utils";
import type { RiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";
import { MutasiLampiranCard } from "./lampiran-card";
import { MutasiFormSheet } from "./mutasi-form-sheet";

// ── Formatter helpers (panen dari section-right-panel.tsx) ──

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

// ── Composite cell renderers ──

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

// ── Column definitions ──

const MUTASI_COLUMNS: Column<RiwayatMutasiQuery>[] = [
	{
		id: "no",
		header: "No",
		// ponytail: index diberikan via cell(index) — offset paging dihitung di closure
	},
	{
		id: "skMutasi",
		header: "SK",
		cell: (row) => <SkCell row={row} />,
	},
	{
		id: "jenisMutasi",
		header: "Jenis Mutasi",
		cell: (row) => labelJenisMutasi(row.jenisMutasi),
	},
	{
		id: "golongan",
		header: "Golongan",
		// ponytail: golonganLama untuk Lama, golongan untuk Baru — dua field terpisah
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
	{
		id: "notes",
		header: "Notes",
		cell: (row) => val(row.notes),
	},
];

// ── Toolbar ──

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

// ── Page component ──

export default function MutasiPage() {
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
	const nomorSk = sp.get("nomorSk") ?? "";
	const jenisMutasiFilter = sp.get("jenisMutasi") ?? "";
	const selectedRowId = sp.get("sel") ?? undefined;

	const [editingId, setEditingId] = useState<string | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const hasActive = !!(nomorSk || jenisMutasiFilter);

	const query = useQuery({
		queryKey: riwayatKeys.mutasi.list(pegawaiId, { page, size, nomorSk, jenisMutasiFilter }),
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }) };
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

	const selectedRow = selectedRowId
		? ((pageView.rows as RiwayatMutasiQuery[]).find((r) => String(r.id) === selectedRowId) ?? null)
		: null;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/mutasi?${p.toString()}`);
	};

	const onFilterChange = (key: string, val: string | undefined) => {
		nav({ [key]: val, page: "1" });
	};

	const onReset = () => {
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/mutasi`);
	};

	const columns = MUTASI_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: RiwayatMutasiQuery, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	const handleDelete = async () => {
		if (!deleteId) return;
		setDeleteError(null);
		try {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/mutasi/${deleteId}`, { method: "DELETE" });
			if (res.status === 409) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Data masih digunakan");
			}
			if (!res.ok) throw new Error("Gagal menghapus");
			toast.success("Mutasi berhasil dihapus");
			qc.invalidateQueries({ queryKey: riwayatKeys.mutasi.all() });
			setDeleteId(null);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
			throw e; // re-throw so ConfirmDeleteDialog keeps dialog open
		}
	};

	return (
		<>
			<DataTable<RiwayatMutasiQuery>
				toolbar={
					<MutasiToolbar
						nomorSk={nomorSk}
						jenisMutasi={jenisMutasiFilter}
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
				data={(pageView.rows as RiwayatMutasiQuery[]) ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				onRowClick={(item) => nav({ sel: String(item.id ?? "") })}
				selectedRowId={selectedRowId}
				getRowId={(item) => String(item.id ?? "")}
				onEdit={canWrite ? (item) => setEditingId(String(item.id ?? "")) : undefined}
				onDelete={canDelete ? (item) => setDeleteId(String(item.id ?? "")) : undefined}
				emptyMessage="Belum ada data mutasi"
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
			/>{" "}
			<MutasiFormSheet
				pegawaiId={pegawaiId}
				editingId={editingId}
				isOpen={isFormOpen || editingId !== null}
				onClose={() => {
					setEditingId(null);
					setIsFormOpen(false);
				}}
			/>
			<MutasiLampiranCard selectedRow={selectedRow} hideUpload={!canWrite} hideDelete={!canDelete} />
			<ConfirmDeleteDialog
				open={deleteId !== null}
				onOpenChange={(v) => {
					if (!v) {
						setDeleteId(null);
						setDeleteError(null);
					}
				}}
				itemLabel="mutasi"
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</>
	);
}
