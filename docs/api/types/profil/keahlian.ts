/**
 * keahlian — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/keahlian/lampiran/{id}, DELETE /profil/keahlian/{id}, GET /profil/keahlian, GET /profil/keahlian/lampiran/{id}, GET /profil/keahlian/lampiran/{id}/file, GET /profil/keahlian/{id}, GET /profil/keahlian/{id}/lampiran, POST /profil/keahlian, POST /profil/keahlian/lampiran, PUT /profil/keahlian/{id}
 */

import type { Envelope, JenisProfilUpdate, LampiranRow, Page, PageEnvelope, PageQuery } from "../_shared";

/** Tingkat kemampuan keahlian (KURANG, BAIK, CUKUP). */
export type TingkatKemampuan = "KURANG" | "BAIK" | "CUKUP";

export interface KeahlianSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	jenisKeahlianId?: number; // int64
	disetujui?: boolean;
}

export interface JenisKeahlianResponse {
	id?: number; // int64
	nama?: string;
}

export interface KeahlianQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenisKeahlian?: JenisKeahlianResponse;
	kualifikasi?: string;
	sertifikasi?: boolean;
	institusi?: string;
	tahun?: number; // int32
	masaBerlaku?: string;
	disetujui?: boolean;
	tanggalPengajuan?: string; // date-time
	tanggalDisetujui?: string; // date-time
	disetujuiOleh?: string;
	changedStatus?: string; // byte
}

export interface KeahlianDetail {
	query?: KeahlianQuery;
	lampiran?: LampiranRow[];
}

export type SingleResultKeahlianDetail = Envelope<KeahlianDetail>;

export interface KeahlianPutRequest {
	biodataId: string; // minLength 1
	keahlianId?: number; // int64, min 1
	kualifikasi: TingkatKemampuan;
	sertifikasi?: boolean;
	institusi: string; // minLength 1
	tahun?: number; // int32, min 1970
	masaBerlaku?: string;
}

export type PageKeahlianQuery = Page<KeahlianQuery>;

export type PageResultPageKeahlianQuery = PageEnvelope<KeahlianQuery>;

export interface KeahlianPostRequest {
	biodataId: string; // minLength 1
	keahlianId?: number; // int64, min 1
	kualifikasi: TingkatKemampuan;
	sertifikasi?: boolean;
	institusi: string; // minLength 1
	tahun?: number; // int32, min 1970
	masaBerlaku?: string;
}

export interface KeahlianLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

export type {
	DeletedResult,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
