"use server";

import type { SystemRoleSchema } from "@_types/system/system_role";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRole = async (formData: SystemRoleSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url = `${API_URL}/system/roles`;
	const req = await fetch(url, {
		method: "POST",
		headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
