import { hasPermission } from "@/lib/auth/can";
import { PERMISSION, type Permission } from "@/lib/auth/permissions";

/** Get href for a sidebar entity — default `/master/{id}`, override via entity.href. */
export function entityHref(e: { id: string; href?: string }): string {
	return e.href ?? `/master/${e.id}`;
}

/** Get RBAC gate entity — default `id`, `null` = always visible, string[] = any-of. */
export function entityGate(e: { id: string; gate?: string | string[] | null }): string | string[] | null {
	return e.gate !== undefined ? e.gate : e.id;
}

/**
 * Gate modul Master untuk sidebar: hanya role yang bisa MENULIS/MENGHAPUS master
 * yang melihat menu. Read master TIDAK pakai permission (katalog BE tidak punya
 * MASTER:READ — GET /master/* terbuka utk semua user login, kebutuhan referensi),
 * jadi role read-only seperti `user` tetap bisa akses via URL tapi menu disembunyikan.
 *
 * Sebelumnya any-of [READ, WRITE, DELETE] — menu muncul utk role pembaca murni (bug).
 * WRITE/DELETE tanpa READ (seed V31) tetap melihat menu.
 */
export const MASTER_GATE: Permission[] = [PERMISSION.MASTER_WRITE, PERMISSION.MASTER_DELETE];

/** Bentuk entity sidebar yang dibutuhkan filter RBAC. */
export interface SidebarEntity {
	id: string;
	label: string;
	href?: string;
	gate?: string | string[] | null;
} /**
 * Filter entities per RBAC gate — `null` = selalu tampil, string = satu permission,
 * string[] = any-of. `roles` diteruskan ke hasPermission utk ADMIN shortcut
 * (ADMIN lolos walau list permissions kosong — FE-GUIDE §7). Dipakai AppShell.
 */
export function filterVisibleEntities(
	entities: readonly SidebarEntity[],
	permissions: string[],
	roles?: string[],
): SidebarEntity[] {
	return entities.filter((e) => {
		const gate = entityGate(e);
		if (gate === null) return true;
		const gates = Array.isArray(gate) ? gate : [gate];
		return gates.some((g) => hasPermission(permissions, g as Permission, roles));
	});
}
