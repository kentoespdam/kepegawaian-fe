"use server";

import type { BaseDelete } from "@_types/index";
import type { GajiBatchRootProsesUlang } from "@_types/penggajian/gaji_batch_root";
import { setAuthorizeHeader } from "@helpers/index";
import { decodeString } from "@helpers/number";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveGajiBatchRoot = async (formData: FormData) => {
	const headers = setAuthorizeHeader(cookies());
	const requestUrl = `${API_URL}/penggajian/batch`;

	const response = await fetch(requestUrl, {
		method: "POST",
		headers: {
			Authorization: headers.Authorization,
		},
		body: formData,
	});

	const result = await response.json();

	return result;
};

export const prosesUlang = async (formData: GajiBatchRootProsesUlang) => {
	const headers = setAuthorizeHeader(cookies());
	const requestUrl = `${API_URL}/penggajian/batch`;

	const response = await fetch(`${requestUrl}/${formData.batchId}/reprocess`, {
		method: "PATCH",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await response.json();
	return result;
};

export const deleteGajiBatchRoot = async (formData:BaseDelete) => {
	const unique=formData.unique as string
	const uniqueId=decodeString(unique)
	const id=formData.id.replace("DELETE-","")
	
	if(id!==uniqueId)
		return

	const headers = setAuthorizeHeader(cookies());
	const requestUrl = `${API_URL}/penggajian/batch`;

	const response = await fetch(`${requestUrl}/${uniqueId}`, {
		method: "DELETE",
		headers: headers,
	});
	const result = await response.json();
	return result;
};
