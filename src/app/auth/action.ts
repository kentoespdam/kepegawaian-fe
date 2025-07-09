"use server";
import { userToEmail } from "@helpers/email";
import { cookieStringToObject } from "@helpers/index";
import { deleteCurrentSession } from "@lib/appwrite/user";
import { appwriteKey, authUrl, baseAuthUrl, projectId } from "@lib/utils";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { Client, Users } from "node-appwrite";
import type { LoginSchema } from "./form.index";

export const doLogin = async (formData: LoginSchema) => {
	const requestHeaders = headers();
	const client = new Client()
		.setEndpoint(baseAuthUrl)
		.setProject(projectId)
		.setKey(appwriteKey);
	const users = new Users(client);
	const userList = await users.list([], formData.username);
	if (userList.total === 0 || !userList.users[0].status) {
		return {
			status: 500,
			statusText: "Bad Request",
			message: "",
			data: null,
			timestamp: new Date().toISOString(),
			errors: "User not found or not verified",
		};
	}

	const loginResponse = await fetch(authUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Appwrite-Project": projectId,
		},
		body: JSON.stringify({
			email: userToEmail(formData.username),
			password: formData.password,
		}),
	});

	const cookieHeader = loginResponse.headers.getSetCookie();
	for (const cookieString of cookieHeader) {
		const cookie = cookieStringToObject(cookieString, requestHeaders);
		cookies().set(cookie.name, cookie.value, cookie);
	}

	const jsonResponse = await loginResponse.json();
	if (jsonResponse.status !== 201) {
		return {
			status: loginResponse.status,
			statusText: "Bad Request",
			message: "",
			data: null,
			timestamp: new Date().toISOString(),
			errors: jsonResponse.message,
		};
	}

	return {
		status: 201,
		statusText: "Created",
		message: "Login Success",
		data: null,
		timestamp: new Date().toISOString(),
		errors: null,
	};
};

export const logout = async () => {
	const cookieList = cookies();
	await deleteCurrentSession(cookieList);
	redirect("/");
};
