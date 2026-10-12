/**
 * kepegawaian — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /laporan/kepegawaian/dnp, GET /laporan/kepegawaian/dnp/excel, GET /laporan/kepegawaian/duk, GET /laporan/kepegawaian/duk/excel, GET /laporan/kepegawaian/jobs/{jobId}, GET /laporan/kepegawaian/jobs/{jobId}/download, GET /laporan/kepegawaian/kenaikan_berkala, GET /laporan/kepegawaian/kenaikan_berkala/count, GET /laporan/kepegawaian/kenaikan_berkala/excel, GET /laporan/kepegawaian/kontrak, GET /laporan/kepegawaian/kontrak/excel, GET /laporan/kepegawaian/lepas_tanggungan_anak, GET /laporan/kepegawaian/lepas_tanggungan_anak/count, GET /laporan/kepegawaian/lepas_tanggungan_anak/excel, GET /laporan/kepegawaian/mutasi/excel/{from_date}/{to_date}, GET /laporan/kepegawaian/mutasi/{from_date}/{to_date}, GET /laporan/kepegawaian/so, GET /laporan/kepegawaian/statistik/agama, GET /laporan/kepegawaian/statistik/gelar_akademik, GET /laporan/kepegawaian/statistik/golongan, GET /laporan/kepegawaian/statistik/jenis_kelamin, GET /laporan/kepegawaian/statistik/pendidikan1, GET /laporan/kepegawaian/statistik/pendidikan2/excel/{tahun}/{bulan}, GET /laporan/kepegawaian/statistik/pendidikan2/{tahun}/{bulan}, GET /laporan/kepegawaian/statistik/status_pegawai, GET /laporan/kepegawaian/statistik/umur, POST /laporan/kepegawaian/dnp/export, POST /laporan/kepegawaian/duk/export, POST /laporan/kepegawaian/mutasi/export/{from_date}/{to_date}
 */

import type { Envelope, JenisRiwayatKepegawaian, PageQuery } from "../_shared";

export interface KepegawaianSearchParams extends PageQuery {
	jenis_mutasi?:
		| "PENGANGKATAN_PERTAMA"
		| "MUTASI_LOKER"
		| "MUTASI_JABATAN"
		| "MUTASI_GOLONGAN"
		| "MUTASI_GAJI"
		| "MUTASI_GAJI_BERKALA"
		| "TERMINASI";
	filter?: "BULAN_INI" | "GTE_1" | "GTE_2";
	jenisSk: "SK_KENAIKAN_PANGKAT_GOLONGAN" | "SK_KENAIKAN_GAJI_BERKALA";
}

export interface ReportJobResponse {
	jobId?: string;
	status?: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
	downloadUrl?: string;
	createdAt?: string; // date-time
	completedAt?: string; // date-time
	errorMessage?: string;
}

export type SingleResultReportJobResponse = Envelope<ReportJobResponse>;

export interface StatistikUmurResponse {
	umur?: number; // int32
	total?: number; // int32
	persen?: number; // double
}

export interface StatistikUmurRangeResponse {
	range?: string;
	total?: number; // int32
	persen?: number; // double
}

export interface StatistikUmurCombinedResponse {
	umur?: StatistikUmurResponse[];
	range?: StatistikUmurRangeResponse[];
}

export type SingleResultStatistikUmurCombinedResponse = Envelope<StatistikUmurCombinedResponse>;

