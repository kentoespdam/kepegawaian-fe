import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Format angka ke mata uang Rupiah (Rp).
 *
 * @example
 *   rupiah(1_500_000)       → "Rp 1.500.000"
 *   rupiah(1_500_000, true) → "Rp 1.500.000,00"
 *   rupiah(undefined)       → "-"
 *   rupiah(0)               → "Rp 0"
 *
 * @param value  Nilai numerik (atau null/undefined).
 * @param cents  Tampilkan sen (2 desimal). Default `false`.
 */
export function rupiah(value: number | null | undefined, cents?: boolean): string {
	if (value == null) return "-";
	if (!Number.isFinite(value)) return "-";

	const fmt = new Intl.NumberFormat("id-ID", {
		style: "decimal",
		minimumFractionDigits: cents ? 2 : 0,
		maximumFractionDigits: cents ? 2 : 0,
	});

	return `Rp ${fmt.format(value)}`;
}

/**
 * Format tanggal ISO (yyyy-mm-dd) ke format Indonesia (DD Bulan YYYY).
 *
 * Menangani format `date` (yyyy-mm-dd) maupun `date-time` (yyyy-mm-ddTHH:mm:ss).
 * Tidak digunakan untuk komponen `<input type="date">` — input tetap pakai
 * nilai mentah `yyyy-mm-dd`.
 *
 * @example
 *   formatDate("2026-07-27")           → "27 Juli 2026"
 *   formatDate("2026-07-27T00:00:00") → "27 Juli 2026"
 *   formatDate("2026-01-05")          → "5 Januari 2026"
 *   formatDate(null)                   → "-"
 *   formatDate(undefined)              → "-"
 *   formatDate("")                     → "-"
 *   formatDate("bukan-tanggal")        → "-"
 *
 * @param date  String tanggal ISO (date atau date-time), atau null/undefined.
 */
/**
 * Format tanggal ISO (yyyy-mm-dd) ke format Indonesia (DD Bulan YYYY).
 *
 * Menerima tipe `unknown` untuk fleksibilitas saat data dari API
 * (`Record<string, unknown>`) langsung dilempar ke helper ini.
 *
 * @example
 *   formatDate("2026-07-27")           → "27 Juli 2026"
 *   formatDate("2026-07-27T00:00:00") → "27 Juli 2026"
 *   formatDate(null)                   → "-"
 *   formatDate(undefined)              → "-"
 *   formatDate("")                     → "-"
 *   formatDate(42)                      → "-"
 *
 * @param date  Nilai tanggal (string, null, undefined, atau unknown).
 */
/**
 * Ambil pesan error dari body respons API.
 *
 * BE Spring Boot mengembalikan **RFC-7807 ProblemDetails** (`detail`, `title`)
 * untuk error terstruktur (mis. 413 "Maximum upload size exceeded"), sementara
 * envelope lama memakai `message`. Helper ini membaca ketiganya dengan urutan
 * prioritas: `detail` → `title` → `message` → `fallback`.
 *
 * @example
 *   apiErrorMessage({ detail: "Maximum upload size exceeded" }, "Gagal") → "Maximum upload size exceeded"
 *   apiErrorMessage({ title: "Content Too Large" }, "Gagal")          → "Content Too Large"
 *   apiErrorMessage({ message: "NIPAM sudah dipakai" }, "Gagal")       → "NIPAM sudah dipakai"
 *   apiErrorMessage(null, "Gagal")                                     → "Gagal"
 *
 * @param body      Body respons yang sudah di-`JSON.parse` (atau null/undefined).
 * @param fallback  Pesan default bila tidak ada field yang terbaca.
 */
export function apiErrorMessage(body: unknown, fallback: string): string {
	if (typeof body !== "object" || body === null) return fallback;
	const b = body as Record<string, unknown>;
	const detail = typeof b.detail === "string" ? b.detail : undefined;
	const title = typeof b.title === "string" ? b.title : undefined;
	const message = typeof b.message === "string" ? b.message : undefined;
	return detail ?? title ?? message ?? fallback;
}

/**
 * Error HTTP dengan status — biar UI bisa membedakan 404 (data memang tidak ada)
 * dari kegagalan lain (5xx / network) saat menampilkan state error.
 */
export class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.name = "HttpError";
		this.status = status;
	}
}

/** True bila error berasal dari respons HTTP 404 (resource tidak ditemukan). */
export function isNotFound(err: unknown): boolean {
	return err instanceof HttpError && err.status === 404;
}

/**
 * Lempar HttpError bila respons tidak ok — status HTTP ikut terbawa sehingga UI
 * bisa menampilkan "Data tidak ditemukan" (404) vs "Gagal memuat data" (lainnya).
 */
export function throwIfNotOk(res: Response, fallback: string): Response {
	if (!res.ok) throw new HttpError(res.status, fallback);
	return res;
}

export function formatDate(date: unknown): string {
	if (typeof date !== "string") return "-";
	if (!date) return "-";

	// Abaikan bagian time — cukup date-nya
	const dateOnly = date.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length !== 3) return "-";

	const y = Number(parts[0]);
	const m = Number(parts[1]);
	const d = Number(parts[2]);

	if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return "-";
	if (m < 1 || m > 12 || d < 1 || d > 31) return "-";

	const parsed = new Date(y, m - 1, d);

	// Validasi tanggal real (mis. 30 Feb tetap lolos parseInt tapi ditolak Date)
	if (parsed.getMonth() !== m - 1 || parsed.getDate() !== d) return "-";

	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(parsed);
}
