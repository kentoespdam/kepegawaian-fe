/**
 * jenis-sp — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-sp/{id}, GET /master/jenis-sp, GET /master/jenis-sp/list, GET /master/jenis-sp/{id}, POST /master/jenis-sp, PUT /master/jenis-sp/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "../_shared";

export interface JenisSpSearchParams extends PageQuery {
	kode?: string;
	nama?: string;
}

export interface JenisSpQuery {
	id?: number; // int64
	kode?: string;
	nama?: string;
}

export type SingleResultJenisSpQuery = Envelope<JenisSpQuery>;

export interface JenisSpPutRequest {
	kode?: string;
	nama?: string;
}

export type PageResultPageJenisSpQuery = PageEnvelope<JenisSpQuery>;

export interface JenisSpPostRequest {
	kode?: string;
	nama?: string;
}

export interface JenisSpListResponse {
	id?: number; // int64
	nama?: string;
}

export type ListResultJenisSpListResponse = Envelope<JenisSpListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
