/**
 * shared/auth — authentication & authorization types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 */

export interface PrefPermission {
	name?: string;
}

export interface PrefRole {
	id: string; // minLength 1
	description?: string;
	permissions?: PrefPermission[];
}
