"use server";

import type { SaveErrorStatus } from "@_types/index";
import { JenjangPendidikanSchema } from "@_types/master/jenjang_pendidikan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Saves a JenjangPendidikan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJenjangPendidikan = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(cookies());
	try {
		const validate = JenjangPendidikanSchema.safeParse({
			id: Number(formData.get("id")),
			nama: formData.get("nama"),
			seq: Number(formData.get("seq")),
		});

		if (!validate.success)
			return {
				success: false,
				error: validate.error.flatten().fieldErrors,
			};

		const apiUrl =
			validate.data.id > 0
				? `${API_URL}/master/jenjang-pendidikan/${validate.data.id}`
				: `${API_URL}/master/jenjang-pendidikan`;

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
 * Deletes a JenjangPendidikan object by its ID.
 *
 * @param _prevState - The previous state of the application.
 * @param formData - The FormData object containing the data to be deleted.
 * @returns A Promise that resolves to an object with a success property and an optional error property.
 */
export const hapus = async (
	formData: FormData,
): Promise<{
	success: boolean;
	error?: { message: string };
}> => {
	const deleteRef = formData.get("deleteRef")?.toString() || "";
	if (!deleteRef.startsWith("DELETE-"))
		return { success: false, error: { message: "invalid data" } };
	const id = Number(deleteRef.slice(7) || 0);
	if (id <= 0) return { success: false, error: { message: "invalid data" } };

	try {
		await axios.delete(`${API_URL}/master/jenjang-pendidikan/${id}`, {
			headers: setAuthorizeHeader(cookies()),
		});
		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.error(err.response?.data);
		return {
			success: false,
			error: { message: err.response?.data.message },
		};
	}
};
