import { describe, expect, it } from "vitest";
import { keahlianFormSchema } from "./keahlian.config";
import { keluargaCrudConfig, keluargaFormSchema } from "./keluarga.config";
import { pelatihanFormSchema } from "./pelatihan.config";
import { pendidikanFormSchema } from "./pendidikan.config";
import { pengalamanKerjaFormSchema } from "./pengalaman-kerja.config";

describe("keluargaFormSchema — transform nilai form string → tipe request", () => {
	it("valid: wajib terisi + boolean ditransform", () => {
		const parsed = keluargaFormSchema.parse({
			nama: "Siti",
			jenisKelamin: "PEREMPUAN",
			agama: "ISLAM",
			hubunganKeluarga: "ISTRI",
			tempatLahir: "Surabaya",
			tanggalLahir: "1995-01-01",
			tanggungan: "true",
			statusKawin: "false",
		});
		expect(parsed.tanggungan).toBe(true);
		expect(parsed.statusKawin).toBe(false);
		expect(parsed.notes).toBeUndefined();
	});

	it("invalid: nama kosong → error", () => {
		const r = keluargaFormSchema.safeParse({ nama: "" });
		expect(r.success).toBe(false);
	});

	it('invalid: boolean wajib belum dipilih ("") → error', () => {
		const r = keluargaFormSchema.safeParse({
			nama: "Siti",
			jenisKelamin: "PEREMPUAN",
			agama: "ISLAM",
			hubunganKeluarga: "ISTRI",
			tempatLahir: "Surabaya",
			tanggalLahir: "1995-01-01",
			tanggungan: "",
			statusKawin: "true",
		});
		expect(r.success).toBe(false);
	});
});

describe("pendidikanFormSchema — number & optional boolean", () => {
	it('tahunMasuk "2010" → 2010; gpa desimal dipakai', () => {
		const parsed = pendidikanFormSchema.parse({
			institusi: "Unair",
			tahunMasuk: "2010",
			tahunLulus: "2014",
			gpa: "3.75",
			isLulus: "true",
			isLatest: "",
		});
		expect(parsed.tahunMasuk).toBe(2010);
		expect(parsed.gpa).toBe(3.75);
		expect(parsed.isLulus).toBe(true);
		expect(parsed.isLatest).toBeUndefined();
	});

	it("string kosong → undefined (tidak dikirim ke BE)", () => {
		const parsed = pendidikanFormSchema.parse({ institusi: "Unair" });
		expect(parsed.tahunMasuk).toBeUndefined();
		expect(parsed.jurusan).toBeUndefined();
	});

	it("angka tidak valid → error", () => {
		const r = pendidikanFormSchema.safeParse({ institusi: "Unair", tahunMasuk: "abc" });
		expect(r.success).toBe(false);
	});
});

describe("schema lain — required field minimal", () => {
	it("pengalaman-kerja: namaPerusahaan wajib", () => {
		expect(pengalamanKerjaFormSchema.safeParse({}).success).toBe(false);
		const ok = pengalamanKerjaFormSchema.safeParse({ namaPerusahaan: "PT X", tahunMasuk: "2000" });
		expect(ok.success).toBe(true);
		expect(ok.success && ok.data.tahunMasuk).toBe(2000);
	});

	it("keahlian: kualifikasi + institusi wajib", () => {
		const ok = keahlianFormSchema.safeParse({ kualifikasi: "BAIK", institusi: "LSP" });
		expect(ok.success).toBe(true);
	});

	it("pelatihan: tanggal + nilai wajib", () => {
		const ok = pelatihanFormSchema.safeParse({
			nama: "Manajemen",
			lembaga: "Kemendikbud",
			tanggalMulai: "2026-01-01",
			tanggalSelesai: "2026-01-05",
			nilai: "A",
		});
		expect(ok.success).toBe(true);
	});
});

describe("keluargaCrudConfig.defaultValues — row → nilai form", () => {
	it('boolean row → "true"/"false" string untuk select', () => {
		const dv = keluargaCrudConfig.defaultValues({ nama: "Siti", tanggungan: true, statusKawin: false });
		expect(dv.tanggungan).toBe("true");
		expect(dv.statusKawin).toBe("false");
	});

	it("row kosong (tambah baru) → semua string kosong", () => {
		const dv = keluargaCrudConfig.defaultValues({});
		expect(dv.nama).toBe("");
		expect(dv.tanggungan).toBe("");
	});
});
