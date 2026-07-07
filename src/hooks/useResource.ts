import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

export function useResource<T>(entity: string, params?: Record<string, string>) {
  const qc = useQueryClient();
  const base = [entity];

  const list = useQuery<T>({
    queryKey: [...base, params],
    queryFn: () => api.list<T>(entity, params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    gcTime: 300_000,
    enabled: !!params,
  });

  const listAll = useQuery<T>({
    queryKey: [...base, "list"],
    queryFn: () => api.listAll<T>(entity),
    staleTime: 300_000,
    gcTime: 300_000,
  });

  const create = useMutation({
    mutationFn: (data: unknown) => api.create<T>(entity, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) => api.update<T>(entity, id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.remove(entity, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: base }),
  });

  return { list, listAll, create, update, remove };
}
