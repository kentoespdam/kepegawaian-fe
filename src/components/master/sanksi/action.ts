"use server";

import type { BaseDelete } from "@_types/index";
import type {
	PatchSanksiJenisSpSchema,
	SanksiSchema,
} from "@_types/master/sanksi";
import { setAuthorizeHeader } from "@helpers/index";
import { decodeId } from "@helpers/number";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveSanksi = async (data: SanksiSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const baseUrl = `${API_URL}/master/sanksi`;
	const url = data.id > 0 ? `${baseUrl}/${data.id}` : baseUrl;
	const res = await fetch(url, {
		method: data.id > 0 ? "PUT" : "POST",
		headers,
		body: JSON.stringify(data),
	});
	const result = await res.json();
	console.log(result);
	return result;
};

export const patchDeleteSanksiJenisSp = async (data: BaseDelete) => {
	const unique = data.unique as string;
	const uniqueId = decodeId(unique) as number;

	const id = Number(data.id.split("-")[1]);
	if (id !== uniqueId)
		return {
			status: 400,
			statusText: "Bad Request",
			errors: "invalid data",
		};

	return await patchSanksiJenisSp({
		id: uniqueId,
		jenisSpId: 0,
	} as PatchSanksiJenisSpSchema);
};

export const patchSanksiJenisSp = async (data: PatchSanksiJenisSpSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const res = await fetch(`${API_URL}/master/sanksi/${data.id}/jenis-sp`, {
		method: "PATCH",
		headers,
		body: JSON.stringify(data),
	});
	const result = await res.json();
	return result;
};
