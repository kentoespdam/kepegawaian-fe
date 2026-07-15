/**
 * status-pegawai — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : GET /master/status-pegawai/list
 */

import type { HttpStatusText } from "../_shared";

export interface StatusPegawaiResponse {
	id?: string;
	nama?: string;
	urut?: number; // int32
}

export interface ListResultStatusPegawaiResponse {
	status?: number; // int32
	statusText?: HttpStatusText;
	errors?: string[];
	message?: string;
	data?: StatusPegawaiResponse[];
	timestamp?: string; // date-time
}
