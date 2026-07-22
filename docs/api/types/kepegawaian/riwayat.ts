/**
 * riwayat — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /kepegawaian/riwayat/kontrak/{id}, DELETE /kepegawaian/riwayat/mutasi/{id}, DELETE /kepegawaian/riwayat/sk/{id}, DELETE /kepegawaian/riwayat/sp/{id}, GET /kepegawaian/riwayat/kontrak/pegawai/{id}, GET /kepegawaian/riwayat/kontrak/{id}, GET /kepegawaian/riwayat/mutasi/pegawai/{id}, GET /kepegawaian/riwayat/mutasi/{id}, GET /kepegawaian/riwayat/sk, GET /kepegawaian/riwayat/sk/list, GET /kepegawaian/riwayat/sk/pegawai/{id}, GET /kepegawaian/riwayat/sk/{id}, GET /kepegawaian/riwayat/sp/pegawai/{id}, GET /kepegawaian/riwayat/sp/{id}, GET /kepegawaian/riwayat/sp/{id}/file, GET /kepegawaian/riwayat/terminasi, GET /kepegawaian/riwayat/terminasi/calon-pensiun, GET /kepegawaian/riwayat/terminasi/{id}, POST /kepegawaian/riwayat/kontrak, POST /kepegawaian/riwayat/mutasi, POST /kepegawaian/riwayat/sk, POST /kepegawaian/riwayat/sp, POST /kepegawaian/riwayat/terminasi, PUT /kepegawaian/riwayat/kontrak/{id}, PUT /kepegawaian/riwayat/mutasi/{id}, PUT /kepegawaian/riwayat/sk/{id}, PUT /kepegawaian/riwayat/sp/{id}, PUT /kepegawaian/riwayat/terminasi/{id}
 */

import type {
	Enum1,
	Envelope,
	GolonganResponse,
	JabatanMiniResponse,
	JenisSpMiniResponse,
	LampiranSkQuery,
	OrganisasiMiniResponse,
	PageEnvelope,
	PageQuery,
	PegawaiResponse,
	ProfesiMiniResponse,
	SanksiMiniResponse,
} from "../_shared";

export type Enum11 =
	| "PENGANGKATAN_PERTAMA"
	| "MUTASI_LOKER"
	| "MUTASI_JABATAN"
	| "MUTASI_GOLONGAN"
	| "MUTASI_GAJI"
	| "MUTASI_GAJI_BERKALA"
	| "TERMINASI";
export type Enum12 = "PERPANJANGAN" | "PENGANGKATAN" | "TERMINASI";

export interface RiwayatSearchParams extends PageQuery {
	tahunPensiun?: number; // int32
	alasanTerminasiId?: number; // int64
	pegawaiId?: number; // int64
	nipam?: string;
	nama?: string;
	jabatanId?: number; // int64
	organisasiId?: number; // int64
	golonganId?: number; // int64
	nomorSk?: string;
	tanggalTerminasi?: string; // date
	jenisSk?:
		| "SK_KENAIKAN_PANGKAT_GOLONGAN"
		| "SK_CAPEG"
		| "SK_PEGAWAI_TETAP"
		| "SK_JABATAN"
		| "SK_MUTASI"
		| "SK_PENSIUN"
		| "SK_LAINNYA"
		| "SK_PENYESUAIAN_GAJI"
		| "SK_KENAIKAN_GAJI_BERKALA";
	nomorSp?: string;
	jenisSpId?: number; // int64
	riwayatSkId?: number; // int64
	jenisMutasi?:
		| "PENGANGKATAN_PERTAMA"
		| "MUTASI_LOKER"
		| "MUTASI_JABATAN"
		| "MUTASI_GOLONGAN"
		| "MUTASI_GAJI"
		| "MUTASI_GAJI_BERKALA"
		| "TERMINASI";
	namaOrganisasi?: string;
	namaJabatan?: string;
	organisasiLamaId?: number; // int64
	namaOrganisasiLama?: string;
	jabatanLamaId?: number; // int64
	namaJabatanLama?: string;
	nomorKontrak?: string;
}

export interface AlasanBerhentiResponse {
	id?: number; // int64
	nama?: string;
	notes?: string;
}

