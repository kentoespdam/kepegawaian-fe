"use server";

import type { ParameterSettingSchema } from "@_types/penggajian/parameter_setting";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

export const saveParameterSetting = async (
	formData: ParameterSettingSchema,
) => {
	const headers = setAuthorizeHeader(await cookies());
	const url =
		formData.id > 0
			? `${API_URL}/penggajian/parameter-setting/${formData.id}`
			: `${API_URL}/penggajian/parameter-setting`;

	const req = await fetch(url, {
		method: formData.id > 0 ? "PUT" : "POST",
		headers: headers,
		body: JSON.stringify(formData),
	});
	const result = await req.json();
	return result;
};
