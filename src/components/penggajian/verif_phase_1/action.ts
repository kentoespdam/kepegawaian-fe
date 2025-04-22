"use server";

import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const downloadTableGajiExcel = async (rootBatchId: string) => {
	const apiUrl = `${API_URL}/penggajian/batch/master/download/table-gaji/${rootBatchId}`;
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