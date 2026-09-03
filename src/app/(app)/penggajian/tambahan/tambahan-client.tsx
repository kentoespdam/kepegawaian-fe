"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	ChevronDown,
	FileDown,
	FileSpreadsheet,
	Loader2,
	RefreshCw,
	RotateCcw,
	ShieldCheck,
	Upload,
} from "lucide-react";
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterList } from "@/hooks/penggajian/useBatchMasterList";
import { useVerifikasiFilters } from "@/hooks/penggajian/useVerifikasiFilters";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";
import { UploadPotonganDialog } from "./_components/upload-potongan-dialog";

export function TambahanClient() {
	const { year, setYear, month, setMonth, periode } = useVerifikasiFilters();
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);
	const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
	const [rollbackDialogOpen, setRollbackDialogOpen] = useState(false);

	const qc = useQueryClient();

	// Fetch batch for period
	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const canEdit = batch?.status === "WAIT_VERIFICATION_PHASE_1";

	const verify1 = useBatchAction(batchId, `${batchId}/verify1`);
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);

	// Fetch pegawai list in batch via shared hook
	const { data: pegawaiList, isPending: isMasterPending, refetch: refetchMaster } = useBatchMasterList(periode);

	const rollbackMutation = useMutation({
		mutationFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${batchId}/rollback`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `Gagal membatalkan perubahan (${res.status})`);
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() });
			toast.success("Semua perubahan potongan & tambahan berhasil dibatalkan");
			refetchBatch();
			refetchMaster();
			setRollbackDialogOpen(false);
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal membatalkan perubahan");
		},
	});

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

	const handleDownloadTemplate = async () => {
		try {
			const res = await fetch("/api/proxy/penggajian/batch/master/proses/template");
			if (!res.ok) throw new Error("Gagal mengunduh template");
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "template-potongan.xlsx";
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
			toast.success("Template berhasil diunduh");
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : "Gagal mengunduh template";
			toast.error(msg);
		}
	};

	const currentMonthLabel = MONTH_OPTIONS.find((opt) => opt.value === month)?.label ?? month;

	return (
		<div className="flex flex-col gap-4">
			{/* Title Header */}
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">03. Tambah Komponen Gaji</h1>
				<p className="text-sm text-muted-foreground">Kelola penambahan dan pemotongan komponen gaji per pegawai</p>
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
									batch.status === "WAIT_VERIFICATION_PHASE_1"
										? "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/50 dark:text-purple-300"
										: "bg-muted text-muted-foreground"
								}`}
							>
								{batch.status === "WAIT_VERIFICATION_PHASE_1" ? "Verifikasi Tahap 1" : batch.status}
							</span>
							<span className="text-xs text-muted-foreground font-mono">
								{batch.totalPegawai ?? pegawaiList?.length ?? 0} Pegawai
							</span>
						</div>
					)}

					{/* Dropdown Aksi Potongan */}
					<DropdownMenu>
						<DropdownMenuTrigger
							disabled={!canEdit}
							className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 h-8 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50"
						>
							<FileSpreadsheet className="size-3.5" />
							Komponen Gaji
							<ChevronDown className="size-3 text-white/80" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-52">
							<DropdownMenuItem onClick={handleDownloadTemplate} className="text-xs gap-2 cursor-pointer">
								<FileDown className="size-3.5 text-primary" />
								Download Template Potongan
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setUploadDialogOpen(true)}
								disabled={!canEdit}
								className="text-xs gap-2 cursor-pointer text-primary focus:text-primary font-medium"
							>
								<Upload className="size-3.5" />
								Upload File Potongan
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Tombol Batalkan Perubahan (Rollback) */}
					{canEdit && (
						<Button
							variant="outline"
							size="sm"
							onClick={() => setRollbackDialogOpen(true)}
							disabled={rollbackMutation.isPending}
							className="h-8 text-xs font-semibold gap-1.5 text-rose-600 border-rose-300/60 hover:bg-rose-50 dark:hover:bg-rose-950/30"
							title="Batalkan semua perubahan potongan dan tambahan"
						>
							<RotateCcw className="size-3.5" />
							Batalkan Perubahan
						</Button>
					)}

					{/* Tombol Proses Ulang */}
					<Button
						variant="destructive"
						size="sm"
						onClick={handleReprocess}
						disabled={!canEdit || reprocess.isPending}
						className="h-8 text-xs font-semibold gap-1.5"
					>
						{reprocess.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
						Proses Ulang
					</Button>

					{/* Tombol Verifikasi Tahap 1 */}
					<Button
						size="sm"
						onClick={handleVerify1}
						disabled={!canEdit || verify1.isPending}
						className="h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xs"
					>
						{verify1.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
						Verifikasi Tahap 1
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
					{/* Panel Kiri: Tabel Utama Pegawai (Shared Global Component) */}
					<PegawaiOrganisasiTable
						pegawaiList={pegawaiList}
						isPending={isMasterPending}
						periodeLabel={`${currentMonthLabel} ${year}`}
						selectedBatchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
						onSelectRow={(id) => setSelectedBatchMasterId(id)}
						variant="tambahan"
					/>

					{/* Panel Kanan: Rincian Gaji (Shared Global Component) */}
					<RincianGajiPanel
						selectedPegawai={selectedPegawai}
						canEdit={canEdit}
						showAddButton={true}
						onDataChange={() => {
							refetchBatch();
							refetchMaster();
						}}
					/>
				</div>
			)}

			{/* Dialog Upload Potongan */}
			<UploadPotonganDialog
				open={uploadDialogOpen}
				onOpenChange={setUploadDialogOpen}
				rootBatchId={batchId}
				onSuccess={() => {
					refetchBatch();
					refetchMaster();
				}}
			/>

			{/* Dialog Konfirmasi Batalkan Perubahan (Rollback) */}
			<AlertDialog open={rollbackDialogOpen} onOpenChange={setRollbackDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Batalkan Perubahan</AlertDialogTitle>
						<AlertDialogDescription>
							Apakah Anda yakin ingin membatalkan semua perubahan potongan dan komponen tambahan pada batch ini?
							Tindakan ini akan mengembalikan data gaji pegawai ke kondisi awal sebelum dilakukan penambahan atau
							pengunggahan file potongan.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={rollbackMutation.isPending}>Batal</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => rollbackMutation.mutate()}
							disabled={rollbackMutation.isPending}
							className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
						>
							{rollbackMutation.isPending ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
							Ya, Batalkan Semua Perubahan
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
