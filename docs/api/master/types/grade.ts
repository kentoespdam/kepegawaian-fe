/**
 * grade — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/grade/{id}, GET /master/grade, GET /master/grade/level/{id}, GET /master/grade/list, GET /master/grade/{id}, POST /master/grade, PUT /master/grade/{id}
 */

import type { Envelope, LevelResponse, PageEnvelope, PageQuery } from "./_shared";

export interface GradeSearchParams extends PageQuery {
  levelId?: number; // int64
  grade?: number; // int32
}

export interface GradeQuery {
  id?: number; // int64
  grade?: number; // int32
  tukin?: number; // double
  level?: LevelResponse;
}

export type SingleResultGradeQuery = Envelope<GradeQuery>;

export interface GradePostRequest {
  levelId?: number; // int64, min 1
  grade?: number; // int32, min 1
  tukin?: number; // double, min 100000
}

export type PageResultPageGradeQuery = PageEnvelope<GradeQuery>;

export interface GradeListResponse {
  id?: number; // int64
  grade?: number; // int32
}

export type ListResultGradeListResponse = Envelope<GradeListResponse[]>;

export type ListResultGradeQuery = Envelope<GradeQuery[]>;

export type { DeletedResult, LevelResponse, PageableObject, SavedResultLong, SortObject } from "./_shared";
