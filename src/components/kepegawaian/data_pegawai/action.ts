"use server";
import type { PegawaiSchema } from "@_types/pegawai";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveKepegawaian = async (formData: PegawaiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.statusPegawai === "NON_PEGAWAI"
			? `${API_URL}/profil/biodata`
			: `${API_URL}/pegawai`;

	const req = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await req.json();

	return result;
};
