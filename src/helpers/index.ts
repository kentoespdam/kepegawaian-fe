import { appwriteKey, authHostname, projectId, sessionNames } from "@lib/utils";
import type {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

/**
 * Checks if the given string is a valid IPv4 address.
 *
 * @param ipAddress - The IP address to validate.
 * @returns True if the IP address is valid, false otherwise.
 */
export const isValidIpAddress = (ipAddress?: string): boolean => {
	if (typeof ipAddress !== "string" || ipAddress.split(".").length !== 4)
		return false;

	return ipAddress.split(".").every((part) => {
		const num = Number.parseInt(part);
		return !Number.isNaN(num) && num >= 0 && num <= 255;
	});
};

/**
 * Generates a new hostname based on the given hostname.
 *
 * @param hostname - The hostname to generate a new hostname from.
 * @returns The new hostname if it is valid, undefined if it is a valid IPv4 address, or the original hostname if it is "localhost".
 */
export const newHostname = (hostname?: string): string | undefined =>
	hostname === "localhost"
		? hostname
		: isValidIpAddress(hostname as string)
			? undefined
			: `.${hostname}`;

/**
 * Sets the cookies string with a new hostname.
 *
 * @param cookieString - The cookies string to modify.
 * @param hostname - The hostname to replace the current hostname with.
 * @returns The modified cookies string.
 */
export const newSetCookies = (
	cookieString: string,
	hostname?: string,
): string =>
	cookieString.split(`.${authHostname}`).join(newHostname(hostname) ?? "");

/**
 * Returns a JSON string representation of the current session cookie from the given cookies object.
 *
 * @param cookies - The cookies object to retrieve the session cookie from.
 * @returns A JSON string representation of the current session cookie, or an empty string if no session cookie is found.
 */
export const xFallbackFromCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
): string => {
	const currentCookie =
		cookies.get(sessionNames[0])?.value ?? cookies.get(sessionNames[1])?.value;

	if (!currentCookie) {
		return "";
	}

	const jsonObject = {
		[sessionNames[0]]: currentCookie,
	};

	return JSON.stringify(jsonObject);
};

/**
 * Checks if the given cookies object has a session cookie.
 *
 * @param cookies - The cookies object to check.
 * @returns True if the cookies object has a session cookie, false otherwise.
 */
export const isHasSessionCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
): boolean => {
	return cookies.has(sessionNames[0]) || cookies.has(sessionNames[1]);
};

/**
 * Retrieves the value of the token cookie from the given cookies object.
 *
 * @param cookies - The cookies object to retrieve the token cookie from.
 * @returns The value of the token cookie as a string, or undefined if the cookie is not found.
 */
export const getCookieToken = (
	cookies: RequestCookies | ReadonlyRequestCookies,
): string | undefined => {
	return cookies.get(sessionNames[2])?.value;
};

/**
 * Checks if the given cookies object has a token cookie and if it's not expired.
 *
 * @param cookies - The cookies object to check.
 * @returns True if the cookies object has a token cookie and it's not expired, false otherwise.
 */
export const isHasTokenCookie = (
	cookies: RequestCookies | ReadonlyRequestCookies,
): boolean => {
	const tokenCookie = getCookieToken(cookies);
	return tokenCookie !== undefined && getExpToken(tokenCookie) !== 0;
};

export const cookieStringToObject = (
	cookieString: string,
	headers: ReadonlyHeaders,
): RequestCookie => {
	const host = headers.get("host") ? headers.get("host")?.split(":")[0] : "";
	const arrCookie = cookieString.split(";");

	return arrCookie.reduce((acc, cookie) => {
		const [key, val] = cookie.trim().split("=").map(decodeURIComponent);
		if (sessionNames.includes(key))
			return Object.assign(acc, {
				name: key,
				value: val,
			});

		switch (key) {
			case "expires":
				return Object.assign(acc, {
					maxAge: new Date(val).getTime(),
				});
			case "domain":
				return Object.assign(acc, { domain: newHostname(host) });
			case "secure":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { secure: true });
			case "httponly":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { httpOnly: true });
			case "samesite":
				if (isValidIpAddress(host)) return acc;
				return Object.assign(acc, { sameSite: val });
			case "path":
				return Object.assign(acc, { path: val });
			case "priority":
				return Object.assign(acc, { priority: val });
		}

		try {
			return Object.assign(acc, { [key]: JSON.parse(val) });
		} catch (e) {
			return Object.assign(acc, { [key]: val });
		}
	}, {}) as RequestCookie;
};

export const setAuthCookieHeader = (
	cookieString: string[],
	headers?: ReadonlyHeaders,
) => {
	const cookieFromReq = cookieString[0].trim().split(";");
	cookies().set("asdf-session", cookieString[0].split("=")[1], {});
};

//Tokens Helpers
export const extractTokenData = (token: string, part?: number) => {
	const tokenParts = token.split(".");
	return JSON.parse(atob(tokenParts[part ? part : 1]));
};

export const getExpToken = (token: string): number => {
	if (!token) return 0;
	try {
		const tokenBody = extractTokenData(token);
		return tokenBody.exp * 1000;
	} catch (e) {
		return 0;
	}
};

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
	};

	if (token) {
		Object.assign(headers, { "X-Appwrite-JWT": token });
		return headers;
	}
	// Object.assign(headers, { Cookie: sessCookie.toString() });

	switch (typeof sessCookie) {
		case "object":
			Object.assign(headers, {
				Cookie: sessCookie.toString(),
				"X-Fallback-Cookies": xFallbackFromCookie(sessCookie),
			});
			return headers;
		default:
			Object.assign(headers, {
				Cookie: sessCookie,
				"X-Fallback-Cookies": sessCookie,
			});
			return headers;
	}
};

export const extracNipamFromToken = (): string | null => {
	const cookieList = cookies();
	const tokenString =
		cookieList.get(sessionNames[0])?.value ||
		cookieList.get(sessionNames[1])?.value;
	if (!tokenString) return null;
	const tokenData = JSON.parse(atob(tokenString));
	return tokenData.id;
};

export const setAuthorizeHeader = (
	sessCookie: RequestCookies | ReadonlyRequestCookies,
	token?: string,
) => {
	const tokenCookie = token ?? sessCookie.get(sessionNames[2])?.value;
	return {
		Authorization: `Bearer ${tokenCookie}`,
		"Content-Type": "application/json",
	};
};

export const getNipamFromCookie = () => {
	const cookieList = cookies();
	const tokenString =
		cookieList.get(sessionNames[0])?.value ||
		cookieList.get(sessionNames[1])?.value;

	if (!tokenString) return null;
	const tokenData = JSON.parse(atob(tokenString));
	return tokenData.id;
};
