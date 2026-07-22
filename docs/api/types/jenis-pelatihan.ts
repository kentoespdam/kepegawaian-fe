/**
 * jenis-pelatihan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /master/jenis-pelatihan/{id}, GET /master/jenis-pelatihan, GET /master/jenis-pelatihan/list, GET /master/jenis-pelatihan/{id}, POST /master/jenis-pelatihan, PUT /master/jenis-pelatihan/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export interface JenisPelatihanSearchParams extends PageQuery {
  nama?: string;
}

export interface JenisPelatihanQuery {
  id?: number; // int64
  nama?: string;
}

export type SingleResultJenisPelatihanQuery = Envelope<JenisPelatihanQuery>;

export interface JenisPelatihanPostRequest {
  nama: string; // minLength 1
}

export type PageResultPageJenisPelatihanQuery = PageEnvelope<JenisPelatihanQuery>;

export interface JenisPelatihanListResponse {
  id?: number; // int64
  nama?: string;
}

export type ListResultJenisPelatihanListResponse = Envelope<JenisPelatihanListResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
