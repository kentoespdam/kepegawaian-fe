"use client";

import { Download, Loader2, RefreshCw, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterList } from "@/hooks/penggajian/useBatchMasterList";
import { useVerifikasiFilters } from "@/hooks/penggajian/useVerifikasiFilters";
import type { GajiBatchMasterResponse, GajiBatchRootResponse } from "@/types/penggajian/batch";
import { MONTH_OPTIONS } from "../_components/periode-filter";
import { PegawaiDetailKomponenPanel } from "./_components/detail-panel";
import { OrganisasiTableGroup } from "./_components/organisasi-table-group";

export function VerifikasiClient() {
	const { year, setYear, month, setMonth, periode, years } = useVerifikasiFilters();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);

	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const verify1 = useBatchAction(batchId, `${batchId}/verify1`);
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);

	const { data: pegawaiList, isPending: isMasterPending, refetch: refetchMaster } = useBatchMasterList(periode);

	const q = searchQuery.toLowerCase().trim();
	const filtered = pegawaiList
		? q
			? pegawaiList.filter(
					(p) =>
						p.nama?.toLowerCase().includes(q) ||
						p.nipam?.toLowerCase().includes(q) ||
						p.namaJabatan?.toLowerCase().includes(q) ||
						p.namaOrganisasi?.toLowerCase().includes(q),
				)
			: pegawaiList
		: [];

	// Group by organisasi (Map merges same-name units into one group)
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

	const handleDownload = () => {
		if (!batchId) return;
		window.open(`/api/proxy/penggajian/batch/master/download/table-gaji/${batchId}`, "_blank");
	};

	const canVerify = batch?.status === "WAIT_VERIFICATION_PHASE_1";

	const currentMonthLabel = MONTH_OPTIONS.find((m) => m.value === month)?.label.split(" - ")[1] ?? month;

	return (
		<div className="flex flex-col gap-4">
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">
					02. Verifikasi Gapok, Tunjangan &amp; Potongan
				</h1>
				<p className="text-sm text-muted-foreground">Verifikasi rincian penghasilan dan potongan pegawai</p>
			</div>

			{/* Filter & Action Toolbar */}
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
					<Button
						variant="outline"
						size="sm"
						onClick={handleDownload}
						disabled={!batchId}
						className="gap-1.5 h-9 text-xs"
					>
						<Download className="size-3.5" />
						Download
					</Button>
					<Button
						size="sm"
						onClick={handleVerify}
						disabled={!canVerify || verify1.isPending}
						className="gap-1.5 h-9 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
					>
						{verify1.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <ShieldCheck className="size-3.5" />}
						Verifikasi
					</Button>
					<Button
						variant="destructive"
						size="sm"
						onClick={handleReprocess}
						disabled={!batchId || reprocess.isPending}
						className="gap-1.5 h-9 text-xs"
					>
						{reprocess.isPending ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
						Proses Ulang
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
					{/* Tabel Utama Pegawai */}
					<div className="flex-1 min-w-0 w-full rounded-lg border bg-card shadow-xs flex flex-col p-2">
						<div className="p-3 border-b flex flex-wrap items-center justify-between gap-2 bg-muted/20">
							<div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
								<span>Gaji [Periode</span>
								<span className="text-primary font-bold">
									{currentMonthLabel} {year}
								</span>
								<span>]</span>
							</div>

							<div className="flex items-center gap-2 w-full sm:w-auto">
								<div className="relative w-full sm:w-60">
									<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
									<Input
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										placeholder="Cari Nama Pegawai..."
										className="pl-8 h-8 text-xs"
									/>
								</div>
								{searchQuery && (
									<Button
										variant="ghost"
										size="icon"
										onClick={() => setSearchQuery("")}
										className="size-8 text-muted-foreground hover:text-foreground"
										title="Reset Pencarian"
									>
										<RotateCcw className="size-3.5" />
									</Button>
								)}
							</div>
						</div>

						<div className="max-h-160 overflow-auto border-b">
							{isMasterPending ? (
								<div className="p-4 space-y-2">
									{[1, 2, 3, 4, 5].map((i) => (
										<Skeleton key={i} className="h-10 w-full" />
									))}
								</div>
							) : grouped.length === 0 ? (
								<div className="p-12 text-center text-sm text-muted-foreground">
									{searchQuery ? "Tidak ada pegawai yang cocok dengan kata kunci pencarian" : "Belum ada data pegawai"}
								</div>
							) : (
								<table className="w-full text-xs text-left border-collapse">
									<thead className="sticky top-0 z-10 bg-primary text-primary-foreground font-semibold shadow-xs">
										<tr>
											<th className="py-2.5 px-2 text-center w-10 border-r border-primary-foreground/20">No</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">NIK</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Nama Pegawai</th>
											<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">Golongan</th>
											<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Jabatan</th>
											<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">Jiwa</th>
											<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">PTKP</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Penghasilan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Potongan</th>
											<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pembulatan</th>
											<th className="py-2.5 px-2.5 text-right">Net. Gaji</th>
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

					{/* Panel Rincian Gaji */}
					<div className="w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-xs overflow-hidden sticky top-4">
						<div className="p-3 border-b bg-muted/20 flex items-center justify-between">
							<h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Rincian Gaji</h2>
							{selectedPegawai && (
								<span className="text-[11px] text-muted-foreground truncate max-w-44" title={selectedPegawai.nama}>
									{selectedPegawai.nama}
								</span>
							)}
						</div>

						{selectedBatchMasterId || selectedPegawai ? (
							<PegawaiDetailKomponenPanel batchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? 0} />
						) : (
							<div className="p-8 text-center text-xs text-muted-foreground">
								Klik salah satu baris pegawai pada tabel di kiri untuk melihat rincian gaji.
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
