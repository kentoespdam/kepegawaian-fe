import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { mintJWT, readSession, TOKEN_COOKIE, tokenCookieOptions } from "@/lib/auth/appwriteSession";

const APPWRITE_URL = process.env.APPWRITE_URL ?? "";
const APPWRITE_PROJECT = process.env.APPWRITE_PROJECT_ID ?? "";
const BACKEND_URL = process.env.BACKEND_URL ?? "";
const REFRESH_BUFFER = 30;

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const session = readSession((name) => request.cookies.get(name)?.value);

	// Route guard — page navigations
	if (!pathname.startsWith("/api/proxy")) {
		if (pathname === "/login") {
			return session ? NextResponse.redirect(new URL("/", request.url)) : NextResponse.next();
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
		const jwt = await resolveToken(request, session);
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
async function resolveToken(request: NextRequest, session: string | undefined) {
	const token = request.cookies.get(TOKEN_COOKIE)?.value;

	// Hot path: decode exp, no signature verify, zero network
	if (token) {
		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			if (payload.exp && Date.now() / 1000 < payload.exp - REFRESH_BUFFER) {
				return token;
			}
		} catch {
			// corrupted token → fall through to cold path
		}
	}

	// Cold path: mint new JWT via Appwrite (dedup handled inside the module)
	if (!session) return null;
	return mintJWT(session);
}
