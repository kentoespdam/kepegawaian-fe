"use server";

import type { JabatanSchema } from "@_types/master/jabatan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

/**
 * Saves a Jabatan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJabatan = async (formData: JabatanSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/jabatan/${formData.id}`
			: `${API_URL}/master/jabatan`;
	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
