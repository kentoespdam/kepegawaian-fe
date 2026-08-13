/**
 * users — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /system/users, PATCH /system/users/pref/{id}, PATCH /system/users/{id}/status, POST /system/users
 */

import type { Envelope, Page, PageQuery, PrefRole } from "../_shared";

export interface UsersSearchParams extends PageQuery {
	nipam?: string;
	nama?: string;
	statusKerja?:
		| "BERHENTI_OR_KELUAR"
		| "DIRUMAHKAN"
		| "KARYAWAN_AKTIF"
		| "LAMARAN_BARU"
		| "TAHAP_SELEKSI"
		| "DITERIMA"
		| "DIREKOMENDASIKAN"
		| "DITOLAK";
}

export interface Prefs {
	roles?: string[];
}

export interface UserResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	prefs?: Prefs;
	isActive?: boolean;
	isVerified?: boolean;
}

export type PageUserResponse = Page<UserResponse>;

export type SingleResultPageUserResponse = Envelope<PageUserResponse>;

export interface AuthPostRequest {
	id?: string;
	nipam?: string;
	nama?: string;
	password?: string;
	roles?: PrefRole[];
}

export interface UserPatchStatusRequest {
	status?: boolean;
}

export interface SimpleGrantedAuthority {
	authority?: string;
}

export interface AppwriteUser {
	name?: string;
	registration?: string;
	status?: boolean;
	passwordUpdate?: string;
	email?: string;
	phone?: string;
	emailVerification?: boolean;
	phoneVerification?: boolean;
	prefs?: Prefs;
	authorities?: SimpleGrantedAuthority[];
	$id?: string;
	$createdAt?: string;
	$updatedAt?: string;
}

export type SavedResultAppwriteUser = Envelope<AppwriteUser>;

export type { PageableObject, PrefPermission, PrefRole, SavedResultString, SortObject } from "../_shared";
