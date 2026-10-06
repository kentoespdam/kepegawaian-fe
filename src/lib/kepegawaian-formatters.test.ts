import { describe, expect, it } from "vitest";
import { formatPeriode } from "./kepegawaian-formatters";

describe("formatPeriode", () => {
	it("memformat format YYYY-MM dengan benar", () => {
		expect(formatPeriode("2026-03")).toBe("Maret 2026");
		expect(formatPeriode("2026-12")).toBe("Desember 2026");
		expect(formatPeriode("2026-01")).toBe("Januari 2026");
	});

	it("memformat format YYYYMM dengan benar", () => {
		expect(formatPeriode("202606")).toBe("Juni 2026");
	});

	it("memformat format YYYY-MM-DD dengan benar", () => {
		expect(formatPeriode("2026-09-01")).toBe("September 2026");
	});

	it("mengembalikan '-' untuk nilai null, undefined, atau kosong", () => {
		expect(formatPeriode(null)).toBe("-");
		expect(formatPeriode(undefined)).toBe("-");
		expect(formatPeriode("")).toBe("-");
		expect(formatPeriode("   ")).toBe("-");
	});

	it("mengembalikan '-' untuk format tidak valid", () => {
		expect(formatPeriode("bukan-periode")).toBe("-");
		expect(formatPeriode("2026-13")).toBe("-");
		expect(formatPeriode("2026-00")).toBe("-");
	});
});
