/**
 * {id} — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/*/api.json
 * Endpoint : DELETE /pegawai/{id}, GET /pegawai/{id}, GET /pegawai/{id}/ringkasan, PATCH /pegawai/{id}/gaji, PATCH /pegawai/{id}/profil, PUT /pegawai/{id}
 */

import type {
  Enum1,
  Enum10,
  Enum2,
  Enum3,
  Enum4,
  Enum5,
  Enum7,
  Envelope,
  GajiPendapatanNonPajakResponse,
  GajiProfilResponse,
  GolonganResponse,
  JabatanMiniResponse,
  JenjangPendidikanResponse,
  LevelResponse,
  OrganisasiMiniResponse,
  ProfesiMiniResponse,
} from "./_shared";

export interface JenisKitasResponse {
  id?: number; // int64
  nama?: string;
}

export interface KartuIdentitasMiniResponse {
  id?: number; // int64
  jenisKartu?: JenisKitasResponse;
  nomorKartu?: string;
}

export interface BiodataResponse {
  nik?: string;
  nama?: string;
  jenisKelamin?: Enum2;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  alamat?: string;
  telp?: string;
  agama?: Enum3;
  ibuKandung?: string;
  pendidikanTerakhir?: JenjangPendidikanResponse;
  golonganDarah?: Enum7;
  statusKawin?: Enum5;
  fotoProfil?: string;
  notes?: string;
  kartuIdentitas?: KartuIdentitasMiniResponse[];
}

export interface GradeResponse {
  id?: number; // int64
  level?: LevelResponse;
  grade?: number; // int32
  tukin?: number; // double
}

export interface RiwayatSkResponse {
  id?: number; // int64
  nipam?: string;
  nama?: string;
  nomorSk?: string;
  jenisSk?: Enum1;
  tanggalSk?: string; // date
  tmtBerlaku?: string; // date
  golongan?: GolonganResponse;
  gajiPokok?: number; // double
  mkgTahun?: number; // int32
  mkgBulan?: number; // int32
  kenaikanBerikutnya?: string; // date
  mkgbTahun?: number; // int32
  mkgbBulan?: number; // int32
  updateMaster?: boolean;
  notes?: string;
}

export interface RumahDinasResponse {
  id?: number; // int64
  nama?: string;
  nilai?: number; // double
}

export interface PegawaiResponseDetail {
  id?: number; // int64
  nipam?: string;
  biodata?: BiodataResponse;
  statusPegawai?: Enum4;
  organisasi?: OrganisasiMiniResponse;
  jabatan?: JabatanMiniResponse;
  profesi?: ProfesiMiniResponse;
  golongan?: GolonganResponse;
  grade?: GradeResponse;
  statusKerja?: Enum10;
  tmtKerja?: string; // date
  skCapeg?: RiwayatSkResponse;
  tmtPensiun?: string; // date
  skPegawai?: RiwayatSkResponse;
  skGolongan?: RiwayatSkResponse;
  skJabatan?: RiwayatSkResponse;
  skMutasi?: RiwayatSkResponse;
  skKontrak?: RiwayatSkResponse;
  skGajiBerkala?: RiwayatSkResponse;
  gajiPokok?: number; // double
  phdp?: number; // double
  jmlTanggungan?: number; // int32
  mkgTahun?: number; // int32
  mkgBulan?: number; // int32
  absensiId?: number; // int64
  tanggalSk?: string; // date
  tmtKontrakSelesai?: string; // date
  isAskes?: boolean;
  kodePajak?: GajiPendapatanNonPajakResponse;
  gajiProfil?: GajiProfilResponse;
  rumahDinas?: RumahDinasResponse;
  email?: string;
  notes?: string;
}

export type SingleResultPegawaiResponseDetail = Envelope<PegawaiResponseDetail>;

export interface PegawaiPutRequest {
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
  nipam: string; // minLength 1
  statusPegawai?: Enum4;
  statusKerja?: Enum10;
  jabatanId: number; // int64, min 1
  organisasiId: number; // int64, min 1
  profesiId?: number; // int64
  golonganId?: number; // int64
  kodePajakId: number; // int64, min 1
  nomorSk?: string;
  tanggalSk?: string; // date
  tmtBerlakuSk?: string; // date
  tmtKontrakSelesai?: string; // date
  gajiPokok?: number; // double
  email?: string;
}

export interface PegawaiPatchProfil {
  id: number; // int64, min 1
  nipam: string; // minLength 1
  nama: string; // minLength 1
  jenisKelamin?: Enum2;
  statusKawin?: Enum5;
  agama?: Enum3;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  alamat?: string;
  ibuKandung?: string;
  telp?: string;
  golonganId?: number; // int64
  organisasiId?: number; // int64
  jabatanId?: number; // int64
  profesiId?: number; // int64
  email?: string;
  absensiId?: number; // int64
}

export interface PegawaiPatchGaji {
  tmtKerja?: string; // date
  tmtPensiun?: string; // date
  statusPegawai: Enum4;
  gajiPokok?: number; // double
  phdp?: number; // double
  isAskes?: boolean;
  kodePajakId: number; // int64, min 1
  gajiProfilId: number; // int64, min 1
  rumahDinasId?: number; // int64
}

export interface PegawaiResponseRingkasan {
  id?: number; // int64
  nipam?: string;
  nama?: string;
  jenisKelamin?: string;
  tempatLahir?: string;
  tanggalLahir?: string; // date
  statusKawin?: string;
  alamat?: string;
  nik?: string;
  agama?: string;
  telp?: string;
  email?: string;
  kodePajak?: string;
  ibuKandung?: string;
  pendidikanTerakhir?: string;
  lembagaPendidikan?: string;
  tahunLulus?: number; // int32
  statusPegawai?: string;
  pangkatGolongan?: string;
  tmtGolongan?: string; // date
  mkg?: string;
  unitKerja?: string;
  jabatan?: string;
  profesi?: string;
  grade?: string;
  tmtKerja?: string; // date
  tmtPegawai?: string; // date
  tmtPensiun?: string; // date
  isAskes?: boolean;
  absensiId?: number; // int32
  noKontrak?: string;
  noNpwp?: string;
  noJamsostek?: string;
  noBpjs?: string;
  noIdCard?: string;
}

export type SingleResultPegawaiResponseRingkasan = Envelope<PegawaiResponseRingkasan>;

export type {
  DeletedResult,
  GajiPendapatanNonPajakResponse,
  GajiProfilResponse,
  GolonganResponse,
  JabatanMiniResponse,
  JenjangPendidikanResponse,
  LevelResponse,
  OrganisasiMiniResponse,
  ProfesiMiniResponse,
  SavedResultLong,
} from "./_shared";
