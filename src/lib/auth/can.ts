import { notFound } from "next/navigation";
import type { Action, AppwriteUser } from "@/types/auth";
import { PERMISSIONS } from "./permissions";

export function getRoles(user: AppwriteUser): string[] {
	return user.prefs?.roles ?? [];
}

export function can(roles: string[], action: Action, entity: string): boolean {
	for (const role of roles) {
		// Normalize casing — Appwrite roles ("ADMIN") vs permission keys ("admin")
		const perms = PERMISSIONS[role.toLowerCase()];
		if (!perms) continue;
		const actions = perms[entity] ?? perms["*"];
		if (actions?.includes(action)) return true;
	}
	return false;
}

export function forbidden(): never {
	notFound();
}
