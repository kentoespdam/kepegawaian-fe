"use server";
import { BaseDelete } from "@_types/index";
import type { PengalamanKerjaSchema } from "@_types/profil/pengalaman_kerja";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const savePengalamanKerja = async (formData: PengalamanKerjaSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/profil/pengalaman/${formData.id}`
			: `${API_URL}/profil/pengalaman`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	return req.json();
};

export const deletePengalamanKerja = async (formData: BaseDelete) => {
	const headers = setAuthorizeHeader(cookies());
	const validate = BaseDelete.safeParse(formData);
	const id = Number(formData.id.split("-")[1]);
	if (!validate.success || Number(formData.curId) !== id)
		return { success: false, error: { message: "invalid data" } };
	const url = `${API_URL}/profil/pengalaman/${id}`;

	const req = await fetch(url, {
		method: "DELETE",
		headers: headers,
	});

	if (req.status !== 200) return await req.text();

	return await req.json();
};

export const acceptPengalamanKerja = async ({
	id,
	nik,
}: { id: number; nik: string }) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/profil/pengalaman/${id}/accept`;
	const req = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			biodataId: nik,
		}),
	});

	if (req.status !== 201) return await req.text();

	return req.json();
};
