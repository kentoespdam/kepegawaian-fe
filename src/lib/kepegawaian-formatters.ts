import type { Page } from "@/types/_shared";
import type { SectionConf } from "@/types/kepegawaian/dashboard";
import { fromPage, toApiParams } from "./paging";
import { throwIfNotOk } from "./utils";

/** Extract nama from object-or-string, fallback "-". */
export function t(s: unknown): string {
	if (s == null) return "-";
	if (typeof s === "object" && "nama" in (s as object)) return String((s as { nama?: string }).nama ?? "-");
	return String(s);
}

/** String coercion with "-" fallback. */
export function val(s: unknown): string {
	if (s == null) return "-";
	return String(s);
}

/** Format number as IDR currency. */
export function rp(n: unknown): string {
	if (n == null || n === "") return "-";
	const v = Number(n);
	if (!Number.isFinite(v)) return val(n);
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(v);
}

/** Boolean to "Ya"/"Tidak"/"-". */
export function boolStr(s: unknown): string {
	if (s === true) return "Ya";
	if (s === false) return "Tidak";
	return "-";
}

/** SK type enum label. */
export function jenisSk(s: unknown): string {
	if (s == null) return "-";
	const raw = typeof s === "object" && "nama" in (s as object) ? (s as { nama?: string }).nama : String(s);
	if (!raw) return "-";
	const map: Record<string, string> = {
		SK_KENAIKAN_PANGKAT_GOLONGAN: "Kenaikan Pangkat",
		SK_CAPEG: "Calon Pegawai",
		SK_PEGAWAI_TETAP: "Pegawai Tetap",
		SK_JABATAN: "Jabatan",
		SK_MUTASI: "Mutasi",
		SK_PENSIUN: "Pensiun",
		SK_LAINNYA: "Lainnya",
		SK_PENYESUAIAN_GAJI: "Penyesuaian Gaji",
		SK_KENAIKAN_GAJI_BERKALA: "Kenaikan Gaji Berkala",
	};
	return map[raw] ?? raw;
}

/** Mutasi type enum label. */
export function jenisMutasi(s: unknown): string {
	const map: Record<string, string> = {
		PENGANGKATAN_PERTAMA: "Pengangkatan Pertama",
		MUTASI_LOKER: "Mutasi Lokasi Kerja",
		MUTASI_JABATAN: "Mutasi Jabatan",
		MUTASI_GOLONGAN: "Mutasi Golongan",
		MUTASI_GAJI: "Mutasi Gaji",
		MUTASI_GAJI_BERKALA: "Mutasi Gaji Berkala",
		TERMINASI: "Terminasi",
	};
	return map[val(s)] ?? val(s);
}

/** Hubungan keluarga enum label. */
export function hubunganKeluarga(s: unknown): string {
	const map: Record<string, string> = {
		SUAMI: "Suami",
		ISTRI: "Istri",
		AYAH: "Ayah",
		IBU: "Ibu",
		ANAK: "Anak",
		SAUDARA: "Saudara",
	};
	return map[val(s)] ?? val(s);
}

/** SP severity CSS class tint. */
export function spSeverity(s: unknown): string {
	const raw = String(s ?? "").toLowerCase();
	if (raw.includes("3") || raw.includes("berat")) return "text-destructive";
	if (raw.includes("2") || raw.includes("sedang")) return "text-warning";
	return "";
}

type SectionFetchResult = {
	rows: Record<string, unknown>[];
	total: number;
	totalPages: number;
	page: number;
	first: boolean;
	last: boolean;
};

/** Fetch function for one dashboard section. */
export function fetchSection(
	conf: SectionConf,
	pegawaiId: number,
	nik: string | null,
	page: number,
	size: number,
): () => Promise<SectionFetchResult> {
	const params = { ...toApiParams({ page, size }) };
	const url = conf.buildUrl(pegawaiId, nik, params);
	return async (): Promise<SectionFetchResult> => {
		const res = await fetch(url);
		throwIfNotOk(res, "Gagal memuat data");
		const body = await res.json();
		if (conf.isSingleItem) {
			const items = body.data ? (Array.isArray(body.data) ? body.data : [body.data]) : [];
			const finished = (items as { status?: string }[]).filter((r) => r.status === "FINISHED");
			return {
				rows: finished as Record<string, unknown>[],
				total: finished.length,
				totalPages: 1,
				page: 1,
				first: true,
				last: true,
			};
		}
		const pv = fromPage(body.data as Page<unknown>);
		return {
			rows: pv.rows as Record<string, unknown>[],
			total: pv.total,
			totalPages: pv.totalPages,
			page: pv.page,
			first: pv.first,
			last: pv.last,
		};
	};
}

/** Format periode (e.g. "2026-03", "202603", "2026-03-01") ke "Maret 2026". */
export function formatPeriode(periode?: string | null): string {
	if (!periode) return "-";
	const clean = periode.trim();
	// Format YYYY-MM atau YYYYMM atau YYYY-MM-DD
	let year: number | undefined;
	let month: number | undefined;

	if (/^\d{4}-\d{2}(-\d{2})?$/.test(clean)) {
		const parts = clean.split("-");
		year = Number(parts[0]);
		month = Number(parts[1]);
	} else if (/^\d{6}$/.test(clean)) {
		year = Number(clean.substring(0, 4));
		month = Number(clean.substring(4, 6));
	}

	if (!year || !month || !Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
		return "-";
	}

	const months = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	return `${months[month - 1]} ${year}`;
}
