"use server";

import type { BaseDelete, BaseResult } from "@_types/index";
import type { LampiranProfil } from "@_types/profil/lampiran";
import { setAuthorizeHeader } from "@helpers/index";
import { API_URL } from "@lib/utils";
import { cookies } from "next/headers";

interface saveLampiranProfilProps {
	path: string;
	formData: FormData;
}
export const saveLampiranProfil = async ({
	path,
	formData,
}: saveLampiranProfilProps) => {
	const headers = setAuthorizeHeader(cookies());
	const url = `${API_URL}/${path}`;

	const req = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: headers.Authorization,
		},
		body: formData,
	});

	if (req.status !== 201) return await req.text();

	return await req.json();
};

interface deleteLampiranProfilProps extends BaseDelete {
	retry?: number;
}

export const deleteLampiranProfil = async (
	props: deleteLampiranProfilProps,
) => {
	const id =
		Number(props.id.split("-")[1]) === Number(props.curId)
			? Number(props.id.split("-")[1])
			: 0;
	const url = `${API_URL}/profil/lampiran/delete/${id}`;
	const headers = setAuthorizeHeader(cookies());

	const response = await fetch(url, {
		method: "DELETE",
		headers,
		cache: "no-cache",
	});

	if (!response.ok) return await response.text();
	return await response.json();
};
