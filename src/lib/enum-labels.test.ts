import { describe, expect, it } from "vitest";
import { hubunganKeluargaFilterOptions, hubunganKeluargaInt, valueFromLabel } from "./enum-labels";
import { ENUMS } from "./enums";

describe("hubunganKeluargaInt — mapping enum → int32 (TERVERIFIKASI spike fnfh.5)", () => {
	it("memetakan tiap enum ke angka 0-indexed sesuai urutan OpenAPI", () => {
		expect(hubunganKeluargaInt("SUAMI")).toBe(0);
		expect(hubunganKeluargaInt("ISTRI")).toBe(1);
		expect(hubunganKeluargaInt("AYAH")).toBe(2);
		expect(hubunganKeluargaInt("IBU")).toBe(3);
		expect(hubunganKeluargaInt("ANAK")).toBe(4);
		expect(hubunganKeluargaInt("SAUDARA")).toBe(5);
	});

	it("undefined untuk nilai kosong/asing — tak difilter", () => {
		expect(hubunganKeluargaInt(undefined)).toBeUndefined();
		expect(hubunganKeluargaInt("PAMAN")).toBeUndefined();
	});
});

describe("hubunganKeluargaFilterOptions — value angka, label enum", () => {
	it("opsi berpasangan value=angka↔label enum sesuai urutan mapping", () => {
		expect(hubunganKeluargaFilterOptions()).toEqual([
			{ value: "0", label: "Suami" },
			{ value: "1", label: "Istri" },
			{ value: "2", label: "Ayah" },
			{ value: "3", label: "Ibu" },
			{ value: "4", label: "Anak" },
			{ value: "5", label: "Saudara" },
		]);
	});
});

describe("valueFromLabel — reverse lookup label/value → enum value (regresi bug 400 dashboard)", () => {
	// Dashboard GET /profil/biodata/{nik}/dashboard mengembalikan campuran:
	// jenisKelamin = label display ("Laki-Laki", casing beda dari ENUMS "Laki-laki"),
	// agama/statusKawin = value enum ("ISLAM", "KAWIN").
	// valueFromLabel harus memetakan KEDUANYA ke value enum — kalau tidak,
	// form mengirim label mentah → backend 400 "Failed to read request".
	it("label jenis kelamin dengan casing beda (bug nyata 400) → value enum", () => {
		expect(valueFromLabel("Laki-Laki", ENUMS.jenisKelamin)).toBe("LAKI_LAKI");
	});

	it("label jenis kelamin yang cocok persis → value enum", () => {
		expect(valueFromLabel("Perempuan", ENUMS.jenisKelamin)).toBe("PEREMPUAN");
	});

	it("value enum yang sudah jadi (agama/statusKawin dari dashboard) → tetap value", () => {
		expect(valueFromLabel("ISLAM", ENUMS.agama)).toBe("ISLAM");
		expect(valueFromLabel("KAWIN", ENUMS.statusKawin)).toBe("KAWIN");
	});

	it("label agama/status kawin → value enum", () => {
		expect(valueFromLabel("Islam", ENUMS.agama)).toBe("ISLAM");
		expect(valueFromLabel("Janda/Duda", ENUMS.statusKawin)).toBe("JANDA_DUDA");
	});

	it("input kosong/null → kosong (field optional tak ikut payload)", () => {
		expect(valueFromLabel(undefined, ENUMS.agama)).toBe("");
		expect(valueFromLabel(null, ENUMS.agama)).toBe("");
		expect(valueFromLabel("", ENUMS.agama)).toBe("");
	});

	it("string asing tak dikenal → dikembalikan apa adanya (fallback lama dipertahankan)", () => {
		expect(valueFromLabel("XYZ_TAU", ENUMS.agama)).toBe("XYZ_TAU");
	});
});
