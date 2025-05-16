"use server";

import type { OrganisasiSchema } from "@_types/master/organisasi";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

/**
 * Saves a Organisasi object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveOrganisasi = async (formData: OrganisasiSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/organisasi/${formData.id}`
			: `${API_URL}/master/organisasi`;
	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
