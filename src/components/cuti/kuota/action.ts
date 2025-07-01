"use server";

import type { CutiKuotaSchema } from "@_types/cuti/kuota";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
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

export const saveKuotaCutiBatch = async (formData: FormData) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/cuti/kuota/import`;
	const req = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: headers.Authorization,
		},
		body: formData,
	});
	const result = await req.json();
	return result;
};

export const downloadCutiKuotaTemplate = async () => {
	const url = `${API_URL}/cuti/kuota/template`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(url, {
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
		filename: response.headers
			.get("content-disposition")
			?.split("filename=")[1].replace(/"/g, ""),
		base64: Buffer.from(arrayBuffer).toString("base64"),
	};

	return result;
};
