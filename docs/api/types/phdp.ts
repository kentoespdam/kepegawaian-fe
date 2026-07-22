/**
 * phdp — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /penggajian/phdp/{id}, GET /penggajian/phdp, GET /penggajian/phdp/list, GET /penggajian/phdp/{id}, POST /penggajian/phdp, PUT /penggajian/phdp/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export interface PhdpSearchParams extends PageQuery {
  kondisi?: string;
}

export interface GajiPhdpResponse {
  id?: number; // int64
  urut?: number; // int32
  kondisi?: string;
  formula?: string;
}

export type SingleResultGajiPhdpResponse = Envelope<GajiPhdpResponse>;

export interface GajiPhdpPutRequest {
  urut?: number; // int32
  kondisi: string; // minLength 1
  formula: string; // minLength 1
}

export type PageResultPageGajiPhdpResponse = PageEnvelope<GajiPhdpResponse>;

export interface GajiPhdpPostRequest {
  urut?: number; // int32
  kondisi: string; // minLength 1
  formula: string; // minLength 1
}

export type ListResultGajiPhdpResponse = Envelope<GajiPhdpResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
