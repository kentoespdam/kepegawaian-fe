"use server";

import type { CutiKuotaSchema } from "@_types/cuti/kuota";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveKuotaCuti = async (formData: CutiKuotaSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/cuti/kuota/${formData.id}`
			: `${API_URL}/cuti/kuota`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
