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
	Envelope,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageEnvelope,
	PageQuery,
} from "./_shared";

export interface JabatanSearchParams extends PageQuery {
	kode?: string;
	nama?: string;
	parentId?: number; // int64
	organisasiId?: number; // int64
	levelId?: number; // int64
}

export interface JabatanQuery {
	id?: number; // int64
	kode?: string;
	nama?: string;
	parent?: JabatanMiniResponse;
	organisasi?: OrganisasiMiniResponse;
	level?: LevelResponse;
}

export type SingleResultJabatanQuery = Envelope<JabatanQuery>;

export interface JabatanPutRequest {
	kode: string; // minLength 1
	parentId?: number; // int64, min 1
	organisasiId?: number; // int64, min 1
	levelId?: number; // int64, min 1
	nama: string; // minLength 1
}

export type PageResultPageJabatanQuery = PageEnvelope<JabatanQuery>;

export interface JabatanPostRequest {
	kode: string; // minLength 1
	parentId?: number; // int64, min 1
	organisasiId?: number; // int64, min 1
	levelId?: number; // int64, min 1
	nama: string; // minLength 1
}

export type ListResultJabatanQuery = Envelope<JabatanQuery[]>;

export interface JabatanListResponse {
	id?: number; // int64
	nama?: string;
	levelId?: number; // int64
}

export type ListResultJabatanListResponse = Envelope<JabatanListResponse[]>;

export type {
	DeletedResult,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageableObject,
	SavedResultLong,
	SortObject,
} from "./_shared";
