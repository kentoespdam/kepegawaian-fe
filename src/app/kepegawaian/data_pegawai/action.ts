"use server";
import type { SaveErrorStatus } from "@_types/index";
import type {
	ConditionalSchema,
	RefNonPegawai,
	RefPegawai,
} from "@_types/pegawai";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";
import type { z } from "zod";

export const saveKepegawaian = async (
	formData: z.infer<typeof ConditionalSchema>,
): Promise<SaveErrorStatus> => {
	try {
		if (formData.referensi === "biodata") return await saveBiodata(formData);

		if (formData.referensi === "pegawai") {
			if (!formData.updateBio) await saveBiodata(formData);

			return await savePegawai(formData);
		}

		return {
			success: false,
			error: { message: "Failed to save biodata / pegawai" },
		};

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		return { success: false, error: { message: err.response.data.message } };
	}
};

const saveBiodata = async (
	formData: z.infer<typeof ConditionalSchema>,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(cookies());
	try {
		const url = formData.updateBio
			? `${API_URL}/profil/biodata/${formData.nik}`
			: `${API_URL}/profil/biodata`;
		const req = await fetch(url, {
			method: formData.updateBio ? "PUT" : "POST",
			headers: headers,
			body: JSON.stringify(formData),
		});

		if (!req.ok) {
			return { success: false, error: { message: "Failed to save biodata" } };
		}

		const result = await req.json();

		return { success: true, data: result };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		return { success: false, error: { message: err.response.data.message } };
	}
};

const savePegawai = async (
	formData: z.infer<typeof RefPegawai>,
): Promise<SaveErrorStatus> => {
	const headers = setAuthorizeHeader(cookies());
	try {
		const url = formData.updatePegawai
			? `${API_URL}/pegawai/${formData.nipam}`
			: `${API_URL}/pegawai`;

		const req = await fetch(url, {
			method: formData.updatePegawai ? "PUT" : "POST",
			headers: headers,
			body: JSON.stringify(formData),
		});

		if (!req.ok) {
			return { success: false, error: { message: "Failed to save biodata" } };
		}

		return { success: true };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (err: any) {
		console.log(err);
		return { success: false, error: { message: err.response.data.message } };
	}
};
