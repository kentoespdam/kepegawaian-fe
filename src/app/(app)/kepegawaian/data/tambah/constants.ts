export const ENUMS = {
	jenisKelamin: [
		{ value: "LAKI_LAKI", label: "Laki-laki" },
		{ value: "PEREMPUAN", label: "Perempuan" },
	],
	agama: [
		{ value: "ISLAM", label: "Islam" },
		{ value: "KRISTEN", label: "Kristen" },
		{ value: "KATOLIK", label: "Katolik" },
		{ value: "HINDU", label: "Hindu" },
		{ value: "BUDHA", label: "Budha" },
		{ value: "KONGHUCHU", label: "Konghuchu" },
		{ value: "ALIRAN_KEPERCAYAAN", label: "Aliran Kepercayaan" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
		{ value: "LAINNYA", label: "Lainnya" },
	],
	statusKawin: [
		{ value: "BELUM_KAWIN", label: "Belum Kawin" },
		{ value: "KAWIN", label: "Kawin" },
		{ value: "JANDA_DUDA", label: "Janda/Duda" },
		{ value: "MENIKAH_SEKANTOR", label: "Menikah Sekantor" },
		{ value: "TIDAK_TAHU", label: "Tidak Tahu" },
	],
	golonganDarah: [
		{ value: "A", label: "A" },
		{ value: "B", label: "B" },
		{ value: "AB", label: "AB" },
		{ value: "O", label: "O" },
	],
	statusPegawai: [
		{ value: "KONTRAK", label: "Kontrak" },
		{ value: "CAPEG", label: "Calon Pegawai" },
		{ value: "PEGAWAI", label: "Pegawai" },
		{ value: "CALON_HONORER", label: "Calon Honorer" },
		{ value: "HONORER", label: "Honorer" },
		{ value: "NON_PEGAWAI", label: "Non Pegawai" },
	],
	statusKerja: [
		{ value: "KARYAWAN_AKTIF", label: "Karyawan Aktif" },
		{ value: "BERHENTI_OR_KELUAR", label: "Berhenti/Keluar" },
		{ value: "DIRUMAHKAN", label: "Dirumahkan" },
		{ value: "LAMARAN_BARU", label: "Lamaran Baru" },
		{ value: "TAHAP_SELEKSI", label: "Tahap Seleksi" },
		{ value: "DITERIMA", label: "Diterima" },
		{ value: "DIREKOMENDASIKAN", label: "Direkomendasikan" },
		{ value: "DITOLAK", label: "Ditolak" },
	],
} as const;

export type EnumOption = (typeof ENUMS.statusPegawai)[number];
