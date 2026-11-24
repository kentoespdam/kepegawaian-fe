"use client";

import { useQuery } from "@tanstack/react-query";
import { type LaporanSoParams, laporanKeys } from "@/hooks/keys/laporan-keys";
import { handle } from "@/lib/api/client";
import type { SoResponse } from "@/types/laporan/kepegawaian";

export function useLaporanSo(params: LaporanSoParams = { maxLevel: 6, format: "flat" }) {
	const searchParams = new URLSearchParams();
	if (params.maxLevel !== undefined) {
		searchParams.set("maxLevel", String(params.maxLevel));
	}
	if (params.format) {
		searchParams.set("format", params.format);
	}

	return useQuery({
		queryKey: laporanKeys.so(params),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/laporan/kepegawaian/so?${searchParams.toString()}`);
			return handle<SoResponse[]>(res);
		},
		staleTime: 60_000,
		gcTime: 10 * 60_000,
	});
}
