/**
 * batch-by-ids — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : POST /pegawai/batch-by-ids
 */

export interface PegawaiBatchIdsRequest {
  ids: number[];
}

export type {
  GolonganResponse,
  JabatanMiniResponse,
  LevelResponse,
  ListResultPegawaiListResponse,
  OrganisasiMiniResponse,
  PegawaiListResponse,
} from "./_shared";
