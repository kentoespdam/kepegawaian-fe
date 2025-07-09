"use server";

import type {
	BatalCutiPegawaiSchema,
	CutiPegawaiSchema,
} from "@_types/cuti/cuti_pegawai";
import type { baseProps } from "@helpers/action";
import { setAuthorizeHeader } from "@helpers/index";
import { decodeId, decodeString } from "@helpers/number";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const savePengajuanCuti = async (formData: CutiPegawaiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url =
		formData.id > 0
			? `${API_URL}/cuti/pengajuan/${formData.id}`
			: `${API_URL}/cuti/pengajuan`;

	const req = await fetch(url, {
		method: formData.id ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	console.log("savePengajuanCuti", result);
	return result;
};

interface BatalPengajuanCutiProps extends baseProps {
	formData: BatalCutiPegawaiSchema;
}
export const batalPengajuanCuti = async (formData: BatalCutiPegawaiSchema) => {
	const unique = formData.unique as string;
	const uniqueId = decodeId(unique) as number;
	const decPath = "cuti/pengajuan";

	const id = Number(formData.id.split("-")[1]);
	if (id !== uniqueId)
		return {
			status: 400,
			statusText: "Bad Request",
			errors: "invalid data",
		};

	const url = `${API_URL}/${decPath}/${uniqueId}`;
	const headers = setAuthorizeHeader(cookies());
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 5000);

	const response = await fetch(url, {
		method: "DELETE",
		headers,
		signal: controller.signal,
		cache: "no-cache",
	});

	const result = await response.json();
	clearTimeout(timeoutId);

	return result;
};
