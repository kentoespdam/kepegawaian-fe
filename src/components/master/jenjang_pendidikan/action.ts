"use server";

import type { AxiosErrorData, SaveErrorStatus } from "@_types/index";
import { JenjangPendidikanSchema } from "@_types/master/jenjang_pendidikan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import axios, { type AxiosError } from "axios";
import { cookies } from "next/headers";

/**
 * Saves a JenjangPendidikan object to the API.
 * @param formData - The FormData object containing the data to be saved.
 * @returns A Promise that resolves to an object with an optional error property.
 */
export const saveJenjangPendidikan = async (
	formData: FormData,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(await cookies());
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
