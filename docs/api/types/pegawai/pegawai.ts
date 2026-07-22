/**
 * pegawai — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /pegawai/{id}, GET /pegawai, GET /pegawai/list, GET /pegawai/{id}, GET /pegawai/{id}/ringkasan, GET /pegawai/{nipam}/nipam, PATCH /pegawai/{id}/gaji, PATCH /pegawai/{id}/profil, POST /pegawai, POST /pegawai/batch, POST /pegawai/batch-by-ids, PUT /pegawai/{id}
 */

import type {
	Agama,
	Envelope,
	GajiPendapatanNonPajakResponse,
	GajiProfilResponse,
	GolonganDarah,
	GolonganResponse,
	JabatanMiniResponse,
	JenisKelamin,
	JenisSk,
	JenjangPendidikanResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageQuery,
	PegawaiResponse,
	ProfesiMiniResponse,
	StatusBerhenti,
	StatusKawin,
	StatusKepegawaian,
} from "../_shared";

export interface PegawaiSearchParams extends PageQuery {
	nipam?: string;
	nik?: string;
	nama?: string;
	statusPegawai?: "KONTRAK" | "CAPEG" | "PEGAWAI" | "CALON_HONORER" | "HONORER" | "NON_PEGAWAI";
	jabatanId?: number; // int64
	organisasiId?: number; // int64
	profesiId?: number; // int64
	golonganId?: number; // int64
	gradeId?: number; // int64
	statusKerja?:
		| "BERHENTI_OR_KELUAR"
		| "DIRUMAHKAN"
		| "KARYAWAN_AKTIF"
		| "LAMARAN_BARU"
		| "TAHAP_SELEKSI"
		| "DITERIMA"
		| "DIREKOMENDASIKAN"
		| "DITOLAK";
	jenisKelamin?: "LAKI_LAKI" | "PEREMPUAN";
}

export interface JenisKitasResponse {
	id?: number; // int64
	nama?: string;
}

export interface KartuIdentitasMiniResponse {
	id?: number; // int64
	jenisKartu?: JenisKitasResponse;
	nomorKartu?: string;
}

export interface BiodataResponse {
	nik?: string;
	nama?: string;
	jenisKelamin?: JenisKelamin;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	alamat?: string;
	telp?: string;
	agama?: Agama;
	ibuKandung?: string;
	pendidikanTerakhir?: JenjangPendidikanResponse;
	golonganDarah?: GolonganDarah;
	statusKawin?: StatusKawin;
	fotoProfil?: string;
	notes?: string;
	kartuIdentitas?: KartuIdentitasMiniResponse[];
}

export interface GradeResponse {
	id?: number; // int64
	level?: LevelResponse;
	grade?: number; // int32
	tukin?: number; // double
}

export interface RiwayatSkResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	nomorSk?: string;
	jenisSk?: JenisSk;
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

export interface RumahDinasResponse {
	id?: number; // int64
	nama?: string;
	nilai?: number; // double
}

export interface PegawaiResponseDetail {
	id?: number; // int64
	nipam?: string;
	biodata?: BiodataResponse;
	statusPegawai?: StatusKepegawaian;
	organisasi?: OrganisasiMiniResponse;
	jabatan?: JabatanMiniResponse;
	profesi?: ProfesiMiniResponse;
	golongan?: GolonganResponse;
	grade?: GradeResponse;
	statusKerja?: StatusBerhenti;
	tmtKerja?: string; // date
	skCapeg?: RiwayatSkResponse;
	tmtPensiun?: string; // date
	skPegawai?: RiwayatSkResponse;
	skGolongan?: RiwayatSkResponse;
	skJabatan?: RiwayatSkResponse;
	skMutasi?: RiwayatSkResponse;
	skKontrak?: RiwayatSkResponse;
	skGajiBerkala?: RiwayatSkResponse;
	gajiPokok?: number; // double
	phdp?: number; // double
	jmlTanggungan?: number; // int32
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	absensiId?: number; // int64
	tanggalSk?: string; // date
	tmtKontrakSelesai?: string; // date
	isAskes?: boolean;
	kodePajak?: GajiPendapatanNonPajakResponse;
	gajiProfil?: GajiProfilResponse;
	rumahDinas?: RumahDinasResponse;
	email?: string;
	notes?: string;
}

export type SingleResultPegawaiResponseDetail = Envelope<PegawaiResponseDetail>;

