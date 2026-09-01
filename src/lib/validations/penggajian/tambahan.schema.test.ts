import { describe, expect, it } from "vitest";
import { tambahanSchema } from "./tambahan.schema";

describe("tambahanSchema", () => {
	it("accepts valid PEMASUKAN data", () => {
		const result = tambahanSchema.safeParse({
			nama: "Bonus Kinerja",
			jenisGaji: "PEMASUKAN",
			nilai: 500000,
		});
		expect(result.success).toBe(true);
	});

	it("accepts valid POTONGAN data", () => {
		const result = tambahanSchema.safeParse({
			nama: "Potongan Pinjaman",
			jenisGaji: "POTONGAN",
			nilai: 100000,
		});
		expect(result.success).toBe(true);
	});

	it("accepts NONE jenisGaji", () => {
		const result = tambahanSchema.safeParse({
			nama: "Komponen Netral",
			jenisGaji: "NONE",
			nilai: 0,
		});
		expect(result.success).toBe(true);
	});

	it("rejects empty nama", () => {
		const result = tambahanSchema.safeParse({
			nama: "",
			jenisGaji: "PEMASUKAN",
			nilai: 100,
		});
		expect(result.success).toBe(false);
	});

	it("rejects negative nilai", () => {
		const result = tambahanSchema.safeParse({
			nama: "Bonus",
			jenisGaji: "PEMASUKAN",
			nilai: -1,
		});
		expect(result.success).toBe(false);
	});

	it("rejects invalid jenisGaji", () => {
		const result = tambahanSchema.safeParse({
			nama: "Bonus",
			jenisGaji: "INVALID",
			nilai: 100,
		});
		expect(result.success).toBe(false);
	});

	it("rejects missing fields", () => {
		const result = tambahanSchema.safeParse({});
		expect(result.success).toBe(false);
	});

	it("accepts nilai of 0", () => {
		const result = tambahanSchema.safeParse({
			nama: "Test",
			jenisGaji: "PEMASUKAN",
			nilai: 0,
		});
		expect(result.success).toBe(true);
	});
});
