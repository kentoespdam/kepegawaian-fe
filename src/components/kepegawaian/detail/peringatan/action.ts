"use server";

import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
export const saveRiwayatSp = async (formData: FormData) => {
	const id = (formData.get("id") as unknown as number) ?? 0;
	const headers = setAuthorizeHeader(cookies());
	const url =
		id && id > 0
			? `${API_URL}/kepegawaian/riwayat/sp/${id}`
			: `${API_URL}/kepegawaian/riwayat/sp`;

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

export const getFile = async (id: number) => {
	const apiUrl = `${API_URL}/kepegawaian/riwayat/sp/${id}/file`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(apiUrl, {
		method: "GET",
		headers,
		cache: "no-cache",
	});

	if (!response.ok) {
		const text = await response.json();
		console.error(text);
		throw new Error(text.errors);
	}

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();

	const result: LampiranFile = {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
	};

	return result;
};
