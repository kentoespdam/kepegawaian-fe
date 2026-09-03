"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useBatchMasterProses } from "@/hooks/penggajian/useBatchMasterProses";
import { penggajianApi } from "@/lib/api/penggajian-client";
import { fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterResponse, GajiBatchRootResponse } from "@/types/penggajian/batch";
import { BatchInfoCard } from "../_components/batch-info-card";
import { PeriodeFilter } from "../_components/periode-filter";
import { TambahanDialog } from "./_components/tambah-komponen-dialog";

interface PegawaiRow {
	id: number;
	nipam?: string;
	nama?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	golongan?: string;
}

const ORG_HEADER_CLASS = "bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-2";

export function TambahanClient() {
	const now = new Date();
	const [year, setYear] = useState(String(now.getFullYear()));
	const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, "0"));
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawaiId, setSelectedPegawaiId] = useState<string | null>(null);

	const periode = `${year}${month}`;

	// Fetch batch for period
	const { data: batches, isPending: isBatchPending, refetch: refetchBatch } = useBatchList({ periode });
	const batchList = Array.isArray(batches) ? batches : (batches?.content ?? []);
	const batch: GajiBatchRootResponse | undefined = batchList[0];

	const batchId = batch?.id ?? "";
	const reprocess = useBatchAction(batchId, `${batchId}/reprocess`);

	// Fetch pegawai list in batch
	const {
		data: pegawaiList,
		isPending: isMasterPending,
		refetch: refetchMaster,
	} = useQuery<GajiBatchMasterResponse[]>({
		queryKey: penggajianKeys.batch.master(batchId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?gajiBatchRootId=${batchId}`);
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
			});
		}
		return Array.from(map.entries());
	})();

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

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-xl font-bold text-foreground">03. Tambah Komponen Gaji</h1>
					<p className="text-sm text-muted-foreground">Kelola penambahan komponen gaji di luar sistem per pegawai</p>
				</div>
				{batch && (
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={handleReprocess}
							disabled={reprocess.isPending}
							className="gap-1.5"
						>
							{reprocess.isPending ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
							Proses Ulang
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

					<div className="flex flex-col lg:flex-row gap-4">
						{/* Panel Kiri: Daftar Pegawai */}
						<div className="w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-sm flex flex-col">
							<div className="p-4 border-b border-border">
								<h2 className="text-sm font-semibold">Daftar Pegawai</h2>
								<p className="text-xs text-muted-foreground">
									{batch.totalPegawai ?? 0} pegawai
									{searchQuery && ` (filter: "${searchQuery}")`}
								</p>
							</div>
							<div className="max-h-150 overflow-y-auto">
								{isMasterPending ? (
									<div className="p-4 space-y-2">
										{[1, 2, 3].map((i) => (
											<Skeleton key={i} className="h-12 w-full" />
										))}
									</div>
								) : grouped.length === 0 ? (
									<div className="p-4 text-center text-sm text-muted-foreground">
										{searchQuery ? "Tidak ada pegawai yang cocok" : "Belum ada data pegawai"}
									</div>
								) : (
									grouped.map(([org, rows]) => (
										<div key={org}>
											<div className={ORG_HEADER_CLASS}>{org}</div>
											{rows.map((row) => (
												<button
													key={row.id}
													type="button"
													onClick={() => setSelectedPegawaiId(String(row.id))}
													className={`w-full text-left px-3 py-2 border-b border-border text-sm transition-colors cursor-pointer ${
														selectedPegawaiId === String(row.id)
															? "bg-primary/10 text-primary font-medium"
															: "hover:bg-accent/50"
													}`}
												>
													<div className="font-medium">{row.nama}</div>
													<div className="text-xs text-muted-foreground">
														{row.nipam} • {row.namaJabatan ?? "-"}
													</div>
												</button>
											))}
										</div>
									))
								)}
							</div>
						</div>

						{/* Panel Kanan: Rincian Gaji & Komponen Tambahan */}
						<div className="flex-1 min-w-0">
							{selectedPegawaiId ? (
								<PegawaiTambahanPanel pegawaiId={selectedPegawaiId} />
							) : (
								<div className="flex items-center justify-center h-64 text-muted-foreground text-sm border rounded-lg bg-card">
									Pilih pegawai di panel kiri untuk mengelola komponen tambahan
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

function PegawaiTambahanPanel({ pegawaiId }: { pegawaiId: string }) {
	const qc = useQueryClient();
	const [dialogOpen, setDialogOpen] = useState(false);

	const { data: komponen, isPending: isKomponenPending } = useQuery({
		queryKey: penggajianKeys.batch.pegawai(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			throwIfNotOk(res, "Gagal memuat rincian gaji");
			const body = (await res.json()) as { data: GajiBatchMasterResponse };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	const { data: tambahanList, isPending: isTambahanPending } = useBatchMasterProses(pegawaiId);

	const createProses = useMutation({
		mutationFn: (data: { batchMasterId: number; nama: string; jenisGaji: string; nilai: number }) =>
			penggajianApi.create("batch/master/proses", data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.pegawaiProses(pegawaiId) });
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.pegawai(pegawaiId) });
			toast.success("Komponen tambahan berhasil ditambahkan");
		},
	});

	const deleteProses = useMutation({
		mutationFn: (id: number) => penggajianApi.remove("batch/master/proses", String(id)),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.pegawaiProses(pegawaiId) });
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.pegawai(pegawaiId) });
			toast.success("Komponen tambahan berhasil dihapus");
		},
	});

	if (isKomponenPending) {
		return (
			<div className="space-y-3">
				<Skeleton className="h-10 w-48" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (!komponen) {
		return <div className="text-center text-sm text-muted-foreground py-8">Data tidak ditemukan</div>;
	}

	return (
		<div className="rounded-lg border bg-card shadow-sm p-5 space-y-5">
			<div className="flex items-center justify-between border-b pb-3">
				<div>
					<h3 className="font-semibold text-base">{komponen.nama}</h3>
					<p className="text-xs text-muted-foreground">
						{komponen.nipam} • {komponen.namaJabatan ?? "-"}
					</p>
				</div>
				<Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1.5">
					<Plus className="size-4" />
					Tambah Komponen
				</Button>
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

			{/* Daftar Komponen Tambahan yang Sudah Ada */}
			<div className="space-y-3 pt-2">
				<h4 className="text-sm font-semibold text-foreground">Komponen Gaji Tambahan</h4>
				{isTambahanPending ? (
					<Skeleton className="h-20 w-full" />
				) : !tambahanList || tambahanList.length === 0 ? (
					<p className="text-xs text-muted-foreground italic">Belum ada komponen gaji tambahan untuk pegawai ini.</p>
				) : (
					<div className="rounded-md border divide-y text-sm">
						{tambahanList.map((item) => (
							<div key={item.id} className="flex items-center justify-between p-3">
								<div>
									<p className="font-medium">{item.nama}</p>
									<p className="text-xs text-muted-foreground">{item.jenisGaji ?? "-"}</p>
								</div>
								<div className="flex items-center gap-3">
									<span className="font-semibold">{fmtRupiah(item.nilai)}</span>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => item.id && deleteProses.mutate(item.id)}
										disabled={deleteProses.isPending}
										className="text-destructive hover:bg-destructive/10 size-8"
										aria-label="Hapus komponen"
									>
										<Trash2 className="size-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<TambahanDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSuccess={() => setDialogOpen(false)}
				isSubmitting={createProses.isPending}
				onSubmit={async (data) => {
					await createProses.mutateAsync({
						batchMasterId: Number(pegawaiId),
						nama: data.nama,
						jenisGaji: data.jenisGaji,
						nilai: data.nilai,
					});
				}}
			/>
		</div>
	);
}
