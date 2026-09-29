import { describe, expect, it } from "vitest";
import { kpiSchema } from "./kpi.config";

describe("kpiSchema", () => {
	it("validates correct payload with tunkin and pph21Ter", () => {
		const res = kpiSchema.safeParse({
			nipam: "12345",
			periode: "202609",
			tunkin: 1500000,
			pph21Ter: 50000,
		});
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.data.nipam).toBe("12345");
			expect(res.data.periode).toBe("202609");
			expect(res.data.tunkin).toBe(1500000);
			expect(res.data.pph21Ter).toBe(50000);
		}
	});

	it("validates payload without optional pph21Ter", () => {
		const res = kpiSchema.safeParse({
			nipam: "12345",
			periode: "202609",
			tunkin: 1500000,
			pph21Ter: "",
		});
		expect(res.success).toBe(true);
		if (res.success) {
			expect(res.data.pph21Ter).toBeUndefined();
		}
	});

	it("rejects empty nipam", () => {
		const res = kpiSchema.safeParse({
			nipam: "",
			periode: "202609",
			tunkin: 100000,
		});
		expect(res.success).toBe(false);
	});

	it("rejects short or empty periode", () => {
		const res = kpiSchema.safeParse({
			nipam: "12345",
			periode: "2026",
			tunkin: 100000,
		});
		expect(res.success).toBe(false);
	});

	it("rejects zero or negative tunkin", () => {
		const resZero = kpiSchema.safeParse({
			nipam: "12345",
			periode: "202609",
			tunkin: 0,
		});
		expect(resZero.success).toBe(false);

		const resNegative = kpiSchema.safeParse({
			nipam: "12345",
			periode: "202609",
			tunkin: -50000,
		});
		expect(resNegative.success).toBe(false);
	});
});
