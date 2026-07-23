import { cn } from "@/lib/utils";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SectionCard } from "./_section-card";

export function SectionDetail({ pegawai }: { pegawai: PegawaiResponseDetail }) {
	const labelClass = "text-xs uppercase tracking-wider text-muted-foreground";
	const valueClass = "text-sm text-foreground";

	return (
		<SectionCard title="Detail Kepegawaian">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<p className={labelClass}>NIPAM</p>
					<p className={valueClass}>{pegawai.nipam ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Status Pegawai</p>
					<p className={valueClass}>{pegawai.statusPegawai ? labelStatus(pegawai.statusPegawai) : "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Status Kerja</p>
					<p className={valueClass}>{pegawai.statusKerja ? labelStatusKerja(pegawai.statusKerja) : "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Organisasi</p>
					<p className={valueClass}>{pegawai.organisasi?.nama ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Jabatan</p>
					<p className={valueClass}>{pegawai.jabatan?.nama ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Profesi</p>
					<p className={valueClass}>{pegawai.profesi?.nama ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Golongan</p>
					<p className={valueClass}>
						{pegawai.golongan?.golongan ? `${pegawai.golongan.golongan} (${pegawai.golongan.pangkat ?? ""})` : "-"}
					</p>
				</div>
				<div>
					<p className={labelClass}>Grade</p>
					<p className={valueClass}>{pegawai.grade?.grade ? `Grade ${pegawai.grade.grade}` : "-"}</p>
				</div>
				<div>
					<p className={labelClass}>TMT Kerja</p>
					<p className={valueClass}>{pegawai.tmtKerja ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>TMT Pensiun</p>
					<p className={valueClass}>{pegawai.tmtPensiun ?? "-"}</p>
				</div>
				<div>
					<p className={labelClass}>Masa Kerja</p>
					<p className={valueClass}>
						{pegawai.mkgTahun != null ? `${pegawai.mkgTahun} th ${pegawai.mkgBulan ?? 0} bln` : "-"}
					</p>
				</div>
				<div>
					<p className={labelClass}>Gaji Pokok</p>
					<p className={cn(valueClass, "tabular-nums")}>
						{pegawai.gajiPokok != null ? formatRp(pegawai.gajiPokok) : "-"}
					</p>
				</div>
			</div>
		</SectionCard>
	);
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
