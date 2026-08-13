import { cookies } from "next/headers";
import { cache } from "react";
import type { MeResponse } from "@/types/account/me";
import { readSession, resolveToken } from "./appwriteSession";

const BACKEND_URL = process.env.BACKEND_URL ?? "";

/** Roles + permissions user login (union semua role) — untuk gating UI berbasis permission. */
export const getAccountSession = cache(async (): Promise<{ permissions: string[] }> => {
	try {
		const cookieStore = await cookies();
		const session = readSession((name) => cookieStore.get(name)?.value);
		const jwt = await resolveToken((name) => cookieStore.get(name)?.value, session);
		if (!jwt) return { permissions: [] };

		const res = await fetch(`${BACKEND_URL}/account/me`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		if (!res.ok) return { permissions: [] };
		const body = (await res.json()) as MeResponse;
		return { permissions: body.permissions ?? [] };
	} catch {
		return { permissions: [] };
	}
});
