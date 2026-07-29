import { describe, expect, it } from "vitest";
import { JENIS_SK_OPTIONS, labelJenisSk } from "./riwayat-constants";

describe("labelJenisSk — mapping value ke label", () => {
	it("semua opsi di JENIS_SK_OPTIONS memiliki label yang sesuai", () => {
		for (const opt of JENIS_SK_OPTIONS) {
			expect(labelJenisSk(opt.value)).toBe(opt.label);
		}
	});

	it("null → '—'", () => {
		expect(labelJenisSk(null)).toBe("—");
	});

	it("undefined → '—'", () => {
		expect(labelJenisSk(undefined)).toBe("—");
	});

	it("string kosong → '—'", () => {
		expect(labelJenisSk("")).toBe("—");
	});

	it("value tak dikenal → fallback String(s)", () => {
		expect(labelJenisSk("SK_GAIB")).toBe("SK_GAIB");
		expect(labelJenisSk("BUKAN_SK")).toBe("BUKAN_SK");
	});
});
