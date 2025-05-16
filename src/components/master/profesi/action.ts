"use server";

import type { ProfesiSchema } from "@_types/master/profesi";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveProfesi = async (formData: ProfesiSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/profesi/${formData.id}`
			: `${API_URL}/master/profesi`;
	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
