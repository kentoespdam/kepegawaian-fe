"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ban, CalendarDays, CircleCheck, CircleX, Clock, Undo2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { approvalStatusTone, labelApprovalStatus } from "@/lib/enum-labels";
import { fromPage, toApiParams } from "@/lib/paging";
import { apiErrorMessage, cn, formatDate, throwIfNotOk } from "@/lib/utils";
import type { CutiApprovalChainResponse, PageResultPageCutiApprovalChainResponse } from "@/types/cuti/pengajuan";
import { type ApprovalAction, ApprovalConfirmDialog } from "./approval-confirm-dialog";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const TABS = [
	{ id: "menunggu", label: "Menunggu" },
	{ id: "riwayat", label: "Riwayat Persetujuan" },
] as const;
type TabId = (typeof TABS)[number]["id"];

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

interface PersetujuanPageClientProps {
	pegawaiId: number | null;
}

export function PersetujuanPageClient({ pegawaiId }: PersetujuanPageClientProps) {
	const sp = useSearchParams();
	const router = useRouter();
	const qc = useQueryClient();

	const tab: TabId = sp.get("tab") === "riwayat" ? "riwayat" : "menunggu";
	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const tahunParam = sp.get("tahun");
	const tahun = tahunParam && Number.isFinite(Number(tahunParam)) ? Number(tahunParam) : CURRENT_YEAR;
	const hasActive = tahun !== CURRENT_YEAR || tab !== "menunggu";

	// Satu dialog per halaman — action + row target
	const [approval, setApproval] = useState<{ row: CutiApprovalChainResponse; action: ApprovalAction } | null>(null);
	const [approvalError, setApprovalError] = useState<string | null>(null);

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp.toString());
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`/cuti/persetujuan?${p.toString()}`);
	};

	const setTab = (t: TabId) => nav({ tab: t === "menunggu" ? undefined : t, page: "1" });
	const onYearChange = (y: number) => nav({ tahun: String(y), page: "1" });
	const onReset = () => router.replace("/cuti/persetujuan");

	const query = useQuery({
		// CU-14: queryKey bawa semua param. Spike CU-10: backend filter status = 1 nilai —
		// tab riwayat tanpa filter status, non-PENDING di-filter client.
		queryKey: ["cuti-persetujuan", pegawaiId, tab, tahun, page, size],
		queryFn: async () => {
			const params: Record<string, string> = {
				...toApiParams({ page, size }),
				tahun: String(tahun),
				picSaatIniId: String(pegawaiId),
			};
			if (tab === "menunggu") params.approvalCutiStatus = "PENDING";
			const qs = new URLSearchParams(params).toString();
			const res = await fetch(`/api/proxy/cuti/pengajuan/approval?${qs}`);
			throwIfNotOk(res, "Gagal memuat data persetujuan");
			const body = (await res.json()) as PageResultPageCutiApprovalChainResponse;
			return body.data;
		},
		enabled: pegawaiId != null,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const approveMutation = useMutation({
		mutationFn: async ({
			row,
			action,
			notes,
		}: {
			row: CutiApprovalChainResponse;
			action: ApprovalAction;
			notes: string;
		}) => {
			// csrfToken: pola yang sama dengan pengajuan (GET /auth/csrf-token saat submit)
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			// Spike CU-12: approvalLevel dari CutiApprovalChainResponse.approvalLevel
			const body = {
				csrfToken: csrfBody.data ?? "",
				cutiId: row.refCuti?.id ?? 0,
				approverId: pegawaiId,
				approvalLevel: row.approvalLevel ?? 1,
				approvalStatus: action === "APPROVE" ? "APPROVED" : "REJECTED",
				notes,
			};
			const res = await fetch("/api/proxy/cuti/approval", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal memproses persetujuan"));
			}
		},
		onSuccess: () => {
			toast.success(approval?.action === "APPROVE" ? "Pengajuan disetujui" : "Pengajuan ditolak");
			setApproval(null);
			setApprovalError(null);
			qc.invalidateQueries({ queryKey: ["cuti-persetujuan"] });
			qc.invalidateQueries({ queryKey: ["cuti-pengajuan"] });
			qc.invalidateQueries({ queryKey: ["cuti-kuota"] });
		},
		onError: (e: Error) => setApprovalError(e.message),
	});

	const pageView = fromPage(query.data);
	// Spike CU-10: tab riwayat = semua non-PENDING (filter client karena backend 1 nilai status)
	const rows =
		tab === "riwayat"
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

	// Aksi (tab Menunggu): Setujui/Tolak — hanya readWriteStatus === "WRITE" (CU-11)
	if (tab === "menunggu") {
		columns.push({
			id: "aksi",
			header: "Aksi",
			align: "right",
			cell: (row) =>
				row.readWriteStatus === "WRITE" ? (
					<div className="inline-flex items-center gap-1.5">
						<Button
							size="sm"
							className="h-8 gap-1"
							onClick={() => {
								setApprovalError(null);
								setApproval({ row, action: "APPROVE" });
							}}
						>
							<CircleCheck className="size-3.5" />
							Setujui
						</Button>
						<Button
							size="sm"
							variant="outline"
							className="h-8 gap-1 text-destructive hover:text-destructive hover:border-destructive/50"
							onClick={() => {
								setApprovalError(null);
								setApproval({ row, action: "REJECT" });
							}}
						>
							<CircleX className="size-3.5" />
							Tolak
						</Button>
					</div>
				) : null,
		});
	}

	const columnsWithNo = columns.map((col) =>
		col.id === "no"
			? { ...col, cell: (_r: CutiApprovalChainResponse, i: number) => String((page - 1) * size + i + 1) }
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
			{/* Tab di URL (?tab=menunggu default, ?tab=riwayat) — CU-10 */}
			<div className="flex gap-1 border-b border-border">
				{TABS.map((t) => (
					<button
						key={t.id}
						type="button"
						onClick={() => setTab(t.id)}
						className={cn(
							"relative -mb-px px-4 py-2.5 text-sm font-medium transition-colors",
							tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
						)}
						aria-selected={tab === t.id}
						role="tab"
					>
						{t.label}
						{tab === t.id && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-t bg-primary" />}
					</button>
				))}
			</div>

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
					tab === "menunggu" ? "Tidak ada pengajuan yang menunggu persetujuan Anda" : "Belum ada riwayat persetujuan"
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

			<ApprovalConfirmDialog
				open={approval != null}
				onOpenChange={(v) => !v && setApproval(null)}
				action={approval?.action ?? "APPROVE"}
				pegawaiNama={approval?.row.refCuti?.nama ?? ""}
				onConfirm={(notes) => {
					if (approval) approveMutation.mutate({ row: approval.row, action: approval.action, notes });
				}}
				isPending={approveMutation.isPending}
				error={approvalError}
			/>
		</div>
	);
}
