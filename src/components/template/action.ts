"use server";

import {
	appwriteHeader,
	getExpToken,
	isHasSessionCookie,
	isValidIpAddress,
	newHostname,
} from "@helpers/index";
import { baseAuthUrl, sessionNames } from "@lib/utils";
import { cookies, headers } from "next/dist/client/components/headers";

export const checkToken = async () => isHasSessionCookie(cookies());

export async function renewToken() {
	const curHeader = headers();
	const host = curHeader.get("host")?.split(":")[0] ?? "localhost";
	const reqHeaders: Record<string, string> = appwriteHeader(cookies());
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