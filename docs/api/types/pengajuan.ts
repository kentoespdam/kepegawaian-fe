/**
 * pengajuan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /cuti/pengajuan/{id}, GET /cuti/pengajuan, GET /cuti/pengajuan/approval, GET /cuti/pengajuan/{id}, GET /cuti/pengajuan/{pegawaiId}/pegawai, GET /cuti/pengajuan/{tanggalMulai}/{tanggalSelesai}/total-hari-kerja, POST /cuti/pengajuan, POST /cuti/pengajuan/klaim, PUT /cuti/pengajuan/klaim/{id}, PUT /cuti/pengajuan/{id}
 */

import type {
  CutiJenisMiniResponse,
  Enum9,
  Envelope,
  JabatanMiniResponse,
  OrganisasiMiniResponse,
  PageEnvelope,
  PageQuery,
} from "./_shared";

export type Enum14 =
  | "PENGAJUAN_CUTI"
  | "KLAIM_CUTI";

export interface PengajuanSearchParams extends PageQuery {
  id?: number; // int64
  pegawaiId?: number; // int64
  nipam?: string;
  nama?: string;
  tahun?: number; // int32
  jabatanId?: number; // int64
  picSaatIniId?: number; // int64
  approvalCutiStatus?: "PENDING" | "APPROVED" | "CONFIRMED" | "REJECTED" | "CANCELED" | "RETURNED";
  jenisPengajuanCuti?: "PENGAJUAN_CUTI" | "KLAIM_CUTI";
  readWriteStatus?: "NONE" | "READ" | "WRITE";
}

export interface CutiPengajuanMiniResponse {
  id?: number; // int64
  pegawaiId?: number; // int64
  nama?: string;
  nipam?: string;
  pangkatGolongan?: string;
  organisasi?: OrganisasiMiniResponse;
  jabatan?: JabatanMiniResponse;
  tanggalPengajuan?: string; // date
  jenisPengajuanCuti?: Enum14;
  approvalCutiStatus?: Enum9;
  approvalLevel?: number; // int32
  jenisCuti?: CutiJenisMiniResponse;
  subJenisCuti?: CutiJenisMiniResponse;
  tanggalMulai?: string; // date
  tanggalSelesai?: string; // date
  alasan?: string;
  jumlahHari?: number; // int32
  jumlahHariKerja?: number; // int32
  picSaatIni?: JabatanMiniResponse;
  isClaimed?: boolean;
}

export interface CutiPengajuanResponse {
  id?: number; // int64
  pegawaiId?: number; // int64
  nama?: string;
  nipam?: string;
  pangkatGolongan?: string;
  organisasi?: OrganisasiMiniResponse;
  jabatan?: JabatanMiniResponse;
  tanggalPengajuan?: string; // date
  jenisPengajuanCuti?: Enum14;
  approvalCutiStatus?: Enum9;
  approvalLevel?: number; // int32
  jenisCuti?: CutiJenisMiniResponse;
  subJenisCuti?: CutiJenisMiniResponse;
  tanggalMulai?: string; // date
  tanggalSelesai?: string; // date
  alasan?: string;
  jumlahHari?: number; // int32
  jumlahHariKerja?: number; // int32
  picSaatIni?: JabatanMiniResponse;
  isClaimed?: boolean;
  refCuti?: CutiPengajuanMiniResponse;
}

export type SingleResultCutiPengajuanResponse = Envelope<CutiPengajuanResponse>;

export interface CutiPengajuanPutRequest {
  csrfToken: string; // minLength 1
  pegawaiId: number; // int64, min 1
  jenisCutiId: number; // int64, min 1
  subJenisCutiId?: number; // int64
  tanggalMulai: string; // date
  tanggalSelesai: string; // date
  jumlahHariKerja: number; // int32
  alasan: string; // minLength 1
}

export interface CutiPengajuanKlaimPostRequest {
  csrfToken: string; // minLength 1
  refCutiId: number; // int64, min 1
  pegawaiId: number; // int64, min 1
  keterangan?: string;
  listHari: string[];
}

export type PageResultPageCutiPengajuanResponse = PageEnvelope<CutiPengajuanResponse>;

export interface CutiPengajuanPostRequest {
  csrfToken: string; // minLength 1
  pegawaiId: number; // int64, min 1
  jenisCutiId: number; // int64, min 1
  subJenisCutiId?: number; // int64
  tanggalMulai: string; // date
  tanggalSelesai: string; // date
  jumlahHariKerja: number; // int32
  alasan: string; // minLength 1
}

export type PageResultPageCutiApprovalChainResponse = PageEnvelope<CutiApprovalChainResponse>;

export interface CutiApprovalChainResponse {
  id?: number; // int64
  approvalLevel?: number; // int32
  readWriteStatus?: "NONE" | "READ" | "WRITE";
  refCuti?: CutiPengajuanMiniResponse;
}

export type {
  CutiJenisMiniResponse,
  DeletedResult,
  JabatanMiniResponse,
  LevelResponse,
  OrganisasiMiniResponse,
  PageableObject,
  SavedResultLong,
  SingleResultInteger,
  SortObject,
} from "./_shared";
