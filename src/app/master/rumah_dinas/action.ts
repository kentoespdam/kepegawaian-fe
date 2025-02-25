"use server";

import type { RumahDinasSchema } from "@_types/master/rumah_dinas";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRumahDinas = async (formData: RumahDinasSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/rumah-dinas/${formData.id}`
			: `${API_URL}/master/rumah-dinas`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
