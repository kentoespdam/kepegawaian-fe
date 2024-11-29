"use server";

import type { PendapatanNonPajakSchema } from "@_types/penggajian/pendapatan_non_pajak";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveKodePajak = async (formData: PendapatanNonPajakSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/pendapatan-non-pajak/${formData.id}`
			: `${API_URL}/penggajian/pendapatan-non-pajak`;
	console.log(url);

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
