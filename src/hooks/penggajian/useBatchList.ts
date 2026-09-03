import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { Page } from "@/lib/api/types";
import type { GajiBatchRootResponse } from "@/types/penggajian/batch";

/** @deprecated Use penggajianKeys.batch.list() instead. */
export const batchKeys = {
	all: penggajianKeys.batch.all(),
	list: (params: Record<string, string>) => penggajianKeys.batch.list(params),
};

export function useBatchList(params?: Record<string, string>) {
	return useQuery<Page<GajiBatchRootResponse>>({
		queryKey: penggajianKeys.batch.list(params ?? {}),
		queryFn: () => penggajianApi.list<Page<GajiBatchRootResponse>>("batch", params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
		enabled: !!params,
	});
}
