"use client";

import { pelatihanMutationUrl } from "@/config/profil/pelatihan.config";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Pelatihan — selalu masuk approval queue (changedStatus=true). */
export function useSelfPelatihanMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: pelatihanMutationUrl,
		queryKey: profilKeys.pelatihan.all(),
		label: "Data Pelatihan",
		nik,
	});
}
