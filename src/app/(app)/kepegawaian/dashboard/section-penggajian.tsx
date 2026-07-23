"use client";

import { useQuery } from "@tanstack/react-query";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";
import { SectionCard } from "./_section-card";

export function SectionPenggajian({ pegawaiId }: { pegawaiId: number }) {
	const query = useQuery({
		queryKey: ["/api/proxy/penggajian/batch/master/pegawai", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			if (!res.ok) throw new Error("Gagal memuat data penggajian");
			const body = await res.json();
			return (body.data as GajiBatchMasterResponse[]) ?? [];
		},
		staleTime: 30_000,
	});

	// ponytail: filter FINISHED only — guard FE dari issue oqp
	// GajiBatchMasterResponse type missing status field, coerce via any
	const finished = (query.data ?? []).filter((r) => (r as { status?: string }).status === "FINISHED");

	return (
		<SectionCard title="Riwayat Penggajian">
			{query.isPending ? (
				<p className="text-sm text-muted-foreground italic">Memuat...</p>
			) : query.isError ? (
				<p className="text-sm text-destructive">Gagal memuat data penggajian</p>
			) : finished.length === 0 ? (
				<p className="text-sm text-muted-foreground italic">Belum ada periode penggajian final</p>
			) : (
				<div className="space-y-4">
					{finished.map((row) => (
						<div key={row.id} className="rounded-md border border-border p-4">
							<div className="flex items-center justify-between mb-2">
								<div>
									<p className="text-sm font-semibold text-foreground">{row.periode ?? "Periode tidak diketahui"}</p>
									<p className="text-xs text-muted-foreground">{row.nama}</p>
								</div>
								<div className="text-right">
									<p className="text-xs text-muted-foreground uppercase tracking-wider">Penghasilan Bersih</p>
									<p className="text-sm font-semibold text-success tabular-nums">
										{row.penghasilanBersihFinal != null ? formatRp(row.penghasilanBersihFinal) : "-"}
									</p>
								</div>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-muted-foreground">
								<div>
									<span className="uppercase tracking-wider">Pokok</span>
									<p className="text-foreground tabular-nums">
										{row.gajiPokok != null ? formatRp(row.gajiPokok) : "-"}
									</p>
								</div>
								<div>
									<span className="uppercase tracking-wider">Kotor</span>
									<p className="text-foreground tabular-nums">
										{row.penghasilanKotor != null ? formatRp(row.penghasilanKotor) : "-"}
									</p>
								</div>
								<div>
									<span className="uppercase tracking-wider">Potongan</span>
									<p className="text-foreground tabular-nums">
										{row.totalPotongan != null ? formatRp(row.totalPotongan) : "-"}
									</p>
								</div>
								<div>
									<span className="uppercase tracking-wider">Pajak</span>
									<p className="text-foreground tabular-nums">{row.pajak != null ? formatRp(row.pajak) : "-"}</p>
								</div>
							</div>
							{/* ponytail: *2/pembulatan2/isDifferent disembunyikan sesuai spec */}
						</div>
					))}
				</div>
			)}
		</SectionCard>
	);
}

function formatRp(n: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(n);
}
