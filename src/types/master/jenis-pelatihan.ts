/**
 * jenis-pelatihan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-pelatihan/{id}, GET /master/jenis-pelatihan, GET /master/jenis-pelatihan/list, GET /master/jenis-pelatihan/{id}, POST /master/jenis-pelatihan, PUT /master/jenis-pelatihan/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "../_shared";

export interface JenisPelatihanQuery {
	id?: number; // int64
	nama?: string;
}

export interface SingleResultJenisPelatihanQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenisPelatihanQuery;
	timestamp?: string; // date-time
}

export interface JenisPelatihanPostRequest {
	nama: string; // minLength 1
}

export interface PageJenisPelatihanQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: JenisPelatihanQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageJenisPelatihanQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageJenisPelatihanQuery;
	timestamp?: string; // date-time
}

export interface JenisPelatihanListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultJenisPelatihanListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenisPelatihanListResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
