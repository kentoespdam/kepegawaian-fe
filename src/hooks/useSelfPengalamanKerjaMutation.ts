"use client";

import { pengalamanKerjaMutationUrl } from "@/config/profil/pengalaman-kerja.config";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Pengalaman Kerja — selalu masuk approval queue (changedStatus=true). */
export function useSelfPengalamanKerjaMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: pengalamanKerjaMutationUrl,
		queryKey: ["pengalaman-kerja"],
		label: "Data Pengalaman Kerja",
		nik,
	});
}