export interface PegawaiPutRequest {
	nik: string; // minLength 1
	nama: string; // minLength 1
	jenisKelamin: JenisKelamin;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	alamat: string; // minLength 1
	telp?: string;
	agama: Agama;
	ibuKandung: string; // minLength 1
	pendidikanTerakhirId?: number; // int64, min 1
	golonganDarah?: GolonganDarah;
	statusKawin?: StatusKawin;
	notes?: string;
	isPegawai?: boolean;
	nipam: string; // minLength 1
	statusPegawai?: StatusKepegawaian;
	statusKerja?: StatusBerhenti;
	jabatanId: number; // int64, min 1
	organisasiId: number; // int64, min 1
	profesiId?: number; // int64
	golonganId?: number; // int64
	kodePajakId: number; // int64, min 1
	nomorSk?: string;
	tanggalSk?: string; // date
	tmtBerlakuSk?: string; // date
	tmtKontrakSelesai?: string; // date
	gajiPokok?: number; // double
	email?: string;
}

export interface PegawaiPostRequest {
	nik: string; // minLength 1
	nama: string; // minLength 1
	jenisKelamin: JenisKelamin;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	alamat: string; // minLength 1
	telp?: string;
	agama: Agama;
	ibuKandung: string; // minLength 1
	pendidikanTerakhirId?: number; // int64, min 1
	golonganDarah?: GolonganDarah;
	statusKawin?: StatusKawin;
	notes?: string;
	isPegawai?: boolean;
	nipam: string; // minLength 1
	statusPegawai?: StatusKepegawaian;
	statusKerja?: StatusBerhenti;
	jabatanId: number; // int64, min 1
	organisasiId: number; // int64, min 1
	profesiId?: number; // int64
	golonganId?: number; // int64
	kodePajakId: number; // int64, min 1
	nomorSk?: string;
	tanggalSk?: string; // date
	tmtBerlakuSk?: string; // date
	tmtKontrakSelesai?: string; // date
	gajiPokok?: number; // double
	email?: string;
}

export interface PegawaiBatchIdsRequest {
	ids: number[];
}

export interface PegawaiListResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	statusPegawai?: StatusKepegawaian;
	organisasi?: OrganisasiMiniResponse;
	jabatan?: JabatanMiniResponse;
	golongan?: GolonganResponse;
}

export type ListResultPegawaiListResponse = Envelope<PegawaiListResponse[]>;

export interface PegawaiPatchProfil {
	id: number; // int64, min 1
	nipam: string; // minLength 1
	nama: string; // minLength 1
	jenisKelamin?: JenisKelamin;
	statusKawin?: StatusKawin;
	agama?: Agama;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	alamat?: string;
	ibuKandung?: string;
	telp?: string;
	golonganId?: number; // int64
	organisasiId?: number; // int64
	jabatanId?: number; // int64
	profesiId?: number; // int64
	email?: string;
	absensiId?: number; // int64
}

export interface PegawaiPatchGaji {
	tmtKerja?: string; // date
	tmtPensiun?: string; // date
	statusPegawai: StatusKepegawaian;
	gajiPokok?: number; // double
	phdp?: number; // double
	isAskes?: boolean;
	kodePajakId: number; // int64, min 1
	gajiProfilId: number; // int64, min 1
	rumahDinasId?: number; // int64
}

export type SingleResultPegawaiResponse = Envelope<PegawaiResponse>;

export interface PegawaiResponseRingkasan {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	jenisKelamin?: string;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	statusKawin?: string;
	alamat?: string;
	nik?: string;
	agama?: string;
	telp?: string;
	email?: string;
	kodePajak?: string;
	ibuKandung?: string;
	pendidikanTerakhir?: string;
	lembagaPendidikan?: string;
	tahunLulus?: number; // int32
	statusPegawai?: string;
	pangkatGolongan?: string;
	tmtGolongan?: string; // date
	mkg?: string;
	unitKerja?: string;
	jabatan?: string;
	profesi?: string;
	grade?: string;
	tmtKerja?: string; // date
	tmtPegawai?: string; // date
	tmtPensiun?: string; // date
	isAskes?: boolean;
	absensiId?: number; // int32
	noKontrak?: string;
	noNpwp?: string;
	noJamsostek?: string;
	noBpjs?: string;
	noIdCard?: string;
}

export type SingleResultPegawaiResponseRingkasan = Envelope<PegawaiResponseRingkasan>;

export type {
	Biodata,
	DeletedResult,
	GajiPendapatanNonPajakResponse,
	GajiProfilResponse,
	Golongan,
	GolonganResponse,
	Grade,
	Jabatan,
	JabatanMiniResponse,
	JenjangPendidikanResponse,
	KodePajak,
	LevelResponse,
	Organisasi,
	OrganisasiMiniResponse,
	PagePegawaiResponse,
	PageResultPagePegawaiResponse,
	PageableObject,
	PegawaiResponse,
	Profesi,
	ProfesiMiniResponse,
	SavedResultLong,
	SavedResultString,
	SortObject,
} from "../_shared";
