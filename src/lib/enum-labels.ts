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

// ─── Hubungan Keluarga & Status Pendidikan Keluarga (data pendukung) ──────────

export function labelHubunganKeluarga(s?: string): string {
	return labelFromValue(s, ENUMS.hubunganKeluarga);
}

export function labelStatusPendidikanKeluarga(s?: string): string {
	return labelFromValue(s, ENUMS.statusPendidikanKeluarga);
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

// ─── Status Approval Cuti ───────────────────────────────────────────────────

const STATUS_APPROVAL: Record<string, string> = {
	PENDING: "Menunggu",
	APPROVED: "Disetujui",
	CONFIRMED: "Dikonfirmasi",
	REJECTED: "Ditolak",
	CANCELED: "Dibatalkan",
	RETURNED: "Dikembalikan",
};

export function labelApprovalStatus(s?: string): string {
	return s ? (STATUS_APPROVAL[s] ?? s) : "-";
}

/** Tone semantik badge status approval — ikon + teks + warna (a11y: bukan warna saja). */
export function approvalStatusTone(s?: string): string {
	switch (s) {
		case "APPROVED":
		case "CONFIRMED":
			return "text-success border-success/30 bg-success/10";
		case "REJECTED":
			return "text-destructive border-destructive/30 bg-destructive/10";
		case "PENDING":
		case "RETURNED":
			return "text-warning border-warning/30 bg-warning/10";
		case "CANCELED":
			return "text-muted-foreground border-border bg-muted/30";
		default:
			return "text-muted-foreground border-border bg-muted/30";
	}
}

// ─── Pendidikan ─────────────────────────────────────────────────────────────

export function formatPendidikan(p?: PendidikanDashboard): string | undefined {
	if (!p) return undefined;
	const parts = [p.tingkat, p.jurusan, p.institusi, p.tahunLulus ? String(p.tahunLulus) : undefined].filter(Boolean);
	return parts.length > 0 ? parts.join(" — ") : undefined;
}
