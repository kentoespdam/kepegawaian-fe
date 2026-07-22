/**
 * level — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /master/level/{id}, GET /master/level, GET /master/level/list, GET /master/level/{id}, POST /master/level, POST /master/level/batch, PUT /master/level/{id}
 */

import type { Envelope, LevelResponse, Page, PageEnvelope, PageQuery } from "../_shared";

export interface LevelSearchParams extends PageQuery {
	nama?: string;
}

export type SingleResultLevelResponse = Envelope<LevelResponse>;

export interface LevelPostRequest {
	nama?: string;
}

export type PageLevelResponse = Page<LevelResponse>;

export type PageResultPageLevelResponse = PageEnvelope<LevelResponse>;

export type ListResultLevelResponse = Envelope<LevelResponse[]>;

export type {
	DeletedResult,
	LevelResponse,
	PageableObject,
	SavedResultListLong,
	SavedResultLong,
	SortObject,
} from "../_shared";
