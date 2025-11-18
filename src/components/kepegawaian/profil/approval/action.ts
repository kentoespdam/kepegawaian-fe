"use server";
import type { ProfilUpdateSchema } from "@_types/profil/profil-update";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveApprovalProfil = async (formData: ProfilUpdateSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/profil/profil-update/${formData.id}`;

	const response = await fetch(url, {
		method: "PUT",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await response.json();
	return result;
};