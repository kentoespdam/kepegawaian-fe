"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ban, CalendarCheck, CalendarDays, CircleCheck, CircleX, Clock, StickyNoteMinus, Undo2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { approvalStatusTone, labelApprovalStatus } from "@/lib/enum-labels";
import { fromPage, toApiParams } from "@/lib/paging";
import { apiErrorMessage, cn, formatDate } from "@/lib/utils";
import type { CutiKuotaPegawaiResponse, CutiKuotaResponse } from "@/types/cuti/kuota";
import type { CutiPengajuanResponse, PageResultPageCutiPengajuanResponse } from "@/types/cuti/pengajuan";

const CURRENT_YEAR = new Date().getFullYear();
// ponytail: rentang 5 tahun (tahun berjalan − 4 .. tahun berjalan)
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const STATUS_ICONS: Record<string, typeof Clock> = {
	PENDING: Clock,
	APPROVED: CircleCheck,
	CONFIRMED: CircleCheck,
	REJECTED: CircleX,
	CANCELED: Ban,
	RETURNED: Undo2,
};

function StatusBadge({ status }: { status?: string }) {
	if (!status) return <span className="text-muted-foreground">—</span>;
	const Icon = STATUS_ICONS[status] ?? Clock;
	return (
		<Badge variant="outline" className={cn("gap-1", approvalStatusTone(status))}>
			<Icon className="size-3" />
			{labelApprovalStatus(status)}
		</Badge>
	);
}

// ── Strip 3 kartu (Kuota · Diambil · Sisa) — CU-7, pola defensif K-C5 ──

function KuotaStrip({
	data,
	tahun,
	isPending,
	isError,
}: {
	data: CutiKuotaPegawaiResponse | undefined;
	tahun: number;
	isPending: boolean;
	isError: boolean;
}) {
	if (isPending) {
		return (
			<div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
				{[0, 1, 2].map((i) => (
					<div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
						<Skeleton className="size-10 shrink-0 rounded-md" />
						<div className="space-y-1.5">
							<Skeleton className="h-3 w-16" />
							<Skeleton className="h-6 w-12" />
						</div>
					</div>
				))}
			</div>
		);
	}

	// K-C5: container punya page (paged) + additional (array) — ambil baris tahun
	// terpilih dari container mana pun yang terisi.
	const rows = [...(data?.page?.content ?? []), ...(data?.additional ?? [])];
	const row: CutiKuotaResponse | undefined = rows.find((r) => r.tahun === tahun);

	const kuota = (row?.kuota ?? 0) + (row?.kuotaTambahan ?? 0);
	const diambil = row?.kuotaTerpakai ?? 0;
	const sisa = row?.sisaKuota ?? 0;
	const noRecord = !row;

	const cards = [
		{ label: "Kuota Cuti", icon: CalendarDays, value: kuota, tone: "text-primary bg-primary/10" },
		{ label: "Diambil", icon: CalendarCheck, value: diambil, tone: "text-success bg-success/10" },
		{ label: "Sisa", icon: StickyNoteMinus, value: sisa, tone: "text-warning bg-warning/10" },
	] as const;

	return (
		<div className="space-y-2">
			<div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
				{cards.map((c) => (
					<div key={c.label} className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-sm">
						<div className={cn("flex size-10 shrink-0 items-center justify-center rounded-md", c.tone)}>
							<c.icon className="size-5" />
						</div>
						<div className="min-w-0">
							<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.label}</p>
							{/* ponytail: error fetch → inline "—" bukan toast (CU-13) */}
							<p className="text-2xl font-semibold tabular-nums text-foreground">
								{isError || noRecord ? "—" : c.value}
							</p>
						</div>
					</div>
				))}
			</div>
			{isError ? (
				<p className="text-sm text-muted-foreground">Gagal memuat kuota cuti.</p>
			) : noRecord ? (
				<p className="text-sm text-muted-foreground">Belum ada kuota tahun ini.</p>
			) : null}
		</div>
	);
}

interface PengajuanPageClientProps {
	pegawaiId: number | null;
}

