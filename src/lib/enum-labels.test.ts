import { describe, expect, it } from "vitest";
import { hubunganKeluargaFilterOptions, hubunganKeluargaInt } from "./enum-labels";

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
