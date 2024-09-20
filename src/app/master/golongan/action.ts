"use server";

import type { BaseDelete, SaveErrorStatus } from "@_types/index";
import { GolonganSchema } from "@_types/master/golongan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

/**
 * Saves a Golongan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveGolongan = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(cookies());
	try {
		const validate = GolonganSchema.safeParse({
			id: Number(formData.get("id")),
			golongan: formData.get("golongan"),
			pangkat: formData.get("pangkat"),
		});

		if (!validate.success)
			return {
				success: false,
				error: validate.error.flatten().fieldErrors,
			};

		const apiUrl =
			validate.data.id > 0
				? `${API_URL}/master/golongan/${validate.data.id}`
				: `${API_URL}/master/golongan`;

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
 * Deletes a Golongan object by its ID.
 *
 * @param _prevState - The previous state of the application.
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
		await axios.delete(`${API_URL}/master/golongan/${id}`, {
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
