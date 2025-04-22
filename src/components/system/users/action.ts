"use server";
import type { AppwriteException } from "node-appwrite";

import type { ChangePasswordSchema } from "@_types/system/user";
import { decodeString } from "@helpers/number";
import { appwriteKey, baseAuthUrl, projectId } from "@lib/utils";
import { Client, Users } from "node-appwrite";

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
