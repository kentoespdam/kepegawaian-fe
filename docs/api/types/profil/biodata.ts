/**
 * biodata — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/biodata/{id}, GET /profil/biodata, GET /profil/biodata/list, GET /profil/biodata/{id}, GET /profil/biodata/{id}/dashboard, GET /profil/biodata/{id}/foto-profil, PATCH /profil/biodata/{id}, POST /profil/biodata, PUT /profil/biodata/{id}, PUT /profil/biodata/{id}/foto-profil
 */

import type {
	Agama,
	Envelope,
	GolonganDarah,
	JenisKelamin,
	JenjangPendidikanResponse,
	KartuIdentitasQuery,
	Page,
	PageEnvelope,
	PageQuery,
	PendidikanQuery,
	StatusKawin,
} from "../_shared";

export interface BiodataSearchParams extends PageQuery {
	nik?: string;
	nama?: string;
	jenisKelamin?: "LAKI_LAKI" | "PEREMPUAN";
	alamat?: string;
	isPegawai?: boolean;
}

export interface BiodataDetail {
	nik?: string;
	nama?: string;
	jenisKelamin?: JenisKelamin;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	alamat?: string;
	telp?: string;
	agama?: Agama;
	ibuKandung?: string;
	pendidikanTerakhirId?: number; // int64
	golonganDarah?: GolonganDarah;
	statusKawin?: StatusKawin;
	fotoProfil?: string;
	notes?: string;
	isPegawai?: boolean;
	pendidikan?: PendidikanQuery[];
	kartuIdentitas?: KartuIdentitasQuery[];
}

export type SingleResultBiodataDetail = Envelope<BiodataDetail>;

export interface BiodataPutRequest {
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
}

export interface BiodataPatchRequest {
	nama?: string;
	alamat?: string;
	jenisKelamin?: JenisKelamin;
	statusKawin?: StatusKawin;
	agama?: Agama;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	ibuKandung?: string;
	telp?: string;
}

export interface BiodataQuery {
	nik?: string;
	nama?: string;
	jenisKelamin?: JenisKelamin;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	alamat?: string;
	telp?: string;
	agama?: Agama;
	ibuKandung?: string;
	pendidikanTerakhirId?: number; // int64
	pendidikanTerakhir?: JenjangPendidikanResponse;
	golonganDarah?: GolonganDarah;
	statusKawin?: StatusKawin;
	fotoProfil?: string;
	notes?: string;
	isPegawai?: boolean;
}

export type PageBiodataQuery = Page<BiodataQuery>;

export type PageResultPageBiodataQuery = PageEnvelope<BiodataQuery>;

export interface BiodataPostRequest {
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
}

export interface PendidikanDashboard {
	tingkat?: string;
	jurusan?: string;
	institusi?: string;
	tahunLulus?: number; // int32
}

export interface BiodataDashboardResponse {
	nik?: string;
	nama?: string;
	jenisKelamin?: string;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	agama?: string;
	statusKawin?: string;
	alamat?: string;
	noTelp?: string;
	email?: string;
	kodePajak?: string;
	ibuKandung?: string;
	detailPendidikanTerakhir?: PendidikanDashboard;
	changedStatus?: boolean;
}

export type SingleResultBiodataDashboardResponse = Envelope<BiodataDashboardResponse>;

export type ListResultBiodataQuery = Envelope<BiodataQuery[]>;

export type {
	DeletedResult,
	JenjangPendidikanResponse,
	KartuIdentitasQuery,
	PageableObject,
	PendidikanQuery,
	SavedResultString,
	SortObject,
} from "../_shared";
