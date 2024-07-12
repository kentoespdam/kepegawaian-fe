"use server";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export interface LampiranFile {
	type: string;
	base64: string;
}

export const getFile = async (
	jenis: string,
	id: number,
): Promise<LampiranFile> => {
	const apiUrl = `${API_URL}/profil/lampiran/file/${jenis}/${id}`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(apiUrl, {
		method: "GET",
		headers,
		cache: "no-cache",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch file");
	}

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();

	const result: LampiranFile = {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
	};

	return result;
};
