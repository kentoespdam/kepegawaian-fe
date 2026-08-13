/**
 * shared — tipe lintas-domain (dipakai >= 2 module)
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 */

/** Semua status HTTP (dipakai oleh field statusText di wrapper response). */
export type HttpStatusText =
	| "100 CONTINUE"
	| "101 SWITCHING_PROTOCOLS"
	| "102 PROCESSING"
	| "103 EARLY_HINTS"
	| "200 OK"
	| "201 CREATED"
	| "202 ACCEPTED"
	| "203 NON_AUTHORITATIVE_INFORMATION"
	| "204 NO_CONTENT"
	| "205 RESET_CONTENT"
	| "206 PARTIAL_CONTENT"
	| "207 MULTI_STATUS"
	| "208 ALREADY_REPORTED"
	| "226 IM_USED"
	| "300 MULTIPLE_CHOICES"
	| "301 MOVED_PERMANENTLY"
	| "302 FOUND"
	| "303 SEE_OTHER"
	| "304 NOT_MODIFIED"
	| "307 TEMPORARY_REDIRECT"
	| "308 PERMANENT_REDIRECT"
	| "400 BAD_REQUEST"
	| "401 UNAUTHORIZED"
	| "402 PAYMENT_REQUIRED"
	| "403 FORBIDDEN"
	| "404 NOT_FOUND"
	| "405 METHOD_NOT_ALLOWED"
	| "406 NOT_ACCEPTABLE"
	| "407 PROXY_AUTHENTICATION_REQUIRED"
	| "408 REQUEST_TIMEOUT"
	| "409 CONFLICT"
	| "410 GONE"
	| "411 LENGTH_REQUIRED"
	| "412 PRECONDITION_FAILED"
	| "413 CONTENT_TOO_LARGE"
	| "413 PAYLOAD_TOO_LARGE"
	| "414 URI_TOO_LONG"
	| "415 UNSUPPORTED_MEDIA_TYPE"
	| "416 REQUESTED_RANGE_NOT_SATISFIABLE"
	| "417 EXPECTATION_FAILED"
	| "418 I_AM_A_TEAPOT"
	| "421 MISDIRECTED_REQUEST"
	| "422 UNPROCESSABLE_CONTENT"
	| "422 UNPROCESSABLE_ENTITY"
	| "423 LOCKED"
	| "424 FAILED_DEPENDENCY"
	| "425 TOO_EARLY"
	| "426 UPGRADE_REQUIRED"
	| "428 PRECONDITION_REQUIRED"
	| "429 TOO_MANY_REQUESTS"
	| "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
	| "451 UNAVAILABLE_FOR_LEGAL_REASONS"
	| "500 INTERNAL_SERVER_ERROR"
	| "501 NOT_IMPLEMENTED"
	| "502 BAD_GATEWAY"
	| "503 SERVICE_UNAVAILABLE"
	| "504 GATEWAY_TIMEOUT"
	| "505 HTTP_VERSION_NOT_SUPPORTED"
	| "506 VARIANT_ALSO_NEGOTIATES"
	| "507 INSUFFICIENT_STORAGE"
	| "508 LOOP_DETECTED"
	| "509 BANDWIDTH_LIMIT_EXCEEDED"
	| "510 NOT_EXTENDED"
	| "511 NETWORK_AUTHENTICATION_REQUIRED";
/** Jenis SK kepegawaian (SK_KENAIKAN_PANGKAT_GOLONGAN, SK_CAPEG, SK_PEGAWAI_TETAP, dll). */
export type JenisSk =
	| "SK_KENAIKAN_PANGKAT_GOLONGAN"
	| "SK_CAPEG"
	| "SK_PEGAWAI_TETAP"
	| "SK_JABATAN"
	| "SK_MUTASI"
	| "SK_PENSIUN"
	| "SK_LAINNYA"
	| "SK_PENYESUAIAN_GAJI"
	| "SK_KENAIKAN_GAJI_BERKALA";
/** Jenis kelamin (LAKI_LAKI, PEREMPUAN). */
export type JenisKelamin = "LAKI_LAKI" | "PEREMPUAN";
/** Agama (ISLAM, KRISTEN, KATOLIK, HINDU, BUDHA). */
export type Agama =
	| "TIDAK_TAHU"
	| "ISLAM"
	| "KRISTEN"
	| "KATOLIK"
	| "HINDU"
	| "BUDHA"
	| "KONGHUCHU"
	| "ALIRAN_KEPERCAYAAN"
	| "LAINNYA";
/** Status kepegawaian (KONTRAK, CAPEG, PEGAWAI, CALON_HONORER, HONORER, NON_PEGAWAI). */
export type StatusKepegawaian = "KONTRAK" | "CAPEG" | "PEGAWAI" | "CALON_HONORER" | "HONORER" | "NON_PEGAWAI";
/** Status perkawinan (BELUM_KAWIN, KAWIN, JANDA_DUDA, MENIKAH_SEKANTOR, TIDAK_TAHU). */
export type StatusKawin = "BELUM_KAWIN" | "KAWIN" | "JANDA_DUDA" | "MENIKAH_SEKANTOR" | "TIDAK_TAHU";
/** Golongan darah (A, B, AB, O). */
export type GolonganDarah = "A" | "B" | "AB" | "O";
/** Jenis profil yang diupdate (PROFIL_KELUARGA, PROFIL_PENDIDIKAN). */
export type JenisProfilUpdate =
	| "PROFIL_KELUARGA"
	| "PROFIL_PENDIDIKAN"
	| "PROFIL_PELATIHAN"
	| "PROFIL_KEAHLIAN"
	| "FOTO_PROFIL"
	| "KARTU_IDENTITAS"
	| "PROFIL_PENGALAMAN_KERJA";
