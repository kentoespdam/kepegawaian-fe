/**
 * sanksi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /master/sanksi/{id}, GET /master/sanksi, GET /master/sanksi/jenis-sp/{id}, GET /master/sanksi/list, GET /master/sanksi/{id}, PATCH /master/sanksi/{id}/jenis-sp, POST /master/sanksi, PUT /master/sanksi/{id}
 */

import type { Envelope, JenisSpMiniResponse, PageEnvelope, PageQuery } from "../_shared";

export interface SanksiSearchParams extends PageQuery {
	kode?: string;
	keterangan?: string;
	jenisSpId?: number; // int64
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

export type SingleResultSanksiQuery = Envelope<SanksiQuery>;

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

export type PageResultPageSanksiQuery = PageEnvelope<SanksiQuery>;

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

export type ListResultSanksiQuery = Envelope<SanksiQuery[]>;

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

export type ListResultSanksiJenisSpList = Envelope<SanksiJenisSpList[]>;

export type {
	DeletedResult,
	JenisSpMiniResponse,
	PageableObject,
	SanksiMiniResponse,
	SavedResultLong,
	SortObject,
} from "../_shared";
