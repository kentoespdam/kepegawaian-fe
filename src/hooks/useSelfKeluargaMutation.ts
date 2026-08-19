"use client";

import { keluargaMutationUrl } from "@/config/profil/keluarga.config";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Keluarga — selalu masuk approval queue (changedStatus=true). */
export function useSelfKeluargaMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: keluargaMutationUrl,
		queryKey: profilKeys.keluarga.all(),
		label: "Data Keluarga",
		nik,
	});
}
