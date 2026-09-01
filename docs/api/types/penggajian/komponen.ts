/**
 * komponen — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/komponen/{id}, GET /penggajian/komponen/{id}/detail, GET /penggajian/komponen/{profilId}/kode, GET /penggajian/komponen/{profilId}/profil, GET /penggajian/komponen/{profilId}/profil/urut, POST /penggajian/komponen, PUT /penggajian/komponen/{id}
 */

import type { Envelope, GajiProfilResponse, Page, PageEnvelope, PageQuery, TipeKomponen } from "../_shared";

export interface KomponenSearchParams extends PageQuery {
	search?: string;
}

export interface GajiKomponenPutRequest {
	urut?: number; // int32
	profilGajiId: number; // int64, min 1
	kode: string; // minLength 1
	nama: string; // minLength 1
	jenisGaji?: TipeKomponen;
	nilai?: number; // double
	isReference?: boolean;
	formula?: string;
}

export interface GajiKomponenPostRequest {
	urut?: number; // int32
	profilGajiId: number; // int64, min 1
	kode: string; // minLength 1
	nama: string; // minLength 1
	jenisGaji?: TipeKomponen;
	nilai?: number; // double
	isReference?: boolean;
	formula?: string;
}

export interface GajiKomponenResponse {
	id?: number; // int64
	urut?: number; // int32
	profilGaji?: GajiProfilResponse;
	kode?: string;
	nama?: string;
	jenisGaji?: TipeKomponen;
	nilai?: number; // double
	isReference?: boolean;
	formula?: string;
}

export type PageGajiKomponenResponse = Page<GajiKomponenResponse>;

export type PageResultPageGajiKomponenResponse = PageEnvelope<GajiKomponenResponse>;

export interface GajiKomponenMiniProjection {
	nama?: string;
	kode?: string;
}

export type ListResultGajiKomponenMiniProjection = Envelope<GajiKomponenMiniProjection[]>;

export type SingleResultGajiKomponenResponse = Envelope<GajiKomponenResponse>;

export type {
	DeletedResult,
	GajiProfilResponse,
	PageableObject,
	SavedResultLong,
	SingleResultInteger,
	SortObject,
} from "../_shared";
