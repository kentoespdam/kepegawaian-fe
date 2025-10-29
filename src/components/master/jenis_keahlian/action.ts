"use server"

import type { JenisKeahlianSchema } from "@_types/master/jenis_keahlian"
import { setAuthorizeHeader } from "@helpers/index"
import { API_URL } from "@lib/utils"
import axios from "axios"
import { cookies } from "next/headers"

/**
 * Saves a JenisKeahlian object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJenisKeahlian = async (formData: JenisKeahlianSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/jenis-keahlian/${formData.id}`
			: `${API_URL}/master/jenis-keahlian`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	return await req.json();
};

/**
 * Deletes a JenisKeahlian object by its ID.
 *
 * @param formData - The FormData object containing the data to be deleted.
 * @returns A Promise that resolves to an object with a success property and an optional error property.
 */
export const hapus = async (
	formData: FormData
): Promise<{
	success: boolean
	error?: { message: string }
}> => {
	const deleteRef = formData.get("deleteRef")?.toString() || ""
	if (!deleteRef.startsWith("DELETE-"))
		return { success: false, error: { message: "invalid data" } }
	const id = Number(deleteRef.slice(7) || 0)
	if (id <= 0) return { success: false, error: { message: "invalid data" } }

	try {
		await axios.delete(`${API_URL}/master/jenis-keahlian/${id}`, {
			headers: setAuthorizeHeader(cookies()),
		});
		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: false positive
	} catch (err: any) {
		console.error(err.response?.data)
		return {
			success: false,
			error: { message: err.response?.data.message },
		}
	}
}
