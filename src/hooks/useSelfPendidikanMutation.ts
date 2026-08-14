"use client";

import { pendidikanMutationUrl } from "@/config/profil/pendidikan.config";
import { type SelfProfilCrud, useSelfProfilMutation } from "./useSelfProfilMutation";

/** CRUD self-service Data Pendidikan — selalu masuk approval queue (changedStatus=true). */
export function useSelfPendidikanMutation(nik: string | null): SelfProfilCrud {
	return useSelfProfilMutation({
		url: pendidikanMutationUrl,
		queryKey: ["pendidikan"],
		label: "Data Pendidikan",
		nik,
	});
}
