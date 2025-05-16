"use server";
import type { RiwayatSkSchema } from "@_types/kepegawaian/riwayat_sk";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRiwayatSk = async (formData: RiwayatSkSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/kepegawaian/riwayat/sk/${formData.id}`
			: `${API_URL}/kepegawaian/riwayat/sk`;
	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};

