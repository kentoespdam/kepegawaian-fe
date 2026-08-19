"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Ban, CalendarDays, CircleCheck, CircleX, Clock, Eye, Undo2 } from "lucide-react";
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

type PersetujuanView = "menunggu" | "riwayat";

interface PersetujuanPageClientProps {
	pegawaiId: number | null;
	jabatanId: number | null;
	// Dedicated pages: /cuti/persetujuan = menunggu, /cuti/persetujuan/riwayat = riwayat.
	view: PersetujuanView;
}

export function PersetujuanPageClient({ pegawaiId, jabatanId, view }: PersetujuanPageClientProps) {
	const sp = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	const hasActive = tahun !== CURRENT_YEAR;

	// Satu dialog per halaman — row target
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
	const onReset = () => router.replace(pathname);

	const query = useQuery({
		// CU-14: queryKey bawa semua param. Spike CU-10: backend filter status = 1 nilai —
		// view riwayat tanpa filter status, non-PENDING di-filter client.
		// CU-18/ADR-0041: chain approval posisional by JABATAN — picSaatIni adalah
		// JabatanMiniResponse (jabatan approver saat ini), jadi filter pakai jabatanId,
		// bukan pegawaiId.
		queryKey: ["cuti-persetujuan", view, jabatanId, tahun, page, size],
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page, size }),
				tahun: String(tahun),
				picSaatIniId: String(jabatanId),
			};
			if (view === "menunggu") params.approvalCutiStatus = "PENDING";
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
	// Spike CU-10: view riwayat = semua non-PENDING (filter client karena backend 1 nilai status)
	const rows =
		view === "riwayat"
			? (pageView.rows ?? []).filter((r) => r.refCuti?.approvalCutiStatus !== "PENDING")
			: (pageView.rows ?? []);

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
	];

	// CU-19: kolom Aksi = tombol Detail (buka modal detail + riwayat + aksi)
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

	// D5 defensif: pegawai tak ter-resolve ATAU jabatan kosong (inkonsistensi BE) → empty state.
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
					</DataTableToolbar>
				}
				columns={columnsWithNo}
				data={rows}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				getRowId={(item) => String(item.id ?? "")}
				emptyMessage={
					view === "menunggu" ? "Tidak ada pengajuan yang menunggu persetujuan Anda" : "Belum ada riwayat persetujuan"
				}
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
