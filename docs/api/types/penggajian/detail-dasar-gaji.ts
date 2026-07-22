/**
 * detail-dasar-gaji — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/detail-dasar-gaji/{id}, GET /penggajian/detail-dasar-gaji, GET /penggajian/detail-dasar-gaji/list, GET /penggajian/detail-dasar-gaji/{golonganId}/{masaKerja}, GET /penggajian/detail-dasar-gaji/{id}, POST /penggajian/detail-dasar-gaji, POST /penggajian/detail-dasar-gaji/batch, PUT /penggajian/detail-dasar-gaji/{id}
 */

import type { DasarGajiResponse, Envelope, PageQuery } from "../_shared";

export interface DetailDasarGajiSearchParams extends PageQuery {
	dasarGajiId?: number; // int64
	mkg?: number; // int32
	golonganKode?: number; // int32
	nominal?: number; // double
}

export interface DetailDasarGajiResponse {
	id?: number; // int64
	dasarGaji?: DasarGajiResponse;
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

export type SingleResultPageDetailDasarGajiResponse = Envelope<PageDetailDasarGajiResponse>;

export interface DetailDasarGajiPostRequest {
	dasarGajiId?: number; // int64
	mkg?: number; // int32
	golonganId?: number; // int64
	nominal?: number; // double
}

export interface DasarGaji {
	id?: number; // int64
	createdBy?: string;
	createdAt?: string; // date-time
	updatedBy?: string;
	updatedAt?: string; // date-time
	isDeleted?: boolean;
	version?: number; // int32
	deskripsi?: string;
	tanggalAwal?: string; // date
	tanggalAkhir?: string; // date
	aktif?: boolean;
}

export interface DetailDasarGaji {
	id?: number; // int64
	createdBy?: string;
	createdAt?: string; // date-time
	updatedBy?: string;
	updatedAt?: string; // date-time
	isDeleted?: boolean;
	version?: number; // int32
	dasarGaji?: DasarGaji;
	mkg?: number; // int32
	golonganKode?: number; // int32
	nominal?: number; // double
}

export type SingleResultDetailDasarGaji = Envelope<DetailDasarGaji>;

export type ListResultDetailDasarGajiResponse = Envelope<DetailDasarGajiResponse[]>;

export type {
	DasarGajiResponse,
	DeletedResult,
	PageableObject,
	SavedResultLong,
	SavedResultString,
	SortObject,
} from "../_shared";
