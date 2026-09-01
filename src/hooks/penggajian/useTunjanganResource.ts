import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { GajiTunjanganResponse, PageGajiTunjanganResponse } from "@/types/penggajian/tunjangan";

/**
 * Custom hook for tunjangan entity.
 *
 * Tunjangan uses a non-standard endpoint pattern:
 * - List (paginated): `GET /penggajian/tunjangan/{jenis}?page=0&size=10&...`
 * - Create: `POST /penggajian/tunjangan/{jenis}`
 * - Update: `PUT /penggajian/tunjangan/{jenis}/{id}`
 * - Delete: `DELETE /penggajian/tunjangan/{jenis}/{id}`
 *
 * The `jenis` is a required path parameter.
 */
export function useTunjanganResource(jenis?: string, params?: Record<string, string>) {
	const qc = useQueryClient();
	const base = penggajianKeys.tunjangan.all();
	const entity = jenis ? `tunjangan/${jenis}` : undefined;

	const list = useQuery<PageGajiTunjanganResponse>({
		queryKey: penggajianKeys.tunjangan.list(jenis!, params),
		queryFn: () => penggajianApi.list<PageGajiTunjanganResponse>(entity!, params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
		enabled: !!entity,
	});

	const listAll = useQuery({
		queryKey: penggajianKeys.tunjangan.listAll(jenis!),
		queryFn: () => penggajianApi.listAll<Record<string, unknown>[]>(entity!),
		staleTime: 300_000,
		gcTime: 300_000,
		enabled: !!entity,
	});

	const create = useMutation({
		mutationFn: (data: GajiTunjanganResponse) => penggajianApi.create<PageGajiTunjanganResponse>(entity!, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: GajiTunjanganResponse }) =>
			penggajianApi.update<PageGajiTunjanganResponse>(entity!, id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const remove = useMutation({
		mutationFn: (id: string) => penggajianApi.remove(entity!, id),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	return { list, listAll, create, update, remove };
}
