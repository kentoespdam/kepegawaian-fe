"use server";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const downloadTemplatePotonganGaji = async (rootBatchId: string) => {
	const apiUrl = `${API_URL}/penggajian/batch/master/download/potongan-gaji/${rootBatchId}`;
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

export const rollbackAdditionalGaji = async (rootBatchId: string) => {
	const apiUrl = `${API_URL}/penggajian/batch/master/proses/${rootBatchId}/rollback`;
	const headers = setAuthorizeHeader(cookies());
	const response = await fetch(apiUrl, {
		method: "DELETE",
		headers,
		cache: "no-cache",
	});

	return await response.json();
};

export const uploadPotongan = async (formData: FormData) => {
	const headers = setAuthorizeHeader(cookies());
	const apiUrl = `${API_URL}/penggajian/batch/master/upload/${formData.get("id")}`;
	const response = await fetch(apiUrl, {
		method: "PATCH",
		headers: { Authorization: headers.Authorization },
		body: formData,
	});

	return await response.json();
};
