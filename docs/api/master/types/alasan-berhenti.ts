/**
 * alasan-berhenti — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/alasan-berhenti/{id}, GET /master/alasan-berhenti, GET /master/alasan-berhenti/list, GET /master/alasan-berhenti/{id}, POST /master/alasan-berhenti, PUT /master/alasan-berhenti/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export interface AlasanBerhentiSearchParams extends PageQuery {
	nama?: string;
}

export interface AlasanBerhentiQuery {
	id?: number; // int64
	nama?: string;
	notes?: string;
}

export type SingleResultAlasanBerhentiQuery = Envelope<AlasanBerhentiQuery>;

export interface AlasanBerhentiPostRequest {
	nama: string; // minLength 1
	notes?: string;
}

export type PageResultPageAlasanBerhentiQuery = PageEnvelope<AlasanBerhentiQuery>;

export interface AlasanBerhentiListResponse {
	id?: number; // int64
	nama?: string;
}

export type ListResultAlasanBerhentiListResponse = Envelope<AlasanBerhentiListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
