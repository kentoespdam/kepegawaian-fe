"use server";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

interface saveLampiranSkProps {
	path: string;
	formData: FormData;
}

export const saveLampiranSk = async ({
	path,
	formData,
}: saveLampiranSkProps) => {
	const headers = setAuthorizeHeader(await cookies());
	const url = `${API_URL}/${path}`;

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

export const getFile = async (
	ref: string,
	id: number,
): Promise<LampiranFile> => {
	const apiUrl = `${API_URL}/kepegawaian/lampiran/file/${ref}/${id}`;
	const headers = setAuthorizeHeader(await cookies());

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

	const result = {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
	} as LampiranFile;

	return result;
};

interface acceptLampiranSkDataProps {
	id: number;
	ref: string;
	refId: number;
}

export const acceptLampiranSk = async ({
	id,
	ref,
	refId,
}: acceptLampiranSkDataProps) => {
	const url = `${API_URL}/kepegawaian/lampiran/accept`;
	const headers = setAuthorizeHeader(await cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	const response = await fetch(url, {
		method: "POST",
		headers,
		signal: controller.signal,
		cache: "no-cache",
		body: JSON.stringify({ id, ref, refId }),
	});

	if (!response.ok) throw new Error(await response.text());

	clearTimeout(timeoutId);

	return await response.json();
};
