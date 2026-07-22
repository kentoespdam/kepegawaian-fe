/**
 * kuota — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /cuti/kuota/{id}, GET /cuti/kuota, GET /cuti/kuota/template, GET /cuti/kuota/{id}, GET /cuti/kuota/{pegawaiId}/{tahun}/sisa, POST /cuti/kuota, POST /cuti/kuota/import, PUT /cuti/kuota/{id}
 */

import type { Envelope, PageQuery, PegawaiMiniResponse } from "./_shared";

export interface KuotaSearchParams extends PageQuery {
  pegawaiId?: number; // int64
  nipam?: string;
  nama?: string;
  tahun?: number; // int32
  expired?: string; // date
}

export interface CutiKuotaResponse {
  id?: number; // int64
  pegawai?: PegawaiMiniResponse;
  tahun?: number; // int32
  kuota?: number; // int32
  kuotaTerpakai?: number; // int32
  kuotaTambahan?: number; // int32
  sisaKuota?: number; // int32
  expired?: string; // date
}

export type SingleResultCutiKuotaResponse = Envelope<CutiKuotaResponse>;

export interface CutiKuotaPutRequest {
  pegawaiId: number; // int64, min 1
  tahun: number; // int32, min 2000
  kuota?: number; // int32
  kuotaTambahan?: number; // int32
  sisaKuota?: number; // int32
  expired: string; // date
}

export interface CutiKuotaPegawaiResponse {
  page?: PageCutiKuotaResponse;
  additional?: CutiKuotaResponse[];
}

export type SingleResultCutiKuotaPegawaiResponse = Envelope<CutiKuotaPegawaiResponse>;

export interface CutiKuotaPostRequest {
  pegawaiId: number; // int64, min 1
  tahun: number; // int32, min 2000
  kuota?: number; // int32
  kuotaTambahan?: number; // int32
  sisaKuota?: number; // int32
  expired: string; // date
}

export interface CutiKuotaImportRequest {
  tahun: number; // int32, min 2000
  file: string; // binary
}

export interface CutiKuotaSisa {
  sisaCutiTahunIni?: number; // int32
  sisaCutiTahunLalu?: number; // int32
}

export type SingleResultCutiKuotaSisa = Envelope<CutiKuotaSisa>;

export type {
  DeletedResult,
  PageableObject,
  PegawaiMiniResponse,
  SavedResultLong,
  SavedResultString,
  SortObject,
} from "./_shared";
