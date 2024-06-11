import { baseAuthUrl, sessionNames } from "@lib/utils";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import { type NextRequest, NextResponse } from "next/server";
import {
	appwriteHeader,
	getExpToken,
	isHasSessionCookie,
	isHasTokenCookie,
	isValidIpAddress,
	newHostname,
} from "./helpers";

/**
 * Middleware function that handles authentication and session management.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to a NextResponse object representing the response.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
	const response = NextResponse.next();
	const {
		host,
		pathname: currentPath,
		href: currentHref,
		origin: currentOrigin,
	}: {
		host: string;
		pathname: string;
		href: string;
		origin: string;
	} = req.nextUrl;
	const cookies: RequestCookies = req.cookies;

	if (!isHasSessionCookie(cookies) && !currentPath.startsWith("/auth"))
		return redirectAuth(currentHref, currentOrigin);

	const activeSession = await isHasAuthSession(cookies);
	if (activeSession.status === 401) {
		for (const name of sessionNames) {
			response.cookies.delete(name);
		}
		if (currentPath.startsWith("/auth")) return response;
		return redirectAuth(currentHref, currentOrigin);
	}

	if (!isHasTokenCookie(cookies)) {
		console.log("renew token");
		const token = await renewToken(cookies, host.split(":")[0]);
		if (token) {
			response.cookies.set(token);
		}
	}

	if (currentPath === "/")
		return NextResponse.redirect(new URL("/dashboard", currentOrigin));

	return response;
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|logo_pdam_40x40|api/auth/|test).*)",
	],
};

/**
 * Redirects the user to the authentication page, and sets a cookie containing the current URL.
 * @param currentHref - The current URL.
 * @param currentOrigin - The current origin.
 * @returns A NextResponse object representing the redirect response.
 */
function redirectAuth(
	currentHref: string,
	currentOrigin: string,
): NextResponse {
	const cookie = `callback_url=${encodeURIComponent(currentHref)}`;
	const headers = { "set-cookie": cookie };
	const url = new URL("/auth", currentOrigin);
	return NextResponse.redirect(url, { headers });
}

/**
 * Checks if the user has an active authentication session.
 * @param cookies - The request cookies.
 * @returns A Promise that resolves to a Response object representing the server's response to the request.
 */
async function isHasAuthSession(cookies: RequestCookies): Promise<Response> {
	const reqHeaders: Record<string, string> = appwriteHeader(cookies);
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);
	try {
		return await fetch(`${baseAuthUrl}/account/session/current`, {
			method: "GET",
			headers: reqHeaders,
			signal: controller.signal,
		});
	} finally {
		clearTimeout(timeoutId);
	}
}

/**
 * Renews the user's JWT token.
 * @param cookies - The request cookies.
 * @param host - The hostname.
 * @returns A Promise that resolves to a RequestCookie object representing the renewed token, or undefined if an error occurred.
 */
export async function renewToken(cookies: RequestCookies, host: string) {
	const reqHeaders: Record<string, string> = appwriteHeader(cookies);
	const url = new URL(`${baseAuthUrl}/account/jwt`);
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	try {
		const { jwt }: { jwt: string } = await (
			await fetch(url, {
				method: "POST",
				headers: reqHeaders,
				// signal: controller.signal,
			})
		).json();

		const expires = getExpToken(jwt);
		const expDate = new Date(expires - 10000);
		const result = {
			name: sessionNames[2],
			value: jwt,
			path: "/",
			expires: expDate,
			...(isValidIpAddress(host)
				? {}
				: {
						domain: newHostname(host),
						httpOnly: true,
						secure: true,
					}),
		};

		return result;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (e: any) {
		console.error("middleware create token", e.message);
		return undefined;
	} finally {
		clearTimeout(timeoutId);
	}
}
