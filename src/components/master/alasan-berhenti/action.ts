"use server";

import type { AlasanBerhentiSchema } from "@_types/master/alasan_berhenti";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveAlasanBerhenti = async (formData: AlasanBerhentiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/master/alasan-berhenti/${formData.id}`
			: `${API_URL}/master/alasan-berhenti`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};

export const hapus = async (formData: FormData) => {
	const deleteRef = formData.get("deleteRef")?.toString() || "";
	if (!deleteRef.startsWith("DELETE-"))
		return { success: false, error: { message: "invalid data" } };
	const id = Number(deleteRef.slice(7) || 0);
	if (id <= 0) return { success: false, error: { message: "invalid data" } };

	try {
		const url = `${API_URL}/master/alasan-berhenti/${id}`;
		fetch(url, {
			method: "DELETE",
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
