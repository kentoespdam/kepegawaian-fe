/**
 * pelatihan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/pelatihan/lampiran/{id}, DELETE /profil/pelatihan/{id}, GET /profil/pelatihan, GET /profil/pelatihan/lampiran/{id}, GET /profil/pelatihan/lampiran/{id}/file, GET /profil/pelatihan/{id}, GET /profil/pelatihan/{id}/lampiran, POST /profil/pelatihan, POST /profil/pelatihan/lampiran, PUT /profil/pelatihan/{id}
 */

import type { Envelope, JenisProfilUpdate, LampiranRow, PageEnvelope, PageQuery } from "../_shared";

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

export interface PelatihanPutRequest {
	biodataId: string; // minLength 1
	jenisPelatihanId?: number; // int64, min 1
	nama: string; // minLength 1
	lembaga: string; // minLength 1
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	lulus?: boolean;
	nilai: string; // minLength 1
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
}

export type PageResultPagePelatihanQuery = PageEnvelope<PelatihanQuery>;

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

export interface PelatihanPostRequest {
	biodataId: string; // minLength 1
	jenisPelatihanId?: number; // int64, min 1
	nama: string; // minLength 1
	lembaga: string; // minLength 1
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	lulus?: boolean;
	nilai: string; // minLength 1
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
}

export interface PelatihanLampiranPostRequest {
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
