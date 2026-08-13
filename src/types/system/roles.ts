/**
 * roles — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /system/roles/{id}, DELETE /system/roles/{roleId}/permissions/{permName}, GET /system/roles, GET /system/roles/list, GET /system/roles/{id}, POST /system/roles, POST /system/roles/{roleId}/permissions/{permName}, PUT /system/roles/{id}
 */

import type { Envelope, Page, PageEnvelope, PageQuery, PrefRole } from "../_shared";

export interface RolesSearchParams extends PageQuery {
	id?: string;
}

export type SingleResultPrefRole = Envelope<PrefRole>;

export interface PrefRoleUpdateRequest {
	description?: string;
}

export type PagePrefRole = Page<PrefRole>;

export type PageResultPagePrefRole = PageEnvelope<PrefRole>;

export interface PrefRoleStoreRequest {
	id: string; // minLength 1
	description?: string;
}

export type ListResultPrefRole = Envelope<PrefRole[]>;

export type {
	DeletedResult,
	PageableObject,
	PrefPermission,
	PrefRole,
	SavedResultString,
	SortObject,
} from "../_shared";
