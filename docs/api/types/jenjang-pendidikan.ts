/**
 * jenjang-pendidikan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /master/jenjang-pendidikan/{id}, GET /master/jenjang-pendidikan, GET /master/jenjang-pendidikan/list, GET /master/jenjang-pendidikan/{id}, POST /master/jenjang-pendidikan, POST /master/jenjang-pendidikan/batch, PUT /master/jenjang-pendidikan/{id}
 */

import type { Envelope, JenjangPendidikanResponse, PageEnvelope, PageQuery } from "./_shared";

export interface JenjangPendidikanSearchParams extends PageQuery {
  nama?: string;
}

export type SingleResultJenjangPendidikanResponse = Envelope<JenjangPendidikanResponse>;

export interface JenjangPendidikanPutRequest {
  nama: string; // minLength 1
  shortName?: string;
  seq?: number; // int32, min 1
  isStatistik?: boolean;
}

export type PageResultPageJenjangPendidikanResponse = PageEnvelope<JenjangPendidikanResponse>;

export interface JenjangPendidikanPostRequest {
  nama: string; // minLength 1
  shortName?: string;
  seq?: number; // int32, min 1
  isStatistik?: boolean;
}

export type ListResultJenjangPendidikanResponse = Envelope<JenjangPendidikanResponse[]>;

export type {
  DeletedResult,
  JenjangPendidikanResponse,
  PageableObject,
  SavedResultListLong,
  SavedResultLong,
  SortObject,
} from "./_shared";
