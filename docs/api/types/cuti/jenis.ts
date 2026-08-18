/**
 * jenis — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /cuti/jenis/{id}, GET /cuti/jenis, GET /cuti/jenis/list, GET /cuti/jenis/{id}, POST /cuti/jenis, PUT /cuti/jenis/{id}
 */

import type { CutiJenisMiniResponse, Envelope, Page, PageEnvelope, PageQuery } from "../_shared";

export interface JenisSearchParams extends PageQuery {
	parentId?: number; // int64
	nama?: string;
}

export interface CutiJenisResponse {
	id?: number; // int64
	parent?: CutiJenisMiniResponse;
	nama?: string;
	maxHari?: number; // int32
	potongKuotaTahunan?: boolean;
}

export type SingleResultCutiJenisResponse = Envelope<CutiJenisResponse>;

export interface CutiJenisPutRequest {
	parentId?: number; // int64
	nama: string; // minLength 1
	maxHari?: number; // int32
	potongKuotaTahunan?: boolean;
}

export type PageCutiJenisResponse = Page<CutiJenisResponse>;

export type PageResultPageCutiJenisResponse = PageEnvelope<CutiJenisResponse>;

export interface CutiJenisPostRequest {
	parentId?: number; // int64
	nama: string; // minLength 1
	maxHari?: number; // int32
	potongKuotaTahunan?: boolean;
}

export type ListResultCutiJenisMiniResponse = Envelope<CutiJenisMiniResponse[]>;

export type { CutiJenisMiniResponse, DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
