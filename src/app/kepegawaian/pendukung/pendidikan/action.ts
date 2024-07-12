"use server";
import { BaseDelete } from "@_types/index";
import type { LampiranProfilSchema } from "@_types/profil/lampiran";
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

interface SaveLampiranProfilProps {
	path: string;
	formData: FormData;
}
export const saveLampiranProfil = async ({
	path,
	formData,
}: SaveLampiranProfilProps) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/${path}`;

	const req = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: headers.Authorization,
		},
		body: formData,
	});

	if (req.status !== 201) return await req.text();

	return await req.json();
};