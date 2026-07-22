/**
 * dasar-gaji — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/dasar-gaji/{id}, GET /penggajian/dasar-gaji, GET /penggajian/dasar-gaji/list, GET /penggajian/dasar-gaji/{id}, POST /penggajian/dasar-gaji, POST /penggajian/dasar-gaji/batch, PUT /penggajian/dasar-gaji/{id}
 */

import type { DasarGajiResponse, Envelope, Page, PageQuery } from "../_shared";

export interface DasarGajiSearchParams extends PageQuery {
	deskripsi?: string;
	tanggalAwal?: string; // date
	tanggalAkhir?: string; // date
	aktif?: boolean;
}

export type SingleResultDasarGajiResponse = Envelope<DasarGajiResponse>;

export interface DasarGajiPutRequest {
	deskripsi: string; // minLength 1
	tanggalAwal: string; // date
	tanggalAkhir?: string; // date
	aktif: boolean;
}

export type PageDasarGajiResponse = Page<DasarGajiResponse>;

export type SingleResultPageDasarGajiResponse = Envelope<PageDasarGajiResponse>;

export interface DasarGajiPostRequest {
	deskripsi: string; // minLength 1
	tanggalAwal: string; // date
	tanggalAkhir?: string; // date
	aktif: boolean;
}

export type ListResultDasarGajiResponse = Envelope<DasarGajiResponse[]>;

export type {
	DasarGajiResponse,
	DeletedResult,
	PageableObject,
	SavedResultLong,
	SavedResultString,
	SortObject,
} from "../_shared";
