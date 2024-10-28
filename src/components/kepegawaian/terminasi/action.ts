"use server";
import type { RiwayatTerminasiSchema } from "@_types/kepegawaian/terminasi";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRiwayatTerminasi = async (
	formData: RiwayatTerminasiSchema,
) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/kepegawaian/riwayat/terminasi/${formData.id}`
			: `${API_URL}/kepegawaian/riwayat/terminasi`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await req.json();
	// console.log(result);
	return result;
};
