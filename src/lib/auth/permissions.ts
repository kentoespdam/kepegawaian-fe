import type { Action } from "@/types/auth";

/** Permission granular per role (BE, seed V31) — format `{ENTITY}:{ACTION}`. */
export const PERMISSION = {
	MASTER_READ: "MASTER:READ",
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
	CUTI_CREATE: "CUTI:CREATE",
	CUTI_APPROVE: "CUTI:APPROVE",
	PENGGAJIAN_READ: "PENGGAJIAN:READ",
	PENGGAJIAN_WRITE: "PENGGAJIAN:WRITE",
	PENGGAJIAN_PROCESS: "PENGGAJIAN:PROCESS",
	SYSTEM_MANAGE_USER: "SYSTEM:MANAGE_USER",
	SYSTEM_MANAGE_ROLE: "SYSTEM:MANAGE_ROLE",
} as const;
export type Permission = (typeof PERMISSION)[keyof typeof PERMISSION];

const ALL: Action[] = ["view", "create", "update", "delete"];
const VIEW: Action[] = ["view"];

// ponytail: legacy role-matrix — dipakai can() di Can/sanksi-manager;
// hapus saat caller-nya migrasi ke hasPermission().
export const PERMISSIONS: Record<string, Record<string, Action[]>> = {
	admin: { "*": ALL },
	viewer: { "*": VIEW },
	hr: { "*": ALL },
};
