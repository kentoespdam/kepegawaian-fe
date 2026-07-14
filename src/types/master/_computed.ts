/**
 * _computed — tipe untuk field hasil resolve FK (denormalized display names)
 *
 * DITULIS MANUAL, bukan hasil generate.
 *
 * Saat entitas Master ditampilkan di tabel, field FK berupa id (int64) dari
 * database akan di-resolve ke nama display-nya oleh backend. `Computed` menampung
 * field-field display name yang ditambahkan response backend. `Resolved<T>` adalah
 * convenience type: `T & Partial<Computed>`.
 */

/** 6 field display name hasil resolve FK (paling umum di modul Master). */
export interface Computed {
	/** Nama organisasi (FK: organisasi → OrganisasiMiniResponse.nama). */
	_organisasiName: string;
	/** Nama jabatan (FK: jabatan → JabatanMiniResponse.nama). */
	_jabatanName: string;
	/** Nama grade (FK: grade → GradeMiniResponse.grade). */
	_gradeName: string;
	/** Nama level (FK: level → LevelResponse.nama). */
	_levelName: string;
	/** Nama profesi (FK: profesi → ProfesiListResponse.nama). */
	_profesiName: string;
	/** Nama jenis sanksi (FK: sanksi → JenisSpMiniResponse.nama). */
	_jenisSpName: string;
}

/**
 * Tipe hasil resolve: data query T ditambah field display name (jika ada).
 *
 * Digunakan di `useMasterTable` untuk array `resolvedItems`.
 */
export type Resolved<T> = T & Partial<Computed>;
