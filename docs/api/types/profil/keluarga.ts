/**
 * keluarga — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/keluarga/lampiran/{id}, DELETE /profil/keluarga/{id}, GET /profil/keluarga, GET /profil/keluarga/lampiran/{id}, GET /profil/keluarga/lampiran/{id}/file, GET /profil/keluarga/{id}, GET /profil/keluarga/{id}/lampiran, POST /profil/keluarga, POST /profil/keluarga/lampiran, PUT /profil/keluarga/{id}
 */

import type {
	Enum2,
	Enum3,
	Enum6,
	Envelope,
	JenjangPendidikanResponse,
	LampiranRow,
	PageEnvelope,
	PageQuery,
} from "../_shared";

export type Enum17 = "SUAMI" | "ISTRI" | "AYAH" | "IBU" | "ANAK" | "SAUDARA";
export type Enum18 = "BELUM_SEKOLAH" | "SEKOLAH" | "SELESAI_SEKOLAH";

export interface KeluargaSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	hubunganKeluarga?: number; // int32
	jenisKelamin?: number; // int32
	isDeleted?: boolean;
}

export interface ProfilKeluargaQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	nik?: string;
	nama?: string;
	jenisKelamin?: string;
	agama?: string;
	hubunganKeluarga?: string;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	tanggungan?: boolean;
	pendidikanId?: number; // int64
	jenjangPendidikan?: JenjangPendidikanResponse;
	statusPendidikan?: string;
	statusKawin?: boolean;
	notes?: string;
	version?: number; // int32
	isDeleted?: boolean;
	changedStatus?: boolean;
}

export interface ProfilKeluargaDetail {
	query?: ProfilKeluargaQuery;
	lampiran?: LampiranRow[];
}

export type SingleResultProfilKeluargaDetail = Envelope<ProfilKeluargaDetail>;

export interface ProfilKeluargaPutRequest {
	biodataId: string; // minLength 1
	nik?: string;
	nama: string; // minLength 1
	jenisKelamin: Enum2;
	agama: Enum3;
	hubunganKeluarga: Enum17;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	tanggungan: boolean;
	pendidikanId?: number; // int64
	statusPendidikan?: Enum18;
	statusKawin: boolean;
	notes?: string;
}

export type PageResultPageProfilKeluargaQuery = PageEnvelope<ProfilKeluargaQuery>;

export interface ProfilKeluargaPostRequest {
	biodataId: string; // minLength 1
	nik?: string;
	nama: string; // minLength 1
	jenisKelamin: Enum2;
	agama: Enum3;
	hubunganKeluarga: Enum17;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	tanggungan: boolean;
	pendidikanId?: number; // int64
	statusPendidikan?: Enum18;
	statusKawin: boolean;
	notes?: string;
}

export interface ProfilKeluargaLampiranPostRequest {
	ref?: Enum6;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

export type {
	DeletedResult,
	JenjangPendidikanResponse,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
