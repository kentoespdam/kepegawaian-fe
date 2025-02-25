"use server";

import type { PhdpSchema } from "@_types/penggajian/phdp";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const savePhdp = async (
	formData: PhdpSchema,
) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/phdp/${formData.id}`
			: `${API_URL}/penggajian/phdp`;

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
