/**
 * rumah-dinas — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/rumah-dinas/{id}, GET /master/rumah-dinas, GET /master/rumah-dinas/list, GET /master/rumah-dinas/{id}, POST /master/rumah-dinas, PUT /master/rumah-dinas/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface RumahDinasQuery {
	id?: number; // int64
	nama?: string;
	nilai?: number; // double
}

export interface SingleResultRumahDinasQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: RumahDinasQuery;
	timestamp?: string; // date-time
}

export interface RumahDinasPostRequest {
	nama?: string;
	nilai?: number; // double
}

export interface PageRumahDinasQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: RumahDinasQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageRumahDinasQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageRumahDinasQuery;
	timestamp?: string; // date-time
}

export interface RumahDinasListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultRumahDinasListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: RumahDinasListResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
