import { appwriteKey, authHostname, projectId, sessionNames } from "@lib/utils"
import type {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies"
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"

export const isValidIpAddress = (ipAddress?: string) => {
	if (
		ipAddress &&
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
			ipAddress,
		)
	) {
		return true
	}
	return false
}

export const newHostname = (hostname?: string) =>
	hostname === "localhost"
		? hostname
		: isValidIpAddress(hostname)
			? undefined
			: `.${hostname}`

// Cookies Helpers
export const newSetCookies = (cookieString: string, hostname?: string) =>
	cookieString.split(`.${authHostname}`).join(newHostname(hostname))

export const xFallbackFromCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const currentCookie =
		`${cookies.get(sessionNames[0])?.value}` ||
		`${cookies.get(sessionNames[1])}` ||
		""

	return `{"${sessionNames[0]}":"${currentCookie}"}`
}

export const isHasSessionCookie = (cookies: RequestCookies) => {
	return cookies.has(sessionNames[0]) || cookies.has(sessionNames[1])
}

export const isHasTokenCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => cookies.has(sessionNames[2])

export const getCookieToken = (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => cookies.get(sessionNames[2])?.value

export const cookieStringToObject = (
	cookieString: string,
	headers: ReadonlyHeaders,
): RequestCookie => {
	const host = headers.get("host") ? headers.get("host")?.split(":")[0] : ""
	const arrCookie = cookieString.split(";")

	return arrCookie.reduce((acc, cookie) => {
		const [key, val] = cookie.trim().split("=").map(decodeURIComponent)
		if (sessionNames.includes(key))
			return Object.assign(acc, {
				name: key,
				value: val,
			})

		switch (key) {
			case "expires":
				return Object.assign(acc, {
					maxAge: new Date(val).getTime(),
				})
			case "domain":
				return Object.assign(acc, { domain: newHostname(host) })
			case "secure":
				if (isValidIpAddress(host)) return acc
				return Object.assign(acc, { secure: true })
			case "httponly":
				if (isValidIpAddress(host)) return acc
				return Object.assign(acc, { httpOnly: true })
			case "samesite":
				if (isValidIpAddress(host)) return acc
				return Object.assign(acc, { sameSite: val })
			case "path":
				return Object.assign(acc, { path: val })
			case "priority":
				return Object.assign(acc, { priority: val })
		}

		try {
			return Object.assign(acc, { [key]: JSON.parse(val) })
		} catch (e) {
			return Object.assign(acc, { [key]: val })
		}
	}, {}) as RequestCookie
}

export const setAuthCookieHeader = (
	cookieString: string[],
	headers?: ReadonlyHeaders,
) => {
	const cookieFromReq = cookieString[0].trim().split(";")
	cookies().set("asdf-session", cookieString[0].split("=")[1], {})
}

//Tokens Helpers
export const extractTokenData = (token: string, part?: number) => {
	const tokenParts = token.split(".")
	return JSON.parse(atob(tokenParts[part ? part : 1]))
}

export const getExpToken = (token: string) => {
	if (!token) return 0
	const tokenBody = extractTokenData(token)
	return tokenBody.exp * 1000
	// return tokenBody.exp;
}

export const appwriteHeader = (
	sessCookie: string | RequestCookies | ReadonlyRequestCookies,
	token?: string,
	contentType?: string,
) => {
	const headers = {
		"Content-Type": contentType ? contentType : "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		"X-Appwrite-Project": projectId,
		"X-Appwrite-key": appwriteKey,
	}

	if (token) {
		Object.assign(headers, { "X-Appwrite-JWT": token })
		return headers
	}
	// Object.assign(headers, { Cookie: sessCookie.toString() });

	switch (typeof sessCookie) {
		case "object":
			Object.assign(headers, {
				Cookie: sessCookie.toString(),
				"X-Fallback-Cookies": xFallbackFromCookie(sessCookie),
			})
			return headers
		default:
			Object.assign(headers, {
				Cookie: sessCookie,
				"X-Fallback-Cookies": sessCookie,
			})
			return headers
	}
}

export const extracNipamFromToken = (): string | null => {
	const cookieList = cookies()
	const tokenString =
		cookieList.get(sessionNames[0])?.value ||
		cookieList.get(sessionNames[1])?.value
	if (!tokenString) return null
	const tokenData = JSON.parse(atob(tokenString))
	return tokenData.id
}

export const setAuthorizeHeader = (
	sessCookie: RequestCookies | ReadonlyRequestCookies,
	token?: string,
	contentType?: string,
) => {
	const headers = {
		"Content-Type": contentType ? contentType : "application/json",
	}
	if (token) {
		Object.assign(headers, {
			Authorization: `Bearer ${token}`,
		})
		return headers
	}

	Object.assign(headers, {
		Authorization: `Bearer ${sessCookie.get(sessionNames[2])?.value}`,
	})
	return headers
}
