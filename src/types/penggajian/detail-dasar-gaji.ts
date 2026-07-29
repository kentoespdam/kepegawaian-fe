/**
 * detail-dasar-gaji — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/detail-dasar-gaji/{id}, GET /penggajian/detail-dasar-gaji, GET /penggajian/detail-dasar-gaji/list, GET /penggajian/detail-dasar-gaji/{golonganId}/{masaKerja}, GET /penggajian/detail-dasar-gaji/{id}, POST /penggajian/detail-dasar-gaji, POST /penggajian/detail-dasar-gaji/batch, PUT /penggajian/detail-dasar-gaji/{id}
 */

import type { Envelope, Page, PageEnvelope, PageQuery } from "../_shared";

export interface DetailDasarGajiSearchParams extends PageQuery {
	dasarGajiId?: number; // int64
	mkg?: number; // int32
	golonganKode?: number; // int32
	nominal?: number; // double
}

export interface DasarGajiMiniResponse {
	id?: number; // int64
	deskripsi?: string;
}

export interface DetailDasarGajiResponse {
	id?: number; // int64
	dasarGaji?: DasarGajiMiniResponse;
	mkg?: number; // int32
	golonganKode?: number; // int32
	nominal?: number; // double
}

export type SingleResultDetailDasarGajiResponse = Envelope<DetailDasarGajiResponse>;

export interface DetailDasarGajiPutRequest {
	dasarGajiId?: number; // int64
	mkg?: number; // int32
	golonganId?: number; // int64
	nominal?: number; // double
}

export type PageDetailDasarGajiResponse = Page<DetailDasarGajiResponse>;

export type PageResultPageDetailDasarGajiResponse = PageEnvelope<DetailDasarGajiResponse>;

export interface DetailDasarGajiPostRequest {
	dasarGajiId?: number; // int64
	mkg?: number; // int32
	golonganId?: number; // int64
	nominal?: number; // double
}

export interface DetailDasarGajiNominal {
	nominal?: number; // double
}

export type SingleResultDetailDasarGajiNominal = Envelope<DetailDasarGajiNominal>;

export type ListResultDetailDasarGajiResponse = Envelope<DetailDasarGajiResponse[]>;

export type { DeletedResult, PageableObject, SavedResultListLong, SavedResultLong, SortObject } from "../_shared";
