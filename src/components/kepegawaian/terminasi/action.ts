"use server";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRiwayatTerminasi = async (formData: FormData) => {
	const id = (formData.get("id") as unknown as number) ?? 0;
	const headers = setAuthorizeHeader(await cookies());
	const url =
		id > 0
			? `${API_URL}/kepegawaian/riwayat/terminasi/${id}`
			: `${API_URL}/kepegawaian/riwayat/terminasi`;

	const req = await fetch(url, {
		method: id > 0 ? "PUT" : "POST",
		headers: {
			Authorization: headers.Authorization,
		},
		body: formData,
	});

	const result = await req.json();
	return result;
};
