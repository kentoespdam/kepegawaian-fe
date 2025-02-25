"use server";
import type { RefPotonganTkkSchema } from "@_types/penggajian/ref_potongan_tkk";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveRefPotonganTkk = async (formData: RefPotonganTkkSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/potongan-tkk/${formData.id}`
			: `${API_URL}/penggajian/potongan-tkk`;

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
