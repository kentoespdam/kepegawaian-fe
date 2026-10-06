"use client";

import { useQuery } from "@tanstack/react-query";
import { masterKeys } from "@/hooks/keys/master-keys";
import { api } from "@/lib/api/client";

export function useProfesiForm(orgId: string | number | undefined | null) {
	const jabQuery = useQuery({
		queryKey: masterKeys.list("jabatan", { organisasiId: orgId }),
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(orgId)),
		enabled: !!orgId,
		staleTime: 300_000,
	});

	const gradeQuery = useQuery({
		queryKey: masterKeys.list("grade"),
		queryFn: () => api.listAll<Record<string, unknown>>("grade"),
		staleTime: 300_000,
	});

	return {
		jabQuery,
		gradeQuery,
	};
}
