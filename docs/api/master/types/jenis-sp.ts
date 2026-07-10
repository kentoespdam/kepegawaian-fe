/**
 * jenis-sp — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/jenis-sp/{id}, GET /master/jenis-sp, GET /master/jenis-sp/list, GET /master/jenis-sp/{id}, POST /master/jenis-sp, PUT /master/jenis-sp/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface JenisSpQuery {
  id?: number; // int64
  kode?: string;
  nama?: string;
}

export interface SingleResultJenisSpQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: JenisSpQuery;
  timestamp?: string; // date-time
}

export interface JenisSpPutRequest {
  kode?: string;
  nama?: string;
}

export interface PageJenisSpQuery {
  totalElements?: number; // int64
  totalPages?: number; // int32
  size?: number; // int32
  content?: JenisSpQuery[];
  number?: number; // int32
  numberOfElements?: number; // int32
  pageable?: PageableObject;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageResultPageJenisSpQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  data?: PageJenisSpQuery;
  timestamp?: string; // date-time
}

export interface JenisSpPostRequest {
  kode?: string;
  nama?: string;
}

export interface JenisSpListResponse {
  id?: number; // int64
  nama?: string;
}

export interface ListResultJenisSpListResponse {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: JenisSpListResponse[];
  timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
