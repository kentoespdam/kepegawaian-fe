"use server";

import type { RiwayatMutasiSchema } from "@_types/kepegawaian/riwayat-mutasi";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRiwayatMutasi = async (formData: RiwayatMutasiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/kepegawaian/riwayat/mutasi/${formData.id}`
			: `${API_URL}/kepegawaian/riwayat/mutasi`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await req.json();
	console.log(result);
	return result;
};
