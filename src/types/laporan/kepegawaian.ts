/**
 * kepegawaian — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : GET /laporan/kepegawaian/dnp, GET /laporan/kepegawaian/dnp/excel, GET /laporan/kepegawaian/duk, GET /laporan/kepegawaian/duk/excel, GET /laporan/kepegawaian/kenaikan_berkala, GET /laporan/kepegawaian/kenaikan_berkala/count, GET /laporan/kepegawaian/kenaikan_berkala/excel, GET /laporan/kepegawaian/kontrak, GET /laporan/kepegawaian/kontrak/excel, GET /laporan/kepegawaian/lepas_tanggungan_anak, GET /laporan/kepegawaian/lepas_tanggungan_anak/count, GET /laporan/kepegawaian/lepas_tanggungan_anak/excel, GET /laporan/kepegawaian/mutasi/excel/{from_date}/{to_date}, GET /laporan/kepegawaian/mutasi/{from_date}/{to_date}, GET /laporan/kepegawaian/so, GET /laporan/kepegawaian/statistik/agama, GET /laporan/kepegawaian/statistik/gelar_akademik, GET /laporan/kepegawaian/statistik/golongan, GET /laporan/kepegawaian/statistik/jenis_kelamin, GET /laporan/kepegawaian/statistik/pendidikan1, GET /laporan/kepegawaian/statistik/pendidikan2/excel/{tahun}/{bulan}, GET /laporan/kepegawaian/statistik/pendidikan2/{tahun}/{bulan}, GET /laporan/kepegawaian/statistik/status_pegawai, GET /laporan/kepegawaian/statistik/umur
 */

import type { Envelope, PageQuery } from "../_shared";

export interface KepegawaianSearchParams extends PageQuery {
	jenis_mutasi?:
		| "PENGANGKATAN_PERTAMA"
		| "MUTASI_LOKER"
		| "MUTASI_JABATAN"
		| "MUTASI_GOLONGAN"
		| "MUTASI_GAJI"
		| "MUTASI_GAJI_BERKALA"
		| "TERMINASI";
	filter?: "BULAN_INI" | "GTE_1" | "GTE_2";
	jenisSk: "SK_KENAIKAN_PANGKAT_GOLONGAN" | "SK_KENAIKAN_GAJI_BERKALA";
}

export type SingleResultObject = Envelope<unknown>;
