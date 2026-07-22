/**
 * profil — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /penggajian/profil/{id}, GET /penggajian/profil, GET /penggajian/profil/list, GET /penggajian/profil/{id}, POST /penggajian/profil, PUT /penggajian/profil/{id}
 */

import type { Envelope, GajiProfilResponse, PageEnvelope, PageQuery } from "./_shared";

export interface ProfilSearchParams extends PageQuery {
  nama?: string;
}

export type SingleResultGajiProfilResponse = Envelope<GajiProfilResponse>;

export interface GajiProfilPutRequest {
  nama: string; // minLength 1
}

export type PageResultPageGajiProfilResponse = PageEnvelope<GajiProfilResponse>;

export interface GajiProfilPostRequest {
  nama: string; // minLength 1
}

export type ListResultGajiProfilResponse = Envelope<GajiProfilResponse[]>;

export type { DeletedResult, GajiProfilResponse, PageableObject, SavedResultLong, SortObject } from "./_shared";
