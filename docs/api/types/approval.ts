/**
 * approval — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : GET /cuti/approval/{cutiId}, POST /cuti/approval, POST /cuti/approval/klaim
 */

import type { Enum9, JabatanMiniResponse, PageEnvelope, PageQuery, PegawaiMiniResponse } from "./_shared";

export interface ApprovalSearchParams extends PageQuery {
  id?: number; // int64
  approverId?: number; // int64
  jabatanId?: number; // int64
}

export interface CutiApprovalPostRequest {
  csrfToken: string; // minLength 1
  cutiId: number; // int64, min 1
  approverId: number; // int64, min 1
  approvalLevel: number; // int32, min 1
  approvalStatus: Enum9;
  notes?: string;
}

export type PageResultPageCutiApprovalMiniResponse = PageEnvelope<CutiApprovalMiniResponse>;

export interface CutiApprovalMiniResponse {
  id?: number; // int64
  approver?: PegawaiMiniResponse;
  jabatan?: JabatanMiniResponse;
  approvalLevel?: number; // int32
  approvalStatus?: Enum9;
  notes?: string;
  createdAt?: string; // date-time
}

export type {
  JabatanMiniResponse,
  LevelResponse,
  PageableObject,
  PegawaiMiniResponse,
  SavedResultString,
  SortObject,
} from "./_shared";
