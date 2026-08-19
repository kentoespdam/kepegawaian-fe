"use client";

import { pengalamanKerjaMutationUrl } from "@/config/profil/pengalaman-kerja.config";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Pengalaman Kerja — selalu masuk approval queue (changedStatus=true). */
export function useSelfPengalamanKerjaMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: pengalamanKerjaMutationUrl,
		queryKey: profilKeys.pengalamanKerja.all(),
		label: "Data Pengalaman Kerja",
		nik,
	});
}
