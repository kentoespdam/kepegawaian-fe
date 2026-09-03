import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { fetchAccount, readSession, resolveToken, TOKEN_COOKIE, tokenCookieOptions } from "@/lib/auth/appwriteSession";

const APPWRITE_URL = process.env.APPWRITE_URL ?? "";
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT_ID ?? "";
const BACKEND_URL = process.env.BACKEND_URL ?? "";

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|logo_pdam).*)"],
};

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const session = readSession((name) => request.cookies.get(name)?.value);

	// Route guard — page navigations
	if (!pathname.startsWith("/api/proxy")) {
		if (pathname === "/login") {
			if (!session) return NextResponse.next();
			// Cookie presence alone can be a stale session. Bouncing straight to "/" here
			// while the app layout redirects an invalid session back to /login used to loop
			// /login ↔ / into ERR_TOO_MANY_REDIRECTS — verify the session before bouncing.
			try {
				await fetchAccount(session);
				return NextResponse.redirect(new URL("/", request.url));
			} catch {
				return NextResponse.next();
			}
		}
		return session ? NextResponse.next() : NextResponse.redirect(new URL("/login", request.url));
	}

	// API proxy — forward to backend with Bearer
	try {
		// Forward Appwrite API calls (/api/proxy/v1/* → Appwrite)
		if (pathname.startsWith("/api/proxy/v1/")) {
			const response = forwardToAppwrite(request);
			// Clear token cookie on logout (DELETE current session) to prevent replay
			if (request.method === "DELETE" && pathname === "/api/proxy/v1/account/sessions/current") {
				response.cookies.set(TOKEN_COOKIE, "", { maxAge: 0, path: "/" });
			}
			return response;
		}

		// Forward backend calls (/api/proxy/master/* etc. → Backend Spring Boot)
		const jwt = await resolveToken((name) => request.cookies.get(name)?.value, session);
		if (!jwt) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		return forwardToBackend(request, jwt);
	} catch {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
}

// ponytail: rewrite instead of manual fetch — Next.js handles method/body/headers
function forwardToAppwrite(request: NextRequest) {
	const url = new URL(request.nextUrl.pathname.replace("/api/proxy", "") + request.nextUrl.search, `${APPWRITE_URL}`);
	const headers = new Headers(request.headers);
	headers.set("X-Appwrite-Project", APPWRITE_PROJECT);
	return NextResponse.rewrite(url, { request: { headers } });
}

function forwardToBackend(request: NextRequest, token: string) {
	const url = new URL(request.nextUrl.pathname.replace("/api/proxy", "") + request.nextUrl.search, BACKEND_URL);
	const headers = new Headers(request.headers);
	headers.set("Authorization", `Bearer ${token}`);
	const response = NextResponse.rewrite(url, { request: { headers } });
	response.cookies.set(TOKEN_COOKIE, token, tokenCookieOptions());
	return response;
}
