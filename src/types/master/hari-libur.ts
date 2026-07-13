/**
 * hari-libur — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/hari-libur/{id}, GET /master/hari-libur, GET /master/hari-libur/list, GET /master/hari-libur/{id}, POST /master/hari-libur, PUT /master/hari-libur/{id}
 */

import type { HttpStatusText, PageableObject, SortObject } from "./_shared";

export interface HariLiburQuery {
  id?: number; // int64
  tanggal?: string; // date
  jenisLibur?: string;
  notes?: string;
}

export interface SingleResultHariLiburQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: HariLiburQuery;
  timestamp?: string; // date-time
}

export interface HariLiburPostRequest {
  tanggal: string; // date
  jenisLibur: "LIBUR_NASIONAL" | "CUTI_BERSAMA";
  notes?: string;
}

export interface PageHariLiburQuery {
  totalElements?: number; // int64
  totalPages?: number; // int32
  size?: number; // int32
  content?: HariLiburQuery[];
  number?: number; // int32
  numberOfElements?: number; // int32
  pageable?: PageableObject;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

export interface PageResultPageHariLiburQuery {
  status?: number; // int32
  statusText?: HttpStatusText;
  data?: PageHariLiburQuery;
  timestamp?: string; // date-time
}

export interface HariLiburListResponse {
  id?: number; // int64
  tanggal?: string; // date
  jenisLibur?: string;
}

export interface ListResultHariLiburListResponse {
  status?: number; // int32
  statusText?: HttpStatusText;
  errors?: string[];
  message?: string;
  data?: HariLiburListResponse[];
  timestamp?: string; // date-time
}

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
