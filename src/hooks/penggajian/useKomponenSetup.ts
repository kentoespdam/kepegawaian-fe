"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { penggajianApi } from "@/lib/api/penggajian-client";
import { toApiParams } from "@/lib/paging";
import type { GajiProfilResponse, Page } from "@/types/_shared";
import type { GajiKomponenResponse } from "@/types/penggajian/komponen";

const ENTITY = "komponen";

export function useKomponenSetup(
	selectedProfilId: number | null,
	tableFilters: Record<string, unknown>,
	page: number,
	size: number,
	sortBy?: string,
	sortDir?: string,
) {
	const qc = useQueryClient();

	const profilList = useQuery<GajiProfilResponse[]>({
		queryKey: penggajianKeys.profil.list(),
		queryFn: () => penggajianApi.listAll<GajiProfilResponse[]>("profil"),
		staleTime: 5 * 60_000,
	});

	const komponenQueryKey = [
		...penggajianKeys.all,
		`${ENTITY}/${selectedProfilId}/profil`,
		selectedProfilId
			? toApiParams({
					page,
					size,
					sortBy,
					sortDir: sortDir as "asc" | "desc" | undefined,
					filters: tableFilters as Record<string, string>,
				})
			: undefined,
	] as const;

	const komponenList = useQuery<Page<GajiKomponenResponse>>({
		queryKey: komponenQueryKey,
		queryFn: () =>
			penggajianApi.list<Page<GajiKomponenResponse>>(
				`${ENTITY}/${selectedProfilId}/profil`,
				toApiParams({
					page,
					size,
					sortBy,
					sortDir: sortDir as "asc" | "desc" | undefined,
					filters: tableFilters as Record<string, string>,
				}),
			),
		enabled: !!selectedProfilId,
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const removeKomponen = useMutation({
		mutationFn: (id: string) => penggajianApi.remove(ENTITY, id),
		onSuccess: () => qc.invalidateQueries({ queryKey: [...penggajianKeys.all, ENTITY] }),
	});

	const createKomponen = useMutation({
		mutationFn: (data: Record<string, unknown>) => penggajianApi.create<GajiKomponenResponse>(ENTITY, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [...penggajianKeys.all, ENTITY] });
			qc.invalidateQueries({ queryKey: penggajianKeys.komponen.kode(selectedProfilId) });
			toast.success("Komponen berhasil ditambah");
		},
	});

	const updateKomponen = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
			penggajianApi.update<GajiKomponenResponse>(ENTITY, id, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [...penggajianKeys.all, ENTITY] });
			qc.invalidateQueries({ queryKey: penggajianKeys.komponen.kode(selectedProfilId) });
			toast.success("Komponen berhasil diperbarui");
		},
	});

	const createProfil = useMutation({
		mutationFn: (data: { nama: string }) => penggajianApi.create<GajiProfilResponse>("profil", data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.profil.list() });
			toast.success("Profil gaji berhasil ditambah");
		},
	});

	return {
		profilList,
		komponenList,
		removeKomponen,
		createKomponen,
		updateKomponen,
		createProfil,
	};
}
