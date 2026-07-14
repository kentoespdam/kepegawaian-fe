/**
 * level — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/level/{id}, GET /master/level, GET /master/level/list, GET /master/level/{id}, POST /master/level, POST /master/level/batch, PUT /master/level/{id}
 */

import type { HttpStatusText, LevelResponse, PageableObject, SortObject } from "./_shared";

export interface SingleResultLevelResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: LevelResponse;
	timestamp?: string; // date-time
}

export interface LevelPostRequest {
	nama?: string;
}

export interface PageLevelResponse {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: LevelResponse[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageLevelResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageLevelResponse;
	timestamp?: string; // date-time
}

export interface ListResultLevelResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: LevelResponse[];
	timestamp?: string; // date-time
}

export type {
	DeletedResult,
	LevelResponse,
	PageableObject,
	SavedResultListLong,
	SavedResultLong,
	SortObject,
} from "./_shared";
