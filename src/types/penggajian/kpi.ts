/**
 * kpi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/kpi/{id}, GET /penggajian/kpi, GET /penggajian/kpi/list, GET /penggajian/kpi/template/download, GET /penggajian/kpi/{id}, POST /penggajian/kpi, POST /penggajian/kpi/upload, PUT /penggajian/kpi/{id}
 */

import type { Envelope, Page, PageEnvelope, PageQuery } from "../_shared";

export interface KpiSearchParams extends PageQuery {
	nipam?: string;
	periode?: string;
}

export interface GajiKpiResponse {
	id?: number; // int64
	nipam?: string;
	periode?: string;
	tunkin?: number; // double
	pph21Ter?: number; // double
}

export type SingleResultGajiKpiResponse = Envelope<GajiKpiResponse>;

export interface GajiKpiPutRequest {
	nipam: string; // minLength 1
	periode: string; // minLength 1
	tunkin: number; // double
	pph21Ter?: number; // double
}

export type PageGajiKpiResponse = Page<GajiKpiResponse>;

export type PageResultPageGajiKpiResponse = PageEnvelope<GajiKpiResponse>;

export interface GajiKpiPostRequest {
	nipam: string; // minLength 1
	periode: string; // minLength 1
	tunkin: number; // double
	pph21Ter?: number; // double
}

export interface GajiKpiUploadResponse {
	periode?: string;
	totalRows?: number; // int32
	inserted?: number; // int32
	updated?: number; // int32
}

export type SingleResultGajiKpiUploadResponse = Envelope<GajiKpiUploadResponse>;

export type ListResultGajiKpiResponse = Envelope<GajiKpiResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "../_shared";
