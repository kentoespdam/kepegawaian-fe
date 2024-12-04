"use server";

import type { TunjanganSchema } from "@_types/penggajian/tunjangan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveTunjangan = async (formData: TunjanganSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/tunjangan/${formData.jenisTunjangan}/${formData.id}`
			: `${API_URL}/penggajian/tunjangan/${formData.jenisTunjangan}`;
	console.log(url);

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
