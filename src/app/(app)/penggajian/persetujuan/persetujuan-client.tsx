"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Download, Loader2, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterResponse, GajiBatchRootResponse } from "@/types/penggajian/batch";
import { BatchInfoCard } from "../_components/batch-info-card";
import { PeriodeFilter } from "../_components/periode-filter";

interface PegawaiRow {
	id: number;
	nipam?: string;
	nama?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	golongan?: string;
	penghasilanKotor?: number;
	totalPotongan?: number;
	pembulatan?: number;
	penghasilanBersihFinal?: number;
}

const ORG_HEADER_CLASS = "bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-2";

export function PersetujuanClient() {
	const now = new Date();
	const [year, setYear] = useState(String(now.getFullYear()));
	const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, "0"));
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawaiId, setSelectedPegawaiId] = useState<string | null>(null);

	const periode = `${year}${month}`;

	// Fetch batch for period
	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batch: GajiBatchRootResponse | undefined = batches?.content?.[0];

	const batchId = batch?.id ?? "";
	const verify2 = useBatchAction(batchId, `${batchId}/verify2`);
	const accept = useBatchAction(batchId, `${batchId}/accept`);
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);
	const kirimSlip = useBatchAction(batchId, `master/upload/${batchId}`);

	const canAct = batch?.status === "WAIT_APPROVAL";

	// Fetch pegawai list in batch
	const {
		data: pegawaiList,
		isPending: isMasterPending,
		refetch: refetchMaster,
	} = useQuery<GajiBatchMasterResponse[]>({
		queryKey: penggajianKeys.batch.master(batchId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?periode=${periode}`);
			throwIfNotOk(res, "Gagal memuat daftar pegawai");
			const body = (await res.json()) as { data: GajiBatchMasterResponse[] };
			return body.data;
		},
		enabled: !!batchId,
		staleTime: 30_000,
	});

	// Filter pegawai by search query and group by organisasi
	const grouped = (() => {
		if (!pegawaiList) return [];
		const q = searchQuery.toLowerCase().trim();
		const filtered = q
			? pegawaiList.filter(
					(p) =>
						p.nama?.toLowerCase().includes(q) ||
						p.nipam?.toLowerCase().includes(q) ||
						p.namaJabatan?.toLowerCase().includes(q),
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
				penghasilanKotor: p.penghasilanKotor,
				totalPotongan: p.totalPotongan,
				pembulatan: p.pembulatan,
				penghasilanBersihFinal: p.penghasilanBersihFinal,
			});
		}
		return Array.from(map.entries());
	})();

	const withLoading = async (fn: () => Promise<void>, label: string) => {
		try {
			await fn();
			toast.success(label);
			refetchBatch();
			refetchMaster();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : `Gagal: ${label}`);
		}
	};

	const handleDownload = (type: "table-gaji" | "potongan-gaji") => {
		if (!batchId) return;
		window.location.href = `/api/proxy/penggajian/batch/master/download/${type}/${batchId}`;
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-xl font-bold text-foreground">04. Persetujuan Akhir</h1>
					<p className="text-sm text-muted-foreground">Tinjau rekapitulasi penggajian, setujui, dan kirim slip gaji</p>
				</div>
				{batch && (
					<div className="flex items-center flex-wrap gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								refetchBatch();
								refetchMaster();
							}}
							className="gap-1.5"
						>
							<RefreshCw className="size-4" /> Tampilkan
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={!canAct || verify2.isPending}
							onClick={() => withLoading(() => verify2.mutateAsync(), "Verifikasi tahap 2 berhasil")}
							className="gap-1.5"
						>
							{verify2.isPending ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
							Verifikasi
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={!canAct || reprocess.isPending}
							onClick={() => withLoading(() => reprocess.mutateAsync(), "Proses ulang berhasil")}
							className="gap-1.5"
						>
							{reprocess.isPending ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
							Proses Ulang
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={!canAct || kirimSlip.isPending}
							onClick={() => withLoading(() => kirimSlip.mutateAsync(), "Slip gaji berhasil dikirim")}
							className="gap-1.5"
						>
							{kirimSlip.isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
							Kirim Slip Gaji
						</Button>
						<Button variant="outline" size="sm" onClick={() => handleDownload("table-gaji")} className="gap-1.5">
							<Download className="size-4" /> Table Gaji
						</Button>
						<Button variant="outline" size="sm" onClick={() => handleDownload("potongan-gaji")} className="gap-1.5">
							<Download className="size-4" /> Potongan Gaji
						</Button>
						<Button
							size="sm"
							disabled={!canAct || accept.isPending}
							onClick={() => withLoading(() => accept.mutateAsync(), "Persetujuan akhir berhasil")}
							className="gap-1.5"
						>
							{accept.isPending ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle className="size-4" />}
							Setujui
						</Button>
					</div>
				)}
			</div>

			<PeriodeFilter
				year={year}
				month={month}
				onYearChange={(y) => {
					setYear(y);
					setSelectedPegawaiId(null);
				}}
				onMonthChange={(m) => {
					setMonth(m);
					setSelectedPegawaiId(null);
				}}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				showSearch={!!batch}
			/>

			{isBatchPending ? (
				<div className="space-y-3">
					<Skeleton className="h-20 w-full rounded-lg" />
					<Skeleton className="h-64 w-full rounded-lg" />
				</div>
			) : !batch ? (
				<div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
					<p className="text-base font-semibold">Belum ada proses gaji untuk periode ini</p>
					<p className="text-sm mt-1 text-muted-foreground/80">
						Silakan buat proses gaji baru pada menu 01. Proses Gaji Bulanan untuk periode {periode}.
					</p>
				</div>
			) : (
				<>
					<BatchInfoCard batch={batch} />

					{/* Executive Table */}
					<div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b bg-muted/50">
									<th className="text-left px-3 py-2 font-medium">NIK/NIPAM</th>
									<th className="text-left px-3 py-2 font-medium">Nama</th>
									<th className="text-left px-3 py-2 font-medium">Jabatan</th>
									<th className="text-right px-3 py-2 font-medium">Penghasilan</th>
									<th className="text-right px-3 py-2 font-medium">Potongan</th>
									<th className="text-right px-3 py-2 font-medium">Pembulatan</th>
									<th className="text-right px-3 py-2 font-medium">Jumlah Bersih</th>
								</tr>
							</thead>
							<tbody>
								{isMasterPending ? (
									[1, 2, 3].map((i) => (
										<tr key={i} className="border-b">
											<td colSpan={7} className="px-3 py-2">
												<Skeleton className="h-6 w-full" />
											</td>
										</tr>
									))
								) : grouped.length === 0 ? (
									<tr>
										<td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
											{searchQuery ? "Tidak ada data yang cocok dengan pencarian" : "Belum ada data"}
										</td>
									</tr>
								) : (
									grouped.map(([org, rows]) => {
										const subtotal = rows.reduce(
											(acc, r) => ({
												penghasilan: acc.penghasilan + Number(r.penghasilanKotor ?? 0),
												potongan: acc.potongan + Number(r.totalPotongan ?? 0),
												bersih: acc.bersih + Number(r.penghasilanBersihFinal ?? 0),
											}),
											{ penghasilan: 0, potongan: 0, bersih: 0 },
										);

										return (
											<Fragment key={org}>
												<tr>
													<td colSpan={7} className={ORG_HEADER_CLASS}>
														{org}
													</td>
												</tr>
												{rows.map((row) => (
													<tr
														key={row.id}
														className={`border-b cursor-pointer transition-colors ${
															selectedPegawaiId === String(row.id) ? "bg-primary/10" : "hover:bg-accent/50"
														}`}
														onClick={() => setSelectedPegawaiId(String(row.id))}
													>
														<td className="px-3 py-2 font-mono text-xs">{row.nipam}</td>
														<td className="px-3 py-2 font-medium">{row.nama}</td>
														<td className="px-3 py-2 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
														<td className="px-3 py-2 text-right">{fmtRupiah(row.penghasilanKotor)}</td>
														<td className="px-3 py-2 text-right">{fmtRupiah(row.totalPotongan)}</td>
														<td className="px-3 py-2 text-right">{fmtRupiah(row.pembulatan)}</td>
														<td className="px-3 py-2 text-right font-medium">{fmtRupiah(row.penghasilanBersihFinal)}</td>
													</tr>
												))}
												<tr className="border-b bg-muted/30 font-semibold text-xs">
													<td colSpan={3} className="px-3 py-2 text-right">
														Subtotal {rows.length} Pegawai
													</td>
													<td className="px-3 py-2 text-right text-primary">{fmtRupiah(subtotal.penghasilan)}</td>
													<td className="px-3 py-2 text-right">{fmtRupiah(subtotal.potongan)}</td>
													<td className="px-3 py-2 text-right">-</td>
													<td className="px-3 py-2 text-right text-emerald-600">{fmtRupiah(subtotal.bersih)}</td>
												</tr>
											</Fragment>
										);
									})
								)}
							</tbody>
						</table>
					</div>

					{/* Detail Panel */}
					{selectedPegawaiId && (
						<div className="rounded-lg border bg-card shadow-sm p-4">
							<PegawaiDetailPanel pegawaiId={selectedPegawaiId} />
						</div>
					)}
				</>
			)}
		</div>
	);
}

function PegawaiDetailPanel({ pegawaiId }: { pegawaiId: string }) {
	const { data: komponen, isPending } = useQuery({
		queryKey: penggajianKeys.batch.pegawai(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			throwIfNotOk(res, "Gagal memuat data rincian pegawai");
			const body = (await res.json()) as { data: GajiBatchMasterResponse };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	if (isPending) return <Skeleton className="h-32 w-full" />;
	if (!komponen) return <p className="text-sm text-muted-foreground">Data tidak ditemukan</p>;

	return (
		<div className="space-y-3">
			<div>
				<h3 className="font-semibold text-base">{komponen.nama}</h3>
				<p className="text-xs text-muted-foreground">
					{komponen.nipam} • {komponen.namaJabatan ?? "-"} • {komponen.golongan ?? "-"}
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				<div className="space-y-2 rounded-md border p-3 bg-muted/20">
					<h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Penghasilan</h4>
					<div className="flex justify-between">
						<span>Gaji Pokok</span>
						<span className="font-medium">{fmtRupiah(komponen.gajiPokok)}</span>
					</div>
					<div className="flex justify-between">
						<span>PHDP</span>
						<span className="font-medium">{fmtRupiah(komponen.phdp)}</span>
					</div>
					<div className="flex justify-between border-t pt-2 font-semibold">
						<span>Total Kotor</span>
						<span className="text-primary">{fmtRupiah(komponen.penghasilanKotor)}</span>
					</div>
				</div>
				<div className="space-y-2 rounded-md border p-3 bg-muted/20">
					<h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Potongan</h4>
					<div className="flex justify-between">
						<span>Total Potongan</span>
						<span className="font-medium">{fmtRupiah(komponen.totalPotongan)}</span>
					</div>
					<div className="flex justify-between">
						<span>Pajak</span>
						<span className="font-medium">{fmtRupiah(komponen.pajak)}</span>
					</div>
					<div className="flex justify-between border-t pt-2 font-semibold">
						<span>Penghasilan Bersih</span>
						<span className="text-emerald-600">{fmtRupiah(komponen.penghasilanBersihFinal)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
