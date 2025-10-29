import { baseAuthUrl, sessionNames } from "@lib/utils"
import { type NextRequest, NextResponse } from "next/server"
import {
	appwriteHeader,
	getExpToken,
	isHasSessionCookie,
	isHasTokenCookie,
	isValidIpAddress,
	newHostname,
} from "./helpers"

/**
 * Middleware function that handles authentication and session management.
 *
 * @param req - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to a NextResponse object representing the response.
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
	const response = NextResponse.next()
	const {
		host,
		pathname: currentPath,
		origin: currentOrigin,
	}: {
		host: string
		pathname: string
		origin: string
	} = req.nextUrl
	const cookies: NextRequest["cookies"] = req.cookies

	if (!isHasSessionCookie(cookies) && !currentPath.startsWith("/auth"))
		return redirectAuth(currentPath, currentOrigin)

	const activeSessionStatus = await isHasAuthSession(cookies)

	if (activeSessionStatus === 401) {
		for (const name of sessionNames) {
			response.cookies.delete(name)
		}
		if (currentPath.startsWith("/auth")) return response
		return redirectAuth(currentPath, currentOrigin)
	}

	if (!isHasTokenCookie(cookies)) {
		const token = await renewToken(cookies, host.split(":")[0])
		if (token) {
			response.cookies.set(token)
		}
	}

	if (activeSessionStatus === 200 && currentPath.startsWith("/auth")) {
		console.log("redirect to dashboard")
		return NextResponse.redirect(new URL("/dashboard", currentOrigin))
	}

	if (currentPath === "/")
		return NextResponse.redirect(new URL("/dashboard", currentOrigin))

	return response
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|logo_pdam_40x40|api/auth/|test).*)",
	],
}

/**
 * Redirects the user to the authentication page, and sets a cookie containing the current URL.
 * @param currentPath - The current URL.
 * @param currentOrigin - The current origin.
 * @returns A NextResponse object representing the redirect response.
 */
function redirectAuth(
	currentPath: string,
	currentOrigin: string
): NextResponse {
	const callback_url = `callback_url=${encodeURIComponent(currentPath)}`
	const headers = { "set-cookie": callback_url }
	const url = new URL("/auth", currentOrigin)
	return NextResponse.redirect(url, { headers })
}

/**
 * Checks if the user has an active authentication session.
 * @param cookies - The request cookies.
 * @returns A Promise that resolves to a Response object representing the server's response to the request.
 */
async function isHasAuthSession(
	cookies: NextRequest["cookies"]
): Promise<number> {
	const reqHeaders: Record<string, string> = appwriteHeader(cookies)
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 5000)
	try {
		const res = await fetch(`${baseAuthUrl}/account/session/current`, {
			method: "GET",
			headers: reqHeaders,
			signal: controller.signal,
		})

		return res.status
	} catch (e) {
		// On fetch errors (timeout / network), treat as unauthorized to force login
		console.error("middleware isHasAuthSession error", (e as Error).message)
		return 401
	} finally {
		clearTimeout(timeoutId)
	}
}

/**
 * Renews the user's JWT token.
 * @param cookies - The request cookies.
 * @param host - The hostname.
 * @returns A Promise that resolves to a RequestCookie object representing the renewed token, or undefined if an error occurred.
 */
export async function renewToken(
	cookies: NextRequest["cookies"],
	host: string
) {
	const reqHeaders: Record<string, string> = appwriteHeader(cookies)
	const url = new URL(`${baseAuthUrl}/account/jwt`)
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 5000)

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: reqHeaders,
			signal: controller.signal,
		})

		if (!res.ok) {
			console.error("middleware renewToken non-ok response", res.status)
			return undefined
		}

		const body = await res.json()
		const { jwt }: { jwt: string } = body

		const expires = getExpToken(jwt)
		const expDate = new Date(expires - 10000)

		return {
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
		}
	} catch (e: unknown) {
		const msg = e instanceof Error ? e.message : String(e)
		console.error("middleware create token", msg)
		return undefined
	} finally {
		clearTimeout(timeoutId)
	}
}
