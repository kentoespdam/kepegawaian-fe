/**
 * batch — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /penggajian/batch/master/proses/{id}, DELETE /penggajian/batch/master/proses/{rootBatchId}/rollback, DELETE /penggajian/batch/{id}, GET /penggajian/batch, GET /penggajian/batch/master, GET /penggajian/batch/master/download/potongan-gaji/{rootBatchId}, GET /penggajian/batch/master/download/table-gaji/{rootBatchId}, GET /penggajian/batch/master/pegawai/{pegawaiId}, GET /penggajian/batch/master/proses, GET /penggajian/batch/master/proses/{batchMasterId}/master, GET /penggajian/batch/master/proses/{masterId}/master_batch_id/{kode}/kode, GET /penggajian/batch/master/{id}, GET /penggajian/batch/{periode}/periode/{status}/status, PATCH /penggajian/batch/master/upload/{rootBatchId}, PATCH /penggajian/batch/{id}/accept, PATCH /penggajian/batch/{id}/reprocess, PATCH /penggajian/batch/{id}/verify1, PATCH /penggajian/batch/{id}/verify2, POST /penggajian/batch, POST /penggajian/batch/master/proses
 */

import type { Envelope, PageEnvelope, PageQuery, StatusKawin, StatusKepegawaian, TipeKomponen } from "../_shared";

/** Status batch penggajian (PENDING, PROSES). */
export type StatusBatch =
	| "PENDING"
	| "PROSES"
	| "WAIT_VERIFICATION_PHASE_1"
	| "WAIT_VERIFICATION_PHASE_2"
	| "WAIT_APPROVAL"
	| "FINISHED"
	| "FAILED";

export interface BatchSearchParams extends PageQuery {
	periode?: string;
	status?:
		| "PENDING"
		| "PROSES"
		| "WAIT_VERIFICATION_PHASE_1"
		| "WAIT_VERIFICATION_PHASE_2"
		| "WAIT_APPROVAL"
		| "FINISHED"
		| "FAILED";
	ltStatus?: string;
	gtStatus?: string;
	batchMasterId?: number; // int64
	jenisGaji?: "NONE" | "PEMASUKAN" | "POTONGAN";
	kode?: string;
	gajiBatchRootId?: string;
	pegawaiId?: number; // int64
}

export interface GajiBatchRootErrorLogsResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	notes?: string;
}

export interface GajiBatchRootLampiranMiniResponse {
	id?: number; // int64
	jenisLampiranGaji?: "POTONGAN_TKK" | "POTONGAN_TAMBAHAN";
	fileName?: string;
	mimeType?: string;
}

export interface GajiBatchRootResponse {
	id?: string;
	periode?: string;
	status?: StatusBatch;
	totalPegawai?: number; // int32
	tanggalProses?: string; // date-time
	diProsesOleh?: string;
	jabatanPemroses?: string;
	tanggalVerifikasiTahap1?: string; // date-time
	diVerifikasiOlehTahap1?: string;
	jabatanVerifikasiTahap1?: string;
	tanggalVerifikasiTahap2?: string; // date-time
	diVerifikasiOlehTahap2?: string;
	jabatanVerifikasiTahap2?: string;
	tanggalPersetujuan?: string; // date-time
	diSetujuiOleh?: string;
	jabatanPenyetuju?: string;
	notes?: string;
	errorLogs?: GajiBatchRootErrorLogsResponse[];
	lampiran?: GajiBatchRootLampiranMiniResponse[];
}

export type ListResultGajiBatchRootResponse = Envelope<GajiBatchRootResponse[]>;

export interface GajiBatchRootPostRequest {
	tahun?: string;
	bulan?: string;
	diProsesOleh?: string;
	jabatanPemroses?: string;
	fileName?: string; // binary
}

export type PageResultPageGajiBatchMasterProsesResponse = PageEnvelope<GajiBatchMasterProsesResponse>;

export interface GajiBatchMasterProsesResponse {
	id?: number; // int64
	gajiBatchMasterId?: number; // int64
	kode?: string;
	urut?: number; // int32
	nama?: string;
	jenisGaji?: TipeKomponen;
	nilai?: number; // double
	formula?: string;
	nilaiFormula?: string;
}

export interface GajiBatchMasterProsesPostRequest {
	batchMasterId: number; // int64, min 1
	nama?: string;
	jenisGaji?: TipeKomponen;
	nilai?: number; // double
}

export interface GajiBatchRootProcessRequest {
	id?: string;
	nama?: string;
	jabatan?: string;
	phase?: StatusBatch;
}

export interface GajiBatchMasterPostRequest {
	file?: string; // binary
}

export interface GajiBatchMasterResponse {
	id?: number; // int64
	gajiBatchRootId?: string;
	periode?: string;
	pegawaiId?: number; // int64
	nipam?: string;
	nama?: string;
	statusPegawai?: StatusKepegawaian;
	organisasiId?: number; // int64
	organisasiKode?: string;
	namaOrganisasi?: string;
	jabatanId?: number; // int64
	namaJabatan?: string;
	levelId?: number; // int64
	golonganId?: number; // int64
	golongan?: string;
	gajiProfilId?: number; // int64
	kodePajak?: string;
	gajiPokok?: number; // double
	phdp?: number; // double
	statusKawin?: StatusKawin;
	jmlTanggungan?: number; // int32
	jmlJiwa?: number; // int32
	penghasilanKotor?: number; // double
	totalPotongan?: number; // double
	totalAddTambahan?: number; // double
	totalAddPotongan?: number; // double
	penghasilanBersih?: number; // double
	penghasilanBersih2?: number; // double
	pembulatan?: number; // double
	pembulatan2?: number; // double
	penghasilanBersihFinal?: number; // double
	penghasilanBersihFinal2?: number; // double
	pajak?: number; // double
	isDifferent?: boolean;
}

export type ListResultGajiBatchMasterResponse = Envelope<GajiBatchMasterResponse[]>;

export type SingleResultGajiBatchMasterResponse = Envelope<GajiBatchMasterResponse>;

export type SingleResultGajiBatchMasterProsesResponse = Envelope<GajiBatchMasterProsesResponse>;

export type ListResultGajiBatchMasterProsesResponse = Envelope<GajiBatchMasterProsesResponse[]>;

export type PageResultPageGajiBatchMasterResponse = PageEnvelope<GajiBatchMasterResponse>;

export type { DeletedResult, PageableObject, SavedResultLong, SavedResultString, SortObject } from "../_shared";
