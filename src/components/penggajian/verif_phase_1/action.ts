"use server";

import type { VerifikasiSchema } from "@_types/penggajian/verifikasi";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const downloadTableGajiExcel = async (periode: string) => {
	const apiUrl = `${API_URL}/penggajian/batch/master/download/table-gaji/${periode}`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(apiUrl, {
		method: "GET",
		headers,
		cache: "no-cache",
	});

	if (!response.ok) {
		const text = await response.json();
		console.log(text);
		throw new Error(text.errors);
	}

	const filename = response.headers
		.get("content-disposition")
		?.split("filename=")[1];

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();

	return {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
		filename: filename,
	} as LampiranFile;
};

export const verifPhase1 = async (formData: VerifikasiSchema) => {
	// console.log(formData);
	const apiUrl = `${API_URL}/penggajian/batch/${formData.batchId}/verify1`;
	const headers = setAuthorizeHeader(cookies());
	const response = await fetch(apiUrl, {
		method: "PATCH",
		headers,
		body: JSON.stringify(formData),
	});

	return await response.json();
};
