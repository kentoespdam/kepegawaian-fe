"use server";
import { BaseDelete } from "@_types/index";
import type { PendidikanSchema } from "@_types/profil/pendidikan";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveProfilPendidikan = async (formData: PendidikanSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/profil/pendidikan/${formData.id}`
			: `${API_URL}/profil/pendidikan`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	return req.json();
};

export const deleteProfilPendidikan = async (formData: BaseDelete) => {
	const headers = setAuthorizeHeader(cookies());
	const validate = BaseDelete.safeParse(formData);
	const id = Number(formData.id.split("-")[1]);
	if (!validate.success || Number(formData.curId) !== id)
		return { success: false, error: { message: "invalid data" } };

	const url = `${API_URL}/profil/pendidikan/${id}`;

	const req = await fetch(url, {
		method: "DELETE",
		headers: headers,
	});

	const response = await req.json();
	return {
		success: true,
		message: response.message,
	};
};
