"use server";

import type { GajiBatchMasterProsesSchema } from "@_types/penggajian/gaji_batch_master_proses";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveGajiBatchMasterProses = async (
	data: GajiBatchMasterProsesSchema,
) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/penggajian/batch/master/proses`;

	const req = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(data),
	});
	
	return await req.json();
};
