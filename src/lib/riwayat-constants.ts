/** Shared constant: opsi dropdown Jenis Mutasi. Satu sumber, dipakai table + form. */
export const JENIS_MUTASI_OPTIONS: { value: string; label: string }[] = [
	{ value: "PENGANGKATAN_PERTAMA", label: "Pengangkatan Pertama" },
	{ value: "MUTASI_LOKER", label: "Mutasi Lokasi Kerja" },
	{ value: "MUTASI_JABATAN", label: "Mutasi Jabatan" },
	{ value: "MUTASI_GOLONGAN", label: "Mutasi Golongan" },
	{ value: "MUTASI_GAJI", label: "Mutasi Gaji" },
	{ value: "MUTASI_GAJI_BERKALA", label: "Mutasi Gaji Berkala" },
	{ value: "TERMINASI", label: "Terminasi" },
];

/** Shared constant: opsi dropdown Jenis SK. Satu sumber, dipakai table + form. */
export const JENIS_SK_OPTIONS: { value: string; label: string }[] = [
	{ value: "SK_KENAIKAN_PANGKAT_GOLONGAN", label: "Kenaikan Pangkat" },
	{ value: "SK_CAPEG", label: "Calon Pegawai" },
	{ value: "SK_PEGAWAI_TETAP", label: "Pegawai Tetap" },
	{ value: "SK_JABATAN", label: "Jabatan" },
	{ value: "SK_MUTASI", label: "Mutasi" },
	{ value: "SK_PENSIUN", label: "Pensiun" },
	{ value: "SK_LAINNYA", label: "Lainnya" },
	{ value: "SK_PENYESUAIAN_GAJI", label: "Penyesuaian Gaji" },
	{ value: "SK_KENAIKAN_GAJI_BERKALA", label: "Kenaikan Gaji Berkala" },
];

export function labelJenisMutasi(s: unknown): string {
	if (s == null || s === "") return "—";
	return JENIS_MUTASI_OPTIONS.find((o) => o.value === s)?.label ?? String(s);
}

/** Shared constant: opsi dropdown Jenis Aksi Kontrak. */
export const JENIS_AKSI_KONTRAK_OPTIONS: { value: string; label: string }[] = [
	{ value: "PERPANJANGAN", label: "Perpanjangan Kontrak" },
	{ value: "PENGANGKATAN", label: "Pengangkatan Calon Pegawai" },
	{ value: "TERMINASI", label: "Terminasi Kontrak" },
];

export function labelJenisSk(s: unknown): string {
	if (s == null || s === "") return "—";
	return JENIS_SK_OPTIONS.find((o) => o.value === s)?.label ?? String(s);
}

export function labelAksiKontrak(s: unknown): string {
	if (s == null || s === "") return "—";
	return JENIS_AKSI_KONTRAK_OPTIONS.find((o) => o.value === s)?.label ?? String(s);
}
