/**
 * alat-kerja — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/alat-kerja/{id}, GET /master/alat-kerja/{id}, POST /master/alat-kerja, PUT /master/alat-kerja/{id}
 */

import type { HttpStatusText } from "./_shared";

export interface AlatKerjaQuery {
  id?: number; // int64
  nama?: string;
  profesiId?: number; // int64
}

export interface SingleResultAlatKerjaQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: AlatKerjaQuery;
  timestamp?: string; // date-time
}

export interface AlatKerjaPostRequest {
  profesiId: number; // int64
  nama: string; // minLength 1
}

export type { DeletedResult, SavedResultLong } from "./_shared";
