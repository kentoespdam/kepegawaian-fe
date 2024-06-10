"use server"

import { StatusPegawaiSchema } from "@_types/master/status_pegawai"
import { setAuthorizeHeader } from "@helpers/index"
import { API_URL } from "@lib/utils"
import axios from "axios"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Saves a StatusPegawai object to the API.
 * @param _prevState - The previous state of the application.
 * @param formData - The FormData object containing the data to be saved.
 * @returns An object with an optional error property if the API request fails.
 * @throws An error if the API request is unsuccessful.
 */
export const saveStatusPegawai = async (
	_prevState: unknown,
	formData: FormData,
): Promise<{ error?: Record<string, string[]> }> => {
	const cookieList = cookies()
	const headers = setAuthorizeHeader(cookieList)
	try {
		const validate = StatusPegawaiSchema.safeParse({
			id: Number(formData.get("id")),
			nama: formData.get("nama"),
		})

		if (!validate.success) {
			return { error: validate.error.flatten().fieldErrors }
		}

		const apiUrl =
			validate.data.id > 0
				? `${API_URL}/master/status-pegawai/${validate.data.id}`
				: `${API_URL}/master/status-pegawai`

		await axios.request({
			method: validate.data.id > 0 ? "PUT" : "POST",
			url: apiUrl,
			data: formData,
			headers: headers,
		})
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		return { error: err.response.data }
	}

	revalidateTag("status_pegawai")
	redirect("/master/status_pegawai")
}

/**
 * Deletes a StatusPegawai object by its ID.
 *
 * @param _prevState - The previous state of the application.
 * @param formData - The FormData object containing the data to be deleted.
 * @returns A Promise that resolves to an object with a success property and an optional error property.
 */
export const hapus = async (_prevState: unknown, formData: FormData) => {
	const id = Number(formData.get("deleteRef")?.slice(7) || 0)
	if (id <= 0) return { success: false, error: { message: "invalid data" } }

	try {
		await axios.delete(`${API_URL}/master/status-pegawai/${id}`, {
			headers: setAuthorizeHeader(cookies()),
		})
	} catch (err: any) {
		return {
			success: false,
			error: {
				message: String(err.response?.data?.message),
			},
		}
	}

	revalidateTag("status_pegawai")
	redirect("/master/status_pegawai")
}
