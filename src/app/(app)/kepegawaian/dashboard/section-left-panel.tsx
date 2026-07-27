"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { BiodataDetail } from "@/types/profil/biodata";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";

export function SectionLeftPanel({ pegawai, nik }: { pegawai: PegawaiResponseDetail; nik: string | null }) {
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

	const d = biodata.data;
	const nama = pegawai.biodata?.nama ?? d?.nama ?? "-";
	const nipam = pegawai.nipam ?? "-";
	const jabatan = pegawai.jabatan?.nama ?? "-";
	const fotoProfil = pegawai.biodata?.fotoProfil ?? d?.fotoProfil;

	return (
		<div className="rounded-lg border bg-card shadow-sm">
			{/* Header identitas — always visible */}
			<div className="flex items-center gap-4 px-5 py-4 border-b border-border">
				<div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
					{fotoProfil ? (
						<Image src={fotoProfil} alt="" width={56} height={56} className="size-full object-cover" unoptimized />
					) : (
						<span className="text-lg font-semibold text-muted-foreground">{nama.charAt(0)}</span>
					)}
				</div>
				<div className="min-w-0">
					<h3 className="text-sm font-semibold text-foreground truncate">{nama}</h3>
					<p className="text-xs text-muted-foreground tabular-nums">{nipam}</p>
					<p className="text-xs text-muted-foreground truncate">{jabatan}</p>
				</div>
			</div>

			{/* Accordion */}
			<Accordion className="px-5 py-1">
				{/* Data Pribadi */}
				<AccordionItem value="data-pribadi">
					<AccordionTrigger>Data Pribadi</AccordionTrigger>
					<AccordionContent>
						{!nik ? (
							<p className="text-sm text-muted-foreground italic">Tidak ada data</p>
						) : biodata.isPending ? (
							<p className="text-sm text-muted-foreground italic">Memuat...</p>
						) : d ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<Field label="NIK" value={d.nik} />
								<Field label="Nama" value={d.nama} />
								<Field label="Jenis Kelamin" value={labelJk(d.jenisKelamin)} />
								<Field label="Tempat Lahir" value={d.tempatLahir} />
								<Field label="Tanggal Lahir" value={d.tanggalLahir} />
								<Field label="Agama" value={d.agama ? labelAgama(d.agama) : undefined} />
								<Field label="Status Kawin" value={d.statusKawin ? labelKawin(d.statusKawin) : undefined} />
								<Field
									label="Pendidikan Terakhir"
									value={d.pendidikanTerakhirId ? String(d.pendidikanTerakhirId) : undefined}
								/>
								<Field label="Alamat" value={d.alamat} className="sm:col-span-2" />
							</div>
						) : (
							<p className="text-sm text-muted-foreground italic">Data tidak tersedia</p>
						)}
					</AccordionContent>
				</AccordionItem>

				{/* Data Kepegawaian */}
				<AccordionItem value="data-kepegawaian">
					<AccordionTrigger>Data Kepegawaian</AccordionTrigger>
					<AccordionContent>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
							<Field
								label="Status Pegawai"
								value={pegawai.statusPegawai ? labelStatus(pegawai.statusPegawai) : undefined}
							/>
							<Field
								label="Status Kerja"
								value={pegawai.statusKerja ? labelStatusKerja(pegawai.statusKerja) : undefined}
							/>
							<Field label="Organisasi" value={pegawai.organisasi?.nama} />
							<Field label="Jabatan" value={pegawai.jabatan?.nama} />
							<Field label="Profesi" value={pegawai.profesi?.nama} />
							<Field
								label="Golongan"
								value={
									pegawai.golongan?.golongan
										? `${pegawai.golongan.golongan} (${pegawai.golongan.pangkat ?? ""})`
										: undefined
								}
							/>
							<Field label="Grade" value={pegawai.grade?.grade ? `Grade ${pegawai.grade.grade}` : undefined} />
							<Field label="TMT Kerja" value={pegawai.tmtKerja} />
							<Field label="TMT Pensiun" value={pegawai.tmtPensiun} />
							<Field
								label="Masa Kerja"
								value={pegawai.mkgTahun != null ? `${pegawai.mkgTahun} th ${pegawai.mkgBulan ?? 0} bln` : undefined}
							/>
							<Field label="Gaji Pokok" value={pegawai.gajiPokok != null ? formatRp(pegawai.gajiPokok) : undefined} />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
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

function labelStatus(s: string): string {
	const map: Record<string, string> = {
		KONTRAK: "Kontrak",
		CAPEG: "CPNS",
		PEGAWAI: "Pegawai Tetap",
		CALON_HONORER: "Calon Honorer",
		HONORER: "Honorer",
		NON_PEGAWAI: "Non-Pegawai",
	};
	return map[s] ?? s;
}

function labelStatusKerja(s: string): string {
	const map: Record<string, string> = {
		KARYAWAN_AKTIF: "Aktif",
		BERHENTI_OR_KELUAR: "Berhenti / Keluar",
		DIRUMAHKAN: "Dirumahkan",
	};
	return map[s] ?? s;
}

function formatRp(n: number): string {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(n);
}
