"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fromPage, toApiParams } from "@/lib/paging";
import { apiErrorMessage, formatDate } from "@/lib/utils";
import type { CutiKuotaResponse, SingleResultCutiKuotaPegawaiResponse } from "@/types/cuti/kuota";
import { KuotaFormSheet } from "./kuota-form-sheet";

const CURRENT_YEAR = new Date().getFullYear();
// ponytail: rentang 5 tahun (tahun berjalan − 4 .. tahun berjalan) — CU-3
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

export function KuotaPageClient() {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	// ponytail: guard URL rusak (?tahun=abc / kosong) → fallback tahun berjalan
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	const nama = sp.get("nama") ?? "";
	const nipam = sp.get("nipam") ?? "";
	const hasActive = tahun !== CURRENT_YEAR || !!nama || !!nipam;

	// Satu Sheet per halaman — state editing: null = tambah, row = edit (CU-4)
	const [sheetOpen, setSheetOpen] = useState(false);
	const [editing, setEditing] = useState<CutiKuotaResponse | null>(null);
	const [deleting, setDeleting] = useState<CutiKuotaResponse | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const query = useQuery({
		// CU-14: queryKey bawa semua param yang mempengaruhi hasil
		queryKey: ["cuti-kuota", tahun, nama, nipam, page, size],
		queryFn: async () => {
			const params: Record<string, string> = { ...toApiParams({ page, size }), tahun: String(tahun) };
			if (nama) params.nama = nama;
			if (nipam) params.nipam = nipam;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data kuota");
			const body = (await res.json()) as SingleResultCutiKuotaPegawaiResponse;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const deleteMutation = useMutation({
		mutationFn: async (id: number) => {
			const res = await fetch(`/api/proxy/cuti/kuota/${id}`, { method: "DELETE" });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menghapus kuota"));
			}
		},
		onSuccess: () => {
			toast.success("Kuota cuti berhasil dihapus");
			setDeleting(null);
			setDeleteError(null);
			qc.invalidateQueries({ queryKey: ["cuti-kuota"] });
		},
		// 409 → inline di dialog (bukan toast) — kontrak status (coding-rules §6)
		onError: (e: Error) => setDeleteError(e.message),
	});

	// URL = sumber kebenaran state tabel (tahun, nama, nipam, page, size)
	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/cuti/kuota?${p.toString()}`);
	};

	const onFilterChange = (name: string, value: string | undefined) => nav({ [name]: value, page: "1" });
	const onYearChange = (y: number) => nav({ tahun: String(y), page: "1" });
	const onReset = () => router.replace("/cuti/kuota");

	const pageView = fromPage(query.data?.page);

	const columns: Column<CutiKuotaResponse>[] = [
		{ id: "no", header: "No" },
		{ id: "nama", header: "Nama Pegawai", primary: true, cell: (r) => r.pegawai?.nama ?? "—" },
		{ id: "nipam", header: "NIPAM", cell: (r) => r.pegawai?.nipam ?? "—" },
		{ id: "tahun", header: "Tahun", cell: (r) => r.tahun ?? "—" },
		{ id: "kuota", header: "Kuota", align: "right", cell: (r) => r.kuota ?? "—" },
		{ id: "tambahan", header: "Tambahan", align: "right", cell: (r) => r.kuotaTambahan ?? "—" },
		{ id: "terpakai", header: "Terpakai", align: "right", cell: (r) => r.kuotaTerpakai ?? "—" },
		{ id: "sisa", header: "Sisa", align: "right", cell: (r) => r.sisaKuota ?? "—" },
		{ id: "expired", header: "Expired", cell: (r) => formatDate(r.expired) },
		// Aksi custom (bukan onEdit/onDelete bawaan DataTable — label "Edit Profil" tak tepat untuk kuota)
		{
			id: "aksi",
			header: "Aksi",
			align: "right",
			cell: (row) => (
				<div className="inline-flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						title="Edit"
						onClick={() => {
							setEditing(row);
							setSheetOpen(true);
						}}
						aria-label={`Edit kuota cuti ${row.pegawai?.nama ?? ""}`}
					>
						<Pencil className="size-4" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						title="Hapus"
						onClick={() => {
							setDeleteError(null);
							setDeleting(row);
						}}
						aria-label={`Hapus kuota cuti ${row.pegawai?.nama ?? ""}`}
					>
						<Trash2 className="size-4 text-destructive" />
					</Button>
				</div>
			),
		},
	];

	const columnsWithNo = columns.map((col) =>
		col.id === "no" ? { ...col, cell: (_r: CutiKuotaResponse, i: number) => String((page - 1) * size + i + 1) } : col,
	);

	return (
		<div className="space-y-4">
			<DataTable<CutiKuotaResponse>
				toolbar={
					<DataTableToolbar
						searchFields={[
							{ name: "nama", label: "Nama" },
							{ name: "nipam", label: "NIPAM" },
						]}
						values={{ nama, nipam }}
						onFilterChange={onFilterChange}
						hasActive={hasActive}
						onReset={onReset}
					>
						<Select value={String(tahun)} onValueChange={(v) => onYearChange(Number(v))}>
							<SelectTrigger className="h-11 w-36" aria-label="Tahun">
								<SelectValue placeholder="Pilih Tahun" />
							</SelectTrigger>
							<SelectContent>
								{YEAR_OPTIONS.map((y) => (
									<SelectItem key={y} value={String(y)}>
										{y}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button
							size="sm"
							className="gap-1.5"
							onClick={() => {
								setEditing(null);
								setSheetOpen(true);
							}}
						>
							<Plus className="size-4" />
							Tambah
						</Button>
					</DataTableToolbar>
				}
				columns={columnsWithNo}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				getRowId={(item) => String(item.id ?? "")}
				emptyMessage="Belum ada kuota cuti untuk filter ini"
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

			{/* Satu Sheet per halaman — Tambah (editing=null) atau Edit (editing=row) */}
			<KuotaFormSheet open={sheetOpen} onOpenChange={setSheetOpen} editing={editing} />

			<ConfirmDeleteDialog
				open={deleting != null}
				onOpenChange={(v) => !v && setDeleting(null)}
				itemLabel={`kuota cuti ${deleting?.pegawai?.nama ?? ""}`}
				onConfirm={() => deleteMutation.mutateAsync(deleting?.id ?? 0)}
				error={deleteError}
			/>
		</div>
	);
}
