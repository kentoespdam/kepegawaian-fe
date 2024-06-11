"use server";

import { StatusPegawaiSchema } from "@_types/master/status_pegawai";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL, delay } from "@lib/utils";
import axios from "axios";
import { cookies } from "next/headers";

export const saveStatusPegawai = async (formData: FormData) => {
	const cookieList = cookies();
	const headers = setAuthorizeHeader(cookieList);
	try {
		await delay(1000);
		const validate = StatusPegawaiSchema.safeParse({
			id: Number(formData.get("id")),
			nama: formData.get("nama"),
		});
		if (!validate.success) {
			return {
				success: false,
				error: validate.error.flatten().fieldErrors,
			};
		}

		const apiUrl =
			validate.data.id > 0
				? `${API_URL}/master/status-pegawai/${validate.data.id}`
				: `${API_URL}/master/status-pegawai`;
		const response = await axios.request({
			method: validate.data.id > 0 ? "PUT" : "POST",
			url: apiUrl,
			data: formData,
			headers: headers,
		});
		return {
			success: true,
			data: response.data,
		};
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		return {
			success: false,
			error: { message: err.response?.data.message },
		};
	}
};

export const hapus = async (formData: FormData) => {
	const deleteRef = formData.get("deleteRef")?.toString() || "";
	if (!deleteRef.startsWith("DELETE-"))
		return { success: false, error: { message: "invalid data" } };
	const id = Number(deleteRef.slice(7) || 0);
	if (id <= 0) return { success: false, error: { message: "invalid data" } };

	try {
		await axios.delete(`${API_URL}/master/status-pegawai/${id}`, {
			headers: setAuthorizeHeader(cookies()),
		});
		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		return {
			success: false,
			error: {
				message: String(err.response?.data?.message),
			},
		};
	}
};
