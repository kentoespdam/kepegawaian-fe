/**
 * jenis-keahlian — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-keahlian/{id}, GET /master/jenis-keahlian, GET /master/jenis-keahlian/list, GET /master/jenis-keahlian/{id}, POST /master/jenis-keahlian, PUT /master/jenis-keahlian/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface JenisKeahlianQuery {
	id?: number; // int64
	nama?: string;
}

export interface SingleResultJenisKeahlianQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenisKeahlianQuery;
	timestamp?: string; // date-time
}

export interface JenisKeahlianPostRequest {
	nama: string; // minLength 1
}

export interface PageJenisKeahlianQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: JenisKeahlianQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageJenisKeahlianQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageJenisKeahlianQuery;
	timestamp?: string; // date-time
}

export interface JenisKeahlianListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultJenisKeahlianListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenisKeahlianListResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
