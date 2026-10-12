"use client";

import { useQuery } from "@tanstack/react-query";
import { laporanKeys } from "@/hooks/keys/laporan-keys";
import { handle } from "@/lib/api/client";
import type { DnpResponse } from "@/types/laporan/kepegawaian";

export function useLaporanDnp() {
	return useQuery({
		queryKey: laporanKeys.dnp(),
		queryFn: async () => {
			const res = await fetch("/api/proxy/laporan/kepegawaian/dnp");
			return handle<DnpResponse[]>(res);
		},
		staleTime: 30_000,
	});
}