export interface RiwayatSkQuery {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	nomorSk?: string;
	jenisSk?: Enum1;
	tanggalSk?: string; // date
	tmtBerlaku?: string; // date
	golongan?: GolonganResponse;
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
}

export interface RiwayatTerminasiQuery {
	id?: number; // int64
	alasanTerminasi?: AlasanBerhentiResponse;
	pegawai?: PegawaiResponse;
	nipam?: string;
	nama?: string;
	nomorSk?: string;
	skTerminasi?: RiwayatSkQuery;
	lampiranSkTerminasi?: LampiranSkQuery;
	organisasi?: OrganisasiMiniResponse;
	namaOrganisasi?: string;
	jabatan?: JabatanMiniResponse;
	namaJabatan?: string;
	golongan?: GolonganResponse;
	namaGolongan?: string;
	tanggalTerminasi?: string; // date
	tahunTerminasi?: number; // int32
	masaKerja?: number; // int32
	notes?: string;
}

export type SingleResultRiwayatTerminasiQuery = Envelope<RiwayatTerminasiQuery>;

export interface RiwayatTerminasiPutRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
	alasanTerminasiId: number; // int64, min 1
	nipam: string; // minLength 1
	nama: string; // minLength 1
	organisasiId: number; // int64, min 1
	jabatanId: number; // int64, min 1
	fileName?: string; // binary
}

export interface RiwayatSpQuery {
	id?: number; // int64
	pegawaiId?: number; // int64
	nipam?: string;
	nama?: string;
	organisasi?: OrganisasiMiniResponse;
	namaOrganisasi?: string;
	jabatan?: JabatanMiniResponse;
	namaJabatan?: string;
	nomorSp?: string;
	tanggalSp?: string; // date
	jenisSp?: JenisSpMiniResponse;
	sanksi?: SanksiMiniResponse;
	sanksiNotes?: string;
	tanggalEksekusiSanksi?: string; // date
	tanggalMulai?: string; // date
	tanggalSelesai?: string; // date
	penandaTangan?: string;
	jabatanPenandaTangan?: string;
	fileName?: string;
	mimeType?: string;
	notes?: string;
}

export type SingleResultRiwayatSpQuery = Envelope<RiwayatSpQuery>;

export interface RiwayatSpPutRequest {
	nomorSp: string; // minLength 1
	pegawaiId: number; // int64, min 1
	organisasiId: number; // int64, min 1
	jabatanId: number; // int64, min 1
	tanggalSp: string; // date
	jenisSpId: number; // int64, min 1
	sanksiId: number; // int64, min 1
	sanksiNotes?: string;
	tanggalEksekusiSanksi?: string; // date
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	penandaTangan: string; // minLength 1
	jabatanPenandaTangan: string; // minLength 1
	fileName?: string; // binary
	notes?: string;
}

export type SingleResultRiwayatSkQuery = Envelope<RiwayatSkQuery>;

export interface RiwayatSkPutRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
}

export interface RiwayatMutasiQuery {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	skMutasi?: RiwayatSkQuery;
	jenisMutasi?: Enum11;
	tmtBerlaku?: string; // date
	tanggalBerakhir?: string; // date
	golongan?: GolonganResponse;
	organisasi?: OrganisasiMiniResponse;
	namaOrganisasi?: string;
	jabatan?: JabatanMiniResponse;
	namaJabatan?: string;
	profesi?: ProfesiMiniResponse;
	namaProfesi?: string;
	golonganLama?: GolonganResponse;
	organisasiLama?: OrganisasiMiniResponse;
	namaOrganisasiLama?: string;
	jabatanLama?: JabatanMiniResponse;
	namaJabatanLama?: string;
	profesiLama?: ProfesiMiniResponse;
	namaProfesiLama?: string;
	notes?: string;
}

export type SingleResultRiwayatMutasiQuery = Envelope<RiwayatMutasiQuery>;

export interface RiwayatMutasiPutRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
	nipam?: string;
	nama?: string;
	tanggalBerakhir?: string; // date
	jenisMutasi: Enum11;
	organisasiId?: number; // int64
	jabatanId?: number; // int64
	profesiId?: number; // int64
	organisasiLamaId?: number; // int64
	jabatanLamaId?: number; // int64
	golonganLamaId?: number; // int64
	profesiLamaId?: number; // int64
}

