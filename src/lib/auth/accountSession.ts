import { cookies } from "next/headers";
import { cache } from "react";
import type { SingleResultMeResponse } from "@/types/account/me";
import { readSession, resolveToken } from "./appwriteSession";

const BACKEND_URL = process.env.BACKEND_URL ?? "";

/** Roles + permissions user login (union semua role) — single source of truth utk gating UI. */
export type AccountSession = { roles: string[]; permissions: string[]; isCutiApprover: boolean };

/**
 * Roles + permissions + isCutiApprover (CU-18/ADR-0041) — single source of truth utk gating UI.
 * isCutiApprover: posisional (principal ada dalam rantai approval cuti / punya anak buah).
 */
export const getAccountSession = cache(async (): Promise<AccountSession> => {
	const fallback: AccountSession = { roles: [], permissions: [], isCutiApprover: false };
	try {
		const cookieStore = await cookies();
		const session = readSession((name) => cookieStore.get(name)?.value);
		const jwt = await resolveToken((name) => cookieStore.get(name)?.value, session);
		if (!jwt) return fallback;

		const res = await fetch(`${BACKEND_URL}/account/me`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		if (!res.ok) return fallback;
		const body = (await res.json()) as SingleResultMeResponse;
		return {
			roles: body.data?.roles ?? [],
			permissions: body.data?.permissions ?? [],
			isCutiApprover: body.data?.isCutiApprover ?? false,
		};
	} catch {
		return fallback;
	}
});
