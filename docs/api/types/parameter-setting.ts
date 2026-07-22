/**
 * parameter-setting — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /penggajian/parameter-setting/{id}, GET /penggajian/parameter-setting, GET /penggajian/parameter-setting/list, GET /penggajian/parameter-setting/{id}, POST /penggajian/parameter-setting, PUT /penggajian/parameter-setting/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export interface ParameterSettingSearchParams extends PageQuery {
  kode?: string;
}

export interface GajiParameterSettingResponse {
  id?: number; // int64
  kode?: string;
  nominal?: number; // double
}

export type SingleResultGajiParameterSettingResponse = Envelope<GajiParameterSettingResponse>;

export interface GajiParameterSettingPutRequest {
  kode: string; // minLength 1
  nominal: number; // double
}

export type PageResultPageGajiParameterSettingResponse = PageEnvelope<GajiParameterSettingResponse>;

export interface GajiParameterSettingPostRequest {
  kode: string; // minLength 1
  nominal: number; // double
}

export type ListResultGajiParameterSettingResponse = Envelope<GajiParameterSettingResponse[]>;

export type { DeletedResult, PageableObject, SavedResultLong, SortObject } from "./_shared";
