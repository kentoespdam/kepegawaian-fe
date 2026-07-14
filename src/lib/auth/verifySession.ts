import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { AppwriteUser } from "@/types/auth";
import { fetchAccount, readSession } from "./appwriteSession";

/**
 * DAL gate for *rendering* — the authoritative check at the top of every protected server
 * component (`proxy.ts` is the authoritative gate for *data*). Wrapped in React `cache()` so
 * repeated calls within one render dedup to a single Appwrite round-trip.
 *
 * Thin caller of the Appwrite Session module: it owns cookie identity (both names incl.
 * `_legacy`), base URL, and the authenticated GET `/v1/account`. See ADR-0001 + CONTEXT-MAP.
 */
export const verifySession = cache(async (): Promise<AppwriteUser> => {
	const cookieStore = await cookies();
	const session = readSession((name) => cookieStore.get(name)?.value);

	if (!session) {
		redirect("/login");
	}

	try {
		return await fetchAccount(session);
	} catch {
		redirect("/login");
	}
});
