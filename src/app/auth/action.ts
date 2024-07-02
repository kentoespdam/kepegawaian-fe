"use server";
import type { AxiosErrorData } from "@_types/index";
import { userToEmail } from "@helpers/email";
import { cookieStringToObject } from "@helpers/index";
import { deleteCurrentSession, getUserByNipam } from "@lib/appwrite/user";
import { authUrl, projectId } from "@lib/utils";
import axios, { type AxiosError } from "axios";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

interface LoginResponse {
	isAuth: boolean;
	message: string;
	callbackUrl: string;
}

export const doLogin = async (
	_prevState: unknown,
	formData: FormData,
): Promise<LoginResponse> => {
	const headerList = headers();
	const callbackUrl = cookies().get("callback_url")?.value as string;
	const username = formData.get("username") as string;
	const email = userToEmail(username);
	const password = formData.get("password") as string;

	const userExist = await getUserByNipam(username);
	if (!userExist) {
		return {
			isAuth: false,
			callbackUrl,
			message:
				"Akun anda tidak ditemukan / belum aktif, silahkan hubungi Administrator.",
		};
	}

	try {
		const response = await axios.post(
			authUrl,
			{ email, password },
			{
				headers: {
					"Content-Type": "application/json",
					"X-Appwrite-Project": projectId,
				},
			},
		);

		if (response.headers["set-cookie"]) {
			for (const item of response.headers["set-cookie"]) {
				const cookieObject = cookieStringToObject(item, headerList);
				cookies().set(cookieObject.name, cookieObject.value, cookieObject);
			}
		}

		return {
			isAuth: true,
			message: "Login Success...",
			callbackUrl,
		};
	} catch (error) {
		const axiosError = error as AxiosError<AxiosErrorData>;
		return {
			isAuth: false,
			callbackUrl,
			message: axiosError.response?.data.message || "Login failed",
		};
	}
};
export const logout = async () => {
	const cookieList = cookies();
	await deleteCurrentSession(cookieList);
	redirect("/");
};
