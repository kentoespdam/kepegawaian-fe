/**
 * pelatihan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/pelatihan/lampiran/{id}, DELETE /profil/pelatihan/{id}, GET /profil/pelatihan, GET /profil/pelatihan/lampiran/{id}, GET /profil/pelatihan/lampiran/{id}/file, GET /profil/pelatihan/{id}, GET /profil/pelatihan/{id}/lampiran, POST /profil/pelatihan, POST /profil/pelatihan/lampiran, PUT /profil/pelatihan/{id}
 */

import type { Envelope, LampiranRow, Page, PageEnvelope, PageQuery } from "../_shared";

export interface PelatihanSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	jenisPelatihanId?: number; // int64
	nama?: string;
	lembaga?: string;
}

export interface PelatihanDetail {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenisPelatihanId?: number; // int64
	jenisPelatihanNama?: string;
	nama?: string;
	lembaga?: string;
	tanggalMulai?: string; // date
	tanggalSelesai?: string; // date
	lulus?: boolean;
	nilai?: string;
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
	changedStatus?: string; // byte
	lampiran?: LampiranRow[];
}

export type SingleResultPelatihanDetail = Envelope<PelatihanDetail>;

export interface PelatihanQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenisPelatihanId?: number; // int64
	jenisPelatihanNama?: string;
	nama?: string;
	lembaga?: string;
	tanggalMulai?: string; // date
	tanggalSelesai?: string; // date
	lulus?: boolean;
	nilai?: string;
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
	changedStatus?: string; // byte
}

export type PagePelatihanQuery = Page<PelatihanQuery>;

export type PageResultPagePelatihanQuery = PageEnvelope<PelatihanQuery>;

export type {
	DeletedResult,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	PelatihanLampiranPostRequest,
	PelatihanPostRequest,
	PelatihanPutRequest,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
