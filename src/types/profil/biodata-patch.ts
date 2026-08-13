/**
 * BiodataPatchRequest — body PATCH biodata (self & admin, ADR-0038).
 *
 * Hand-written, bukan hasil generator: schema ini hidup di path satu-segmen
 * (`PATCH /profil`) yang tak ter-generate extract-types.js karena bentrok
 * domain "profil" antar-modul (penggajian vs self-profil). Semua field opsional
 * (PATCH parsial). Lihat docs/FE-CONTRACT-profil-update-rbac.md §5.
 */

import type { Agama, JenisKelamin, StatusKawin } from "../_shared";

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
