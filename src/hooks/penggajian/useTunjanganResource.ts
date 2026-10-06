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
	const safeJenis = jenis ?? "";
	const safeEntity = entity ?? "";

	const list = useQuery<PageGajiTunjanganResponse>({
		queryKey: penggajianKeys.tunjangan.list(safeJenis, params),
		queryFn: () => penggajianApi.list<PageGajiTunjanganResponse>(safeEntity, params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
		enabled: !!entity,
	});

	const listAll = useQuery({
		queryKey: penggajianKeys.tunjangan.listAll(safeJenis),
		queryFn: () => penggajianApi.listAll<Record<string, unknown>[]>(safeEntity),
		staleTime: 300_000,
		gcTime: 300_000,
		enabled: !!entity,
	});

	const create = useMutation({
		mutationFn: (data: GajiTunjanganResponse) => penggajianApi.create<PageGajiTunjanganResponse>(safeEntity, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const update = useMutation({
		mutationFn: ({ id, data }: { id: string; data: GajiTunjanganResponse }) =>
			penggajianApi.update<PageGajiTunjanganResponse>(safeEntity, id, data),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	const remove = useMutation({
		mutationFn: (id: string) => penggajianApi.remove(safeEntity, id),
		onSuccess: () => qc.invalidateQueries({ queryKey: base }),
	});

	return { list, listAll, create, update, remove };
}
