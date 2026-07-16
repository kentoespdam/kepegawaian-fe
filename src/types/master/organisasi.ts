/**
 * organisasi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/organisasi/{id}, GET /master/organisasi, GET /master/organisasi/list, GET /master/organisasi/{id}, GET /master/organisasi/{id}/parent, POST /master/organisasi, PUT /master/organisasi/{id}
 */

import type { Envelope, OrganisasiMiniResponse, PageEnvelope, PageQuery } from "../_shared";

export interface OrganisasiSearchParams extends PageQuery {
	kode?: string;
	nama?: string;
	parentId?: number; // int64
	levelOrg?: number; // int32
	category?: string;
}

export interface OrganisasiQuery {
	id?: number; // int64
	kode?: string;
	levelOrganisasi?: number; // int32
	nama?: string;
	shortName?: string;
	category?: string;
	parent?: OrganisasiMiniResponse;
}

export type SingleResultOrganisasiQuery = Envelope<OrganisasiQuery>;

export interface OrganisasiPutRequest {
	kode?: string;
	parentId?: number; // int64
	levelOrganisasi?: number; // int32
	nama: string; // minLength 1
	shortName?: string;
	category?: string;
}

export type PageResultPageOrganisasiQuery = PageEnvelope<OrganisasiQuery>;

export interface OrganisasiPostRequest {
	kode?: string;
	parentId?: number; // int64
	levelOrganisasi?: number; // int32
	nama: string; // minLength 1
	shortName?: string;
	category?: string;
}

export type ListResultOrganisasiQuery = Envelope<OrganisasiQuery[]>;

export interface OrganisasiListResponse {
	id?: number; // int64
	nama?: string;
}

export type ListResultOrganisasiListResponse = Envelope<OrganisasiListResponse[]>;

export type { DeletedResult, OrganisasiMiniResponse, PageableObject, SavedResultLong, SortObject } from "../_shared";
