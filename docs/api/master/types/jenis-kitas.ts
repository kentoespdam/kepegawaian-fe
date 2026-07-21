/**
 * jenis-kitas — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-kitas/{id}, GET /master/jenis-kitas, GET /master/jenis-kitas/list, GET /master/jenis-kitas/{id}, POST /master/jenis-kitas, PUT /master/jenis-kitas/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export interface JenisKitasSearchParams extends PageQuery {
	nama?: string;
}

export interface JenisKitasQuery {
	id?: number; // int64
	nama?: string;
}

export type SingleResultJenisKitasQuery = Envelope<JenisKitasQuery>;

export interface JenisKitasPostRequest {
	nama: string; // minLength 1
}

export type PageResultPageJenisKitasQuery = PageEnvelope<JenisKitasQuery>;

export interface JenisKitasListResponse {
	id?: number; // int64
	nama?: string;
}

export type ListResultJenisKitasListResponse = Envelope<JenisKitasListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
