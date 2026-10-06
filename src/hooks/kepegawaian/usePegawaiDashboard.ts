"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "@/hooks/keys/dashboard-keys";
import type { BiodataDashboardResponse } from "@/types/profil/biodata";

export function usePegawaiDashboard(nik: string | undefined | null) {
	return useQuery({
		queryKey: dashboardKeys.biodata(nik ?? null),
		queryFn: async () => {
			if (!nik) return null;
			const res = await fetch(`/api/proxy/profil/biodata/${nik}/dashboard`);
			if (!res.ok) return null;
			const body = await res.json();
			return (body.data as BiodataDashboardResponse) ?? null;
		},
		enabled: !!nik,
		staleTime: 60_000,
	});
}
