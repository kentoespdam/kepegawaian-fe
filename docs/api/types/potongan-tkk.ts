/**
 * potongan-tkk — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /penggajian/potongan-tkk/{id}, GET /penggajian/potongan-tkk, GET /penggajian/potongan-tkk/{id}, POST /penggajian/potongan-tkk, PUT /penggajian/potongan-tkk/{id}
 */

import type { Enum4, Envelope, GolonganResponse, LevelResponse, PageEnvelope, PageQuery } from "./_shared";

export interface PotonganTkkSearchParams extends PageQuery {
  statusPegawai?: "KONTRAK" | "CAPEG" | "PEGAWAI" | "CALON_HONORER" | "HONORER" | "NON_PEGAWAI";
  levelId?: number; // int64
  golonganId?: number; // int64
}

export interface GajiPotonganTkkResponse {
  id?: number; // int64
  statusPegawai?: Enum4;
  level?: LevelResponse;
  golongan?: GolonganResponse;
  nominal?: number; // double
}

export type SingleResultGajiPotonganTkkResponse = Envelope<GajiPotonganTkkResponse>;

export interface GajiPotonganTkkPutRequest {
  statusPegawai: Enum4;
  levelId?: number; // int64
  golonganId?: number; // int64
  nominal?: number; // double
}

export type PageResultPageGajiPotonganTkkResponse = PageEnvelope<GajiPotonganTkkResponse>;

export interface GajiPotonganTkkPostRequest {
  statusPegawai: Enum4;
  levelId?: number; // int64
  golonganId?: number; // int64
  nominal?: number; // double
}

export type {
  DeletedResult,
  GolonganResponse,
  LevelResponse,
  PageableObject,
  SavedResultLong,
  SortObject,
} from "./_shared";
