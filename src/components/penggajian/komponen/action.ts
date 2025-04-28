"use server";

import type { KomponenGajiSchema } from "@_types/penggajian/komponen";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveKomponenGaji = async (formData: KomponenGajiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/komponen/${formData.id}`
			: `${API_URL}/penggajian/komponen`;

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
