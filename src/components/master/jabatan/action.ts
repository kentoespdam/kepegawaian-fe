"use server";

import type { JabatanSchema } from "@_types/master/jabatan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Saves a Jabatan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJabatan = async (formData: JabatanSchema) => {
	const headers = setAuthorizeHeader(cookies());
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

/**
 * Deletes a Jabatan object by its ID.
 *
 * @param formData - The FormData object containing the data to be deleted.
 * @returns A Promise that resolves to an object with a success property and an optional error property.
 */
export const hapus = async (formData: FormData) => {
	const deleteRef = formData.get("deleteRef")?.toString() || "";
	if (!deleteRef.startsWith("DELETE-"))
		return { success: false, error: { message: "invalid data" } };
	const id = Number(deleteRef.slice(7) || 0);
	if (id <= 0) return { success: false, error: { message: "invalid data" } };

	try {
		await axios.delete(`${API_URL}/master/jabatan/${id}`, {
			headers: setAuthorizeHeader(cookies()),
		});
		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err.response);
		return {
			success: false,
			error: { message: String(err.response?.data.message) },
		};
	}
};
