export interface DNP {
	kode_organisasi: string;
	level_jabatan: number;
	nama: string;
	nipam: string;
	nama_jabatan: string;
	tmt_jabatan: string;
	pangkat: string | null;
	golongan: string | null;
	tmt_golongan: string | null;
	mkg_tahun: number;
	mkg_bulan: number;
	tmt_kerja: string;
	mk_tahun: number;
	mk_bulan: number;
	pendidikan: string;
	ttl: string;
}

export interface OrganisasiMini2 {
	kode: string;
	nama: string;
}

export interface DnpResponse {
	data: DNP[];
	organisasi: OrganisasiMini2[];
}
