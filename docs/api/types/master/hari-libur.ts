/**
 * hari-libur — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /master/hari-libur/{id}, GET /master/hari-libur, GET /master/hari-libur/list, GET /master/hari-libur/{id}, POST /master/hari-libur, PUT /master/hari-libur/{id}
 */

import type { Envelope, Page, PageEnvelope, PageQuery } from "../_shared";

export interface HariLiburSearchParams extends PageQuery {
	tahun?: number; // int32
	bulan?: number; // int32
	jenisLibur?: string;
}

export interface HariLiburQuery {
	id?: number; // int64
	tanggal?: string; // date
	jenisLibur?: string;
	notes?: string;
}

export type SingleResultHariLiburQuery = Envelope<HariLiburQuery>;

export interface HariLiburPostRequest {
	tanggal: string; // date
	jenisLibur: "LIBUR_NASIONAL" | "CUTI_BERSAMA";
	notes?: string;
}

export type PageHariLiburQuery = Page<HariLiburQuery>;

export type PageResultPageHariLiburQuery = PageEnvelope<HariLiburQuery>;

export interface HariLiburListResponse {
	id?: number; // int64
	tanggal?: string; // date
	jenisLibur?: string;
}

export type ListResultHariLiburListResponse = Envelope<HariLiburListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
