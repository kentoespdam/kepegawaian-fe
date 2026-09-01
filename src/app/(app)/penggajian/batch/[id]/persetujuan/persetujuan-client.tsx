"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Download, Loader2, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";

interface PegawaiRow {
	id: number;
	nipam?: string;
	nama?: string;
	namaJabatan?: string;
	golongan?: string;
	penghasilanKotor?: number;
	totalPotongan?: number;
	pembulatan?: number;
	penghasilanBersihFinal?: number;
}

const ORG_HEADER_CLASS = "bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-2";

export function PersetujuanClient() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const sp = useSearchParams();
	const selectedPegawaiId = sp.get("pegawaiId");

	const verify2 = useBatchAction(params.id, `${params.id}/verify2`);
	const accept = useBatchAction(params.id, `${params.id}/accept`);
	const reprocess = useBatchAction(params.id, `${params.id}/reprocess`);
	const kirimSlip = useBatchAction(params.id, `master/upload/${params.id}`);

	const { data: batch } = useQuery({
		queryKey: penggajianKeys.batch.detail(params.id),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/${params.id}`);
			throwIfNotOk(res, "Gagal memuat batch");
			const body = (await res.json()) as {
				data: { id: string; status: string; periode?: string; totalPegawai?: number };
			};
			return body.data;
		},
		staleTime: 30_000,
	});

	const canAct = batch?.status === "WAIT_APPROVAL";

	const {
		data: pegawaiList,
		isPending,
		refetch,
	} = useQuery<GajiBatchMasterResponse[]>({
		queryKey: penggajianKeys.batch.master(params.id),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?gajiBatchRootId=${params.id}`);
			throwIfNotOk(res, "Gagal memuat daftar pegawai");
			const body = (await res.json()) as { data: GajiBatchMasterResponse[] };
			return body.data;
		},
		staleTime: 30_000,
	});

	const grouped = (() => {
		if (!pegawaiList) return [];
		const map = new Map<string, PegawaiRow[]>();
		for (const p of pegawaiList) {
			const org = p.namaOrganisasi ?? "Tanpa Organisasi";
			if (!map.has(org)) map.set(org, []);
			map.get(org)?.push({
				id: p.id ?? 0,
				nipam: p.nipam,
				nama: p.nama,
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

	const handleSelectPegawai = (id: number) => {
		const p = new URLSearchParams(sp.toString());
		p.set("pegawaiId", String(id));
		router.replace(`/penggajian/batch/${params.id}/persetujuan?${p.toString()}`);
	};

	const withLoading = async (fn: () => Promise<void>, label: string) => {
		try {
			await fn();
			toast.success(label);
			refetch();
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : `Gagal: ${label}`);
		}
	};

	const handleDownload = (type: "table-gaji" | "potongan-gaji") => {
		window.location.href = `/api/proxy/penggajian/batch/master/download/${type}/${params.id}`;
	};

	return (
		<div className="flex flex-col gap-4">
			{/* Toolbar */}
			<div className="flex items-center justify-between flex-wrap gap-2">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => refetch()}>
						<RefreshCw className="size-4 mr-1" /> Tampilkan
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={!canAct || verify2.isPending}
						onClick={() => withLoading(() => verify2.mutateAsync(), "Verifikasi tahap 2 berhasil")}
					>
						{verify2.isPending ? (
							<Loader2 className="size-4 mr-1 animate-spin" />
						) : (
							<ShieldCheck className="size-4 mr-1" />
						)}
						Verifikasi
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={!canAct || reprocess.isPending}
						onClick={() => withLoading(() => reprocess.mutateAsync(), "Proses ulang berhasil")}
					>
						{reprocess.isPending ? (
							<Loader2 className="size-4 mr-1 animate-spin" />
						) : (
							<RefreshCw className="size-4 mr-1" />
						)}
						Proses Ulang
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={!canAct || kirimSlip.isPending}
						onClick={() => withLoading(() => kirimSlip.mutateAsync(), "Slip gaji berhasil dikirim")}
					>
						{kirimSlip.isPending ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Send className="size-4 mr-1" />}
						Kirim Slip Gaji
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" onClick={() => handleDownload("table-gaji")}>
						<Download className="size-4 mr-1" /> Table Gaji
					</Button>
					<Button variant="outline" size="sm" onClick={() => handleDownload("potongan-gaji")}>
						<Download className="size-4 mr-1" /> Potongan Gaji
					</Button>
					<Button
						size="sm"
						disabled={!canAct || accept.isPending}
						onClick={() =>
							withLoading(async () => {
								await accept.mutateAsync();
								router.push(`/penggajian/batch/${params.id}/persetujuan`);
							}, "Persetujuan berhasil")
						}
					>
						{accept.isPending ? (
							<Loader2 className="size-4 mr-1 animate-spin" />
						) : (
							<CheckCircle className="size-4 mr-1" />
						)}
						Setujui
					</Button>
				</div>
			</div>

			{/* Executive Table */}
			<div className="rounded-lg border bg-card shadow-sm overflow-x-auto">
				<table className="w-full text-sm">
					<thead>
						<tr className="border-b bg-muted/50">
							<th className="text-left px-3 py-2 font-medium">NIK</th>
							<th className="text-left px-3 py-2 font-medium">Nama</th>
							<th className="text-left px-3 py-2 font-medium">Jabatan</th>
							<th className="text-right px-3 py-2 font-medium">Penghasilan</th>
							<th className="text-right px-3 py-2 font-medium">Potongan</th>
							<th className="text-right px-3 py-2 font-medium">Pembulatan</th>
							<th className="text-right px-3 py-2 font-medium">Jumlah Bersih</th>
						</tr>
					</thead>
					<tbody>
						{isPending ? (
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
									Belum ada data
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
													selectedPegawaiId === String(row.id) ? "bg-primary/5" : "hover:bg-accent/50"
												}`}
												onClick={() => handleSelectPegawai(row.id)}
											>
												<td className="px-3 py-2">{row.nipam}</td>
												<td className="px-3 py-2 font-medium">{row.nama}</td>
												<td className="px-3 py-2 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
												<td className="px-3 py-2 text-right">{fmtRupiah(row.penghasilanKotor)}</td>
												<td className="px-3 py-2 text-right">{fmtRupiah(row.totalPotongan)}</td>
												<td className="px-3 py-2 text-right">{fmtRupiah(row.pembulatan)}</td>
												<td className="px-3 py-2 text-right font-medium">{fmtRupiah(row.penghasilanBersihFinal)}</td>
											</tr>
										))}
										<tr className="border-b bg-muted/30 font-medium">
											<td colSpan={3} className="px-3 py-2 text-right">
												Total {rows.length} Pegawai
											</td>
											<td className="px-3 py-2 text-right">{fmtRupiah(subtotal.penghasilan)}</td>
											<td className="px-3 py-2 text-right">{fmtRupiah(subtotal.potongan)}</td>
											<td className="px-3 py-2 text-right">-</td>
											<td className="px-3 py-2 text-right">{fmtRupiah(subtotal.bersih)}</td>
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
		</div>
	);
}

function PegawaiDetailPanel({ pegawaiId }: { pegawaiId: string }) {
	const { data: komponen, isPending } = useQuery({
		queryKey: penggajianKeys.batch.pegawai(pegawaiId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			throwIfNotOk(res, "Gagal memuat data");
			const body = (await res.json()) as { data: GajiBatchMasterResponse };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	if (isPending) return <Skeleton className="h-32 w-full" />;
	if (!komponen) return <p className="text-sm text-muted-foreground">Data tidak ditemukan</p>;

	return (
		<div>
			<div className="mb-3">
				<h3 className="font-semibold">{komponen.nama}</h3>
				<p className="text-sm text-muted-foreground">
					{komponen.nipam} • {komponen.namaJabatan ?? "-"}
				</p>
			</div>
			<div className="grid grid-cols-2 gap-4 text-sm">
				<div className="space-y-2">
					<h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">Penghasilan</h4>
					<div className="flex justify-between">
						<span>Gaji Pokok</span>
						<span className="font-medium">{fmtRupiah(komponen.gajiPokok)}</span>
					</div>
					<div className="flex justify-between">
						<span>PHDP</span>
						<span className="font-medium">{fmtRupiah(komponen.phdp)}</span>
					</div>
					<div className="flex justify-between border-t pt-2">
						<span className="font-semibold">Total Kotor</span>
						<span className="font-semibold">{fmtRupiah(komponen.penghasilanKotor)}</span>
					</div>
				</div>
				<div className="space-y-2">
					<h4 className="font-medium text-xs uppercase tracking-wide text-muted-foreground">Potongan</h4>
					<div className="flex justify-between">
						<span>Total Potongan</span>
						<span className="font-medium">{fmtRupiah(komponen.totalPotongan)}</span>
					</div>
					<div className="flex justify-between">
						<span>Pajak</span>
						<span className="font-medium">{fmtRupiah(komponen.pajak)}</span>
					</div>
					<div className="flex justify-between border-t pt-2">
						<span className="font-semibold">Penghasilan Bersih</span>
						<span className="font-semibold">{fmtRupiah(komponen.penghasilanBersihFinal)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
