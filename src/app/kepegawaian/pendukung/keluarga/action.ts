"use server";
import type { BaseDelete, BaseResult } from "@_types/index";
import type { KeluargaSchema } from "@_types/profil/keluarga";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveProfilKeluarga = async (formData: KeluargaSchema) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/profil/keluarga/${formData.id}`
			: `${API_URL}/profil/keluarga`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	return await req.json();
};

export const deleteProfilKeluarga = async (
	formData: BaseDelete,
): Promise<BaseResult<unknown>> => {
	const headers = setAuthorizeHeader(await cookies());

	const id = Number(formData.id.split("-")[1]);
	if (id !== Number(formData.curId))
		return {
			status: 500,
			statusText: "Bad Request",
			message: "",
			data: null,
			timestamp: new Date().toISOString(),
			errors: "invalid data",
		};

	const url = `${API_URL}/profil/keluarga/${id}`;

	const req = await fetch(url, {
		method: "DELETE",
		headers: headers,
	});

	return await req.json();
};

export const acceptKeluarga = async ({
	id,
	nik,
}: { id: number; nik: string }) => {
	const headers = setAuthorizeHeader(await cookies());
	const url = `${API_URL}/profil/keluarga/${id}/accept`;

	const req = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify({
			biodataId: nik,
		}),
	});

	return await req.json();
};
