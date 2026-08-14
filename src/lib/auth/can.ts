import { notFound } from "next/navigation";
import type { Permission } from "./permissions";

/**
 * Cek permission granular (dari GET /account/me) pada list permissions user.
 * ADMIN otomatis lolos (dual-mode BE: `hasRole('ADMIN') or hasAuthority(...)`) —
 * walau list permissions kosong (FE-GUIDE §7 aturan emas 2).
 */
export function hasPermission(perms: string[], p: Permission, roles?: string[]): boolean {
	if (roles?.some((r) => r.toUpperCase() === "ADMIN")) return true;
	return perms.includes(p);
}

export function forbidden(): never {
	notFound();
}
