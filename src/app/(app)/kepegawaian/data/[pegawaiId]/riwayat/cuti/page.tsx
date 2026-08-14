"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Ban, CalendarCheck, CalendarDays, CircleCheck, CircleX, Clock, StickyNoteMinus, Undo2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
// ponytail: import modul langsung (bukan barrel @/lib/auth) — verifySession server-only
import { forbidden, hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { approvalStatusTone, labelApprovalStatus } from "@/lib/enum-labels";
import { fromPage, toApiParams } from "@/lib/paging";
import { cn, formatDate } from "@/lib/utils";
import type { CutiKuotaPegawaiResponse, CutiKuotaResponse } from "@/types/cuti/kuota";
import type { CutiPengajuanResponse, PageResultPageCutiPengajuanResponse } from "@/types/cuti/pengajuan";

// ── Konstanta ──

const CURRENT_YEAR = new Date().getFullYear();
// ponytail: rentang 5 tahun (tahun berjalan − 4 .. tahun berjalan) — K-C3
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

// ── Status badge (ikon + teks + warna — bukan warna saja, WCAG 1.4.1) ──

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

// ── Strip 3 kartu (Kuota · Diambil · Sisa) — K-C5 ──

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

	// K-C5: container respons punya page (paged) + additional (array) — ambil baris
	// tahun terpilih dari container mana pun yang terisi (verifikasi bentuk BE).
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

// ── Toolbar tahun ──

function TahunToolbar({
	tahun,
	hasActive,
	onYearChange,
	onReset,
}: {
	tahun: number;
	hasActive: boolean;
	onYearChange: (y: number) => void;
	onReset: () => void;
}) {
	return (
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
	);
}

// ── Kolom tabel (K-C4) ──

const CUTI_COLUMNS: Column<CutiPengajuanResponse>[] = [
	{ id: "no", header: "No" },
	{
		id: "periode",
		header: "Periode",
		primary: true,
		cell: (row) => (
			<span className="whitespace-nowrap">
				{formatDate(row.tanggalMulai)} – {formatDate(row.tanggalSelesai)}
			</span>
		),
	},
	{
		id: "jenisCuti",
		header: "Jenis Cuti",
		cell: (row) => (
			<div className="space-y-0.5">
				<div>{row.jenisCuti?.nama ?? "—"}</div>
				{row.subJenisCuti?.nama ? <div className="text-xs text-muted-foreground">{row.subJenisCuti.nama}</div> : null}
			</div>
		),
	},
	{
		id: "jumlahHariKerja",
		header: "Jumlah Hari Kerja",
		align: "right",
		cell: (row) => row.jumlahHariKerja ?? "—",
	},
	{
		id: "status",
		header: "Status",
		cell: (row) => <StatusBadge status={row.approvalCutiStatus} />,
	},
];

// ── Page (read-only total — K-C2) ──

export default function CutiPage() {
	const { permissions } = useAuth();
	if (!hasPermission(permissions, PERMISSION.PEGAWAI_READ)) forbidden();

	const params = useParams<{ pegawaiId: string }>();
	const sp = useSearchParams();
	const router = useRouter();
	const pegawaiId = params.pegawaiId;

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	// ponytail: guard URL rusak (?tahun=abc / ?tahun= kosong) → fallback tahun berjalan
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	const hasActive = tahun !== CURRENT_YEAR;

	// ponytail: sort default tanggalMulai desc (K-C4) — fixed, tak perlu di queryKey
	const query = useQuery({
		queryKey: ["riwayat-cuti", pegawaiId, page, size, tahun],
		queryFn: async () => {
			const qs = new URLSearchParams({
				...toApiParams({ page, size, sortBy: "tanggalMulai", sortDir: "desc" }),
				tahun: String(tahun),
			}).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/${pegawaiId}/pegawai?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat data cuti");
			const body = (await res.json()) as PageResultPageCutiPengajuanResponse;
			return body.data;
		},
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});

	const kuotaQuery = useQuery({
		queryKey: ["cuti-kuota", pegawaiId, tahun],
		queryFn: async () => {
			const qs = new URLSearchParams({ pegawaiId, tahun: String(tahun) }).toString();
			const res = await fetch(`/api/proxy/cuti/kuota?${qs}`);
			if (!res.ok) throw new Error("Gagal memuat kuota cuti");
			const body = (await res.json()) as { data: CutiKuotaPegawaiResponse };
			return body.data;
		},
		staleTime: 30_000,
	});

	const pageView = fromPage(query.data);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/cuti?${p.toString()}`);
	};

	const onYearChange = (y: number) => nav({ tahun: String(y), page: "1" });
	const onReset = () => router.replace(`/kepegawaian/data/${pegawaiId}/riwayat/cuti`);

	const columns = CUTI_COLUMNS.map((col) => {
		if (col.id === "no") {
			return {
				...col,
				cell: (_item: CutiPengajuanResponse, i: number) => String((page - 1) * size + i + 1),
			};
		}
		return col;
	});

	return (
		<div className="space-y-4">
			<KuotaStrip data={kuotaQuery.data} tahun={tahun} isPending={kuotaQuery.isPending} isError={kuotaQuery.isError} />
			<DataTable<CutiPengajuanResponse>
				toolbar={<TahunToolbar tahun={tahun} hasActive={hasActive} onYearChange={onYearChange} onReset={onReset} />}
				columns={columns}
				data={pageView.rows ?? []}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
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
		</div>
	);
}
