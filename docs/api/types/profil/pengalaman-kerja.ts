/**
 * pengalaman-kerja — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/pengalaman-kerja/lampiran/{id}, DELETE /profil/pengalaman-kerja/{id}, GET /profil/pengalaman-kerja, GET /profil/pengalaman-kerja/lampiran/{id}/detail, GET /profil/pengalaman-kerja/lampiran/{id}/file, GET /profil/pengalaman-kerja/lampiran/{id}/list, GET /profil/pengalaman-kerja/{id}, POST /profil/pengalaman-kerja, POST /profil/pengalaman-kerja/lampiran, PUT /profil/pengalaman-kerja/{id}
 */

import type { Envelope, LampiranRow, Page, PageEnvelope, PageQuery } from "../_shared";

export interface PengalamanKerjaSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	namaPerusahaan?: string;
	jabatan?: string;
}

export interface PengalamanKerjaDetail {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	namaPerusahaan?: string;
	typePerusahaan?: string;
	jabatan?: string;
	lokasi?: string;
	tahunMasuk?: number; // int32
	tahunKeluar?: number; // int32
	notes?: string;
	changedStatus?: string; // byte
	lampiran?: LampiranRow[];
}

export type SingleResultPengalamanKerjaDetail = Envelope<PengalamanKerjaDetail>;

export interface PengalamanKerjaQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	namaPerusahaan?: string;
	typePerusahaan?: string;
	jabatan?: string;
	lokasi?: string;
	tahunMasuk?: number; // int32
	tahunKeluar?: number; // int32
	notes?: string;
	changedStatus?: string; // byte
}

export type PagePengalamanKerjaQuery = Page<PengalamanKerjaQuery>;

export type PageResultPagePengalamanKerjaQuery = PageEnvelope<PengalamanKerjaQuery>;

export type {
	DeletedResult,
	LampiranProfilQuery,
	LampiranRow,
	ListResultLampiranProfilQuery,
	PageableObject,
	PengalamanKerjaPostRequest,
	PengalamanKerjaPutRequest,
	PengalamanLampiranPostRequest,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
