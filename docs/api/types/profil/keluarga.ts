/**
 * keluarga — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/keluarga/lampiran/{id}, DELETE /profil/keluarga/{id}, GET /profil/keluarga, GET /profil/keluarga/lampiran/{id}, GET /profil/keluarga/lampiran/{id}/file, GET /profil/keluarga/{id}, GET /profil/keluarga/{id}/lampiran, POST /profil/keluarga, POST /profil/keluarga/lampiran, PUT /profil/keluarga/{id}
 */

import type { Envelope, JenjangPendidikanResponse, LampiranRow, Page, PageEnvelope, PageQuery } from "../_shared";

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

export type PageProfilKeluargaQuery = Page<ProfilKeluargaQuery>;

export type PageResultPageProfilKeluargaQuery = PageEnvelope<ProfilKeluargaQuery>;

export type {
	DeletedResult,
	JenjangPendidikanResponse,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	ProfilKeluargaLampiranPostRequest,
	ProfilKeluargaPostRequest,
	ProfilKeluargaPutRequest,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
