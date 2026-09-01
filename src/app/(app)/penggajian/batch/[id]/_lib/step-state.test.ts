import { describe, expect, it } from "vitest";
import type { StatusBatch } from "@/types/penggajian/batch";
import { getStepState, STATUS_ORDER } from "./step-state";

const setup = {
	id: "setup" as const,
	label: "Seting Komponen Gaji",
	href: "./setup",
	permission: "PENGGAJIAN:SETUP",
	status: ["PENDING", "PROSES"] as StatusBatch[],
};

const verifikasi1 = {
	id: "verifikasi-1" as const,
	label: "Verifikasi Tahap 1",
	href: "./verifikasi-1",
	permission: "PENGGAJIAN:VERIFY1",
	status: ["WAIT_VERIFICATION_PHASE_1"] as StatusBatch[],
};

const persetujuan = {
	id: "persetujuan" as const,
	label: "Persetujuan Akhir",
	href: "./persetujuan",
	permission: "PENGGAJIAN:APPROVE",
	status: ["WAIT_APPROVAL"] as StatusBatch[],
};

describe("getStepState", () => {
	it("returns disabled when batchStatus is undefined", () => {
		expect(getStepState(setup, undefined, ["PENGGAJIAN:SETUP"])).toBe("disabled");
	});

	it("returns disabled when user lacks permission", () => {
		expect(getStepState(setup, "PENDING", [])).toBe("disabled");
	});

	it("returns active when batchStatus matches step AND user has permission", () => {
		expect(getStepState(setup, "PENDING", ["PENGGAJIAN:SETUP"])).toBe("active");
		expect(getStepState(verifikasi1, "WAIT_VERIFICATION_PHASE_1", ["PENGGAJIAN:VERIFY1"])).toBe("active");
	});

	it("returns completed when batchStatus is past the step", () => {
		expect(getStepState(setup, "PROSES", ["PENGGAJIAN:SETUP"])).toBe("completed");
		expect(getStepState(setup, "WAIT_VERIFICATION_PHASE_1", ["PENGGAJIAN:SETUP"])).toBe("completed");
	});

	it("returns disabled for future steps", () => {
		expect(getStepState(verifikasi1, "PENDING", ["PENGGAJIAN:VERIFY1"])).toBe("disabled");
	});

	it("returns disabled when batchStatus matches but user lacks permission", () => {
		expect(getStepState(setup, "PENDING", [])).toBe("disabled");
		expect(getStepState(verifikasi1, "WAIT_VERIFICATION_PHASE_1", [])).toBe("disabled");
	});

	it("completed does not require permission", () => {
		expect(getStepState(setup, "WAIT_APPROVAL", [])).toBe("completed");
	});

	it("FINISHED batch marks all steps completed", () => {
		expect(getStepState(setup, "FINISHED", [])).toBe("completed");
		expect(getStepState(verifikasi1, "FINISHED", [])).toBe("completed");
		expect(getStepState(persetujuan, "FINISHED", [])).toBe("completed");
	});

	it("STATUS_ORDER defines correct ordering", () => {
		expect(STATUS_ORDER).toEqual([
			"PENDING",
			"PROSES",
			"WAIT_VERIFICATION_PHASE_1",
			"WAIT_VERIFICATION_PHASE_2",
			"WAIT_APPROVAL",
			"FINISHED",
		]);
	});
});
