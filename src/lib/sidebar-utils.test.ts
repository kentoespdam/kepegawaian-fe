import { describe, expect, it } from "vitest";
import { entityGate, entityHref } from "./sidebar-utils";

describe("entityHref", () => {
	it("returns custom href when provided", () => {
		expect(entityHref({ id: "dashboard", href: "/kepegawaian/dashboard" })).toBe("/kepegawaian/dashboard");
		expect(entityHref({ id: "pegawai", href: "/kepegawaian/data" })).toBe("/kepegawaian/data");
	});

	it("defaults to /master/{id} when href is omitted", () => {
		expect(entityHref({ id: "level" })).toBe("/master/level");
		expect(entityHref({ id: "grade" })).toBe("/master/grade");
	});

	it("ignores id when href is explicitly set", () => {
		expect(entityHref({ id: "pegawai", href: "/kepegawaian/data" })).not.toBe("/master/pegawai");
	});
});

describe("entityGate", () => {
	it("returns null when gate is explicitly null (always visible)", () => {
		expect(entityGate({ id: "dashboard", gate: null })).toBeNull();
	});

	it("returns the gate value when set to a string", () => {
		expect(entityGate({ id: "pegawai", gate: "pegawai" })).toBe("pegawai");
	});

	it("falls back to entity id when gate is undefined (master entities)", () => {
		expect(entityGate({ id: "level" })).toBe("level");
		expect(entityGate({ id: "grade" })).toBe("grade");
	});

	it("distinguishes null from undefined", () => {
		// null = no gate (always visible), undefined = fallback to id
		const withNull = entityGate({ id: "x", gate: null });
		const without = entityGate({ id: "x" });
		expect(withNull).toBeNull();
		expect(without).toBe("x");
	});
});
