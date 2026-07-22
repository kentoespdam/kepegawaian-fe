/**
 * profil-update — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : GET /profil/profil-update, GET /profil/profil-update/{id}, PUT /profil/profil-update/{id}
 */

import type { Envelope, PageEnvelope, PageQuery } from "./_shared";

export type Enum16 =
  | "REJECT"
  | "PENDING"
  | "APPROVED";

export interface ProfilUpdateSearchParams extends PageQuery {
  nipam?: string;
  nama?: string;
  tanggalPengajuan?: string; // date
  approvalStatus?: "REJECT" | "PENDING" | "APPROVED";
}

export interface ProfileUpdateQuery {
  id?: number; // int64
  nipam?: string;
  nama?: string;
  jabatan?: string;
  reqDate?: string; // date-time
  tableName?: "BIODATA" | "KELUARGA" | "PENDIDIKAN" | "PENGALAMAN_KERJA" | "PELATIHAN" | "KEAHLIAN";
  actionType?: "UNKNOWN" | "INSERT" | "UPDATE" | "DELETE";
  dataDescription?: string;
  revId?: number; // int64
  approvalStatus?: Enum16;
  approvalDate?: string; // date-time
  approvalPic?: string;
}

export interface ProfilUpdateDetailObject {
  profileUpdate?: ProfileUpdateQuery;
  latestRevision?: unknown;
  previousRevision?: unknown;
}

export type SingleResultProfilUpdateDetailObject = Envelope<ProfilUpdateDetailObject>;

export interface ProfilUpdateAcceptRequest {
  approval: Enum16;
  pegawaiId: number; // int64, min 1
}

export type PageResultPageProfileUpdateQuery = PageEnvelope<ProfileUpdateQuery>;

export type { PageableObject, SavedResultString, SortObject } from "./_shared";
