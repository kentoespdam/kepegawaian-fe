"use server";
import type { ConditionalSchema, RefPegawai } from "@_types/pegawai";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
import type { z } from "zod";

export const saveKepegawaian = async (
	formData: z.infer<typeof ConditionalSchema>,
) => {
	if (formData.referensi === "biodata") return await saveBiodata(formData);

	if (formData.referensi === "pegawai") {
		await saveBiodata(formData);

		return await savePegawai(formData);
	}

	return {
		success: false,
		error: { message: "Failed to save biodata / pegawai" },
	};
};

const saveBiodata = async (formData: z.infer<typeof ConditionalSchema>) => {
	const headers = setAuthorizeHeader(cookies());
	const url = formData.updateBio
		? `${API_URL}/profil/biodata/${formData.nik}`
		: `${API_URL}/profil/biodata`;
	const req = await fetch(url, {
		method: formData.updateBio ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await req.json();

	return result;
};

const savePegawai = async (formData: z.infer<typeof RefPegawai>) => {
	const headers = setAuthorizeHeader(cookies());
	const url = formData.updatePegawai
		? `${API_URL}/pegawai/${formData.id}`
		: `${API_URL}/pegawai`;

	const req = await fetch(url, {
		method: formData.updatePegawai ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});

	const result = await req.json();

	return result;
};
