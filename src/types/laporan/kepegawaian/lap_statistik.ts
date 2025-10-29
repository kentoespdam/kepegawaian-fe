import z from "zod";

interface BaseStatistik {
	total: number;
	persen: number;
}
export interface StatistikAgama extends BaseStatistik {
	agama: string;
}

export interface StatistikGelarAkademik extends BaseStatistik {
	jenjang: string;
	gelar: string;
}

export interface StatistikGolongan extends BaseStatistik {
	golongan: string;
	pangkat: string;
	jml_l: number;
	jml_p: number;
}

export interface StatistikJenisKelamin extends BaseStatistik {
	jenis_kelamin: string;
}

export interface StatistikPendidikan1 extends BaseStatistik {
	nama: string;
}

export interface StatistikPendidikan2 {
	id: number;
	pendidikan: string;
	non_golongan: number;
	golongan_a: number;
	golongan_b: number;
	golongan_c: number;
	golongan_d: number;
	jml_golongan: number;
	kontrak: number;
	capeg: number;
	honorer: number;
	tetap: number;
	jml_status_pegawai: number;
	adm: number;
	pelayanan: number;
	teknik: number;
	jml_unit_kerja: number;
	pria: number;
	wanita: number;
	jml_jenis_kelamin: number;
}

export interface StatistikStatusPegawai extends BaseStatistik {
	status_pegawai: string;
}

export interface StatistikUmur extends BaseStatistik {
	umur: string;
}

export interface StatistikRangeUmur extends BaseStatistik {
	range: string;
	persen: number;
}

export interface StatistikUmurRoot {
	umur: StatistikUmur[];
	range: StatistikRangeUmur[];
}

export const FilterLaporanPendidikan2Schema = z.object({
	tahun: z.string(),
	bulan: z.string(),
});

export type FilterLaporanPendidikan2Schema = z.infer<
	typeof FilterLaporanPendidikan2Schema
>;

export type BaseLaporanStatistik =
	| StatistikGolongan
	| StatistikPendidikan1
	| StatistikPendidikan2
	| StatistikJenisKelamin
	| StatistikGelarAkademik
	| StatistikAgama
	| StatistikStatusPegawai;