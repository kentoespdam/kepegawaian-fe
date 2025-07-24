export interface KenaikanBerkala {
	id: number;
	pegawai_id: number;
	nipam: string;
	nama: string;
	jenis_sk: string;
	nomor_sk: string;
	tmt_berlaku: string;
	tmt_kenaikan: string;
	nama_jabatan: string;
	tmt_jabatan: string;
	golongan: string;
	pangkat: string;
	tmt_golongan: string;
	mkg_tahun: number;
	mkg_bulan: number;
	tmt_kerja: string;
	mk_tahun: number;
	mk_bulan: number;
	pendidikan_terakhir: string;
	tempat_lahir: string;
	tanggal_lahir: string;
}

export const filterKenaikanBerkala = [
	{ id: "BULAN_INI", label: "Bulan Ini" },
	{ id: "GTE_1", label: "Bulan Depan" },
	{ id: "GTE_2", label: "2 Bulan Lagi" },
	{ id: "TAHUN_INI", label: "Tahun Ini" },
];

export const getFilterLabelById = (filterId: string): string => {
	const matchingFilter = filterKenaikanBerkala.find(
		({ id }) => id === filterId,
	);
	return matchingFilter ? matchingFilter.label : "";
};