export interface StatistikStatusPegawaiResponse {
	statusPegawai?: string;
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikStatusPegawaiResponse = Envelope<StatistikStatusPegawaiResponse[]>;

export interface StatistikPendidikan2Response {
	id?: number; // int64
	pendidikan?: string;
	nonGolongan?: number; // int32
	golonganA?: number; // int32
	golonganB?: number; // int32
	golonganC?: number; // int32
	golonganD?: number; // int32
	jmlGolongan?: number; // int32
	kontrak?: number; // int32
	capeg?: number; // int32
	honorer?: number; // int32
	tetap?: number; // int32
	jmlStatusPegawai?: number; // int32
	adm?: number; // int32
	pelayanan?: number; // int32
	teknik?: number; // int32
	jmlUnitKerja?: number; // int32
	pria?: number; // int32
	wanita?: number; // int32
	jmlJenisKelamin?: number; // int32
}

export type SingleResultListStatistikPendidikan2Response = Envelope<StatistikPendidikan2Response[]>;

export interface StatistikPendidikan1Response {
	nama?: string;
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikPendidikan1Response = Envelope<StatistikPendidikan1Response[]>;

export interface StatistikJenisKelaminResponse {
	jenisKelamin?: string;
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikJenisKelaminResponse = Envelope<StatistikJenisKelaminResponse[]>;

export interface StatistikGolonganResponse {
	golongan?: string;
	pangkat?: string;
	jmlL?: number; // int32
	jmlP?: number; // int32
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikGolonganResponse = Envelope<StatistikGolonganResponse[]>;

export interface StatistikGelarResponse {
	jenjang?: string;
	gelar?: string;
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikGelarResponse = Envelope<StatistikGelarResponse[]>;

export interface StatistikAgamaResponse {
	agama?: string;
	total?: number; // int32
	persen?: number; // double
}

export type SingleResultListStatistikAgamaResponse = Envelope<StatistikAgamaResponse[]>;

export type SingleResultMapStringObject = Envelope<Record<string, unknown>>;

export interface MutasiResponse {
	jenisMutasi?: JenisRiwayatKepegawaian;
	nipam?: string;
	nama?: string;
	tmtBerlaku?: string; // date
	namaOrganisasiLama?: string;
	namaJabatanLama?: string;
	namaGolongan?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	namaGolonganLama?: string;
	notes?: string;
}

export type SingleResultListMutasiResponse = Envelope<MutasiResponse[]>;

export interface LtaResponse {
	id?: number; // int64
	namaAnak?: string;
	jenisKelamin?: string;
	tanggalLahir?: string; // date
	umur?: number; // int32
	tanggungan?: boolean;
	statusPendidikan?: string;
	namaKaryawan?: string;
	nipam?: string;
	namaJabatan?: string;
}

export type SingleResultListLtaResponse = Envelope<LtaResponse[]>;

export interface LtaCountResponse {
	count?: number; // int64
}

export type SingleResultLtaCountResponse = Envelope<LtaCountResponse>;

export interface KontrakResponse {
	nipam?: string;
	nama?: string;
	nomorKontrak?: string;
	namaOrganisasi?: string;
	namaJabatan?: string;
	tanggalMulai?: string; // date
	tanggalSelesai?: string; // date
	sisaTahun?: number; // int32
	sisaBulan?: number; // int32
}

export type SingleResultListKontrakResponse = Envelope<KontrakResponse[]>;

export interface KenaikanBerkalaResponse {
	id?: number; // int64
	pegawaiId?: number; // int64
	nipam?: string;
	nama?: string;
	jenisSk?: string; // byte
	nomorSk?: string;
	tmtBerlaku?: string; // date
	kenaikanBerikutnya?: string; // date
	tanggalEksekusiSanksi?: string; // date
	isPendingGaji?: boolean;
	isPendingPangkat?: boolean;
	namaJabatan?: string;
	tmtJabatan?: string; // date
	golongan?: string;
	pangkat?: string;
	tmtGolongan?: string; // date
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	tmtKerja?: string; // date
	mkTahun?: number; // int32
	mkBulan?: number; // int32
	pendidikanTerakhir?: string;
	tempatLahir?: string;
	tanggalLahir?: string; // date
}

export type SingleResultListKenaikanBerkalaResponse = Envelope<KenaikanBerkalaResponse[]>;

export type SingleResultLong = Envelope<number>;

export interface DukResponse {
	nama?: string;
	nipam?: string;
	golongan?: string;
	pangkat?: string;
	tmtGolongan?: string; // date
	namaJabatan?: string;
	tmtJabatan?: string; // date
	tmtKerja?: string; // date
	mkTahun?: number; // int32
	mkBulan?: number; // int32
	usia?: number; // int32
	jurusan?: string;
	tahunLulus?: number; // int32
	tingkatPendidikan?: string;
	statusPegawai?: string; // byte
}

export type SingleResultListDukResponse = Envelope<DukResponse[]>;

export interface DnpResponse {
	kodeOrganisasi?: string;
	levelJabatan?: number; // int32
	nama?: string;
	nipam?: string;
	namaJabatan?: string;
	tmtJabatan?: string;
	pangkat?: string;
	golongan?: string;
	tmtGolongan?: string;
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	tmtKerja?: string;
	mkTahun?: number; // int32
	mkBulan?: number; // int32
	pendidikan?: string;
	ttl?: string;
}

export type SingleResultListDnpResponse = Envelope<DnpResponse[]>;
