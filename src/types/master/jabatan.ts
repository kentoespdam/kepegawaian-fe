/**
 * jabatan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jabatan/{id}, GET /master/jabatan, GET /master/jabatan/list, GET /master/jabatan/organisasi/{id}, GET /master/jabatan/{id}, GET /master/jabatan/{id}/parent, POST /master/jabatan, PUT /master/jabatan/{id}
 */

import type {
	HttpStatusText,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageableObject,
	SortObject,
} from "../_shared";

export interface JabatanQuery {
	id?: number; // int64
	kode?: string;
	nama?: string;
	parent?: JabatanMiniResponse;
	organisasi?: OrganisasiMiniResponse;
	level?: LevelResponse;
}

export interface SingleResultJabatanQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JabatanQuery;
	timestamp?: string; // date-time
}

export interface JabatanPutRequest {
	kode: string; // minLength 1
	parentId?: number; // int64, min 1
	organisasiId?: number; // int64, min 1
	levelId?: number; // int64, min 1
	nama: string; // minLength 1
}

export interface PageJabatanQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: JabatanQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageJabatanQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageJabatanQuery;
	timestamp?: string; // date-time
}

export interface JabatanPostRequest {
	kode: string; // minLength 1
	parentId?: number; // int64, min 1
	organisasiId?: number; // int64, min 1
	levelId?: number; // int64, min 1
	nama: string; // minLength 1
}

export interface ListResultJabatanQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JabatanQuery[];
	timestamp?: string; // date-time
}

export interface JabatanListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultJabatanListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: JabatanListResponse[];
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
} from "../_shared";
