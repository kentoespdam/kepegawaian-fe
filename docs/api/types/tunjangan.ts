/**
 * tunjangan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /penggajian/tunjangan/{jenis}/{id}, GET /penggajian/tunjangan, GET /penggajian/tunjangan/{jenis}, GET /penggajian/tunjangan/{jenis}/{id}, POST /penggajian/tunjangan/{jenis}, PUT /penggajian/tunjangan/{jenis}/{id}
 */

import type { Envelope, GolonganResponse, LevelResponse, PageEnvelope, PageQuery } from "./_shared";

export type Enum13 =
  | "JABATAN"
  | "KINERJA"
  | "BERAS"
  | "AIR";

export interface TunjanganSearchParams extends PageQuery {
  levelId?: number; // int64
  golonganId?: number; // int64
}

export interface GajiTunjanganResponse {
  id?: number; // int64
  jenisTunjangan?: Enum13;
  level?: LevelResponse;
  golongan?: GolonganResponse;
  nominal?: number; // double
}

export type SingleResultGajiTunjanganResponse = Envelope<GajiTunjanganResponse>;

export interface GajiTunjanganPutRequest {
  jenisTunjangan?: Enum13;
  levelId?: number; // int64
  golonganId?: number; // int64
  nominal?: number; // double
}

export type PageResultPageGajiTunjanganResponse = PageEnvelope<GajiTunjanganResponse>;

export interface GajiTunjanganPostRequest {
  jenisTunjangan?: Enum13;
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
} from "./_shared";
