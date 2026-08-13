/**
 * pendidikan — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /profil/pendidikan/lampiran/{id}, DELETE /profil/pendidikan/{id}, GET /profil/pendidikan, GET /profil/pendidikan/lampiran/{id}/detail, GET /profil/pendidikan/lampiran/{id}/file, GET /profil/pendidikan/lampiran/{id}/list, GET /profil/pendidikan/{id}, POST /profil/pendidikan, POST /profil/pendidikan/lampiran, PUT /profil/pendidikan/{id}
 */

import type { Envelope, Page, PageEnvelope, PageQuery, PendidikanQuery } from "../_shared";

export interface PendidikanSearchParams extends PageQuery {
	biodataId: string; // minLength 1
	jenjangId?: number; // int64
	gelarDepan?: string;
	gelarBelakang?: string;
	jurusan?: string;
	institusi?: string;
	kota?: string;
	tahunMasuk?: number; // int32
	tahunLulus?: number; // int32
	gpa?: number; // double
	isLatest?: boolean;
}

export type SingleResultPendidikanQuery = Envelope<PendidikanQuery>;

export type PagePendidikanQuery = Page<PendidikanQuery>;

export type PageResultPagePendidikanQuery = PageEnvelope<PendidikanQuery>;

export type {
	DeletedResult,
	JenjangPendidikanResponse,
	LampiranProfilQuery,
	ListResultLampiranProfilQuery,
	PageableObject,
	PendidikanLampiranPostRequest,
	PendidikanPostRequest,
	PendidikanPutRequest,
	PendidikanQuery,
	SavedResultLong,
	SingleResultLampiranProfilQuery,
	SortObject,
} from "../_shared";
