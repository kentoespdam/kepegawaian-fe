"use server";
import type { BaseDelete } from "@_types/index";
import type { KeahlianSchema } from "@_types/profil/keahlian";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveProfilKeahlian = async (formData: KeahlianSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/profil/keahlian/${formData.id}`
			: `${API_URL}/profil/keahlian`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	if (req.status !== 201) return await req.text();

	return await req.json();
};

export const deleteProfilKeahlian = async (formData: BaseDelete) => {
	const headers = setAuthorizeHeader(cookies());

	const id = Number(formData.id.split("-")[1]);
	if (id !== Number(formData.curId))
		return { success: false, error: { message: "invalid data" } };

	const url = `${API_URL}/profil/keahlian/${id}`;

	const req = await fetch(url, {
		method: "DELETE",
		headers: headers,
	});

	if (req.status !== 200) return await req.text();

	return await req.json();
};

export const acceptKeahlian = async ({
	id,
	nik,
}: { id: number; nik: string }) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/profil/keahlian/${id}/accept`;

	const req = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			biodataId: nik,
		}),
	});

	if (req.status !== 201) return await req.text();

	return await req.json();
};
