"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Download, Loader2, RefreshCw, RotateCcw, Search, ShieldCheck, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterList } from "@/hooks/penggajian/useBatchMasterList";
import { useVerifikasiFilters } from "@/hooks/penggajian/useVerifikasiFilters";
import { cn } from "@/lib/utils";
import type { GajiBatchMasterResponse, GajiBatchRootResponse } from "@/types/penggajian/batch";
import { MONTH_OPTIONS } from "../_components/periode-filter";
import { OrganisasiTableGroup } from "./_components/organisasi-table-group";
import { RincianGajiPanel } from "./_components/rincian-gaji-panel";
import { UploadPotonganDialog } from "./_components/upload-potongan-dialog";

export function TambahanClient() {
	const { year, setYear, month, setMonth, periode, years } = useVerifikasiFilters();
	const [searchNik, setSearchNik] = useState("");
	const [searchNama, setSearchNama] = useState("");
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
			toast.success("Perubahan berhasil dibatalkan");
			setRollbackDialogOpen(false);
			refetchBatch();
			refetchMaster();
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal membatalkan perubahan");
		},
	});

	const handleVerify = async () => {
		if (!batchId) return;
		try {
			await verify1.mutateAsync();
			toast.success("Verifikasi tahap 1 berhasil");
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal memverifikasi");
		}
	};

	const handleReprocess = async () => {
		if (!batchId) return;
		try {
			await reprocess.mutateAsync();
			toast.success("Proses ulang berhasil");
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal memproses ulang");
		}
	};

	const handleDownloadTemplate = () => {
		if (!batchId) return;
		window.open(`/api/proxy/penggajian/batch/master/download/potongan-gaji/${batchId}`, "_blank");
	};

	// Filter pegawai by NIK and Nama
	const qNik = searchNik.toLowerCase().trim();
	const qNama = searchNama.toLowerCase().trim();
	const filtered = pegawaiList
		? pegawaiList.filter((p) => {
				const matchNik = !qNik || (p.nipam?.toLowerCase().includes(qNik) ?? false);
				const matchNama = !qNama || (p.nama?.toLowerCase().includes(qNama) ?? false);
				return matchNik && matchNama;
			})
		: [];

	// Group by organisasi
	const map = new Map<string, GajiBatchMasterResponse[]>();
	for (const p of filtered) {
		const org = p.namaOrganisasi ?? "Tanpa Organisasi";
		if (!map.has(org)) map.set(org, []);
		map.get(org)?.push(p);
	}
	const grouped = Array.from(map.entries());

	const groupStarts: number[] = [];
	{
		let acc = 0;
		for (const [, rows] of grouped) {
			groupStarts.push(acc + 1);
			acc += rows.length;
		}
	}

	const selectedPegawai = pegawaiList
		? (pegawaiList.find((p) => p.id === selectedBatchMasterId) ?? pegawaiList[0] ?? null)
		: null;

	const currentMonthLabel = MONTH_OPTIONS.find((m) => m.value === month)?.label.split(" - ")[1] ?? month;

	return (
		<div className="flex flex-col gap-4">
			{/* Title Header */}
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">03. Tambah Komponen Gaji</h1>
				<p className="text-sm text-muted-foreground">Kelola penambahan dan pemotongan komponen gaji per pegawai</p>
			</div>

			{/* Filter & Action Toolbar (mirip verifikasi) */}
			<div className="rounded-lg border bg-card p-3 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
				<div className="flex flex-wrap items-center gap-2">
					<span className="text-xs font-semibold text-foreground mr-1">
						Periode Gaji:<span className="text-destructive ml-0.5">*</span>
					</span>
					<Select
						value={month}
						onValueChange={(m) => {
							if (m) {
								setMonth(m);
								setSelectedBatchMasterId(null);
							}
						}}
					>
						<SelectTrigger className="w-36 h-9 text-xs" aria-label="Pilih Bulan">
							<SelectValue placeholder="Bulan" />
						</SelectTrigger>
						<SelectContent>
							{MONTH_OPTIONS.map((m) => (
								<SelectItem key={m.value} value={m.value} className="text-xs">
									{m.label.split(" - ")[1]}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={year}
						onValueChange={(y) => {
							if (y) {
								setYear(y);
								setSelectedBatchMasterId(null);
							}
						}}
					>
						<SelectTrigger className="w-24 h-9 text-xs" aria-label="Pilih Tahun">
							<SelectValue placeholder="Tahun" />
						</SelectTrigger>
						<SelectContent>
							{years.map((y) => (
								<SelectItem key={y} value={y} className="text-xs">
									{y}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="flex flex-wrap items-center gap-2 justify-end">
					{batch && (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger
									disabled={!canEdit}
									className={cn(
										"inline-flex items-center justify-center gap-1.5 rounded-md px-3 h-9 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50",
									)}
								>
									Komponen Gaji
									<ChevronDown className="size-3.5" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="w-52">
									<DropdownMenuItem onClick={handleDownloadTemplate} className="cursor-pointer gap-2">
										<Download className="size-3.5 text-muted-foreground" />
										Download Template
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setUploadDialogOpen(true)} className="cursor-pointer gap-2">
										<Upload className="size-3.5 text-muted-foreground" />
										Upload Potongan Gaji
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										variant="destructive"
										onClick={() => setRollbackDialogOpen(true)}
										className="cursor-pointer gap-2"
									>
										<RotateCcw className="size-3.5" />
										Batalkan Perubahan
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Button
								size="sm"
								onClick={handleVerify}
								disabled={!canEdit || verify1.isPending}
								className="gap-1.5 h-9 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
							>
								{verify1.isPending ? (
									<Loader2 className="size-3.5 animate-spin" />
								) : (
									<ShieldCheck className="size-3.5" />
								)}
								Verifikasi
							</Button>

							<Button
								variant="destructive"
								size="sm"
								onClick={handleReprocess}
								disabled={!canEdit || reprocess.isPending}
								className="gap-1.5 h-9 text-xs"
							>
								{reprocess.isPending ? (
									<Loader2 className="size-3.5 animate-spin" />
								) : (
									<RefreshCw className="size-3.5" />
								)}
								Proses Ulang
							</Button>
						</>
					)}
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
					{/* Panel Kiri: Tabel Utama Pegawai */}
					<div className="flex-1 min-w-0 w-full rounded-lg border bg-card shadow-xs flex flex-col p-2">
						{/* Table Header Controls */}
						<div className="p-3 border-b flex flex-wrap items-center justify-between gap-2 bg-muted/20">
							<div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
								<span>Tambah Komponen Gaji [Periode</span>
								<span className="text-primary font-bold">
									{currentMonthLabel} {year}
								</span>
								<span>]</span>
							</div>

							<div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
								<div className="relative">
									<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
									<Input
										value={searchNik}
										onChange={(e) => setSearchNik(e.target.value)}
										placeholder="Cari NIK..."
										className="pl-8 h-8 text-xs w-28 sm:w-32"
									/>
								</div>
								<div className="relative">
									<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
									<Input
										value={searchNama}
										onChange={(e) => setSearchNama(e.target.value)}
										placeholder="Cari Nama Pegawai..."
										className="pl-8 h-8 text-xs w-36 sm:w-48"
									/>
								</div>
								{(searchNik || searchNama) && (
									<Button
										variant="ghost"
										size="icon"
										onClick={() => {
											setSearchNik("");
											setSearchNama("");
										}}
										className="size-8 text-muted-foreground hover:text-foreground"
										title="Reset Pencarian"
									>
										<RotateCcw className="size-3.5" />
									</Button>
								)}
							</div>
						</div>

						{/* Scrollable Data Table */}
						<div className="max-h-160 overflow-auto border-b">
							{isMasterPending ? (
								<div className="p-4 space-y-2">
									{[1, 2, 3, 4, 5].map((i) => (
										<Skeleton key={i} className="h-10 w-full" />
									))}
								</div>
							) : grouped.length === 0 ? (
								<div className="p-12 text-center text-sm text-muted-foreground">
									{searchNik || searchNama ? "Tidak ada pegawai yang cocok dengan pencarian" : "Belum ada data pegawai"}
								</div>
							) : (
								<table className="w-full text-xs text-left border-collapse">
									<thead className="sticky top-0 z-10 bg-primary text-primary-foreground font-semibold shadow-xs">
										<tr>
											<th className="py-2.5 px-2 text-center w-10 border-r border-primary-foreground/20">No</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">NIK</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Nama Pegawai</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Jabatan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Penghasilan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Potongan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pembulatan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Jml. Gaji</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Peng. Tambahan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pot. Tambahan</th>
											<th className="py-2.5 px-2.5 text-right">Jml. Gaji Final</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{grouped.map(([org, rows], groupIdx) => (
											<OrganisasiTableGroup
												key={org}
												orgName={org}
												rows={rows}
												startNum={groupStarts[groupIdx]}
												selectedBatchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
												onSelectRow={(id) => setSelectedBatchMasterId(id)}
											/>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>

					{/* Panel Kanan: Rincian Gaji */}
					<div className="w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-xs sticky top-4">
						<div className="p-3 border-b bg-muted/20 flex items-center justify-between">
							<h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Rincian Gaji</h2>
							{selectedPegawai && (
								<span className="text-[11px] text-muted-foreground truncate max-w-44" title={selectedPegawai.nama}>
									{selectedPegawai.nama}
								</span>
							)}
						</div>

						<RincianGajiPanel
							batchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
							canEdit={canEdit}
							onDataChange={() => {
								refetchBatch();
								refetchMaster();
							}}
						/>
					</div>
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
							Tindakan ini akan mengembalikan data ke kondisi awal.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={rollbackMutation.isPending}>Tutup</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => rollbackMutation.mutate()}
							disabled={rollbackMutation.isPending}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{rollbackMutation.isPending && <Loader2 className="size-3.5 animate-spin mr-1" />}
							Ya, Batalkan
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
