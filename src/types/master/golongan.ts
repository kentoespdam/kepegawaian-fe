/**
 * golongan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/golongan/{id}, GET /master/golongan, GET /master/golongan/list, GET /master/golongan/{id}, POST /master/golongan, PUT /master/golongan/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "../_shared";

export interface GolonganQuery {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export interface SingleResultGolonganQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: GolonganQuery;
	timestamp?: string; // date-time
}

export interface GolonganPostRequest {
	golongan?: string;
	pangkat?: string;
}

export interface PageGolonganQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: GolonganQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageGolonganQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageGolonganQuery;
	timestamp?: string; // date-time
}

export interface GolonganListResponse {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export interface ListResultGolonganListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: GolonganListResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
