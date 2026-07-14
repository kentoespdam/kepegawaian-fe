import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export function useResource<TQuery, TReq = TQuery>(
  entity: string,
  params?: Record<string, string>,
) {
  const qc = useQueryClient();
  const base = [entity];

  const list = useQuery<TQuery>({
    queryKey: [...base, params],
    queryFn: () => api.list<TQuery>(entity, params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 300_000,
    enabled: !!params,
  });

  const listAll = useQuery<TQuery>({
    queryKey: [...base, "list"],
    queryFn: () => api.listAll<TQuery>(entity),
    staleTime: 300_000,
    gcTime: 300_000,
  });

  const create = useMutation({
    mutationFn: (data: TReq) => api.create<TQuery>(entity, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TReq }) => api.update<TQuery>(entity, id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.remove(entity, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  return { list, listAll, create, update, remove };
}
