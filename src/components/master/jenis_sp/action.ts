"use server";

import type { JenisSpSchema } from "@_types/master/jenis_sp";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveJenisSp = async (formData: JenisSpSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/master/jenis_sp${formData.id > 0 ? `/${formData.id}` : ""}`;
	const res = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: {
			...headers,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	return await res.json();
};