export interface RiwayatKontrakQuery {
	id?: number; // int64
	jenisKontrak?: Enum12;
	nipam?: string;
	nama?: string;
	nomorKontrak?: string;
	tanggalSk?: string; // date
	tanggalMulai?: string; // date
	tanggalSelesai?: string; // date
	notes?: string;
}

export type SingleResultRiwayatKontrakQuery = Envelope<RiwayatKontrakQuery>;

export interface RiwayatKontrakPutRequest {
	jenisKontrak?: Enum12;
	pegawaiId: number; // int64, min 1
	nipam: string; // minLength 1
	nama: string; // minLength 1
	nomorKontrak: string; // minLength 1
	tanggalSk: string; // date
	tanggalMulai: string; // date
	tanggalSelesai?: string; // date
	golonganId: number; // int64
	gajiPokok?: number; // double, min 0
	isLatest?: boolean;
	notes?: string;
}

export type PageResultPageRiwayatTerminasiQuery = PageEnvelope<RiwayatTerminasiQuery>;

export interface RiwayatTerminasiPostRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
	alasanTerminasiId: number; // int64, min 1
	nipam: string; // minLength 1
	nama: string; // minLength 1
	organisasiId: number; // int64, min 1
	jabatanId: number; // int64, min 1
	fileName?: string; // binary
}

export interface RiwayatSpPostRequest {
	nomorSp: string; // minLength 1
	pegawaiId: number; // int64, min 1
	organisasiId: number; // int64, min 1
	jabatanId: number; // int64, min 1
	tanggalSp: string; // date
	jenisSpId: number; // int64, min 1
	sanksiId: number; // int64, min 1
	sanksiNotes?: string;
	tanggalEksekusiSanksi?: string; // date
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	penandaTangan: string; // minLength 1
	jabatanPenandaTangan: string; // minLength 1
	fileName?: string; // binary
	notes?: string;
}

export type PageResultPageRiwayatSkQuery = PageEnvelope<RiwayatSkQuery>;

export interface RiwayatSkPostRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
}

export interface RiwayatMutasiPostRequest {
	pegawaiId: number; // int64, min 1
	nomorSk: string; // minLength 1
	jenisSk: Enum1;
	tanggalSk: string; // date
	tmtBerlaku: string; // date
	golonganId?: number; // int64
	gajiPokok?: number; // double
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	kenaikanBerikutnya?: string; // date
	mkgbTahun?: number; // int32
	mkgbBulan?: number; // int32
	updateMaster?: boolean;
	notes?: string;
	nipam?: string;
	nama?: string;
	tanggalBerakhir?: string; // date
	jenisMutasi: Enum11;
	organisasiId?: number; // int64
	jabatanId?: number; // int64
	profesiId?: number; // int64
	organisasiLamaId?: number; // int64
	jabatanLamaId?: number; // int64
	golonganLamaId?: number; // int64
	profesiLamaId?: number; // int64
}

export interface RiwayatKontrakPostRequest {
	jenisKontrak?: Enum12;
	pegawaiId: number; // int64, min 1
	nipam: string; // minLength 1
	nama: string; // minLength 1
	nomorKontrak: string; // minLength 1
	tanggalSk: string; // date
	tanggalMulai: string; // date
	tanggalSelesai?: string; // date
	golonganId: number; // int64
	gajiPokok?: number; // double, min 0
	isLatest?: boolean;
	notes?: string;
}

export type PageResultPageRiwayatSpQuery = PageEnvelope<RiwayatSpQuery>;

export type ListResultRiwayatSkQuery = Envelope<RiwayatSkQuery[]>;

export type PageResultPageRiwayatMutasiQuery = PageEnvelope<RiwayatMutasiQuery>;

export type PageResultPageRiwayatKontrakQuery = PageEnvelope<RiwayatKontrakQuery>;

export type {
	Biodata,
	DeletedResult,
	Golongan,
	GolonganResponse,
	Grade,
	Jabatan,
	JabatanMiniResponse,
	JenisSpMiniResponse,
	KodePajak,
	LampiranSkQuery,
	LevelResponse,
	Organisasi,
	OrganisasiMiniResponse,
	PageResultPagePegawaiResponse,
	PageableObject,
	PegawaiResponse,
	Profesi,
	ProfesiMiniResponse,
	SanksiMiniResponse,
	SavedResultLong,
	SortObject,
} from "../_shared";
