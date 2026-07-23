"use client";

import { useQuery } from "@tanstack/react-query";
import type { BiodataDetail } from "@/types/profil/biodata";
import type { ProfilKeluargaQuery } from "@/types/profil/keluarga";
import { SectionCard } from "./_section-card";

export function SectionBiodata({ nik }: { nik: string | null }) {
	const biodata = useQuery({
		queryKey: ["/api/proxy/profil/biodata", nik],
		queryFn: async () => {
			if (!nik) return null;
			const res = await fetch(`/api/proxy/profil/biodata/${nik}`);
			if (!res.ok) return null;
			const body = await res.json();
			return (body.data as BiodataDetail) ?? null;
		},
		enabled: !!nik,
		staleTime: 60_000,
	});

	const keluarga = useQuery({
		queryKey: ["/api/proxy/profil/keluarga", nik],
		queryFn: async () => {
			if (!nik) return [];
			const qs = new URLSearchParams({ biodataId: nik }).toString();
			const res = await fetch(`/api/proxy/profil/keluarga?${qs}`);
			if (!res.ok) return [];
			const body = await res.json();
			return (body.data?.content as ProfilKeluargaQuery[]) ?? [];
		},
		enabled: !!nik,
		staleTime: 60_000,
	});

	const d = biodata.data;
	const keluargaRows = keluarga.data ?? [];

	return (
		<SectionCard title="Biodata &amp; Keluarga">
			{!nik ? (
				<p className="text-sm text-muted-foreground italic">Tidak ada data biodata</p>
			) : (
				<div className="space-y-4">
					{/* Biodata */}
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Data Pribadi</p>
						{biodata.isPending ? (
							<p className="text-sm text-muted-foreground italic">Memuat...</p>
						) : d ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
								<Field label="NIK" value={d.nik} />
								<Field label="Nama" value={d.nama} />
								<Field label="Jenis Kelamin" value={labelJk(d.jenisKelamin)} />
								<Field label="Tempat Lahir" value={d.tempatLahir} />
								<Field label="Tanggal Lahir" value={d.tanggalLahir} />
								<Field label="Agama" value={d.agama ? labelAgama(d.agama) : undefined} />
								<Field label="Status Kawin" value={d.statusKawin ? labelKawin(d.statusKawin) : undefined} />
								{/* ponytail: pendidikanTerakhirId is scalar number, not nested object */}
								<Field
									label="Pendidikan Terakhir"
									value={d.pendidikanTerakhirId ? String(d.pendidikanTerakhirId) : undefined}
								/>
								<Field label="Alamat" value={d.alamat} className="sm:col-span-2 lg:col-span-3" />
							</div>
						) : (
							<p className="text-sm text-muted-foreground italic">Data tidak tersedia</p>
						)}
					</div>

					{/* Keluarga */}
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Anggota Keluarga</p>
						{keluarga.isPending ? (
							<p className="text-sm text-muted-foreground italic">Memuat...</p>
						) : keluargaRows.length === 0 ? (
							<p className="text-sm text-muted-foreground italic">Tidak ada data keluarga</p>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-sm">
									<thead>
										<tr className="border-b border-border">
											<th className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-3">Nama</th>
											<th className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-3">Hubungan</th>
											<th className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-3">Tanggal Lahir</th>
											<th className="text-left text-xs text-muted-foreground font-medium py-1.5 pr-3">Tanggungan</th>
										</tr>
									</thead>
									<tbody>
										{keluargaRows.map((r, i) => (
											<tr key={r.id ?? i} className="border-b border-border last:border-0">
												<td className="py-1.5 pr-3 text-foreground">{r.nama}</td>
												<td className="py-1.5 pr-3 text-foreground">{r.hubunganKeluarga}</td>
												<td className="py-1.5 pr-3 text-foreground">{r.tanggalLahir}</td>
												<td className="py-1.5 pr-3 text-foreground">{r.tanggungan ? "Ya" : "Tidak"}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			)}
		</SectionCard>
	);
}

function Field({ label, value, className }: { label: string; value?: string | null; className?: string }) {
	return (
		<div className={className}>
			<p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
			<p className="text-sm text-foreground">{value ?? "-"}</p>
		</div>
	);
}

function labelJk(s?: string): string {
	if (s === "LAKI_LAKI") return "Laki-laki";
	if (s === "PEREMPUAN") return "Perempuan";
	return s ?? "-";
}

function labelAgama(s: string): string {
	const map: Record<string, string> = {
		ISLAM: "Islam",
		KRISTEN: "Kristen",
		KATOLIK: "Katolik",
		HINDU: "Hindu",
		BUDHA: "Buddha",
		KONGHUCHU: "Konghuchu",
		ALIRAN_KEPERCAYAAN: "Aliran Kepercayaan",
		LAINNYA: "Lainnya",
	};
	return map[s] ?? s;
}

function labelKawin(s: string): string {
	const map: Record<string, string> = {
		BELUM_KAWIN: "Belum Kawin",
		KAWIN: "Kawin",
		JANDA_DUDA: "Janda/Duda",
		MENIKAH_SEKANTOR: "Menikah Satu Kantor",
		TIDAK_TAHU: "Tidak Tahu",
	};
	return map[s] ?? s;
}
