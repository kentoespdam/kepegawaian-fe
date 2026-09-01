import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { PageGajiBatchRootResponse } from "@/types/penggajian/batch";

export const batchKeys = {
	all: ["penggajian", "batch"] as const,
	list: (params: Record<string, string>) => [...batchKeys.all, "list", params] as const,
};

export function useBatchList(params?: Record<string, string>) {
	return useQuery<PageGajiBatchRootResponse>({
		queryKey: batchKeys.list(params ?? {}),
		queryFn: () => penggajianApi.list<PageGajiBatchRootResponse>("batch", params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
		enabled: !!params,
	});
}
