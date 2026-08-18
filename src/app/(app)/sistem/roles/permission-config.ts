import type { LucideIcon } from "lucide-react";
import {
	Briefcase,
	CalendarDays,
	Database,
	FileBarChart,
	Layers,
	Shield,
	UserCheck,
	Users,
	Wallet,
} from "lucide-react";

export type ActionType = "read" | "write" | "delete" | "approve" | "manage" | "custom";

export interface PermissionDefinition {
	code: string;
	name: string;
	description: string;
	actionType: ActionType;
	moduleKey: string;
}

export interface ModuleConfig {
	key: string;
	title: string;
	description: string;
	icon: LucideIcon;
	badgeClass: string;
}

export const MODULE_REGISTRY: Record<string, ModuleConfig> = {
	PEGAWAI: {
		key: "PEGAWAI",
		title: "Data Pegawai",
		description: "Data induk identitas, data pribadi, dan akun pegawai",
		icon: Users,
		badgeClass: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
	},
	KEPEGAWAIAN: {
		key: "KEPEGAWAIAN",
		title: "Riwayat Kepegawaian",
		description: "Catatan riwayat mutasi, SK kenaikan pangkat/jabatan, dan dokumen karir",
		icon: Briefcase,
		badgeClass: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50",
	},
	PROFIL: {
		key: "PROFIL",
		title: "Profil Mandiri Pegawai",
		description: "Akses profil mandiri, pengajuan update data, dan antrean verifikasi",
		icon: UserCheck,
		badgeClass: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/50",
	},
	CUTI: {
		key: "CUTI",
		title: "Cuti & Izin",
		description: "Rekapitulasi hak cuti, pengajuan permohonan, dan persetujuan cuti",
		icon: CalendarDays,
		badgeClass: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
	},
	PENGGAJIAN: {
		key: "PENGGAJIAN",
		title: "Penggajian & Remunerasi",
		description: "Rekapitulasi gaji, komponen tunjangan/potongan, dan proses payroll",
		icon: Wallet,
		badgeClass:
			"bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
	},
	MASTER: {
		key: "MASTER",
		title: "Data Master & Referensi",
		description: "Pengelolaan tabel referensi (unit kerja, jabatan, golongan, dsb.)",
		icon: Database,
		badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800",
	},
	LAPORAN: {
		key: "LAPORAN",
		title: "Laporan & Rekapitulasi",
		description: "Akses unduh, cetak, dan ekspor laporan kepegawaian",
		icon: FileBarChart,
		badgeClass: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-900/50",
	},
	SYSTEM: {
		key: "SYSTEM",
		title: "Administrasi Sistem & Keamanan",
		description: "Manajemen akun login pengguna, konfigurasi role, dan hak akses",
		icon: Shield,
		badgeClass: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
	},
};

