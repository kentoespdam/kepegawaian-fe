"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2, ShieldCheck } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBatchContext } from "@/hooks/BatchContext";
import { useBatchAction } from "@/hooks/penggajian/useBatchAction";
import { fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";

interface PegawaiRow {
	id: number;
	nipam?: string;
	nama?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	golongan?: string;
}

const ORG_HEADER_CLASS = "bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-2";

export function Verifikasi1Client() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const sp = useSearchParams();
	const selectedPegawaiId = sp.get("pegawaiId");

	const { data: batch } = useBatchContext();
	const verify1 = useBatchAction(params.id, `${params.id}/verify1`);

	const { data: pegawaiList, isPending } = useQuery<GajiBatchMasterResponse[]>({
		queryKey: ["penggajian", "batch", params.id, "master"],
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
				namaOrganisasi: p.namaOrganisasi,
				namaJabatan: p.namaJabatan,
				golongan: p.golongan,
			});
		}
		return Array.from(map.entries());
	})();

	const handleSelectPegawai = (pegawaiId: number) => {
		const p = new URLSearchParams(sp.toString());
		p.set("pegawaiId", String(pegawaiId));
		router.replace(`/penggajian/batch/${params.id}/verifikasi-1?${p.toString()}`);
	};

	const handleVerify = async () => {
		try {
			await verify1.mutateAsync();
			toast.success("Verifikasi tahap 1 berhasil");
			router.push(`/penggajian/batch/${params.id}/tambahan`);
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal memverifikasi");
		}
	};

	const canVerify = batch?.status === "WAIT_VERIFICATION_PHASE_1";

	return (
		<div className="flex flex-col gap-4">
			{/* Toolbar */}
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">Verifikasi hasil seting komponen gaji</p>
				<Button onClick={handleVerify} disabled={!canVerify || verify1.isPending} className="gap-2">
					{verify1.isPending ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
					Verifikasi
				</Button>
			</div>

			{!canVerify && batch?.status && (
				<div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
					Status batch: {batch.status}. Verifikasi hanya tersedia pada status WAIT_VERIFICATION_PHASE_1.
				</div>
			)}

			{/* Content */}
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-sm">
					<div className="p-4 border-b border-border">
						<h2 className="text-sm font-semibold">Daftar Pegawai</h2>
						<p className="text-xs text-muted-foreground">{batch?.totalPegawai ?? 0} pegawai</p>
					</div>
					<div className="max-h-[600px] overflow-y-auto">
						{isPending ? (
							<div className="p-4 space-y-2">
								{[1, 2, 3].map((i) => (
									<Skeleton key={i} className="h-12 w-full" />
								))}
							</div>
						) : grouped.length === 0 ? (
							<div className="p-4 text-center text-sm text-muted-foreground">Belum ada data</div>
						) : (
							grouped.map(([org, rows]) => (
								<div key={org}>
									<div className={ORG_HEADER_CLASS}>{org}</div>
									{rows.map((row) => (
										<button
											key={row.id}
											type="button"
											onClick={() => handleSelectPegawai(row.id)}
											className={`w-full text-left px-3 py-2 border-b border-border text-sm transition-colors ${
												selectedPegawaiId === String(row.id) ? "bg-primary/5 text-primary" : "hover:bg-accent/50"
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

				<div className="flex-1 min-w-0">
					{selectedPegawaiId ? (
						<PegawaiDetailPanel pegawaiId={selectedPegawaiId} />
					) : (
						<div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
							Pilih pegawai di panel kiri
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function PegawaiDetailPanel({ pegawaiId }: { pegawaiId: string }) {
	const { data: komponen, isPending } = useQuery({
		queryKey: ["penggajian", "batch", "pegawai", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			throwIfNotOk(res, "Gagal memuat data");
			const body = (await res.json()) as { data: GajiBatchMasterResponse };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	if (isPending) {
		return (
			<div className="space-y-3">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (!komponen) {
		return <div className="text-center text-sm text-muted-foreground py-8">Data tidak ditemukan</div>;
	}

	return (
		<div className="rounded-lg border bg-card shadow-sm p-4">
			<div className="mb-4">
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
