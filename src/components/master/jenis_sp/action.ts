"use server";

import type { JenisSpSchema } from "@_types/master/jenis_sp";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveJenisSp = async (formData: JenisSpSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const baseUrl = `${API_URL}/master/jenis-sp`;
	const url = formData.id > 0 ? `${baseUrl}/${formData.id}` : baseUrl;
	const res = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	const result = await res.json();
	return result;
};