export const PERMISSION_DEFINITIONS: Record<string, Omit<PermissionDefinition, "code">> = {
	// Pegawai
	"PEGAWAI:READ": {
		name: "Lihat Data Pegawai",
		description: "Melihat daftar pegawai, biodata lengkap, dan ringkasan profil",
		actionType: "read",
		moduleKey: "PEGAWAI",
	},
	"PEGAWAI:WRITE": {
		name: "Tambah & Ubah Pegawai",
		description: "Menambah pegawai baru dan memperbarui informasi biodata",
		actionType: "write",
		moduleKey: "PEGAWAI",
	},
	"PEGAWAI:DELETE": {
		name: "Hapus Data Pegawai",
		description: "Menghapus data pegawai dari database sistem",
		actionType: "delete",
		moduleKey: "PEGAWAI",
	},

	// Kepegawaian (Riwayat)
	"KEPEGAWAIAN:READ": {
		name: "Lihat Riwayat Kepegawaian",
		description: "Melihat dokumen SK, riwayat mutasi, kontrak, dan surat peringatan",
		actionType: "read",
		moduleKey: "KEPEGAWAIAN",
	},
	"KEPEGAWAIAN:WRITE": {
		name: "Tambah & Ubah Riwayat",
		description: "Menginput mutasi baru, upload SK kenaikan pangkat/jabatan",
		actionType: "write",
		moduleKey: "KEPEGAWAIAN",
	},
	"KEPEGAWAIAN:DELETE": {
		name: "Hapus Dokumen Riwayat",
		description: "Menghapus entri riwayat mutasi, SK, atau dokumen kepegawaian",
		actionType: "delete",
		moduleKey: "KEPEGAWAIAN",
	},

	// Profil Mandiri
	"PROFIL:READ": {
		name: "Lihat Profil Mandiri",
		description: "Mengakses halaman profil pribadi dan riwayat pengajuan mandiri",
		actionType: "read",
		moduleKey: "PROFIL",
	},
	"PROFIL:UPDATE": {
		name: "Pengajuan Update Profil",
		description: "Mengajukan perubahan biodata, data keluarga, atau riwayat pendidikan",
		actionType: "write",
		moduleKey: "PROFIL",
	},
	"PROFIL:APPROVE": {
		name: "Verifikasi & Approval Profil",
		description: "Menyetujui atau menolak permohonan pembaruan profil dari pegawai",
		actionType: "approve",
		moduleKey: "PROFIL",
	},

	// Cuti
	"CUTI:READ": {
		name: "Lihat Data & Rekap Cuti",
		description: "Melihat riwayat pengajuan cuti, sisa kuota tahunan, dan rekapitulasi",
		actionType: "read",
		moduleKey: "CUTI",
	},
	"CUTI:WRITE": {
		name: "Pengajuan Cuti",
		description: "Membuat permohonan cuti baru (tahunan, sakit, alasan penting)",
		actionType: "write",
		moduleKey: "CUTI",
	},
	"CUTI:APPROVE": {
		name: "Persetujuan / Approval Cuti",
		description: "Menyetujui atau menolak pengajuan cuti pegawai yang masuk antrean",
		actionType: "approve",
		moduleKey: "CUTI",
	},

	// Penggajian
	"PENGGAJIAN:READ": {
		name: "Lihat Data & Slip Gaji",
		description: "Melihat rekapitulasi penggajian, slip gaji bulanan, dan histori",
		actionType: "read",
		moduleKey: "PENGGAJIAN",
	},
	"PENGGAJIAN:WRITE": {
		name: "Kelola Komponen Gaji",
		description: "Menginput dan mengubah komponen tunjangan, bonus, dan potongan",
		actionType: "write",
		moduleKey: "PENGGAJIAN",
	},
	"PENGGAJIAN:PROCESS": {
		name: "Proses & Hitung Payroll",
		description: "Menjalankan kalkulasi penggajian bulanan dan finalisasi payroll",
		actionType: "approve",
		moduleKey: "PENGGAJIAN",
	},
	"PENGGAJIAN:DELETE": {
		name: "Hapus Draft Penggajian",
		description: "Menghapus catatan draft payroll atau perhitungan gaji",
		actionType: "delete",
		moduleKey: "PENGGAJIAN",
	},

	// Master
	"MASTER:WRITE": {
		name: "Kelola Data Master",
		description: "Menambah dan mengubah data referensi unit kerja, jabatan, profesi",
		actionType: "write",
		moduleKey: "MASTER",
	},
	"MASTER:DELETE": {
		name: "Hapus Data Master",
		description: "Menghapus data referensi master yang sudah tidak digunakan",
		actionType: "delete",
		moduleKey: "MASTER",
	},

	// Laporan
	"LAPORAN:READ": {
		name: "Akses & Ekspor Laporan",
		description: "Melihat dan mengunduh laporan rekapitulasi kepegawaian",
		actionType: "read",
		moduleKey: "LAPORAN",
	},

	// System
	"SYSTEM:MANAGE_USER": {
		name: "Kelola Pengguna (User)",
		description: "Membuat akun pengguna baru, reset password, dan aktivasi akun",
		actionType: "manage",
		moduleKey: "SYSTEM",
	},
	"SYSTEM:MANAGE_ROLE": {
		name: "Kelola Hak Akses (Role)",
		description: "Menambah role dan mengonfigurasi mapping permission sistem",
		actionType: "manage",
		moduleKey: "SYSTEM",
	},
};

/** Action badge styling & label helper */
export function getActionBadgeInfo(actionType: ActionType) {
	switch (actionType) {
		case "read":
			return {
				label: "Lihat",
				className: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
			};
		case "write":
			return {
				label: "Tulis / Edit",
				className: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
			};
		case "delete":
			return {
				label: "Hapus",
				className: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
			};
		case "approve":
			return {
				label: "Approval / Proses",
				className:
					"bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
			};
		case "manage":
			return {
				label: "Kelola / Admin",
				className: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
			};
		default:
			return {
				label: "Aksi",
				className: "bg-muted text-muted-foreground border-border",
			};
	}
}

/** Fallback dynamic parser for unknown or newly created backend permissions */
export function resolvePermissionMeta(rawCode: string): PermissionDefinition {
	const code = rawCode.trim();
	const predefined = PERMISSION_DEFINITIONS[code];
	if (predefined) {
		return {
			code,
			...predefined,
		};
	}

	// Fallback heuristic: MODULE:ACTION
	const parts = code.split(":");
	const moduleKey = parts[0]?.toUpperCase() || "LAINNYA";
	const actionKey = parts.slice(1).join(" ").toUpperCase() || "ACCESS";

	let actionType: ActionType = "custom";
	if (actionKey.includes("READ") || actionKey.includes("VIEW") || actionKey.includes("LIST")) {
		actionType = "read";
	} else if (
		actionKey.includes("WRITE") ||
		actionKey.includes("CREATE") ||
		actionKey.includes("UPDATE") ||
		actionKey.includes("EDIT")
	) {
		actionType = "write";
	} else if (actionKey.includes("DELETE") || actionKey.includes("REMOVE")) {
		actionType = "delete";
	} else if (actionKey.includes("APPROVE") || actionKey.includes("PROCESS") || actionKey.includes("REJECT")) {
		actionType = "approve";
	} else if (actionKey.includes("MANAGE") || actionKey.includes("ADMIN")) {
		actionType = "manage";
	}

	return {
		code,
		name: `${moduleKey} — ${actionKey}`,
		description: `Hak akses untuk ${code}`,
		actionType,
		moduleKey,
	};
}

/** Resolves module config with fallback */
export function resolveModuleConfig(moduleKey: string): ModuleConfig {
	const found = MODULE_REGISTRY[moduleKey];
	if (found) return found;

	return {
		key: moduleKey,
		title: `Modul ${moduleKey}`,
		description: `Daftar permission untuk modul ${moduleKey}`,
		icon: Layers,
		badgeClass: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-800",
	};
}
