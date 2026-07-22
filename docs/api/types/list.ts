/**
 * list — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : GET /pegawai/list
 */

import type { PageQuery } from "./_shared";

export interface ListSearchParams extends PageQuery {
  nipam?: string;
  nik?: string;
  nama?: string;
  statusPegawai?: "KONTRAK" | "CAPEG" | "PEGAWAI" | "CALON_HONORER" | "HONORER" | "NON_PEGAWAI";
  jabatanId?: number; // int64
  organisasiId?: number; // int64
  profesiId?: number; // int64
  golonganId?: number; // int64
  gradeId?: number; // int64
  statusKerja?: "BERHENTI_OR_KELUAR" | "DIRUMAHKAN" | "KARYAWAN_AKTIF" | "LAMARAN_BARU" | "TAHAP_SELEKSI" | "DITERIMA" | "DIREKOMENDASIKAN" | "DITOLAK";
  jenisKelamin?: "LAKI_LAKI" | "PEREMPUAN";
}

export type {
  GolonganResponse,
  JabatanMiniResponse,
  LevelResponse,
  ListResultPegawaiListResponse,
  OrganisasiMiniResponse,
  PegawaiListResponse,
} from "./_shared";
