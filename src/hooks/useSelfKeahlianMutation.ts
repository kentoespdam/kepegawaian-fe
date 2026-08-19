"use client";

import { keahlianMutationUrl } from "@/config/profil/keahlian.config";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Keahlian — selalu masuk approval queue (changedStatus=true). */
export function useSelfKeahlianMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: keahlianMutationUrl,
		queryKey: profilKeys.keahlian.all(),
		label: "Data Keahlian",
		nik,
	});
}
