/**
 * approval — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /cuti/approval/{cutiId}, POST /cuti/approval, POST /cuti/approval/klaim
 */

import type {
	JabatanMiniResponse,
	Page,
	PageEnvelope,
	PageQuery,
	PegawaiMiniResponse,
	StatusApproval,
} from "../_shared";

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
	approvalStatus: StatusApproval;
	notes?: string;
}

export interface CutiApprovalMiniResponse {
	id?: number; // int64
	approver?: PegawaiMiniResponse;
	jabatan?: JabatanMiniResponse;
	approvalLevel?: number; // int32
	approvalStatus?: StatusApproval;
	notes?: string;
	createdAt?: string; // date-time
}

export type PageCutiApprovalMiniResponse = Page<CutiApprovalMiniResponse>;

export type PageResultPageCutiApprovalMiniResponse = PageEnvelope<CutiApprovalMiniResponse>;

export type {
	JabatanMiniResponse,
	LevelResponse,
	PageableObject,
	PegawaiMiniResponse,
	SavedResultString,
	SortObject,
} from "../_shared";
