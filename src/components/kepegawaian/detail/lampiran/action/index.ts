"use server";
import type { LampiranFile } from "@app/kepegawaian/profil/lampiran/action";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
import type { DeleteLampiranSkProps } from "../form/delete";

interface saveLampiranSkProps {
	path: string;
	formData: FormData;
}

export const saveLampiranSk = async ({
	path,
	formData,
}: saveLampiranSkProps) => {
	const headers = setAuthorizeHeader(cookies());
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

export const deleteLampiranSk = async (props: DeleteLampiranSkProps) => {
	const id =
		Number(props.id.split("-")[1]) === Number(props.curId)
			? Number(props.id.split("-")[1])
			: 0;
	const url = `${API_URL}/kepegawaian/lampiran/${props.ref}/${props.refId}/${id}`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(url, {
		method: "DELETE",
		headers,
		cache: "no-cache",
	});

	const result = await response.json();
	return result;
};

export const getFile = async (
	ref: string,
	id: number,
): Promise<LampiranFile> => {
	const apiUrl = `${API_URL}/kepegawaian/lampiran/file/${ref}/${id}`;
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

	const blob = await response.blob();
	const arrayBuffer = await blob.arrayBuffer();

	const result: LampiranFile = {
		type: blob.type,
		base64: Buffer.from(arrayBuffer).toString("base64"),
	};

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
	const headers = setAuthorizeHeader(cookies());
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
