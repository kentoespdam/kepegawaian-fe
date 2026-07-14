/**
 * jenjang-pendidikan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenjang-pendidikan/{id}, GET /master/jenjang-pendidikan, GET /master/jenjang-pendidikan/list, GET /master/jenjang-pendidikan/{id}, POST /master/jenjang-pendidikan, POST /master/jenjang-pendidikan/batch, PUT /master/jenjang-pendidikan/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface JenjangPendidikanResponse {
	id?: number; // int64
	nama?: string;
	shortName?: string;
	seq?: number; // int32
	isStatistik?: boolean;
}

export interface SingleResultJenjangPendidikanResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenjangPendidikanResponse;
	timestamp?: string; // date-time
}

export interface JenjangPendidikanPutRequest {
	nama: string; // minLength 1
	shortName?: string;
	seq?: number; // int32, min 1
	isStatistik?: boolean;
}

export interface PageJenjangPendidikanResponse {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: JenjangPendidikanResponse[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageJenjangPendidikanResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageJenjangPendidikanResponse;
	timestamp?: string; // date-time
}

export interface JenjangPendidikanPostRequest {
	nama: string; // minLength 1
	shortName?: string;
	seq?: number; // int32, min 1
	isStatistik?: boolean;
}

export interface ListResultJenjangPendidikanResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JenjangPendidikanResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultListLong, SavedResultLong, SortObject } from "./_shared";
