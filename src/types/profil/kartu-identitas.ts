/**
 * kartu-identitas — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/kartu-identitas/lampiran/{id}, DELETE /profil/kartu-identitas/{id}, GET /profil/kartu-identitas, GET /profil/kartu-identitas/lampiran/{id}, GET /profil/kartu-identitas/lampiran/{id}/file, GET /profil/kartu-identitas/{id}, GET /profil/kartu-identitas/{id}/lampiran, POST /profil/kartu-identitas, POST /profil/kartu-identitas/lampiran, PUT /profil/kartu-identitas/{id}
 */

import type {
	Envelope,
	JenisProfilUpdate,
	KartuIdentitasQuery,
	LampiranRow,
	Page,
	PageEnvelope,
	PageQuery,
} from "../_shared";

export interface KartuIdentitasSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	jenisKartuId?: number; // int64
	nomorKartu?: string;
}

export interface KartuIdentitasDetail {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenisKartuId?: number; // int64
	jenisKartuNama?: string;
	nomorKartu?: string;
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
	changedStatus?: string; // byte
	lampiran?: LampiranRow[];
}

export type SingleResultKartuIdentitasDetail = Envelope<KartuIdentitasDetail>;

export interface KartuIdentitasPutRequest {
	nik: string; // minLength 1
	jenisKartuId?: number; // int64, min 1
	nomorKartu: string; // minLength 1
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
}

export type PageKartuIdentitasQuery = Page<KartuIdentitasQuery>;

export type PageResultPageKartuIdentitasQuery = PageEnvelope<KartuIdentitasQuery>;

export interface KartuIdentitasPostRequest {
	nik: string; // minLength 1
	jenisKartuId?: number; // int64, min 1
	nomorKartu: string; // minLength 1
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
}

export interface KartuIdentitasLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

export type {
	DeletedResult,
	KartuIdentitasQuery,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
