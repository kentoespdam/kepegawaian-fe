"use client";

import { useQuery } from "@tanstack/react-query";
import { Download, Loader2, RefreshCw, RotateCcw, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { cn, fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type {
	GajiBatchMasterProsesResponse,
	GajiBatchMasterResponse,
	GajiBatchRootResponse,
} from "@/types/penggajian/batch";
import { getYearOptions, MONTH_OPTIONS } from "../_components/periode-filter";

interface PegawaiRow {
	id: number;
	nipam?: string;
	nama?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	golongan?: string;
	jmlJiwa?: number;
	kodePajak?: string;
	penghasilanKotor?: number;
	totalPotongan?: number;
	pembulatan?: number;
	penghasilanBersihFinal?: number;
}

export function VerifikasiClient() {
	const now = new Date();
	const [year, setYear] = useState(String(now.getFullYear()));
	const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, "0"));
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);

	const periode = `${year}${month}`;
	const years = useMemo(() => getYearOptions(), []);

	// Fetch batch for period
	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const verify1 = useBatchAction(batchId, `${batchId}/verify1`);
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);

	// Fetch pegawai list in batch
	const {
		data: pegawaiList,
		isPending: isMasterPending,
		refetch: refetchMaster,
	} = useQuery<GajiBatchMasterResponse[]>({
		queryKey: penggajianKeys.batch.master(periode),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?periode=${periode}`);
			throwIfNotOk(res, "Gagal memuat daftar pegawai");
			const body = (await res.json()) as {
				data?: GajiBatchMasterResponse[] | { content?: GajiBatchMasterResponse[] };
				content?: GajiBatchMasterResponse[];
			};
			const raw = body.data ?? body;
			const items = Array.isArray(raw) ? raw : (raw?.content ?? []);
			return items as GajiBatchMasterResponse[];
		},
		enabled: !!periode,
		staleTime: 30_000,
	});

	// Filter pegawai by search query and group by organisasi
	const grouped = useMemo(() => {
		if (!pegawaiList) return [];
		const q = searchQuery.toLowerCase().trim();
		const filtered = q
			? pegawaiList.filter(
					(p) =>
						p.nama?.toLowerCase().includes(q) ||
						p.nipam?.toLowerCase().includes(q) ||
						p.namaJabatan?.toLowerCase().includes(q) ||
						p.namaOrganisasi?.toLowerCase().includes(q),
				)
			: pegawaiList;

		const map = new Map<string, PegawaiRow[]>();
		for (const p of filtered) {
			const org = p.namaOrganisasi ?? "Tanpa Organisasi";
			if (!map.has(org)) map.set(org, []);
			map.get(org)?.push({
				id: p.id ?? 0,
				nipam: p.nipam,
				nama: p.nama,
				namaOrganisasi: p.namaOrganisasi,
				namaJabatan: p.namaJabatan,
				golongan: p.golongan,
				jmlJiwa: p.jmlJiwa,
				kodePajak: p.kodePajak,
				penghasilanKotor: p.penghasilanKotor,
				totalPotongan: p.totalPotongan,
				pembulatan: p.pembulatan,
				penghasilanBersihFinal: p.penghasilanBersihFinal,
			});
		}
		return Array.from(map.entries());
	}, [pegawaiList, searchQuery]);

	// Auto select first pegawai if none selected or selection not found
	const selectedPegawai = useMemo(() => {
		if (!pegawaiList || pegawaiList.length === 0) return null;
		if (selectedBatchMasterId) {
			const found = pegawaiList.find((p) => p.id === selectedBatchMasterId);
			if (found) return found;
		}
		return pegawaiList[0];
	}, [pegawaiList, selectedBatchMasterId]);

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

	const currentMonthLabel = useMemo(() => {
		const found = MONTH_OPTIONS.find((m) => m.value === month);
		return found ? found.label.split(" - ")[1] : month;
	}, [month]);

	let rowCounter = 0;

	return (
		<div className="flex flex-col gap-4">
			{/* Header Title */}
			<div>
				<h1 className="text-xl font-bold tracking-tight text-foreground">
					02. Verifikasi Gapok, Tunjangan &amp; Potongan
				</h1>
				<p className="text-sm text-muted-foreground">Verifikasi rincian penghasilan dan potongan pegawai</p>
			</div>

			{/* Filter & Action Toolbar */}
			<div className="rounded-lg border bg-card p-3 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
				{/* Left side: Periode Filter */}
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

				{/* Right side: Actions */}
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
					{/* Panel Kiri: Tabel Utama Pegawai (Master) */}
					<div className="flex-1 min-w-0 w-full rounded-lg border bg-card shadow-xs flex flex-col p-2">
						{/* Table Header Controls */}
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
										{grouped.map(([org, rows]) => (
											<OrganisasiTableGroup
												key={org}
												orgName={org}
												rows={rows}
												selectedBatchMasterId={selectedBatchMasterId ?? selectedPegawai?.id ?? null}
												onSelectRow={(id) => setSelectedBatchMasterId(id)}
												getStartNumber={() => {
													const start = rowCounter + 1;
													rowCounter += rows.length;
													return start;
												}}
											/>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>

					{/* Panel Kanan: Rincian Gaji (Detail Komponen) */}
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

interface OrganisasiTableGroupProps {
	orgName: string;
	rows: PegawaiRow[];
	selectedBatchMasterId: number | null;
	onSelectRow: (id: number) => void;
	getStartNumber: () => number;
}

function OrganisasiTableGroup({
	orgName,
	rows,
	selectedBatchMasterId,
	onSelectRow,
	getStartNumber,
}: OrganisasiTableGroupProps) {
	let currentNum = getStartNumber();

	return (
		<>
			<tr className="bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide">
				<td colSpan={11} className="py-2 px-3 border-y border-primary/20">
					{orgName}
				</td>
			</tr>
			{rows.map((row) => {
				const num = currentNum++;
				const isSelected = selectedBatchMasterId === row.id;
				return (
					<tr
						key={row.id}
						onClick={() => onSelectRow(row.id)}
						className={cn(
							"cursor-pointer transition-colors text-xs border-b border-border/60",
							isSelected
								? "bg-primary/15 font-medium text-foreground"
								: "hover:bg-accent/40 text-foreground/90 odd:bg-card even:bg-muted/20",
						)}
					>
						<td className="py-2 px-2 text-center text-muted-foreground font-mono">{num}</td>
						<td className="py-2 px-2.5 font-mono text-[11px]">{row.nipam ?? "-"}</td>
						<td className="py-2 px-2.5 font-medium">{row.nama ?? "-"}</td>
						<td className="py-2 px-2 text-center">{row.golongan ?? "-"}</td>
						<td className="py-2 px-2.5 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
						<td className="py-2 px-2 text-center tabular-nums">{row.jmlJiwa ?? 0}</td>
						<td className="py-2 px-2 text-center text-muted-foreground">{row.kodePajak ?? "-"}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanKotor)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.totalPotongan)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.pembulatan)}</td>
						<td className="py-2 px-2.5 text-right tabular-nums font-semibold text-primary">
							{fmtRupiah(row.penghasilanBersihFinal)}
						</td>
					</tr>
				);
			})}
		</>
	);
}

function PegawaiDetailKomponenPanel({ batchMasterId }: { batchMasterId: number }) {
	const { data: prosesList, isPending } = useQuery<GajiBatchMasterProsesResponse[]>({
		queryKey: penggajianKeys.batch.pegawaiProses(String(batchMasterId)),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${batchMasterId}/master`);
			throwIfNotOk(res, "Gagal memuat rincian komponen gaji");
			const body = (await res.json()) as { data: GajiBatchMasterProsesResponse[] };
			return body.data;
		},
		enabled: !!batchMasterId,
		staleTime: 30_000,
	});

	if (isPending) {
		return (
			<div className="p-4 space-y-3">
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
			</div>
		);
	}

	const penghasilanList = (prosesList ?? []).filter((k) => k.jenisGaji === "PEMASUKAN");
	const potonganList = (prosesList ?? []).filter((k) => k.jenisGaji === "POTONGAN");

	const totalPenghasilan = penghasilanList.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);
	const totalPotongan = potonganList.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);

	return (
		<div className="p-3 space-y-4 max-h-[600px] overflow-y-auto">
			{/* Seksi 1: Penghasilan */}
			<div className="space-y-1.5">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
					Jenis: Penghasilan
				</div>
				<div className="border rounded-md overflow-hidden bg-card text-xs">
					<table className="w-full border-collapse">
						<thead className="bg-primary text-primary-foreground font-semibold">
							<tr>
								<th className="py-1.5 px-2 text-center w-8 border-r border-primary-foreground/20">No</th>
								<th className="py-1.5 px-2 border-r border-primary-foreground/20 text-left">Komponen Gaji</th>
								<th className="py-1.5 px-2 text-right">Jumlah</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{penghasilanList.length === 0 ? (
								<tr>
									<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
										Tidak ada komponen penghasilan
									</td>
								</tr>
							) : (
								penghasilanList.map((item, idx) => (
									<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
										<td className="py-1.5 px-2 text-center text-muted-foreground">{idx + 1}</td>
										<td className="py-1.5 px-2 font-medium text-foreground">{item.nama ?? "-"}</td>
										<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
									</tr>
								))
							)}
						</tbody>
						{penghasilanList.length > 0 && (
							<tfoot className="border-t-2 border-border font-bold bg-primary/10 text-primary">
								<tr>
									<td colSpan={2} className="py-1.5 px-2 text-right">
										Total
									</td>
									<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(totalPenghasilan)}</td>
								</tr>
							</tfoot>
						)}
					</table>
				</div>
			</div>

			{/* Seksi 2: Potongan */}
			<div className="space-y-1.5">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Jenis: Potongan</div>
				<div className="border rounded-md overflow-hidden bg-card text-xs">
					<table className="w-full border-collapse">
						<thead className="bg-primary text-primary-foreground font-semibold">
							<tr>
								<th className="py-1.5 px-2 text-center w-8 border-r border-primary-foreground/20">No</th>
								<th className="py-1.5 px-2 border-r border-primary-foreground/20 text-left">Komponen Gaji</th>
								<th className="py-1.5 px-2 text-right">Jumlah</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{potonganList.length === 0 ? (
								<tr>
									<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
										Tidak ada komponen potongan
									</td>
								</tr>
							) : (
								potonganList.map((item, idx) => (
									<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
										<td className="py-1.5 px-2 text-center text-muted-foreground">{idx + 1}</td>
										<td className="py-1.5 px-2 font-medium text-foreground">{item.nama ?? "-"}</td>
										<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
									</tr>
								))
							)}
						</tbody>
						{potonganList.length > 0 && (
							<tfoot className="border-t-2 border-border font-bold bg-primary/10 text-primary">
								<tr>
									<td colSpan={2} className="py-1.5 px-2 text-right">
										Total
									</td>
									<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(totalPotongan)}</td>
								</tr>
							</tfoot>
						)}
					</table>
				</div>
			</div>
		</div>
	);
}
