"use server";

import type { RiwayatKontrakSchema } from "@_types/kepegawaian/riwayat_kontrak";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRiwayatKontrak = async (formData: RiwayatKontrakSchema) => {
	const headers = setAuthorizeHeader(cookies());

	const url =
		formData.id > 0
			? `${API_URL}/kepegawaian/riwayat/kontrak/${formData.id}`
			: `${API_URL}/kepegawaian/riwayat/kontrak`;
	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	console.log(result);
	return result;
};
