"use server";
import { userToEmail } from "@helpers/email";
import { deleteCurrentSession, getUserByNipam } from "@lib/appwrite/user";
import { authUrl, projectId } from "@lib/utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginSchema } from "./form.index";
import { cookieStringToObject } from "@helpers/index";
import axios from "axios";

interface LoginResponse {
	isAuth: boolean;
	message: string;
	callbackUrl: string;
}

export const doLogin = async (formData: LoginSchema) => {
	const { username, password } = formData;
	let callbackUrl = cookies().get("callback_url")?.value as string;
	callbackUrl = !callbackUrl ? "" : callbackUrl.replace("undefined", "");
	const email = userToEmail(username);
	const headerList = headers();

	const userExists = await getUserByNipam(username);
	if (!userExists) {
		return {
			status: 500,
			statusText: "Bad Request",
			message: "",
			data: null,
			timestamp: new Date().toISOString(),
			errors: "User not found",
		};
	}

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

	if (response.status !== 201) {
		return {
			status: 500,
			statusText: "Bad Request",
			message: "",
			data: null,
			timestamp: new Date().toISOString(),
			errors: response.data.message,
		};
	}

	if (response.headers["set-cookie"]) {
		for (const item of response.headers["set-cookie"]) {
			const cookieObject = cookieStringToObject(item, headerList);
			cookies().set(cookieObject.name, cookieObject.value, cookieObject);
		}
	}
	redirect(callbackUrl);
};

export const logout = async () => {
	const cookieList = cookies();
	await deleteCurrentSession(cookieList);
	redirect("/");
};
