/**
 * rumah-dinas — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/rumah-dinas/{id}, GET /master/rumah-dinas, GET /master/rumah-dinas/list, GET /master/rumah-dinas/{id}, POST /master/rumah-dinas, PUT /master/rumah-dinas/{id}
 */

import type { Envelope, PageEnvelope } from "./_shared";

export interface RumahDinasQuery {
  id?: number; // int64
  nama?: string;
  nilai?: number; // double
}

export type SingleResultRumahDinasQuery = Envelope<RumahDinasQuery>;

export interface RumahDinasPostRequest {
  nama?: string;
  nilai?: number; // double
}

export type PageResultPageRumahDinasQuery = PageEnvelope<RumahDinasQuery>;

export interface RumahDinasListResponse {
  id?: number; // int64
  nama?: string;
}

export type ListResultRumahDinasListResponse = Envelope<RumahDinasListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
