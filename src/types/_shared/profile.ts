/**
 * shared/profile — profile request & query types
 *
 * PutRequest, PostRequest, LampiranPostRequest, dan Query types
 * untuk modul profil (pendidikan, pelatihan, keluarga, dll).
 */

import type { Envelope } from "./api";
import type {
	Agama,
	HubunganKeluarga,
	JenisKelamin,
	JenisProfilUpdate,
	StatusPendidikanKeluarga,
	TingkatKemampuan,
} from "./enums";

// ── LampiranProfile types ────────────────────────────────────────────

export interface LampiranProfilQuery {
	id?: number; // int64
	ref?: JenisProfilUpdate;
	refId?: number; // int64
	fileName?: string;
	mimeType?: string;
	notes?: string;
	disetujui?: boolean;
	disetujuiOleh?: string;
	tanggalDisetujui?: string; // date-time
}

export type ListResultLampiranProfilQuery = Envelope<LampiranProfilQuery[]>;
export type SingleResultLampiranProfilQuery = Envelope<LampiranProfilQuery>;

// ── Pendidikan ───────────────────────────────────────────────────────

export interface PendidikanQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenjangId?: number; // int64
	jenjangPendidikan?: import("./master").JenjangPendidikanResponse;
	gelarDepan?: string;
	gelarBelakang?: string;
	jurusan?: string;
	institusi?: string;
	kota?: string;
	tahunMasuk?: number; // int32
	isLulus?: boolean;
	tahunLulus?: number; // int32
	gpa?: number; // double
	isLatest?: boolean;
	disetujui?: boolean;
	tanggalPengajuan?: string; // date-time
	tanggalDisetujui?: string; // date-time
	disetujuiOleh?: string;
	changedStatus?: string; // byte
}

export interface PendidikanPutRequest {
	biodataId: string; // minLength 1
	jenjangPendidikanId?: number; // int64, min 1
	gelarDepan?: string;
	gelarBelakang?: string;
	jurusan?: string;
	institusi: string; // minLength 1
	kota?: string;
	tahunMasuk?: number; // int32
	isLulus?: boolean;
	tahunLulus?: number; // int32
	gpa?: number; // double
	isLatest?: boolean;
}

export interface PendidikanPostRequest {
	biodataId: string; // minLength 1
	jenjangPendidikanId?: number; // int64, min 1
	gelarDepan?: string;
	gelarBelakang?: string;
	jurusan?: string;
	institusi: string; // minLength 1
	kota?: string;
	tahunMasuk?: number; // int32
	isLulus?: boolean;
	tahunLulus?: number; // int32
	gpa?: number; // double
	isLatest?: boolean;
}

export interface PendidikanLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

// ── Pelatihan ────────────────────────────────────────────────────────

export interface PelatihanPutRequest {
	biodataId: string; // minLength 1
	jenisPelatihanId?: number; // int64, min 1
	nama: string; // minLength 1
	lembaga: string; // minLength 1
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	lulus?: boolean;
	nilai: string; // minLength 1
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
}

export interface PelatihanPostRequest {
	biodataId: string; // minLength 1
	jenisPelatihanId?: number; // int64, min 1
	nama: string; // minLength 1
	lembaga: string; // minLength 1
	tanggalMulai: string; // date
	tanggalSelesai: string; // date
	lulus?: boolean;
	nilai: string; // minLength 1
	ikatanDinas?: boolean;
	tanggalAkhirIkatan?: string; // date
	notes?: string;
}

export interface PelatihanLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

// ── Keluarga ─────────────────────────────────────────────────────────

export interface ProfilKeluargaPutRequest {
	biodataId: string; // minLength 1
	nik?: string;
	nama: string; // minLength 1
	jenisKelamin: JenisKelamin;
	agama: Agama;
	hubunganKeluarga: HubunganKeluarga;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	tanggungan: boolean;
	pendidikanId?: number; // int64
	statusPendidikan?: StatusPendidikanKeluarga;
	statusKawin: boolean;
	notes?: string;
}

export interface ProfilKeluargaPostRequest {
	biodataId: string; // minLength 1
	nik?: string;
	nama: string; // minLength 1
	jenisKelamin: JenisKelamin;
	agama: Agama;
	hubunganKeluarga: HubunganKeluarga;
	tempatLahir: string; // minLength 1
	tanggalLahir: string; // date
	tanggungan: boolean;
	pendidikanId?: number; // int64
	statusPendidikan?: StatusPendidikanKeluarga;
	statusKawin: boolean;
	notes?: string;
}

export interface ProfilKeluargaLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

// ── Keahlian ─────────────────────────────────────────────────────────

export interface KeahlianPutRequest {
	biodataId: string; // minLength 1
	keahlianId?: number; // int64, min 1
	kualifikasi: TingkatKemampuan;
	sertifikasi?: boolean;
	institusi: string; // minLength 1
	tahun?: number; // int32, min 1970
	masaBerlaku?: string;
}

export interface KeahlianPostRequest {
	biodataId: string; // minLength 1
	keahlianId?: number; // int64, min 1
	kualifikasi: TingkatKemampuan;
	sertifikasi?: boolean;
	institusi: string; // minLength 1
	tahun?: number; // int32, min 1970
	masaBerlaku?: string;
}

export interface KeahlianLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

// ── Kartu Identitas ──────────────────────────────────────────────────

export interface KartuIdentitasPutRequest {
	nik: string; // minLength 1
	jenisKartuId?: number; // int64, min 1
	nomorKartu: string; // minLength 1
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
}

export interface KartuIdentitasPostRequest {
	nik: string; // minLength 1
	jenisKartuId?: number; // int64, min 1
	nomorKartu: string; // minLength 1
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
}

export interface KartuIdentitasLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}

export interface KartuIdentitasQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenisKartuId?: number; // int64
	jenisKartuNama?: string;
	nomorKartu?: string;
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
	notes?: string;
	changedStatus?: string; // byte
}

// ── Pengalaman Kerja ─────────────────────────────────────────────────

export interface PengalamanKerjaPutRequest {
	biodataId: string; // minLength 1
	namaPerusahaan: string; // minLength 1
	typePerusahaan?: string;
	jabatan?: string;
	lokasi?: string;
	tahunMasuk?: number; // int32
	tahunKeluar?: number; // int32
	notes?: string;
}

export interface PengalamanKerjaPostRequest {
	biodataId: string; // minLength 1
	namaPerusahaan: string; // minLength 1
	typePerusahaan?: string;
	jabatan?: string;
	lokasi?: string;
	tahunMasuk?: number; // int32
	tahunKeluar?: number; // int32
	notes?: string;
}

export interface PengalamanLampiranPostRequest {
	ref?: JenisProfilUpdate;
	refId?: number; // int64, min 1
	fileName: string; // binary
	notes?: string;
}
