/**
 * apd — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/apd/{id}, GET /master/apd/{id}, POST /master/apd, PUT /master/apd/{id}
 */

import type { Envelope } from "./_shared";

export interface ApdQuery {
  id?: number; // int64
  nama?: string;
  profesiId?: number; // int64
}

export type SingleResultApdQuery = Envelope<ApdQuery>;

export interface ApdPostRequest {
  profesiId: number; // int64
  nama: string; // minLength 1
}

export type { DeletedResult, SavedResultLong } from "./_shared";
