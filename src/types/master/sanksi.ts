/**
 * sanksi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/sanksi/{id}, GET /master/sanksi, GET /master/sanksi/jenis-sp/{id}, GET /master/sanksi/list, GET /master/sanksi/{id}, PATCH /master/sanksi/{id}/jenis-sp, POST /master/sanksi, PUT /master/sanksi/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface SanksiMiniResponse {
	id?: number; // int64
	kode?: string;
	keterangan?: string;
	jenisSpId?: number; // int64
}

export interface JenisSpMiniResponse {
	id?: number; // int64
	kode?: string;
	nama?: string;
	sanksiSp?: SanksiMiniResponse[];
}

export interface SanksiQuery {
	id?: number; // int64
	kode?: string;
	keterangan?: string;
	jenisSp?: JenisSpMiniResponse;
	potTkk?: boolean;
	jmlPotTkk?: number; // int32
	isPendingPangkat?: boolean;
	isPendingGaji?: boolean;
	isTurunPangkat?: boolean;
	isTurunJabatan?: boolean;
	isSuspension?: boolean;
	isTerminateDh?: boolean;
	isTerminateTh?: boolean;
}

export interface SingleResultSanksiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: SanksiQuery;
	timestamp?: string; // date-time
}

export interface SanksiPutRequest {
	kode: string; // minLength 1
	keterangan: string; // minLength 1
	jenisSpId: number; // int64, min 1
	potTkk?: boolean;
	jmlPotTkk?: number; // int32
	isPendingPangkat?: boolean;
	isPendingGaji?: boolean;
	isTurunPangkat?: boolean;
	isTurunJabatan?: boolean;
	isSuspension?: boolean;
	isTerminateDh?: boolean;
	isTerminateTh?: boolean;
}

export interface PageSanksiQuery {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: SanksiQuery[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageResultPageSanksiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: PageSanksiQuery;
	timestamp?: string; // date-time
}

export interface SanksiPostRequest {
	kode: string; // minLength 1
	keterangan: string; // minLength 1
	jenisSpId: number; // int64, min 1
	potTkk?: boolean;
	jmlPotTkk?: number; // int32
	isPendingPangkat?: boolean;
	isPendingGaji?: boolean;
	isTurunPangkat?: boolean;
	isTurunJabatan?: boolean;
	isSuspension?: boolean;
	isTerminateDh?: boolean;
	isTerminateTh?: boolean;
}

export interface PatchSanksiJenisSpRequest {
	id?: number; // int64
	jenisSpId?: number; // int64
}

export interface ListResultSanksiQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: SanksiQuery[];
	timestamp?: string; // date-time
}

export interface JenisSpSimple {
	id?: number; // int64
	kode?: string;
	nama?: string;
}

export interface SanksiJenisSpList {
	id?: number; // int64
	kode?: string;
	keterangan?: string;
	jenisSp?: JenisSpSimple;
	potTkk?: boolean;
	jmlPotTkk?: number; // int32
	isPendingPangkat?: boolean;
	isPendingGaji?: boolean;
	isTurunPangkat?: boolean;
	isTurunJabatan?: boolean;
	isSuspension?: boolean;
	isTerminateDh?: boolean;
	isTerminateTh?: boolean;
}

export interface ListResultSanksiJenisSpList {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: SanksiJenisSpList[];
	timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
