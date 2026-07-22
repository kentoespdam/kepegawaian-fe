/**
 * status-pegawai — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : GET /master/status-pegawai/list
 */

import type { Envelope } from "./_shared";

export interface StatusPegawaiResponse {
  id?: string;
  nama?: string;
  urut?: number; // int32
}

export type ListResultStatusPegawaiResponse = Envelope<StatusPegawaiResponse[]>;
