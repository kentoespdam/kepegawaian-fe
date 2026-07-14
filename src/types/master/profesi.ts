/**
 * profesi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/profesi/{id}, GET /master/profesi, GET /master/profesi/list, GET /master/profesi/{id}, POST /master/profesi, PUT /master/profesi/{id}
 */

import type {
	HttpStatusText,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageableObject,
	SortObject,
} from "./_shared";

export interface GradeMiniResponse {
	id?: number; // int64
	grade?: number; // int32
	tukin?: number; // double
}

export interface ApdRow {
	id?: number; // int64
	nama?: string;
}

export interface AlatKerjaRow {
	id?: number; // int64
	nama?: string;
}

export interface ProfesiDetail {
	id?: number; // int64
	nama?: string;
	detail?: string;
	resiko?: string;
	organisasi?: OrganisasiMiniResponse;
	jabatan?: JabatanMiniResponse;
	level?: LevelResponse;
	grade?: GradeMiniResponse;
	apdList?: ApdRow[];
	alatKerjaList?: AlatKerjaRow[];
}

export interface SingleResultProfesiDetail {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: ProfesiDetail;
	timestamp?: string; // date-time
}

export interface ProfesiPutRequest {
	organisasiId?: number; // int64, min 1
	jabatanId?: number; // int64, min 1
	gradeId?: number; // int64, min 1
	nama: string; // minLength 1
	detail: string; // minLength 1
	resiko: string; // minLength 1
}

export interface ProfesiQuery {
	id?: number; // int64
	nama?: string;
	detail?: string;
	resiko?: string;
	organisasi?: OrganisasiMiniResponse;
	jabatan?: JabatanMiniResponse;
	level?: LevelResponse;
	grade?: GradeMiniResponse;
}

export interface PageProfesiQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: ProfesiQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageProfesiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageProfesiQuery;
	timestamp?: string; // date-time
}

export interface ProfesiPostRequest {
	organisasiId?: number; // int64, min 1
	jabatanId?: number; // int64, min 1
	gradeId?: number; // int64, min 1
	nama: string; // minLength 1
	detail: string; // minLength 1
	resiko: string; // minLength 1
}

export interface ProfesiListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultProfesiListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: ProfesiListResponse[];
	timestamp?: string; // date-time
}

export type {
	DeletedResult,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageableObject,
	SavedResultLong,
	SortObject,
} from "./_shared";
