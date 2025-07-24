"use server";
import type { AppwriteException } from "node-appwrite";

import type { ChangePasswordSchema } from "@_types/system/user";
import { decodeString } from "@helpers/number";
import { appwriteKey, baseAuthUrl, projectId } from "@lib/utils";
import { Account, Client, Users } from "node-appwrite";
import type { SystemRole } from "@_types/system/system_role";

export const changePassword = async (formData: ChangePasswordSchema) => {
	formData.newPassword = decodeString(formData.newPassword);
	formData.confirmPassword = decodeString(formData.confirmPassword);

	if (formData.newPassword !== formData.confirmPassword) {
		return {
			status: 400,
			statusText: "Bad Request",
			errors: "Password tidak sama",
		};
	}

	const client = new Client()
		.setEndpoint(baseAuthUrl)
		.setProject(projectId)
		.setKey(appwriteKey);
	const user = new Users(client);
	try {
		await user.updatePassword(formData.id, formData.newPassword);
		return {
			status: 200,
			statusText: "OK",
			message: "Password berhasil diubah",
		};
	} catch (e: unknown) {
		const err = e as AppwriteException;
		return {
			status: 400,
			statusText: "Bad Request",
			errors: err.message,
			message: err.message,
		};
	}
};

export const updateRoles = async (props: {
	id: string;
	data: string[];
}) => {
	const client = new Client()
		.setEndpoint(baseAuthUrl)
		.setProject(projectId)
		.setKey(appwriteKey);

	const user = new Users(client);
	try {
		await user.updatePrefs(props.id, { roles: props.data });
		return {
			status: 200,
			statusText: "OK",
			message: "Role berhasil diubah",
		};
	} catch (e: unknown) {
		const err = e as AppwriteException;
		console.log(err);
		return {
			status: 400,
			statusText: "Bad Request",
			errors: err.message,
			message: err.message,
		};
	}
};
