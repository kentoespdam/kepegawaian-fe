import { describe, expect, it } from "vitest";
import { hasPermission } from "./can";
import { PERMISSION } from "./permissions";

describe("Penggajian permissions", () => {
	it("has 4 granular penggajian permissions", () => {
		expect(PERMISSION.PENGGAJIAN_SETUP).toBe("PENGGAJIAN:SETUP");
		expect(PERMISSION.PENGGAJIAN_VERIFY1).toBe("PENGGAJIAN:VERIFY1");
		expect(PERMISSION.PENGGAJIAN_TAMBAHAN).toBe("PENGGAJIAN:TAMBAHAN");
		expect(PERMISSION.PENGGAJIAN_APPROVE).toBe("PENGGAJIAN:APPROVE");
	});

	it("has legacy broad permissions", () => {
		expect(PERMISSION.PENGGAJIAN_READ).toBe("PENGGAJIAN:READ");
		expect(PERMISSION.PENGGAJIAN_WRITE).toBe("PENGGAJIAN:WRITE");
		expect(PERMISSION.PENGGAJIAN_PROCESS).toBe("PENGGAJIAN:PROCESS");
		expect(PERMISSION.PENGGAJIAN_DELETE).toBe("PENGGAJIAN:DELETE");
	});

	it("ADMIN bypasses all permissions", () => {
		expect(hasPermission([], PERMISSION.PENGGAJIAN_SETUP, ["ADMIN"])).toBe(true);
		expect(hasPermission([], PERMISSION.PENGGAJIAN_VERIFY1, ["admin"])).toBe(true);
		expect(hasPermission([], PERMISSION.PENGGAJIAN_TAMBAHAN, ["ADMIN"])).toBe(true);
		expect(hasPermission([], PERMISSION.PENGGAJIAN_APPROVE, ["ADMIN"])).toBe(true);
	});

	it("non-ADMIN requires matching permission", () => {
		expect(hasPermission(["PENGGAJIAN:SETUP"], PERMISSION.PENGGAJIAN_SETUP)).toBe(true);
		expect(hasPermission(["PENGGAJIAN:SETUP"], PERMISSION.PENGGAJIAN_VERIFY1)).toBe(false);
		expect(hasPermission(["PENGGAJIAN:VERIFY1"], PERMISSION.PENGGAJIAN_SETUP)).toBe(false);
	});
});
