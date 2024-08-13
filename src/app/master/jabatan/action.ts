"use server";

import type { SaveErrorStatus } from "@_types/index";
import { JabatanSchema } from "@_types/master/jabatan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Saves a Jabatan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJabatan = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(cookies());
	try {
		const validate = JabatanSchema.safeParse({
			id: Number(formData.get("id")),
			parentId: Number(formData.get("parentId")),
			organisasiId: Number(formData.get("organisasiId")),
			levelId: Number(formData.get("levelId")),
			nama: formData.get("nama"),
		});

		if (!validate.success)
			return {
				success: false,
				error: validate.error.flatten().fieldErrors,
			};

		const apiUrl =
			validate.data.id > 0
				? `${API_URL}/master/jabatan/${validate.data.id}`
				: `${API_URL}/master/jabatan`;

		await axios.request({
			method: validate.data.id ? "PUT" : "POST",
			url: apiUrl,
			data: formData,
			headers: headers,
		});

		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		return { success: false, error: { message: err.response.data.message } };
	}
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
