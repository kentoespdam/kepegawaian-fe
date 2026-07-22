/**
 * pendapatan-non-pajak — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/pendapatan-non-pajak/{id}, GET /penggajian/pendapatan-non-pajak, GET /penggajian/pendapatan-non-pajak/list, GET /penggajian/pendapatan-non-pajak/{id}, POST /penggajian/pendapatan-non-pajak, PUT /penggajian/pendapatan-non-pajak/{id}
 */

import type { Envelope, GajiPendapatanNonPajakResponse, Page, PageEnvelope, PageQuery } from "../_shared";

export interface PendapatanNonPajakSearchParams extends PageQuery {
	kode?: string;
}

export type SingleResultGajiPendapatanNonPajakResponse = Envelope<GajiPendapatanNonPajakResponse>;

export interface GajiPendapatanNonPajakPutRequest {
	kode: string; // minLength 1
	nominal: number; // double
	notes?: string;
}

export type PageGajiPendapatanNonPajakResponse = Page<GajiPendapatanNonPajakResponse>;

export type PageResultPageGajiPendapatanNonPajakResponse = PageEnvelope<GajiPendapatanNonPajakResponse>;

export interface GajiPendapatanNonPajakPostRequest {
	kode: string; // minLength 1
	nominal: number; // double
	notes?: string;
}

export type ListResultGajiPendapatanNonPajakResponse = Envelope<GajiPendapatanNonPajakResponse[]>;

export type {
	DeletedResult,
	GajiPendapatanNonPajakResponse,
	PageableObject,
	SavedResultLong,
	SortObject,
} from "../_shared";
