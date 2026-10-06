"use client";

import { useQuery } from "@tanstack/react-query";
import { masterKeys } from "@/hooks/keys/master-keys";
import { api } from "@/lib/api/client";

export function useJabatanByOrganisasi(organisasiId: string | undefined) {
	return useQuery({
		queryKey: masterKeys.list("jabatan", { organisasiId }),
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
}
