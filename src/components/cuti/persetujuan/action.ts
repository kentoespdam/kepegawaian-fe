"use server";

import type { CutiApprovalSchema } from "@_types/cuti/cuti.approval";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveApproval = async (formData: CutiApprovalSchema) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/cuti/approval`;

	const req = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
