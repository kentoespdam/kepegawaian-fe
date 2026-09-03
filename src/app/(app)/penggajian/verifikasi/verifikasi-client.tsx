"use client";

import { Download, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PegawaiOrganisasiTable } from "@/components/pegawai-organisasi-table";
import { MONTH_OPTIONS, PeriodeSelect } from "@/components/periode-filter";
import { RincianGajiPanel } from "@/components/rincian-gaji-panel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterList } from "@/hooks/penggajian/useBatchMasterList";
import { useVerifikasiFilters } from "@/hooks/penggajian/useVerifikasiFilters";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";

const STATUS_BADGE: Record<string, string> = {
	PENDING: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300",
	PROSES: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300",
	WAIT_VERIFICATION_PHASE_1:
		"bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300",
	WAIT_VERIFICATION_PHASE_2:
		"bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/50 dark:text-violet-300",
	WAIT_APPROVAL: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/50 dark:text-orange-300",
	FINISHED: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300",
	FAILED: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/50 dark:text-rose-300",
};

const STATUS_LABEL: Record<string, string> = {
	PENDING: "Menunggu",
	PROSES: "Diproses",
	WAIT_VERIFICATION_PHASE_1: "Verifikasi Tahap 1",
	WAIT_VERIFICATION_PHASE_2: "Verifikasi Tahap 2",
	WAIT_APPROVAL: "Menunggu Persetujuan",
	FINISHED: "Selesai",
	FAILED: "Gagal",
};

export function VerifikasiClient() {
	const { year, setYear, month, setMonth, periode } = useVerifikasiFilters();
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);

	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const verify1 = useBatchAction(batchId, `${batchId}/verify1`);
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);

	const { data: pegawaiList, isPending: isMasterPending, refetch: refetchMaster } = useBatchMasterList(periode);

	const selectedPegawai = pegawaiList
		? (pegawaiList.find((p) => p.id === selectedBatchMasterId) ?? pegawaiList[0] ?? null)
		: null;

	const handleRefresh = () => {
		refetchBatch();
		refetchMaster();
	};

	const handleVerify1 = async () => {
		try {
			await verify1.mutateAsync();
			toast.success("Batch berhasil diverifikasi (Tahap 1)");
			refetchBatch();
		} catch {
			toast.error("Gagal memverifikasi batch");
		}
	};

	const handleReprocess = async () => {
		try {
			await reprocess.mutateAsync();
			toast.success("Batch berhasil diproses ulang");
			refetchBatch();
			refetchMaster();
		} catch {
			toast.error("Gagal memproses ulang batch");
		}
	};

	const canVerify1 = batch?.status === "WAIT_VERIFICATION_PHASE_1";
	const canReprocess = batch?.status === "WAIT_VERIFICATION_PHASE_1" || batch?.status === "FAILED";

	const currentMonthLabel = MONTH_OPTIONS.find((opt) => opt.value === month)?.label ?? month;

	return (
		<div className="flex flex-col gap-4">
			{/* Header Title */}
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">
					02. Verifikasi Gapok, Tunjangan &amp; Potongan
				</h1>
				<p className="text-sm text-muted-foreground">Verifikasi rincian penghasilan dan potongan pegawai</p>
			</div>

			{/* Top Action & Filter Toolbar */}
			<div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-card p-3 rounded-lg border shadow-xs">
				<div className="flex flex-wrap items-center gap-2">
					<PeriodeSelect
						label="Periode Gaji"
						required
						month={month}
						year={year}
						onMonthChange={setMonth}
						onYearChange={setYear}
						size="sm"
					/>

					<Button
						variant="outline"
						size="sm"
						onClick={handleRefresh}
						disabled={isBatchPending || isMasterPending}
						className="h-8 text-xs font-semibold gap-1.5"
						title="Segarkan Data"
					>
						<RefreshCw className={`size-3.5 ${isBatchPending || isMasterPending ? "animate-spin" : ""}`} />
						Refresh
					</Button>
				</div>

				{/* Batch Status & Actions */}
				<div className="flex flex-wrap items-center gap-2">
					{batch && (
						<div className="flex items-center gap-2 mr-2">
							<span
								className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
									(batch.status && STATUS_BADGE[batch.status]) ?? "bg-muted text-muted-foreground"
								}`}
							>
								{(batch.status && STATUS_LABEL[batch.status]) ?? batch.status}
							</span>
							<span className="text-xs text-muted-foreground font-mono">
								{batch.totalPegawai ?? pegawaiList?.length ?? 0} Pegawai
							</span>
						</div>
					)}

					<Button
						variant="outline"
						size="sm"
						disabled={!batchId}
						onClick={() => {
							if (batchId) {
								window.open(`/api/proxy/penggajian/batch/master/download/table-gaji/${batchId}`, "_blank");
							}
						}}
						className="h-8 text-xs font-semibold gap-1.5"
					>
						<Download className="size-3.5" />
						Download
					</Button>

					{canReprocess && (
						<Button
							variant="outline"
							size="sm"
							onClick={handleReprocess}
							disabled={reprocess.isPending}
							className="h-8 text-xs font-semibold gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
						>
							{reprocess.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
							Proses Ulang
						</Button>
					)}

					<Button
						size="sm"
						onClick={handleVerify1}
						disabled={!canVerify1 || verify1.isPending}
						className="h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
					>
						{verify1.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
						Verifikasi Tahap 1
					</Button>
				</div>
			</div>

			{isBatchPending ? (
				<div className="space-y-3">
					<Skeleton className="h-20 w-full rounded-lg" />
					<Skeleton className="h-96 w-full rounded-lg" />
				</div>
			) : !batch ? (
				<div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground bg-card">
					<p className="text-base font-semibold">Belum ada proses gaji untuk periode ini</p>
					<p className="text-sm mt-1 text-muted-foreground/80">
						Silakan buat proses gaji baru pada menu 01. Proses Gaji Bulanan untuk periode {periode}.
					</p>
				</div>
			) : (
				<div className="flex flex-col lg:flex-row gap-4 items-start">
					{/* Tabel Utama Pegawai (Shared Global Component) */}
					<PegawaiOrganisasiTable
						pegawaiList={pegawaiList}
						isPending={isMasterPending}
						periodeLabel={`${currentMonthLabel} ${year}`}
						selectedBatchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
						onSelectRow={(id) => setSelectedBatchMasterId(id)}
						variant="verifikasi"
					/>

					{/* Panel Rincian Gaji (Shared Global Component) */}
					<RincianGajiPanel selectedPegawai={selectedPegawai} canEdit={false} />
				</div>
			)}
		</div>
	);
}
