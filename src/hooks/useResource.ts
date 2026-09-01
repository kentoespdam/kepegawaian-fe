import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type createApiClient } from "@/lib/api/client";

/**
 * Generic CRUD resource hook.
 * @param apiClient — API client instance (default: master `api`). Pass `penggajianApi` for penggajian domain.
 * @param keyPrefix — prepended to query keys (default: []). Use `["penggajian"]` for penggajian domain.
 */
export function useResource<TQuery, TReq = TQuery>(
	entity: string,
	params?: Record<string, string>,
	apiClient: ReturnType<typeof createApiClient> = api,
	keyPrefix: string[] = [],
) {
	const qc = useQueryClient();
	const base = [...keyPrefix, entity];

	const list = useQuery<TQuery>({
		queryKey: [...base, params],
		queryFn: () => apiClient.list<TQuery>(entity, params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
		enabled: !!params,
	});

	const listAll = useQuery<TQuery>({
		queryKey: [...base, "list"],
		queryFn: () => apiClient.listAll<TQuery>(entity),
		staleTime: 300_000,
		gcTime: 300_000,
	});

	const create = useMutation({
		mutationFn: (data: TReq) => apiClient.create<TQuery>(entity, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: TReq }) => apiClient.update<TQuery>(entity, id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const remove = useMutation({
		mutationFn: (id: string) => apiClient.remove(entity, id),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	return { list, listAll, create, update, remove };
}
