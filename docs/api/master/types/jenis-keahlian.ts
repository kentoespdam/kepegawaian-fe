/**
 * jenis-keahlian — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-keahlian/{id}, GET /master/jenis-keahlian, GET /master/jenis-keahlian/list, GET /master/jenis-keahlian/{id}, POST /master/jenis-keahlian, PUT /master/jenis-keahlian/{id}
 */

import type { Envelope, PageEnvelope } from "./_shared";

export interface JenisKeahlianQuery {
  id?: number; // int64
  nama?: string;
}

export type SingleResultJenisKeahlianQuery = Envelope<JenisKeahlianQuery>;

export interface JenisKeahlianPostRequest {
  nama: string; // minLength 1
}

export type PageResultPageJenisKeahlianQuery = PageEnvelope<JenisKeahlianQuery>;

export interface JenisKeahlianListResponse {
  id?: number; // int64
  nama?: string;
}

export type ListResultJenisKeahlianListResponse = Envelope<JenisKeahlianListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
