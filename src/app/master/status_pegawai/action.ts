"use server"

import { BaseResult, DeleteSchema, Pageable } from "@_types/index"
import {
	StatusPegawai,
	StatusPegawaiSchema,
} from "@_types/master/status_pegawai"
import { setAuthorizeHeader } from "@helpers/index"
import { API_URL } from "@lib/utils"
import axios from "axios"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

/**
 * Retrieves data for a pageable list of StatusPegawai.
 * @param searchParams - The URL search parameters for filtering the data.
 * @returns A Promise that resolves to a Pageable<StatusPegawai> object containing the data.
 * @throws An error if the API request is unsuccessful.
 */
export const getDataStatusPegawai = async (
	searchParams: string,
): Promise<Pageable<StatusPegawai>> => {
	revalidatePath("/master/status_pegawai")
	revalidateTag("status_pegawai")
	const url = `${API_URL}/master/status-pegawai?${searchParams}`
	const headers = setAuthorizeHeader(cookies())

	try {
		const response = await fetch(url, { headers })
		if (!response.ok) {
			throw new Error(await response.text())
		}

		const result: BaseResult<Pageable<StatusPegawai>> =
			await response.json()

		return result.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

/**
 * Retrieves a StatusPegawai object by its ID.
 * @param id - The ID of the StatusPegawai object to retrieve.
 * @returns A Promise that resolves to the StatusPegawai object with the specified ID.
 * @throws An error if the API request is unsuccessful.
 */
export const getStatusPegawaiById = async (
	id: number,
): Promise<StatusPegawai> => {
	try {
		const headers = setAuthorizeHeader(cookies())
		const { data } = await axios.get<BaseResult<StatusPegawai>>(
			`${API_URL}/master/status-pegawai/${id}`,
			{ headers },
		)
		return data.data
	} catch (err) {
		console.error(err)
		throw err
	}
}

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
	const cookieList = cookies()
	const headers = setAuthorizeHeader(cookieList)

	try {
		const validate = DeleteSchema.safeParse({
			deleteRef: formData.get("deleteRef"),
		})

		if (!validate.success)
			return {
				success: validate.success,
				error: {
					message: validate.error.message,
				},
			}

		const id = Number(validate.data.deleteRef.substr("DELETE-".length))
		if (id <= 0)
			return {
				success: false,
				error: { message: "invalid data" },
			}

		await axios.delete(`${API_URL}/master/status-pegawai/${id}`, {
			headers: headers,
		})
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err.response?.data)
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
