import { describe, expect, it } from "vitest";
import { formatDateCustom, formatDateDotted } from "./date";

describe("formatDateCustom", () => {
	it("formats standard date string correctly", () => {
		expect(formatDateCustom("2026-05-15T00:00:00.000Z")).toBe("15/mei/2026");
		expect(formatDateCustom("2026-01-01")).toBe("1/januari/2026");
		expect(formatDateCustom("2026-12-31")).toBe("31/desember/2026");
	});

	it("handles invalid or empty inputs gracefully", () => {
		expect(formatDateCustom(null)).toBe("-");
		expect(formatDateCustom(undefined)).toBe("-");
		expect(formatDateCustom("invalid-date")).toBe("-");
		expect(formatDateCustom("2026-02-30")).toBe("-");
	});
});

describe("formatDateDotted", () => {
	it("formats date to dd.mm.yy correctly with leading zeros", () => {
		expect(formatDateDotted("2026-05-05T00:00:00.000Z")).toBe("05.05.26");
		expect(formatDateDotted("2026-01-01")).toBe("01.01.26");
		expect(formatDateDotted("2026-12-31")).toBe("31.12.26");
	});

	it("handles invalid or empty inputs gracefully", () => {
		expect(formatDateDotted(null)).toBe("-");
		expect(formatDateDotted(undefined)).toBe("-");
		expect(formatDateDotted("invalid-date")).toBe("-");
		expect(formatDateDotted("2026-02-30")).toBe("-");
	});
});