/** Tipe komponen penggajian (NONE, PEMASUKAN, POTONGAN). */
export type TipeKomponen = "NONE" | "PEMASUKAN" | "POTONGAN";
/** Status approval umum (PENDING, APPROVED, CONFIRMED, REJECTED, CANCELED, RETURNED). */
export type StatusApproval = "PENDING" | "APPROVED" | "CONFIRMED" | "REJECTED" | "CANCELED" | "RETURNED";
/** Status berhenti pegawai (BERHENTI_OR_KELUAR, DIRUMAHKAN). */
export type StatusBerhenti =
	| "BERHENTI_OR_KELUAR"
	| "DIRUMAHKAN"
	| "KARYAWAN_AKTIF"
	| "LAMARAN_BARU"
	| "TAHAP_SELEKSI"
	| "DITERIMA"
	| "DIREKOMENDASIKAN"
	| "DITOLAK";
/** Hubungan keluarga (SUAMI, ISTRI, AYAH, IBU, ANAK, SAUDARA). */
export type HubunganKeluarga = "SUAMI" | "ISTRI" | "AYAH" | "IBU" | "ANAK" | "SAUDARA";
/** Status pendidikan anggota keluarga (BELUM_SEKOLAH, SEKOLAH, SELESAI_SEKOLAH). */
export type StatusPendidikanKeluarga = "BELUM_SEKOLAH" | "SEKOLAH" | "SELESAI_SEKOLAH";
/** Tingkat kemampuan keahlian (KURANG, BAIK, CUKUP). */
export type TingkatKemampuan = "KURANG" | "BAIK" | "CUKUP";

/** Wrapper standar semua response. Union: sukses (data + message) | error (errors). */
export type Envelope<T> =
	| { status: number; statusText?: HttpStatusText; message: string; data: T; errors?: never; timestamp?: string } // 2xx
	| {
			status: number;
			statusText?: HttpStatusText;
			message?: string;
			data?: never;
			errors: string | string[];
			timestamp?: string;
	  }; // error

export interface Page<T> {
	totalElements?: number; // int64
	totalPages?: number; // int32
	size?: number; // int32
	content?: T[];
	number?: number; // int32
	numberOfElements?: number; // int32
	pageable?: PageableObject;
	sort?: SortObject;
	first?: boolean;
	last?: boolean;
	empty?: boolean;
}

export interface PageEnvelope<T> {
	status?: number; // int32
	statusText?: HttpStatusText;
	data?: Page<T>;
	timestamp?: string; // date-time
}

/** Query params pagination standar; di-extends oleh tiap {Entity}SearchParams. */
export interface PageQuery {
	page?: number; // int32
	size?: number; // int32
	sortBy?: string;
	sortDirection?: "asc" | "desc";
}

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
}

export type SavedResultLong = Envelope<number>;

export type DeletedResult = Envelope<string>;

export interface SortObject {
	empty?: boolean;
	sorted?: boolean;
	unsorted?: boolean;
}

export interface PageableObject {
	offset?: number; // int64
	unpaged?: boolean;
	paged?: boolean;
	pageNumber?: number; // int32
	pageSize?: number; // int32
	sort?: SortObject;
}

export type SingleResultInteger = Envelope<number>;

export interface PegawaiMiniResponse {
	id?: number; // int64
	nipam?: string;
	nama?: string;
	statusPegawai?: string;
	jabatan?: string;
	organisasi?: string;
}

export type SavedResultString = Envelope<string>;

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

export type SavedResultListLong = Envelope<number[]>;

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

export interface KeahlianPutRequest {
	biodataId: string; // minLength 1
	keahlianId?: number; // int64, min 1
	kualifikasi: TingkatKemampuan;
	sertifikasi?: boolean;
	institusi: string; // minLength 1
	tahun?: number; // int32, min 1970
	masaBerlaku?: string;
}

export interface KartuIdentitasPutRequest {
	nik: string; // minLength 1
	jenisKartuId?: number; // int64, min 1
	nomorKartu: string; // minLength 1
	tanggalExpired?: string; // date
	tanggalTerima?: string; // date
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

export interface LampiranRow {
	id?: number; // int64
	fileName?: string;
	mimeType?: string;
}

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

export interface PendidikanQuery {
	id?: number; // int64
	biodataId?: string;
	biodataNik?: string;
	biodataNama?: string;
	jenjangId?: number; // int64
	jenjangPendidikan?: JenjangPendidikanResponse;
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

export interface PrefPermission {
	name?: string;
}

export interface PrefRole {
	id: string; // minLength 1
	permissions?: PrefPermission[];
}
