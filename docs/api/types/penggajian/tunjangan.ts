/**
 * tunjangan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/tunjangan/{jenis}/{id}, GET /penggajian/tunjangan, GET /penggajian/tunjangan/{jenis}, GET /penggajian/tunjangan/{jenis}/{id}, POST /penggajian/tunjangan/{jenis}, PUT /penggajian/tunjangan/{jenis}/{id}
 */

import type { Envelope, GolonganResponse, LevelResponse, Page, PageEnvelope, PageQuery } from "../_shared";

/** Jenis tunjangan (JABATAN, KINERJA, BERAS, AIR). */
export type JenisTunjangan = "JABATAN" | "KINERJA" | "BERAS" | "AIR";

export interface TunjanganSearchParams extends PageQuery {
	levelId?: number; // int64
	golonganId?: number; // int64
}

export interface GajiTunjanganResponse {
	id?: number; // int64
	jenisTunjangan?: JenisTunjangan;
	level?: LevelResponse;
	golongan?: GolonganResponse;
	nominal?: number; // double
}

export type SingleResultGajiTunjanganResponse = Envelope<GajiTunjanganResponse>;

export interface GajiTunjanganPutRequest {
	jenisTunjangan?: JenisTunjangan;
	levelId?: number; // int64
	golonganId?: number; // int64
	nominal?: number; // double
}

export type PageGajiTunjanganResponse = Page<GajiTunjanganResponse>;

export type PageResultPageGajiTunjanganResponse = PageEnvelope<GajiTunjanganResponse>;

export interface GajiTunjanganPostRequest {
	jenisTunjangan?: JenisTunjangan;
	levelId?: number; // int64
	golonganId?: number; // int64
	nominal?: number; // double
}

export type ListResultMapStringObject = Envelope<Record<string, unknown>[]>;

export type {
	DeletedResult,
	GolonganResponse,
	LevelResponse,
	PageableObject,
	SavedResultLong,
	SortObject,
} from "../_shared";
