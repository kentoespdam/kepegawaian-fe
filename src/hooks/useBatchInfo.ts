"use client";

import { useQuery } from "@tanstack/react-query";
import { throwIfNotOk } from "@/lib/utils";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";
import { penggajianKeys } from "./keys/penggajian-keys";

/**
 * Fetch batch detail (status, info pemroses/verifikator/penyetuju).
 * Dipanggil sekali di layout batch, share via BatchContext.
 */
export function useBatchInfo(id: string | null) {
	return useQuery({
		queryKey: penggajianKeys.batch.detail(id ?? ""),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/${id}`);
			throwIfNotOk(res, "Gagal memuat data batch");
			const body = (await res.json()) as { data: GajiBatchRootResponse };
			return body.data;
		},
		enabled: !!id,
		staleTime: 5 * 60_000,
	});
}
