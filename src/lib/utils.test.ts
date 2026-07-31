import { describe, expect, it } from "vitest";
import { apiErrorMessage, formatDate } from "./utils";

describe("apiErrorMessage — RFC-7807 ProblemDetails → pesan terbaik", () => {
	it("RFC-7807: detail lebih diutamakan dari title", () => {
		const body = { detail: "Maximum upload size exceeded", title: "Content Too Large", status: 413 };
		expect(apiErrorMessage(body, "Gagal menyimpan SP")).toBe("Maximum upload size exceeded");
	});

	it("RFC-7807 tanpa detail — pakai title", () => {
		expect(apiErrorMessage({ title: "Content Too Large", status: 413 }, "Gagal")).toBe("Content Too Large");
	});

	it("envelope lama — pakai message", () => {
		expect(apiErrorMessage({ message: "NIPAM sudah dipakai" }, "Gagal")).toBe("NIPAM sudah dipakai");
	});

	it("body kosong / bukan object → fallback", () => {
		expect(apiErrorMessage({}, "Gagal")).toBe("Gagal");
		expect(apiErrorMessage(null, "Gagal")).toBe("Gagal");
		expect(apiErrorMessage(undefined, "Gagal")).toBe("Gagal");
		expect(apiErrorMessage("teks", "Gagal")).toBe("Gagal");
	});

	it("field bertipe non-string diabaikan", () => {
		expect(apiErrorMessage({ detail: 413, title: 404 }, "Gagal")).toBe("Gagal");
	});
});

describe("formatDate — yyyy-mm-dd → Indonesia (DD Bulan YYYY)", () => {
	it("format standar", () => {
		expect(formatDate("2026-07-27")).toBe("27 Juli 2026");
	});

	it("bulan dan hari satu digit", () => {
		expect(formatDate("2026-01-05")).toBe("5 Januari 2026");
	});

	it("format date-time (dengan jam) — potong bagian time", () => {
		expect(formatDate("2026-07-27T14:30:00")).toBe("27 Juli 2026");
		expect(formatDate("2026-07-27T00:00:00")).toBe("27 Juli 2026");
	});

	it("tahun kabisat — 29 Februari", () => {
		expect(formatDate("2024-02-29")).toBe("29 Februari 2024");
	});

	it("null → '-'", () => {
		expect(formatDate(null)).toBe("-");
	});

	it("undefined → '-'", () => {
		expect(formatDate(undefined)).toBe("-");
	});

	it("string kosong → '-'", () => {
		expect(formatDate("")).toBe("-");
	});

	it("string bukan tanggal → '-'", () => {
		expect(formatDate("bukan-tanggal")).toBe("-");
		expect(formatDate("abc-def-ghi")).toBe("-");
	});

	it("format salah — bagian tanggal tak valid → '-'", () => {
		expect(formatDate("2026-13-01")).toBe("-"); // bulan 13
		expect(formatDate("2026-00-01")).toBe("-"); // bulan 0
		expect(formatDate("2026-01-32")).toBe("-"); // hari 32
	});

	it("tanggal imposible (30 Feb) → '-'", () => {
		expect(formatDate("2026-02-30")).toBe("-");
	});

	it("nilai number → '-' (bukan string)", () => {
		expect(formatDate(42 as unknown as string)).toBe("-");
		expect(formatDate(20260727 as unknown as string)).toBe("-");
	});

	it("nilai object → '-' (bukan string)", () => {
		expect(formatDate({} as unknown as string)).toBe("-");
	});
});
