/**
 * alasan-berhenti — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/alasan-berhenti/{id}, GET /master/alasan-berhenti, GET /master/alasan-berhenti/list, GET /master/alasan-berhenti/{id}, POST /master/alasan-berhenti, PUT /master/alasan-berhenti/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface AlasanBerhentiQuery {
  id?: number; // int64
  nama?: string;
  notes?: string;
}

export interface SingleResultAlasanBerhentiQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: AlasanBerhentiQuery;
  timestamp?: string; // date-time
}

export interface AlasanBerhentiPostRequest {
  nama: string; // minLength 1
  notes?: string;
}

export interface PageAlasanBerhentiQuery {
  totalElements?: number; // int64
  totalPages?: number; // int32
  size?: number; // int32
  content?: AlasanBerhentiQuery[];
  number?: number; // int32
  numberOfElements?: number; // int32
  pageable?: PageableObject;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageResultPageAlasanBerhentiQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  data?: PageAlasanBerhentiQuery;
  timestamp?: string; // date-time
}

export interface AlasanBerhentiListResponse {
  id?: number; // int64
  nama?: string;
}

export interface ListResultAlasanBerhentiListResponse {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: AlasanBerhentiListResponse[];
  timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
