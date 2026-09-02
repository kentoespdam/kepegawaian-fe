/**
 * shared/master — master entity base types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 */

import type { Envelope } from "./api";
import type { JenisSk, StatusBerhenti, StatusKepegawaian } from "./enums";

export interface OrganisasiMiniResponse {
	id?: number; // int64
	kode?: string;
	nama?: string;
	shortName?: string;
}

export interface LevelResponse {
	id?: number; // int64
	nama?: string;
}

export interface JabatanMiniResponse {
	id?: number; // int64
	kode?: string;
	level?: LevelResponse;
	nama?: string;
}

export interface CutiJenisMiniResponse {
	id?: number; // int64
	nama?: string;
	parentId?: number; // int64
}

export interface PegawaiMiniResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	statusPegawai?: string;
	jabatan?: string;
	organisasi?: string;
}

export interface Biodata {
	nik?: string;
	nama?: string;
	gelarDepan?: string;
	gelarBelakang?: string;
}

export interface Organisasi {
	id?: number; // int64
	nama?: string;
}

export interface Jabatan {
	id?: number; // int64
	nama?: string;
}

export interface Profesi {
	id?: number; // int64
	nama?: string;
}

export interface Golongan {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export interface Grade {
	id?: number; // int64
	grade?: number; // int32
}

export interface KodePajak {
	id?: number; // int64
	nama?: string;
	kode?: string;
}

export interface PegawaiResponse {
	id?: number; // int64
	nipam?: string;
	biodata?: Biodata;
	statusPegawai?: StatusKepegawaian;
	organisasi?: Organisasi;
	jabatan?: Jabatan;
	profesi?: Profesi;
	golongan?: Golongan;
	grade?: Grade;
	statusKerja?: StatusBerhenti;
	refSkCapegId?: number; // int64
	tmtKerja?: string; // date
	tmtPensiun?: string; // date
	refSkPegawaiId?: number; // int64
	tmtPegawai?: string; // date
	refSkGolId?: number; // int64
	tmtGolongan?: string; // date
	refSkJabatanId?: number; // int64
	tmtJabatan?: string; // date
	refSkMutasiId?: number; // int64
	tmtMutasi?: string; // date
	gajiPokok?: number; // double
	phdp?: number; // double
	jmlTanggungan?: number; // int32
	kodePajak?: KodePajak;
	isAskes?: boolean;
	mkgTahun?: number; // int32
	mkgBulan?: number; // int32
	email?: string;
	absensiId?: number; // int64
	notes?: string;
}

export interface GolonganResponse {
	id?: number; // int64
	golongan?: string;
	pangkat?: string;
}

export interface LampiranSkQuery {
	id?: number; // int64
	ref?: JenisSk;
	refId?: number; // int64
	fileName?: string;
	mimeType?: string;
	notes?: string;
	disetujui?: boolean;
	disetujuiOleh?: string;
	tanggalDisetujui?: string; // date-time
}

export interface SanksiMiniResponse {
	id?: number; // int64
	kode?: string;
	keterangan?: string;
	jenisSpId?: number; // int64
}

export interface JenisSpMiniResponse {
	id?: number; // int64
	kode?: string;
	nama?: string;
	sanksiSp?: SanksiMiniResponse[];
}

export interface ProfesiMiniResponse {
	id?: number; // int64
	nama?: string;
}

export interface JenjangPendidikanResponse {
	id?: number; // int64
	nama?: string;
	shortName?: string;
	seq?: number; // int32
	isStatistik?: boolean;
}

export interface EnumOption {
	id?: string;
	nama?: string;
}

export type ListResultEnumOption = Envelope<EnumOption[]>;

export interface GajiPendapatanNonPajakResponse {
	id?: number; // int64
	kode?: string;
	nominal?: number; // double
	notes?: string;
}

export interface GajiProfilResponse {
	id?: number; // int64
	nama?: string;
}

export interface LampiranRow {
	id?: number; // int64
	fileName?: string;
	mimeType?: string;
}
