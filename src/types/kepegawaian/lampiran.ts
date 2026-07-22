/**
 * lampiran — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /kepegawaian/lampiran/{ref}/{refId}/{id}, DELETE /profil/lampiran/delete/{id}, GET /kepegawaian/lampiran/file/{jenis}/{id}, GET /kepegawaian/lampiran/list/{ref}/{refId}, GET /profil/lampiran/file/{jenis}/{id}, POST /kepegawaian/lampiran, POST /kepegawaian/lampiran/accept, POST /profil/lampiran/accept
 */

import type { Enum1, Enum6, Envelope, LampiranSkQuery } from "../_shared";

export interface LampiranSkPostRequest {
	ref?: Enum1;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

export interface LampiranSkAcceptRequest {
	id: number; // int64, min 1
	ref: Enum1;
	refId: number; // int64, min 1
}

export type ListResultLampiranSkQuery = Envelope<LampiranSkQuery[]>;

export interface LampiranProfilAcceptRequest {
	id: number; // int64, min 1
	ref: Enum6;
	refId: number; // int64, min 1
}

export type { DeletedResult, LampiranSkQuery, SavedResultLong } from "../_shared";
