/**
 * jenis-kitas — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-kitas/{id}, GET /master/jenis-kitas, GET /master/jenis-kitas/list, GET /master/jenis-kitas/{id}, POST /master/jenis-kitas, PUT /master/jenis-kitas/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface JenisKitasQuery {
  id?: number; // int64
  nama?: string;
}

export interface SingleResultJenisKitasQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: JenisKitasQuery;
  timestamp?: string; // date-time
}

export interface JenisKitasPostRequest {
  nama: string; // minLength 1
}

export interface PageJenisKitasQuery {
  totalElements?: number; // int64
  totalPages?: number; // int32
  size?: number; // int32
  content?: JenisKitasQuery[];
  number?: number; // int32
  numberOfElements?: number; // int32
  pageable?: PageableObject;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageResultPageJenisKitasQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  data?: PageJenisKitasQuery;
  timestamp?: string; // date-time
}

export interface JenisKitasListResponse {
  id?: number; // int64
  nama?: string;
}

export interface ListResultJenisKitasListResponse {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: JenisKitasListResponse[];
  timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
