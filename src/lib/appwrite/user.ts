import type { AxiosErrorData } from "@_types/index";
import type { User } from "@_types/user";
import { appwriteHeader, getExpToken, newHostname } from "@helpers/index";

import { appwriteKey, baseAuthUrl, projectId, sessionNames } from "@lib/utils";
import { useSessionStore } from "@store/session";
import axios, { type AxiosError } from "axios";
import type {
	RequestCookie,
	RequestCookies,
} from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const axiosConfig = {
	headers: {
		"Content-Type": "application/json",
		"X-Appwrite-Response-Format": "1.0.0",
		"X-Appwrite-Project": projectId,
		"X-Appwrite-Key": appwriteKey,
	},
};

export const getUserByNipam = async (nipam: string) => {
	try {
		const { data } = await axios.get(
			`${baseAuthUrl}/users/${nipam.split("@")[0]}`,
			axiosConfig,
		);
		return data;
	} catch (e) {
		const err = e as AxiosError;
		console.log(
			"lib.appwrite.user.getUserByNipam",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const createJwtToken = async (
	xFallback: string,
	headerList: ReadonlyHeaders,
) => {
	const host = headerList.get("host")?.split(":")[0] ?? "";
	try {
		const { data } = await axios.post(
			`${baseAuthUrl}/account/jwt`,
			{},
			{
				...axiosConfig,
				headers: {
					...axiosConfig.headers,
					"X-Fallback-Cookies": xFallback,
				},
			},
		);
		const expires = getExpToken(data.jwt);
		return {
			name: sessionNames[2],
			value: data.jwt,
			domain: newHostname(host),
			path: "/",
			maxAge: new Date(expires),
			httpOnly: true,
			secure: true,
			sameSite: true,
			priority: "high",
		} as RequestCookie;
	} catch (e) {
		const error = e as AxiosError;
		const err = error.response?.data as AxiosErrorData;
		console.error("lib.appwrite.user.createJwtToken", err);
		return {} as RequestCookie;
	}
};

export const getCurrentUser = async (): Promise<User> => {
	const cookieList = cookies();
	const token = cookieList.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookieList, token);
	try {
		const { data } = await axios.get(`${baseAuthUrl}/account`, { headers });
		useSessionStore.setState({ user: data });
		return data;
	} catch (e) {
		const err = e as AxiosError;
		console.log(
			"lib.appwrite.user.getCurrentAccount",
			new Date().toISOString(),
			err.response?.data,
		);
		throw new Error(err.response?.data as string);
	}
};

export const getCurrentSession = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const token = cookies.get(sessionNames[2])?.value;
	const headers = appwriteHeader(cookies, token);
	try {
		const { data } = await axios.get(`${baseAuthUrl}/account/session/current`, {
			headers,
		});
		return data;
	} catch (e) {
		const err = e as AxiosError;
		console.log(
			"lib.appwrite.user.getCurrentSession",
			new Date().toISOString(),
			err.response?.data,
		);
		return null;
	}
};

export const deleteCurrentSession = async (
	cookies: RequestCookies | ReadonlyRequestCookies,
) => {
	const headers = appwriteHeader(cookies);
	try {
		const { data } = await axios.delete(
			`${baseAuthUrl}/account/sessions/current`,
			{ headers },
		);
		console.log(data);
	} catch (e) {
		const err = e as AxiosError;
		console.log(
			"lib.appwrite.user.deleteCurrentSession",
			new Date().toISOString(),
			err.response?.data,
		);
	}
};
