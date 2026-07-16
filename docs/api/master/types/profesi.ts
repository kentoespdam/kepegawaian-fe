/**
 * profesi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/profesi/{id}, GET /master/profesi, GET /master/profesi/list, GET /master/profesi/{id}, POST /master/profesi, PUT /master/profesi/{id}
 */

import type { Envelope, JabatanMiniResponse, LevelResponse, OrganisasiMiniResponse, PageEnvelope } from "./_shared";

export interface GradeMiniResponse {
  id?: number; // int64
  grade?: number; // int32
  tukin?: number; // double
}

export interface ApdRow {
  id?: number; // int64
  nama?: string;
}

export interface AlatKerjaRow {
  id?: number; // int64
  nama?: string;
}

export interface ProfesiDetail {
  id?: number; // int64
  nama?: string;
  detail?: string;
  resiko?: string;
  organisasi?: OrganisasiMiniResponse;
  jabatan?: JabatanMiniResponse;
  level?: LevelResponse;
  grade?: GradeMiniResponse;
  apdList?: ApdRow[];
  alatKerjaList?: AlatKerjaRow[];
}

export type SingleResultProfesiDetail = Envelope<ProfesiDetail>;

export interface ProfesiPutRequest {
  organisasiId?: number; // int64, min 1
  jabatanId?: number; // int64, min 1
  gradeId?: number; // int64, min 1
  nama: string; // minLength 1
  detail: string; // minLength 1
  resiko: string; // minLength 1
}

export type PageResultPageProfesiQuery = PageEnvelope<ProfesiQuery>;

export interface ProfesiQuery {
  id?: number; // int64
  nama?: string;
  detail?: string;
  resiko?: string;
  organisasi?: OrganisasiMiniResponse;
  jabatan?: JabatanMiniResponse;
  level?: LevelResponse;
  grade?: GradeMiniResponse;
}

export interface ProfesiPostRequest {
  organisasiId?: number; // int64, min 1
  jabatanId?: number; // int64, min 1
  gradeId?: number; // int64, min 1
  nama: string; // minLength 1
  detail: string; // minLength 1
  resiko: string; // minLength 1
}

export interface ProfesiListResponse {
  id?: number; // int64
  nama?: string;
}

export type ListResultProfesiListResponse = Envelope<ProfesiListResponse[]>;

export type {
  DeletedResult,
  JabatanMiniResponse,
  LevelResponse,
  OrganisasiMiniResponse,
  PageableObject,
  SavedResultLong,
  SortObject,
} from "./_shared";
