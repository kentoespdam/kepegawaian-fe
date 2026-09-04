import { describe, expect, it } from "vitest";
import { getReprocessPhase } from "./penggajian-reprocess";

describe("getReprocessPhase", () => {
	it("returns WAIT_VERIFICATION_PHASE_2 when currentStatus is WAIT_APPROVAL", () => {
		expect(getReprocessPhase("WAIT_APPROVAL")).toBe("WAIT_VERIFICATION_PHASE_2");
	});

	it("returns WAIT_VERIFICATION_PHASE_1 when currentStatus is WAIT_VERIFICATION_PHASE_2", () => {
		expect(getReprocessPhase("WAIT_VERIFICATION_PHASE_2")).toBe("WAIT_VERIFICATION_PHASE_1");
	});

	it("returns PENDING when currentStatus is WAIT_VERIFICATION_PHASE_1", () => {
		expect(getReprocessPhase("WAIT_VERIFICATION_PHASE_1")).toBe("PENDING");
	});

	it("returns PENDING when currentStatus is PROSES or PENDING or FAILED", () => {
		expect(getReprocessPhase("PROSES")).toBe("PENDING");
		expect(getReprocessPhase("PENDING")).toBe("PENDING");
		expect(getReprocessPhase("FAILED")).toBe("PENDING");
	});

	it("returns PENDING for undefined or unexpected status", () => {
		expect(getReprocessPhase(undefined)).toBe("PENDING");
	});
});
