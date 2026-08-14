import { describe, expect, it } from "vitest";
import { hasPermission } from "./can";
import { PERMISSION } from "./permissions";

/**
 * Katalog permission BE — snapshot dari `GET /system/permissions` (live, 2026-08-14).
 *
 * Cara verifikasi ulang bila BE berubah:
 *   curl http://<BACKEND_URL>/system/permissions
 *
 * Test ini sengaja kaku (hardcode): drift FE↔BE HARUS berbunyi, bukan senyap.
 * Bila BE menambah/mengganti permission → update snapshot ini + PERMISSION di permissions.ts.
 */
const BE_PERMISSION_CATALOG: string[] = [
	"CUTI:APPROVE",
	"CUTI:READ",
	"CUTI:WRITE",
	"KEPEGAWAIAN:DELETE",
	"KEPEGAWAIAN:READ",
	"KEPEGAWAIAN:WRITE",
	"LAPORAN:READ",
	"MASTER:DELETE",
	"MASTER:WRITE",
	"PEGAWAI:DELETE",
	"PEGAWAI:READ",
	"PEGAWAI:WRITE",
	"PENGGAJIAN:DELETE",
	"PENGGAJIAN:PROCESS",
	"PENGGAJIAN:READ",
	"PENGGAJIAN:WRITE",
	"PROFIL:APPROVE",
	"PROFIL:READ",
	"PROFIL:UPDATE",
	"SYSTEM:MANAGE_ROLE",
	"SYSTEM:MANAGE_USER",
];
describe("PERMISSION — selaras dengan katalog BE /system/permissions", () => {
	const feValues: string[] = Object.values(PERMISSION);

	it("tidak ada permission phantom di FE (setiap konstanta ada di katalog BE)", () => {
		// Mis. MASTER:READ & CUTI:CREATE pernah ada di FE tapi tidak ada di katalog BE —
		// permission phantom tidak akan pernah match hasPermission() dari /account/me.
		const phantoms = feValues.filter((v) => !BE_PERMISSION_CATALOG.includes(v));
		expect(phantoms).toEqual([]);
	});

	it("katalog BE tercakup penuh di FE (tidak ada permission BE yang hilang)", () => {
		// Mis. CUTI:WRITE, LAPORAN:READ, PENGGAJIAN:DELETE pernah hilang dari FE.
		const missing = BE_PERMISSION_CATALOG.filter((name) => !feValues.includes(name));
		expect(missing).toEqual([]);
	});

	it("jumlah sama persis (21) dan tidak ada duplikat", () => {
		expect(feValues.length).toBe(BE_PERMISSION_CATALOG.length);
		expect(new Set(feValues).size).toBe(feValues.length);
	});
});

describe("hasPermission — ADMIN shortcut (FE-GUIDE §7 aturan emas 2)", () => {
	it("ADMIN lolos walau list permissions kosong (dual-mode BE: hasRole('ADMIN'))", () => {
		expect(hasPermission([], PERMISSION.PEGAWAI_READ, ["ADMIN"])).toBe(true);
	});

	it("ADMIN case-insensitive (Appwrite bisa lowercase)", () => {
		expect(hasPermission([], PERMISSION.PEGAWAI_READ, ["admin"])).toBe(true);
	});

	it("non-ADMIN tidak dapat shortcut — murni cek permission", () => {
		expect(hasPermission([], PERMISSION.PEGAWAI_READ, ["HRD"])).toBe(false);
	});

	it("backward-compat: tanpa argumen roles → cek list permission saja", () => {
		expect(hasPermission([PERMISSION.PEGAWAI_READ], PERMISSION.PEGAWAI_READ)).toBe(true);
		expect(hasPermission([], PERMISSION.PEGAWAI_READ)).toBe(false);
	});
});
