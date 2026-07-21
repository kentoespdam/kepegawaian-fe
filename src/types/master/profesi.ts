/**
 * profesi — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/master/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/master/master.json
 * Endpoint : DELETE /master/profesi/{id}, DELETE /master/profesi/{profesiId}/alat-kerja/{id}, DELETE /master/profesi/{profesiId}/apd/{id}, GET /master/profesi, GET /master/profesi/list, GET /master/profesi/{id}, POST /master/profesi, POST /master/profesi/{profesiId}/alat-kerja, POST /master/profesi/{profesiId}/apd, PUT /master/profesi/{id}, PUT /master/profesi/{profesiId}/alat-kerja/{id}, PUT /master/profesi/{profesiId}/apd/{id}
 */

import type {
	Envelope,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageEnvelope,
	PageQuery,
} from "../_shared";

export interface ProfesiSearchParams extends PageQuery {
	organisasiId?: number; // int64
	jabatanId?: number; // int64
	levelId?: number; // int64
	gradeId?: number; // int64
	nama?: string;
}

export interface ApdPostRequest {
	nama: string; // minLength 1
}

export interface AlatKerjaPostRequest {
	nama: string; // minLength 1
}

export interface GradeMiniResponse {
	id?: number; // int64
	grade?: number; // int32
	tukin?: number; // double
}

export interface ApdRow {
	id?: number; // int64
	nama?: string;
}

export interface AlatKerjaRow {
	id?: number; // int64
	nama?: string;
}

export interface ProfesiDetail {
	id?: number; // int64
	nama?: string;
	detail?: string;
	resiko?: string;
	organisasi?: OrganisasiMiniResponse;
	jabatan?: JabatanMiniResponse;
	level?: LevelResponse;
	grade?: GradeMiniResponse;
	apdList?: ApdRow[];
	alatKerjaList?: AlatKerjaRow[];
}

export type SingleResultProfesiDetail = Envelope<ProfesiDetail>;

export interface ProfesiPutRequest {
	organisasiId?: number; // int64, min 1
	jabatanId?: number; // int64, min 1
	gradeId?: number; // int64, min 1
	nama: string; // minLength 1
	detail: string; // minLength 1
	resiko: string; // minLength 1
}

export type PageResultPageProfesiDetail = PageEnvelope<ProfesiDetail>;

export interface ProfesiPostRequest {
	organisasiId?: number; // int64, min 1
	jabatanId?: number; // int64, min 1
	gradeId?: number; // int64, min 1
	nama: string; // minLength 1
	detail: string; // minLength 1
	resiko: string; // minLength 1
}

export interface ProfesiListResponse {
	id?: number; // int64
	nama?: string;
}

export type ListResultProfesiListResponse = Envelope<ProfesiListResponse[]>;

export type {
	DeletedResult,
	JabatanMiniResponse,
	LevelResponse,
	OrganisasiMiniResponse,
	PageableObject,
	SavedResultLong,
	SortObject,
} from "../_shared";
