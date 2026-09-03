import { describe, expect, it } from "vitest";
import { generateListHari, hitungHari, klaimFormSchema } from "./klaim-form-schema";

// Pengajuan asal yang di-klaim: 2026-08-01 s/d 2026-08-05
const ASAL = { tanggalMulai: "2026-08-01", tanggalSelesai: "2026-08-05" };

describe("klaimFormSchema — validasi rentang terhadap pengajuan asal (CU-25/26)", () => {
	it("valid: full range dalam rentang pengajuan asal", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-08-01",
			tanggalSelesai: "2026-08-05",
		});
		expect(result.success).toBe(true);
	});

	it("valid: sub-range sebagian (mulai di tengah)", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-08-02",
			tanggalSelesai: "2026-08-04",
		});
		expect(result.success).toBe(true);
	});

	it("invalid: tanggalMulai sebelum tanggalMulai pengajuan asal", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-07-31",
			tanggalSelesai: "2026-08-02",
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.some((i) => i.path[0] === "tanggalMulai")).toBe(true);
		}
	});

	it("invalid: tanggalMulai melewati tanggalSelesai pengajuan asal", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-08-06",
			tanggalSelesai: "2026-08-06",
		});
		expect(result.success).toBe(false);
	});

	it("invalid: tanggalSelesai melewati tanggalSelesai pengajuan asal", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-08-04",
			tanggalSelesai: "2026-08-06",
		});
		expect(result.success).toBe(false);
		if (!result.success) {
			expect(result.error.issues.some((i) => i.path[0] === "tanggalSelesai")).toBe(true);
		}
	});

	it("invalid: tanggalSelesai sebelum tanggalMulai", () => {
		const result = klaimFormSchema(ASAL).safeParse({
			tanggalMulai: "2026-08-04",
			tanggalSelesai: "2026-08-03",
		});
		expect(result.success).toBe(false);
	});

	it("invalid: tanggal wajib kosong", () => {
		const result = klaimFormSchema(ASAL).safeParse({ tanggalMulai: "", tanggalSelesai: "" });
		expect(result.success).toBe(false);
	});

	it("tanpa asal (null) → hanya rule dasar (selesai >= mulai) yang aktif", () => {
		const ok = klaimFormSchema(null).safeParse({
			tanggalMulai: "2026-01-01",
			tanggalSelesai: "2026-01-10",
		});
		expect(ok.success).toBe(true);
	});
});

describe("generateListHari — dari range tanggal (CU-25)", () => {
	it("satu hari → array satu elemen", () => {
		expect(generateListHari("2026-08-01", "2026-08-01")).toEqual(["2026-08-01"]);
	});

	it("range multi-hari inklusif (inklusi kedua ujung)", () => {
		expect(generateListHari("2026-08-01", "2026-08-05")).toEqual([
			"2026-08-01",
			"2026-08-02",
			"2026-08-03",
			"2026-08-04",
			"2026-08-05",
		]);
	});

	it("menyeberangi batas bulan (July→August)", () => {
		expect(generateListHari("2026-07-30", "2026-08-02")).toEqual([
			"2026-07-30",
			"2026-07-31",
			"2026-08-01",
			"2026-08-02",
		]);
	});

	it("menyeberangi batas tahun (December→January)", () => {
		expect(generateListHari("2025-12-30", "2026-01-01")).toEqual(["2025-12-30", "2025-12-31", "2026-01-01"]);
	});
});

describe("hitungHari — jumlah hari inklusif", () => {
	it("1 hari → 1", () => {
		expect(hitungHari("2026-08-01", "2026-08-01")).toBe(1);
	});

	it("5 hari (01–05) → 5", () => {
		expect(hitungHari("2026-08-01", "2026-08-05")).toBe(5);
	});

	it("range invalid (selesai < mulai) → null", () => {
		expect(hitungHari("2026-08-05", "2026-08-03")).toBeNull();
	});

	it("tanggal kosong → null", () => {
		expect(hitungHari(undefined, "2026-08-05")).toBeNull();
	});
});
