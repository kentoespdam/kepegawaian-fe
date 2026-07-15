/**
 * grade — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/grade/{id}, GET /master/grade, GET /master/grade/level/{id}, GET /master/grade/list, GET /master/grade/{id}, POST /master/grade, PUT /master/grade/{id}
 */

import type { HttpStatusText, LevelResponse, PageableObject, SortObject } from "../_shared";

export interface GradeQuery {
	id?: number; // int64
	grade?: number; // int32
	tukin?: number; // double
	level?: LevelResponse;
}

export interface SingleResultGradeQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: GradeQuery;
	timestamp?: string; // date-time
}

export interface GradePostRequest {
	levelId?: number; // int64, min 1
	grade?: number; // int32, min 1
	tukin?: number; // double, min 100000
}

export interface PageGradeQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: GradeQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageGradeQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageGradeQuery;
	timestamp?: string; // date-time
}

export interface GradeListResponse {
	id?: number; // int64
	grade?: number; // int32
}

export interface ListResultGradeListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: GradeListResponse[];
	timestamp?: string; // date-time
}

export interface ListResultGradeQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: GradeQuery[];
	timestamp?: string; // date-time
}

export type { DeletedResult, LevelResponse, PageableObject, SavedResultLong, SortObject } from "../_shared";
