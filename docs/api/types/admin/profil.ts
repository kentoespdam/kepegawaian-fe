/**
 * profil — response & request types
 *
 * DIGENERATE OTOMATIS oleh docs/api/extract-types.js.
 * JANGAN diedit manual — jalankan ulang script bila spec berubah.
 *
 * Sumber: docs/api/{modul}/api.json
 * Endpoint : DELETE /admin/profil/kartu-identitas/lampiran/{id}, DELETE /admin/profil/kartu-identitas/{id}, DELETE /admin/profil/keahlian/lampiran/{id}, DELETE /admin/profil/keahlian/{id}, DELETE /admin/profil/keluarga/lampiran/{id}, DELETE /admin/profil/keluarga/{id}, DELETE /admin/profil/pelatihan/lampiran/{id}, DELETE /admin/profil/pelatihan/{id}, DELETE /admin/profil/pendidikan/lampiran/{id}, DELETE /admin/profil/pendidikan/{id}, DELETE /admin/profil/pengalaman-kerja/lampiran/{id}, DELETE /admin/profil/pengalaman-kerja/{id}, DELETE /penggajian/profil/{id}, GET /penggajian/profil, GET /penggajian/profil/list, GET /penggajian/profil/{id}, PATCH /admin/profil/{id}, POST /admin/profil/kartu-identitas, POST /admin/profil/kartu-identitas/lampiran, POST /admin/profil/keahlian, POST /admin/profil/keahlian/lampiran, POST /admin/profil/keluarga, POST /admin/profil/keluarga/lampiran, POST /admin/profil/pelatihan, POST /admin/profil/pelatihan/lampiran, POST /admin/profil/pendidikan, POST /admin/profil/pendidikan/lampiran, POST /admin/profil/pengalaman-kerja, POST /admin/profil/pengalaman-kerja/lampiran, POST /penggajian/profil, PUT /admin/profil/kartu-identitas/{id}, PUT /admin/profil/keahlian/{id}, PUT /admin/profil/keluarga/{id}, PUT /admin/profil/pelatihan/{id}, PUT /admin/profil/pendidikan/{id}, PUT /admin/profil/pengalaman-kerja/{id}, PUT /penggajian/profil/{id}
 */

import type {
	Agama,
	Envelope,
	GajiProfilResponse,
	JenisKelamin,
	Page,
	PageEnvelope,
	PageQuery,
	StatusKawin,
} from "../_shared";

export interface ProfilSearchParams extends PageQuery {
	nama?: string;
}

export type SingleResultGajiProfilResponse = Envelope<GajiProfilResponse>;

export interface GajiProfilPutRequest {
	nama: string; // minLength 1
}

export type PageGajiProfilResponse = Page<GajiProfilResponse>;

export type PageResultPageGajiProfilResponse = PageEnvelope<GajiProfilResponse>;

export interface GajiProfilPostRequest {
	nama: string; // minLength 1
}

export type ListResultGajiProfilResponse = Envelope<GajiProfilResponse[]>;

export interface BiodataPatchRequest {
	nama?: string;
	alamat?: string;
	jenisKelamin?: JenisKelamin;
	statusKawin?: StatusKawin;
	agama?: Agama;
	tempatLahir?: string;
	tanggalLahir?: string; // date
	ibuKandung?: string;
	telp?: string;
}

export type {
	DeletedResult,
	GajiProfilResponse,
	KartuIdentitasLampiranPostRequest,
	KartuIdentitasPostRequest,
	KartuIdentitasPutRequest,
	KeahlianLampiranPostRequest,
	KeahlianPostRequest,
	KeahlianPutRequest,
	PageableObject,
	PelatihanLampiranPostRequest,
	PelatihanPostRequest,
	PelatihanPutRequest,
	PendidikanLampiranPostRequest,
	PendidikanPostRequest,
	PendidikanPutRequest,
	PengalamanKerjaPostRequest,
	PengalamanKerjaPutRequest,
	PengalamanLampiranPostRequest,
	ProfilKeluargaLampiranPostRequest,
	ProfilKeluargaPostRequest,
	ProfilKeluargaPutRequest,
	SavedResultLong,
	SavedResultString,
	SortObject,
} from "../_shared";
