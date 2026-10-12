"use client";

import { useQuery } from "@tanstack/react-query";
import { laporanKeys } from "@/hooks/keys/laporan-keys";
import { handle } from "@/lib/api/client";
import type { DukResponse } from "@/types/laporan/kepegawaian";

export function useLaporanDuk() {
	return useQuery({
		queryKey: laporanKeys.duk(),
		queryFn: async () => {
			const res = await fetch("/api/proxy/laporan/kepegawaian/duk");
			return handle<DukResponse[]>(res);
		},
		staleTime: 30_000,
	});
}
