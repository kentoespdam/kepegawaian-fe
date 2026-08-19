"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CalendarDays, CircleCheck, CircleX, Clock, Eye } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { approvalStatusTone, labelApprovalStatus } from "@/lib/enum-labels";
import { fromPage, toApiParams } from "@/lib/paging";
import { cn, formatDate, throwIfNotOk } from "@/lib/utils";
import type { CutiApprovalChainResponse, PageResultPageCutiApprovalChainResponse } from "@/types/cuti/pengajuan";
import { DetailApprovalDialog } from "./detail-approval-dialog";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const STATUS_OPTIONS = [
	{ value: "PENDING", label: "Menunggu" },
	{ value: "APPROVED", label: "Disetujui" },
	{ value: "REJECTED", label: "Ditolak" },
	{ value: "CONFIRMED", label: "Dikonfirmasi" },
	{ value: "CANCELED", label: "Dibatalkan" },
];

const RW_OPTIONS = [
	{ value: "WRITE", label: "Belum Diproses" },
	{ value: "READ", label: "Sudah Diproses" },
];

const STATUS_ICONS: Record<string, typeof Clock> = {
	PENDING: Clock,
	APPROVED: CircleCheck,
	CONFIRMED: CircleCheck,
	REJECTED: CircleX,
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

interface PersetujuanPageClientProps {
	pegawaiId: number | null;
	jabatanId: number | null;
}

export function PersetujuanPageClient({ pegawaiId, jabatanId }: PersetujuanPageClientProps) {
	const sp = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	// CU-20: approvalCutiStatus wajib (BE 400 jika tidak dikirim), default PENDING
	const statusParam = (sp.get("approvalStatus") as string | null) ?? "PENDING";
	// CU-20: readWriteStatus — default WRITE, user pilih WRITE/READ
	const rwParam = sp.get("readWriteStatus");
	const readWriteStatus = rwParam === "WRITE" || rwParam === "READ" ? rwParam : "WRITE";
	const hasActive = tahun !== CURRENT_YEAR || statusParam !== "PENDING" || !!readWriteStatus;

	const [detailRow, setDetailRow] = useState<CutiApprovalChainResponse | null>(null);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`${pathname}?${p.toString()}`);
	};

	const onYearChange = (y: number) => nav({ tahun: String(y), page: "1" });
	const onStatusChange = (v: string) => nav({ approvalStatus: v === "PENDING" ? undefined : v, page: "1" });
	const onRwChange = (v: string) => nav({ readWriteStatus: v || undefined, page: "1" });
	const onReset = () => router.replace(pathname);

	const query = useQuery({
		// CU-20: approvalCutiStatus wajib (BE 400), readWriteStatus opsional
		queryKey: ["cuti-persetujuan", jabatanId, tahun, page, size, statusParam, readWriteStatus],
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page, size }),
				tahun: String(tahun),
				picSaatIniId: String(jabatanId),
				approvalCutiStatus: statusParam,
			};
			if (readWriteStatus) params.readWriteStatus = readWriteStatus;
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/approval?${qs}`);
			throwIfNotOk(res, "Gagal memuat data persetujuan");
			const body = (await res.json()) as PageResultPageCutiApprovalChainResponse;
			return body.data;
		},
		enabled: pegawaiId != null && jabatanId != null,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const pageView = fromPage(query.data);

	const columns: Column<CutiApprovalChainResponse>[] = [
		{ id: "no", header: "No" },
		{ id: "nama", header: "Nama Pegawai", primary: true, cell: (r) => r.refCuti?.nama ?? "—" },
		{
			id: "jenisCuti",
			header: "Jenis Cuti",
			cell: (r) => (
				<div className="space-y-0.5">
					<div>{r.refCuti?.jenisCuti?.nama ?? "—"}</div>
					{r.refCuti?.subJenisCuti?.nama ? (
						<div className="text-xs text-muted-foreground">{r.refCuti.subJenisCuti.nama}</div>
					) : null}
				</div>
			),
		},
		{
			id: "periode",
			header: "Periode",
			cell: (r) => (
				<span className="whitespace-nowrap">
					{formatDate(r.refCuti?.tanggalMulai)} – {formatDate(r.refCuti?.tanggalSelesai)}
				</span>
			),
		},
		{
			id: "jumlahHariKerja",
			header: "Jumlah Hari Kerja",
			align: "right",
			cell: (r) => r.refCuti?.jumlahHariKerja ?? "—",
		},
		{ id: "status", header: "Status", cell: (r) => <StatusBadge status={r.refCuti?.approvalCutiStatus} /> },
		{ id: "picSaatIni", header: "PIC Saat Ini", cell: (r) => r.refCuti?.picSaatIni?.nama ?? "—" },
	];

	columns.push({
		id: "aksi",
		header: "Aksi",
		align: "right",
		cell: (row) => (
			<Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => setDetailRow(row)}>
				<Eye className="size-3.5" />
				Detail
			</Button>
		),
	});

	const columnsWithNo = columns.map((col) =>
		col.id === "no"
			? { ...col, cell: (_r: CutiApprovalChainResponse, i: number) => String((page - 1) * size + i + 1) }
			: col,
	);

	if (pegawaiId == null || jabatanId == null) {
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

	// Resolve labels for SelectValue display
	const statusLabel = STATUS_OPTIONS.find((s) => s.value === statusParam)?.label ?? "Menunggu";
	const rwLabel = readWriteStatus ? RW_OPTIONS.find((s) => s.value === readWriteStatus)?.label : undefined;

	return (
		<div className="space-y-4">
			<DataTable<CutiApprovalChainResponse>
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
						<Select value={statusParam} onValueChange={(v) => onStatusChange(v ?? "PENDING")}>
							<SelectTrigger className="h-11 w-40" aria-label="Status Approval">
								<SelectValue>{statusLabel}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{STATUS_OPTIONS.map((s) => (
									<SelectItem key={s.value} value={s.value}>
										{s.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={readWriteStatus ?? ""} onValueChange={(v) => onRwChange(v ?? "")}>
							<SelectTrigger className="h-11 w-44" aria-label="Status Proses">
								<SelectValue>{rwLabel ?? "Semua"}</SelectValue>
							</SelectTrigger>
							<SelectContent>
								{RW_OPTIONS.map((s) => (
									<SelectItem key={s.value} value={s.value}>
										{s.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
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
				emptyMessage="Tidak ada pengajuan yang menunggu persetujuan Anda"
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

			<DetailApprovalDialog
				open={detailRow != null}
				onOpenChange={(v) => !v && setDetailRow(null)}
				row={detailRow}
				pegawaiId={pegawaiId}
				onActionComplete={() => setDetailRow(null)}
			/>
		</div>
	);
}
