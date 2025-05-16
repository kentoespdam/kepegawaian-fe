"use server";
import type { BaseDelete } from "@_types/index";
import type { KartuIdentitasSchema } from "@_types/profil/kartu_identitas";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveProfilKartuIdentitas = async (
	formData: KartuIdentitasSchema,
) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/profil/kartu-identitas/${formData.id}`
			: `${API_URL}/profil/kartu-identitas`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	return await req.json();
};

export const deleteProfilKartuIdentitas = async (formData: BaseDelete) => {
	const headers = setAuthorizeHeader(await cookies());

	const id = Number(formData.id.split("-")[1]);
	if (id !== Number(formData.curId))
		return { success: false, error: { message: "invalid data" } };

	const url = `${API_URL}/profil/kartu-identitas/${id}`;
	const req = await fetch(url, {
		method: "DELETE",
		headers: headers,
	});

	return await req.json();
};

export const acceptKartuIdentitas = async ({
	id,
	nik,
}: { id: number; nik: string }) => {
	const headers = setAuthorizeHeader(await cookies());
	const url = `${API_URL}/profil/kartu-identitas/${id}/accept`;

	const req = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			biodataId: nik,
		}),
	});

	return await req.json();
};
