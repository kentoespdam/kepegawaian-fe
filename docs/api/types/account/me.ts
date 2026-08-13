/**
 * me — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /account/me
 */

import type { Envelope } from "../_shared";

export interface MeResponse {
	id?: string;
	name?: string;
	roles?: string[];
	permissions?: string[];
}

export type SingleResultMeResponse = Envelope<MeResponse>;
