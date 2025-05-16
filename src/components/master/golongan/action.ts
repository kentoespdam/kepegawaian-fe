"use server";

import type { AxiosErrorData, SaveErrorStatus } from "@_types/index";
import { GolonganSchema } from "@_types/master/golongan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios, { type AxiosError } from "axios";
import { cookies } from "next/headers";

/**
 * Saves a Golongan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveGolongan = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(await cookies());
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
	} catch (e) {
		const err = e as unknown as AxiosError<AxiosErrorData>;
		return {
			success: false,
			error: {
				message: err?.response?.data.message ?? "Internal Server Error",
			},
		};
	}
};
