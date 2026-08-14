import { describe, expect, it } from "vitest";
import { MASTER_ENTITIES } from "@/config/entities";
import { PERMISSION } from "./auth/permissions";
import { entityGate, entityHref, filterVisibleEntities, MASTER_GATE } from "./sidebar-utils";

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

describe("MASTER_GATE — sidebar menu modul Master (regresi bug app-shell role `user`)", () => {
	// Konstruksi sama persis dengan AppShell (src/components/app-shell.tsx)
	const masterEntities = MASTER_ENTITIES.map((e) => ({ ...e, gate: MASTER_GATE }));

	// Set permission role USER aktual dari BE (GET /system/roles, 2026-08-14):
	// read-only, TANPA permission master sama sekali. Baca master tetap bisa via URL
	// (GET /master/* terbuka utk semua login) — tapi menu sidebar harus disembunyikan.
	const roleUserPermissions = [
		PERMISSION.CUTI_READ,
		PERMISSION.KEPEGAWAIAN_READ,
		PERMISSION.LAPORAN_READ,
		PERMISSION.PEGAWAI_READ,
		PERMISSION.PENGGAJIAN_READ,
		PERMISSION.PROFIL_READ,
		PERMISSION.PROFIL_UPDATE,
	];

	it("role `user` (read-only, tanpa permission master) → menu master TIDAK tampil", () => {
		// Gate lama any-of [READ, WRITE, DELETE] membuat menu muncul — bug.
		expect(filterVisibleEntities(masterEntities, roleUserPermissions)).toEqual([]);
	});

	it("MASTER:WRITE tanpa READ (admin, seed V31) → menu master tampil", () => {
		expect(filterVisibleEntities(masterEntities, [PERMISSION.MASTER_WRITE])).toHaveLength(masterEntities.length);
	});

	it("MASTER:DELETE → menu master tampil", () => {
		expect(filterVisibleEntities(masterEntities, [PERMISSION.MASTER_DELETE])).toHaveLength(masterEntities.length);
	});

	it("role HRD (WRITE + DELETE + read-only lain) → menu master tampil", () => {
		expect(
			filterVisibleEntities(masterEntities, [
				...roleUserPermissions,
				PERMISSION.MASTER_WRITE,
				PERMISSION.MASTER_DELETE,
			]),
		).toHaveLength(masterEntities.length);
	});

	it("tanpa permission master → menu master tidak tampil", () => {
		expect(filterVisibleEntities(masterEntities, [])).toEqual([]);
	});

	it("role ADMIN tanpa permission master → menu tetap tampil (ADMIN shortcut)", () => {
		// /account/me bisa return permissions kosong utk ADMIN (belum di-seed) —
		// dual-mode BE tetap meloloskan; sidebar harus ikut menampilkan.
		expect(filterVisibleEntities(masterEntities, [], ["ADMIN"])).toHaveLength(masterEntities.length);
	});
});

describe("filterVisibleEntities — RBAC gate umum", () => {
	it("gate null (dashboard) → selalu tampil walau tanpa permission", () => {
		expect(
			filterVisibleEntities([{ id: "dashboard", label: "Dashboard", href: "/kepegawaian/dashboard", gate: null }], []),
		).toHaveLength(1);
	});

	it("gate string tunggal → butuh permission itu", () => {
		const entities = [
			{ id: "pegawai", label: "Data Pegawai", href: "/kepegawaian/data", gate: PERMISSION.PEGAWAI_READ },
		];
		expect(filterVisibleEntities(entities, [PERMISSION.PEGAWAI_READ])).toHaveLength(1);
		expect(filterVisibleEntities(entities, [])).toHaveLength(0);
	});
});
