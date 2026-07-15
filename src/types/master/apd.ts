/**
 * apd — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/apd/{id}, GET /master/apd/{id}, POST /master/apd, PUT /master/apd/{id}
 */

import type { HttpStatusText } from "../_shared";

export interface ApdQuery {
	id?: number; // int64
	nama?: string;
	profesiId?: number; // int64
}

export interface SingleResultApdQuery {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: ApdQuery;
	timestamp?: string; // date-time
}

export interface ApdPostRequest {
	profesiId: number; // int64
	nama: string; // minLength 1
}

export type { DeletedResult, SavedResultLong } from "../_shared";
