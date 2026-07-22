/**
 * biodata — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /profil/biodata/{id}, GET /profil/biodata, GET /profil/biodata/list, GET /profil/biodata/{id}, GET /profil/biodata/{id}/foto-profil, PATCH /profil/biodata/{id}, POST /profil/biodata, PUT /profil/biodata/{id}, PUT /profil/biodata/{id}/foto-profil
 */

import type {
  Enum2,
  Enum3,
  Enum5,
  Enum7,
  Envelope,
  JenjangPendidikanResponse,
  KartuIdentitasQuery,
  PageEnvelope,
  PageQuery,
  PendidikanQuery,
} from "./_shared";

export interface BiodataSearchParams extends PageQuery {
  nik?: string;
  nama?: string;
  jenisKelamin?: "LAKI_LAKI" | "PEREMPUAN";
  alamat?: string;
  isPegawai?: boolean;
}

export interface BiodataDetail {
  nik?: string;
  nama?: string;
  jenisKelamin?: Enum2;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  alamat?: string;
  telp?: string;
  agama?: Enum3;
  ibuKandung?: string;
  pendidikanTerakhirId?: number; // int64
  golonganDarah?: Enum7;
  statusKawin?: Enum5;
  fotoProfil?: string;
  notes?: string;
  isPegawai?: boolean;
  pendidikan?: PendidikanQuery[];
  kartuIdentitas?: KartuIdentitasQuery[];
}

export type SingleResultBiodataDetail = Envelope<BiodataDetail>;

export interface BiodataPutRequest {
  nik: string; // minLength 1
  nama: string; // minLength 1
  jenisKelamin: Enum2;
  tempatLahir: string; // minLength 1
  tanggalLahir: string; // date
  alamat: string; // minLength 1
  telp?: string;
  agama: Enum3;
  ibuKandung: string; // minLength 1
  pendidikanTerakhirId?: number; // int64, min 1
  golonganDarah?: Enum7;
  statusKawin?: Enum5;
  notes?: string;
  isPegawai?: boolean;
}

export interface BiodataPatchRequest {
  nama?: string;
  alamat?: string;
  jenisKelamin?: Enum2;
  statusKawin?: Enum5;
  agama?: Enum3;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  ibuKandung?: string;
  telp?: string;
}

export type PageResultPageBiodataQuery = PageEnvelope<BiodataQuery>;

export interface BiodataQuery {
  nik?: string;
  nama?: string;
  jenisKelamin?: Enum2;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  alamat?: string;
  telp?: string;
  agama?: Enum3;
  ibuKandung?: string;
  pendidikanTerakhirId?: number; // int64
  pendidikanTerakhir?: JenjangPendidikanResponse;
  golonganDarah?: Enum7;
  statusKawin?: Enum5;
  fotoProfil?: string;
  notes?: string;
  isPegawai?: boolean;
}

export interface BiodataPostRequest {
  nik: string; // minLength 1
  nama: string; // minLength 1
  jenisKelamin: Enum2;
  tempatLahir: string; // minLength 1
  tanggalLahir: string; // date
  alamat: string; // minLength 1
  telp?: string;
  agama: Enum3;
  ibuKandung: string; // minLength 1
  pendidikanTerakhirId?: number; // int64, min 1
  golonganDarah?: Enum7;
  statusKawin?: Enum5;
  notes?: string;
  isPegawai?: boolean;
}

export type ListResultBiodataQuery = Envelope<BiodataQuery[]>;

export type {
  DeletedResult,
  JenjangPendidikanResponse,
  KartuIdentitasQuery,
  PageableObject,
  PendidikanQuery,
  SavedResultString,
  SortObject,
} from "./_shared";
