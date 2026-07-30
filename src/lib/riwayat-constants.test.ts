import { describe, expect, it } from "vitest";
import { JENIS_AKSI_KONTRAK_OPTIONS, JENIS_SK_OPTIONS, labelAksiKontrak, labelJenisSk } from "./riwayat-constants";

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

describe("labelAksiKontrak — mapping value ke label", () => {
	it("semua opsi di JENIS_AKSI_KONTRAK_OPTIONS memiliki label yang sesuai", () => {
		for (const opt of JENIS_AKSI_KONTRAK_OPTIONS) {
			expect(labelAksiKontrak(opt.value)).toBe(opt.label);
		}
	});

	it("null → '—'", () => {
		expect(labelAksiKontrak(null)).toBe("—");
	});

	it("undefined → '—'", () => {
		expect(labelAksiKontrak(undefined)).toBe("—");
	});

	it("string kosong → '—'", () => {
		expect(labelAksiKontrak("")).toBe("—");
	});

	it("value tak dikenal → fallback String(s)", () => {
		expect(labelAksiKontrak("PENSIUN_DINI")).toBe("PENSIUN_DINI");
		expect(labelAksiKontrak("BUKAN_AKSI")).toBe("BUKAN_AKSI");
	});
});
