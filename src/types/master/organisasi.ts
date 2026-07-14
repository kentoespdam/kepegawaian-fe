/**
 * organisasi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/organisasi/{id}, GET /master/organisasi, GET /master/organisasi/list, GET /master/organisasi/{id}, GET /master/organisasi/{id}/parent, POST /master/organisasi, PUT /master/organisasi/{id}
 */

import type { HttpStatusText, OrganisasiMiniResponse, PageableObject, SortObject } from "./_shared";

export interface OrganisasiQuery {
	id?: number; // int64
	kode?: string;
	levelOrganisasi?: number; // int32
	nama?: string;
	shortName?: string;
	category?: string;
	parent?: OrganisasiMiniResponse;
}

export interface SingleResultOrganisasiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: OrganisasiQuery;
	timestamp?: string; // date-time
}

export interface OrganisasiPutRequest {
	kode?: string;
	parentId?: number; // int64
	levelOrganisasi?: number; // int32
	nama: string; // minLength 1
	shortName?: string;
	category?: string;
}

export interface PageOrganisasiQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: OrganisasiQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageOrganisasiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageOrganisasiQuery;
	timestamp?: string; // date-time
}

export interface OrganisasiPostRequest {
	kode?: string;
	parentId?: number; // int64
	levelOrganisasi?: number; // int32
	nama: string; // minLength 1
	shortName?: string;
	category?: string;
}

export interface ListResultOrganisasiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: OrganisasiQuery[];
	timestamp?: string; // date-time
}

export interface OrganisasiListResponse {
	id?: number; // int64
	nama?: string;
}

export interface ListResultOrganisasiListResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: OrganisasiListResponse[];
	timestamp?: string; // date-time
}

export type { DeletedResult, OrganisasiMiniResponse, PageableObject, SavedResultLong, SortObject } from "./_shared";
