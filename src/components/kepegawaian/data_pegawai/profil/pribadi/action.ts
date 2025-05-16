"use server"
import type { ProfilPribadiSchema } from "@_types/pegawai";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const patchProfilPribadi=async(formData: ProfilPribadiSchema) => {
    const headers = setAuthorizeHeader(await cookies());
	const url = `${API_URL}/pegawai/${formData.id}/profil`;

	const req = await fetch(url, {
		method: "PATCH",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
}