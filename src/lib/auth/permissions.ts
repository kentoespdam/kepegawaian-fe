/**
 * Permission granular per role — format `{ENTITY}:{ACTION}`.
 *
 * SUMBER KEBENARAN: `GET /system/permissions` (BE, MariaDB seed) — diverifikasi
 * live 2026-08-14 (21 permission). JANGAN menambah konstanta yang tidak ada di
 * katalog BE — permission phantom tidak akan pernah match `hasPermission()`.
 * Catatan katalog BE: TIDAK ada `MASTER:READ`/`CUTI:CREATE` (read master terbuka
 * untuk semua user login; cuti pakai `CUTI:WRITE`).
 */
export const PERMISSION = {
	// Master — read TIDAK ada di katalog (GET /master/* terbuka utk semua login)
	MASTER_WRITE: "MASTER:WRITE",
	MASTER_DELETE: "MASTER:DELETE",
	PEGAWAI_READ: "PEGAWAI:READ",
	PEGAWAI_WRITE: "PEGAWAI:WRITE",
	PEGAWAI_DELETE: "PEGAWAI:DELETE",
	KEPEGAWAIAN_READ: "KEPEGAWAIAN:READ",
	KEPEGAWAIAN_WRITE: "KEPEGAWAIAN:WRITE",
	KEPEGAWAIAN_DELETE: "KEPEGAWAIAN:DELETE",
	PROFIL_READ: "PROFIL:READ",
	PROFIL_UPDATE: "PROFIL:UPDATE",
	PROFIL_APPROVE: "PROFIL:APPROVE",
	CUTI_READ: "CUTI:READ",
	CUTI_WRITE: "CUTI:WRITE",
	CUTI_APPROVE: "CUTI:APPROVE",
	LAPORAN_READ: "LAPORAN:READ",
	PENGGAJIAN_READ: "PENGGAJIAN:READ",
	PENGGAJIAN_WRITE: "PENGGAJIAN:WRITE",
	PENGGAJIAN_PROCESS: "PENGGAJIAN:PROCESS",
	PENGGAJIAN_DELETE: "PENGGAJIAN:DELETE",
	SYSTEM_MANAGE_USER: "SYSTEM:MANAGE_USER",
	SYSTEM_MANAGE_ROLE: "SYSTEM:MANAGE_ROLE",
} as const;
export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];