export function PengajuanPageClient({ pegawaiId }: PengajuanPageClientProps) {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	const hasActive = tahun !== CURRENT_YEAR;

	const [cancelRow, setCancelRow] = useState<CutiPengajuanResponse | null>(null);
	const [cancelError, setCancelError] = useState<string | null>(null);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/cuti/pengajuan?${p.toString()}`);
	};

	const onYearChange = (y: number) => nav({ tahun: String(y), page: "1" });
	const onReset = () => router.replace("/cuti/pengajuan");

	const listQuery = useQuery({
		// CU-14: queryKey bawa semua param
		queryKey: ["cuti-pengajuan", pegawaiId, tahun, page, size],
		queryFn: async () => {
			const qs = new URLSearchParams({
				...toApiParams({ page, size, sortBy: "tanggalMulai", sortDir: "desc" }),
				tahun: String(tahun),
			}).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/${pegawaiId}/pegawai?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat pengajuan cuti");
			const body = (await res.json()) as PageResultPageCutiPengajuanResponse;
			return body.data;
		},
		enabled: pegawaiId != null,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const kuotaQuery = useQuery({
		queryKey: ["cuti-kuota", pegawaiId, tahun],
		queryFn: async () => {
			const qs = new URLSearchParams({ pegawaiId: String(pegawaiId), tahun: String(tahun) }).toString();
			const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat kuota cuti");
			const body = (await res.json()) as { data: CutiKuotaPegawaiResponse };
			return body.data;
		},
		enabled: pegawaiId != null,
		staleTime: 30_000,
	});

	const cancelMutation = useMutation({
		mutationFn: async (id: number) => {
			const res = await fetch(`/api/proxy/cuti/pengajuan/${id}`, { method: "DELETE" });
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal membatalkan pengajuan"));
			}
		},
		onSuccess: () => {
			toast.success("Pengajuan cuti dibatalkan");
			setCancelRow(null);
			setCancelError(null);
			qc.invalidateQueries({ queryKey: ["cuti-pengajuan"] });
			qc.invalidateQueries({ queryKey: ["cuti-kuota"] });
		},
		onError: (e: Error) => setCancelError(e.message),
	});

	const pageView = fromPage(listQuery.data);

	const columns: Column<CutiPengajuanResponse>[] = [
		{ id: "no", header: "No" },
		{
			id: "jenisCuti",
			header: "Jenis Cuti",
			primary: true,
			cell: (row) => (
				<div className="space-y-0.5">
					<div>{row.jenisCuti?.nama ?? "—"}</div>
					{row.subJenisCuti?.nama ? <div className="text-xs text-muted-foreground">{row.subJenisCuti.nama}</div> : null}
				</div>
			),
		},
		{
			id: "periode",
			header: "Periode",
			cell: (row) => (
				<span className="whitespace-nowrap">
					{formatDate(row.tanggalMulai)} – {formatDate(row.tanggalSelesai)}
				</span>
			),
		},
		{ id: "jumlahHariKerja", header: "Jumlah Hari Kerja", align: "right", cell: (row) => row.jumlahHariKerja ?? "—" },
		{ id: "status", header: "Status", cell: (row) => <StatusBadge status={row.approvalCutiStatus} /> },
		// Aksi: Batalkan hanya PENDING (CU-9) — dialog konfirmasi sederhana
		{
			id: "aksi",
			header: "Aksi",
			align: "right",
			cell: (row) =>
				row.approvalCutiStatus === "PENDING" ? (
					<Button
						variant="outline"
						size="sm"
						className="h-8 gap-1 text-muted-foreground hover:text-destructive hover:border-destructive/50"
						onClick={() => {
							setCancelError(null);
							setCancelRow(row);
						}}
					>
						<Ban className="size-3.5" />
						Batalkan
					</Button>
				) : null,
		},
	];

	const columnsWithNo = columns.map((col) =>
		col.id === "no"
			? { ...col, cell: (_r: CutiPengajuanResponse, i: number) => String((page - 1) * size + i + 1) }
			: col,
	);

	if (pegawaiId == null) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
					<CalendarDays className="size-8 text-muted-foreground" />
				</div>
				<h2 className="text-lg font-semibold text-foreground mb-2">Akun ini tidak terhubung ke data pegawai</h2>
				<p className="text-sm text-muted-foreground">Hubungi administrator untuk menghubungkan akun Anda.</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<KuotaStrip data={kuotaQuery.data} tahun={tahun} isPending={kuotaQuery.isPending} isError={kuotaQuery.isError} />

			<DataTable<CutiPengajuanResponse>
				toolbar={
					<DataTableToolbar hasActive={hasActive} onReset={onReset}>
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
					</DataTableToolbar>
				}
				columns={columnsWithNo}
				data={pageView.rows ?? []}
				isLoading={listQuery.isPending}
				isPlaceholder={listQuery.isPlaceholderData}
				isError={listQuery.isError}
				error={listQuery.error}
				onRetry={() => listQuery.refetch()}
				getRowId={(item) => String(item.id ?? "")}
				emptyMessage="Belum ada pengajuan cuti tahun ini"
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

			{/* Dialog konfirmasi cancel — bukan ConfirmDeleteDialog (tanpa ketik HAPUS, CU-9) */}
			<AlertDialog open={cancelRow != null} onOpenChange={(v) => !v && setCancelRow(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Batalkan Pengajuan Cuti</AlertDialogTitle>
						<AlertDialogDescription>
							Batalkan pengajuan cuti ini? Tindakan ini tidak dapat dibatalkan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					{cancelError && <p className="text-sm text-destructive">{cancelError}</p>}
					<AlertDialogFooter>
						<AlertDialogCancel disabled={cancelMutation.isPending}>Tidak</AlertDialogCancel>
						<AlertDialogAction
							disabled={cancelMutation.isPending}
							onClick={() => cancelMutation.mutate(cancelRow?.id ?? 0)}
						>
							{cancelMutation.isPending ? "Membatalkan..." : "Ya, Batalkan"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
