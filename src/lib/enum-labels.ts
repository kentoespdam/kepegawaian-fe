/**
 * Label mapping functions — mengubah nilai ENUM API ke label Bahasa Indonesia.
 * Gunakan di komponen display (tabel, panel, kartu) untuk output yang terbaca manusia.
 */
import type { PendidikanDashboard } from "@/types/profil/biodata";
import { ENUMS, labelFromValue } from "./enums";

export { labelFromValue, valueFromLabel } from "./enums";

// ─── Jenis Kelamin ──────────────────────────────────────────────────────────

export function labelJk(s?: string): string {
	return labelFromValue(s, ENUMS.jenisKelamin);
}

// ─── Agama ──────────────────────────────────────────────────────────────────

export function labelAgama(s?: string): string {
	return labelFromValue(s, ENUMS.agama);
}

// ─── Status Kawin ───────────────────────────────────────────────────────────

export function labelKawin(s?: string): string {
	return labelFromValue(s, ENUMS.statusKawin);
}

// ─── Status Pegawai ─────────────────────────────────────────────────────────

const STATUS_PEGAWAI: Record<string, string> = {
	KONTRAK: "Kontrak",
	CAPEG: "Calon Pegawai",
	PEGAWAI: "Pegawai Tetap",
	HONORER: "Honorer",
	CALON_HONORER: "Calon Honorer",
	NON_PEGAWAI: "Non-Pegawai",
};

export function labelStatus(s?: string): string {
	return s ? (STATUS_PEGAWAI[s] ?? s) : "-";
}

// ─── Status Kerja ───────────────────────────────────────────────────────────

const STATUS_KERJA: Record<string, string> = {
	KARYAWAN_AKTIF: "Aktif",
	BERHENTI_OR_KELUAR: "Berhenti / Keluar",
	DIRUMAHKAN: "Dirumahkan",
};

export function labelStatusKerja(s?: string): string {
	return s ? (STATUS_KERJA[s] ?? s) : "-";
}

/** Warna semantik untuk badge status kerja. */
export function statusKerjaColor(s?: string): string | undefined {
	if (s === "KARYAWAN_AKTIF") return "text-success";
	if (s === "BERHENTI_OR_KELUAR") return "text-destructive";
	if (s === "DIRUMAHKAN") return "text-warning";
	return undefined;
}

// ─── Pendidikan ─────────────────────────────────────────────────────────────

export function formatPendidikan(p?: PendidikanDashboard): string | undefined {
	if (!p) return undefined;
	const parts = [p.tingkat, p.jurusan, p.institusi, p.tahunLulus ? String(p.tahunLulus) : undefined].filter(Boolean);
	return parts.length > 0 ? parts.join(" — ") : undefined;
}
