/**
 * optnum-edit-mode — regression tests untuk optNum di _shared.ts.
 *
 * Saat EDIT, defaultValues berisi angka (bukan string kosong ""):
 *   `row.tahunMasuk ?? ""` → bila row.tahunMasuk = 2010, hasilnya 2010 (number).
 * RHF mengembalikan number asli ke Zod saat submit → optNum harus terima
 * string | number (fix: z.union([z.string(), z.number()])).
 *
 * Berlaku untuk semua config profil yang punya field type="number":
 *   - pendidikan: tahunMasuk, tahunLulus, gpa
 *   - pengalaman-kerja: tahunMasuk, tahunKeluar
 *   - keahlian: tahun
 */
import { describe, expect, it } from "vitest";
import { keahlianFormSchema } from "./keahlian.config";
import { pendidikanFormSchema } from "./pendidikan.config";
import { pengalamanKerjaFormSchema } from "./pengalaman-kerja.config";

describe("optNum — edit mode: menerima number langsung dari defaultValues", () => {
	it("[pendidikan] tahunMasuk as number → harus lolos validasi", () => {
		// Mensimulasikan: defaultValues dari row edit berisi angka, bukan string
		const r = pendidikanFormSchema.safeParse({
			institusi: "Unair",
			tahunMasuk: 2010, // number, bukan "2010"
			tahunLulus: 2014,
			gpa: 3.75,
		});
		expect(r.success).toBe(true);
		if (r.success) {
			expect(r.data.tahunMasuk).toBe(2010);
			expect(r.data.gpa).toBe(3.75);
		}
	});

	it("[pengalaman-kerja] tahunMasuk/tahunKeluar as number → harus lolos", () => {
		const r = pengalamanKerjaFormSchema.safeParse({
			namaPerusahaan: "PT Maju",
			tahunMasuk: 2015, // number
			tahunKeluar: 2020,
		});
		expect(r.success).toBe(true);
		if (r.success) {
			expect(r.data.tahunMasuk).toBe(2015);
			expect(r.data.tahunKeluar).toBe(2020);
		}
	});

	it("[keahlian] tahun as number → harus lolos", () => {
		const r = keahlianFormSchema.safeParse({
			kualifikasi: "BAIK",
			institusi: "LSP",
			tahun: 2022, // number
		});
		expect(r.success).toBe(true);
		if (r.success) {
			expect(r.data.tahun).toBe(2022);
		}
	});

	it("string kosong tetap → undefined (perilaku existing tidak boleh rusak)", () => {
		const r = pendidikanFormSchema.safeParse({ institusi: "Unair" });
		expect(r.success).toBe(true);
		if (r.success) {
			expect(r.data.tahunMasuk).toBeUndefined();
		}
	});
});
