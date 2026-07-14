import type { AppwriteUser } from "@/types/auth";

/**
 * Appwrite Session module — the single owner of what an Appwrite session *is*.
 *
 * Both `proxy.ts` (edge guard + data forwarder) and the DAL `verifySession` are thin
 * callers of this module. Cookie names, base URL, the `X-Appwrite-Project` header, and the
 * authenticated-request primitive live here once — not duplicated across the two files.
 *
 * See CONTEXT-MAP `### Identity bridge` (corrected 2026-07-07: cookie-forwarding, not JWE).
 */

const APPWRITE_URL = process.env.APPWRITE_URL ?? "";
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT_ID ?? "";

const JWT_DURATION = 3600;

/**
 * Appwrite sets the session as TWO cookies: the primary `a_session_<projectId>`
 * (`Secure; SameSite=None`) and a non-`Secure` `_legacy` fallback. Over plain HTTP the browser
 * drops the `Secure` one and keeps only `_legacy`; over HTTPS the primary is accepted. Readers
 * must try both, primary first. Reading only the primary name was the silent login-bounce bug.
 */
export function sessionCookieNames(): string[] {
	const primary = `a_session_${APPWRITE_PROJECT}`;
	return [primary, `${primary}_legacy`];
}

/** The httpOnly cookie caching the minted Appwrite JWT (forwarded upstream as `Bearer`). */
export const TOKEN_COOKIE = "token";

/**
 * Read the Appwrite session value from whatever cookie survived, via a caller-injected lookup.
 * The lookup keeps this module free of `next/server` and `next/headers` — proxy passes
 * `(n) => request.cookies.get(n)?.value`, the DAL passes `(n) => cookieStore.get(n)?.value`.
 */
export function readSession(get: (name: string) => string | undefined): string | undefined {
	for (const name of sessionCookieNames()) {
		const value = get(name);
		if (value) return value;
	}
	return undefined;
}

/** Token-cookie policy — `secure` only in production (dev serves over plain HTTP). */
export function tokenCookieOptions() {
	return {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax" as const,
		maxAge: JWT_DURATION,
		path: "/",
	};
}

/** Build an authenticated request to Appwrite: base URL + project header + forwarded session. */
function appwriteRequest(path: string, session: string, init?: RequestInit): Promise<Response> {
	const [primary] = sessionCookieNames();
	const headers = new Headers(init?.headers);
	headers.set("X-Appwrite-Project", APPWRITE_PROJECT);
	headers.set("Cookie", `${primary}=${session}`);
	return fetch(`${APPWRITE_URL}${path}`, { ...init, headers });
}

/** GET the current account (identity + labels for RBAC). Used by the DAL `verifySession`. */
export async function fetchAccount(session: string): Promise<AppwriteUser> {
	const res = await appwriteRequest("/v1/account", session);
	if (!res.ok) throw new Error("Account fetch failed");
	return res.json();
}

// Dedup concurrent mints for the same session — short-TTL, cleared 5s after settle.
const mintCache = new Map<string, Promise<string>>();

/** Mint a fresh Appwrite JWT from the session. Deduped so a burst of API calls mints once. */
export function mintJWT(session: string): Promise<string> {
	let mint = mintCache.get(session);
	if (!mint) {
		mint = appwriteRequest("/v1/account/jwt", session, { method: "POST" }).then(async (res) => {
			if (!res.ok) throw new Error("Mint failed");
			const data = await res.json();
			return data.jwt as string;
		});
		mintCache.set(session, mint);
		mint.catch(() => {}).then(() => setTimeout(() => mintCache.delete(session), 5000));
	}
	return mint;
}
