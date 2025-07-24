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
