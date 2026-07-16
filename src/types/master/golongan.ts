/**
 * golongan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/golongan/{id}, GET /master/golongan, GET /master/golongan/list, GET /master/golongan/{id}, POST /master/golongan, PUT /master/golongan/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "../_shared";

export interface GolonganSearchParams extends PageQuery {
	golongan?: string;
	pangkat?: string;
}

export interface GolonganQuery {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export type SingleResultGolonganQuery = Envelope<GolonganQuery>;

export interface GolonganPostRequest {
	golongan?: string;
	pangkat?: string;
}

export type PageResultPageGolonganQuery = PageEnvelope<GolonganQuery>;

export interface GolonganListResponse {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export type ListResultGolonganListResponse = Envelope<GolonganListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
