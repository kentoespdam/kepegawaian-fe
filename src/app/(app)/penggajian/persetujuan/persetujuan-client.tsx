"use client";

import { CheckCircle, Download, Loader2, RefreshCw, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PegawaiOrganisasiTable } from "@/components/pegawai-organisasi-table";
import { MONTH_OPTIONS, PeriodeSelect } from "@/components/periode-filter";
import { RincianGajiPanel } from "@/components/rincian-gaji-panel";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUS_BADGE, STATUS_LABELS } from "@/config/penggajian/batch-list.config";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterList } from "@/hooks/penggajian/useBatchMasterList";
import { useVerifikasiFilters } from "@/hooks/penggajian/useVerifikasiFilters";
import { getReprocessPhase } from "@/lib/utils/penggajian-reprocess";
import type { GajiBatchRootResponse, StatusBatch } from "@/types/penggajian/batch";

interface PersetujuanClientProps {
	userName?: string;
	jabatanName?: string;
}

export function PersetujuanClient({ userName, jabatanName }: PersetujuanClientProps) {
	const { year, setYear, month, setMonth, periode } = useVerifikasiFilters();
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);

	const [approveDialogOpen, setApproveDialogOpen] = useState(false);
	const [reprocessDialogOpen, setReprocessDialogOpen] = useState(false);
	const [kirimSlipDialogOpen, setKirimSlipDialogOpen] = useState(false);

	// Fetch batch for period
	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const accept = useBatchAction(`${batchId}/accept`);
	const reprocess = useBatchAction(`${batchId}/reprocess`);
	const kirimSlip = useBatchAction(`master/upload/${batchId}`);

	const canAct = batch?.status === "WAIT_APPROVAL";

	// Fetch pegawai list in batch
	const {
		data: pegawaiList,
		isPending: isMasterPending,
		refetch: refetchMaster,
	} = useBatchMasterList(periode, "WAIT_APPROVAL");

	const selectedPegawai = pegawaiList
		? (pegawaiList.find((p) => p.id === selectedBatchMasterId) ?? pegawaiList[0] ?? null)
		: null;

	const handleRefresh = () => {
		refetchBatch();
		refetchMaster();
	};

	const handleAccept = async () => {
		try {
			await accept.mutateAsync({
				id: batchId,
				nama: userName,
				jabatan: jabatanName ?? "Direktur Utama",
				phase: "WAIT_APPROVAL",
			});
			toast.success("Persetujuan akhir berhasil");
			setApproveDialogOpen(false);
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal menyetujui batch");
		}
	};

	const handleReprocess = async () => {
		try {
			await reprocess.mutateAsync({
				id: batchId,
				nama: userName,
				jabatan: jabatanName ?? "Direktur Utama",
			});
			toast.success("Batch berhasil diproses ulang");
			setReprocessDialogOpen(false);
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal memproses ulang batch");
		}
	};

	const handleKirimSlip = async () => {
		try {
			await kirimSlip.mutateAsync({
				id: batchId,
				nama: userName,
				jabatan: jabatanName ?? "Direktur Utama",
				phase: batch?.status,
			});
			toast.success("Slip gaji berhasil dikirim");
			setKirimSlipDialogOpen(false);
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal mengirim slip gaji");
		}
	};

	const handleDownload = (type: "table-gaji") => {
		if (!batchId) return;
		window.open(`/api/proxy/penggajian/batch/master/download/${type}/${batchId}`, "_blank");
	};

	const currentMonthLabel = MONTH_OPTIONS.find((opt) => opt.value === month)?.label ?? month;

	return (
		<div className="flex flex-col gap-4">
			{/* Title Header */}
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">04. Persetujuan Akhir</h1>
				<p className="text-sm text-muted-foreground">Tinjau rekapitulasi penggajian, setujui, dan kirim slip gaji</p>
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

				{/* Batch Action Buttons */}
				<div className="flex flex-wrap items-center gap-2">
					{batch && (
						<div className="flex items-center gap-2 mr-2">
							<span
								className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
									(batch.status && STATUS_BADGE[batch.status as StatusBatch]) ?? "bg-muted text-muted-foreground"
								}`}
							>
								{(batch.status && STATUS_LABELS[batch.status as StatusBatch]) ?? batch.status}
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
						onClick={() => handleDownload("table-gaji")}
						className="h-8 text-xs font-semibold gap-1.5"
					>
						<Download className="size-3.5" />
						Table Gaji
					</Button>

					<Button
						variant="destructive"
						size="sm"
						disabled={!canAct || reprocess.isPending}
						onClick={() => setReprocessDialogOpen(true)}
						className="h-8 text-xs font-semibold gap-1.5"
					>
						{reprocess.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
						Proses Ulang
					</Button>

					<Button
						variant="outline"
						size="sm"
						disabled={!canAct || kirimSlip.isPending}
						onClick={() => setKirimSlipDialogOpen(true)}
						className="h-8 text-xs font-semibold gap-1.5"
					>
						{kirimSlip.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
						Kirim Slip Gaji
					</Button>

					<Button
						size="sm"
						disabled={!canAct || accept.isPending}
						onClick={() => setApproveDialogOpen(true)}
						className="h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
					>
						{accept.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <CheckCircle className="size-3.5" />}
						Setujui
					</Button>
				</div>
			</div>

			{/* Konten Utama */}
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
					<PegawaiOrganisasiTable
						pegawaiList={pegawaiList}
						isPending={isMasterPending}
						periodeLabel={`${currentMonthLabel} ${year}`}
						selectedBatchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
						onSelectRow={(id) => setSelectedBatchMasterId(id)}
						variant="persetujuan"
						titlePrefix="Persetujuan Akhir [Periode"
					/>

					<RincianGajiPanel selectedPegawai={selectedPegawai} canEdit={false} showAddButton={false} />
				</div>
			)}

			{/* Dialog Konfirmasi Persetujuan Akhir */}
			<AlertDialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Persetujuan Akhir Batch Gaji</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin menyetujui batch penggajian periode{" "}
							<strong>
								{currentMonthLabel} {year}
							</strong>
							? Setelah disetujui, status batch akan menjadi <strong>FINISHED</strong> dan seluruh data terkunci
							permanen.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={accept.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleAccept}
							disabled={accept.isPending}
							className="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							{accept.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							Ya, Setujui
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Dialog Konfirmasi Proses Ulang */}
			<AlertDialog open={reprocessDialogOpen} onOpenChange={setReprocessDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Proses Ulang Batch</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin memproses ulang batch penggajian periode{" "}
							<strong>
								{currentMonthLabel} {year}
							</strong>
							? Tindakan ini akan mengembalikan status batch ke tahap 03 (Tambah Komponen Gaji) untuk verifikasi ulang.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={reprocess.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleReprocess}
							disabled={reprocess.isPending}
							className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
						>
							{reprocess.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							Ya, Proses Ulang
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{/* Dialog Konfirmasi Kirim Slip Gaji */}
			<AlertDialog open={kirimSlipDialogOpen} onOpenChange={setKirimSlipDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Kirim Slip Gaji</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin mengirim slip gaji kepada seluruh pegawai untuk periode{" "}
							<strong>
								{currentMonthLabel} {year}
							</strong>
							?
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={kirimSlip.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleKirimSlip}
							disabled={kirimSlip.isPending}
							className="bg-primary hover:bg-primary/90 text-primary-foreground"
						>
							{kirimSlip.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							Ya, Kirim Slip
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
