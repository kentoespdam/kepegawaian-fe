"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { EnumOption, ListResultEnumOption } from "@/types/master/_shared";
import type { JenisSpListResponse, ListResultJenisSpListResponse } from "@/types/master/jenis-sp";
import type { ListResultStatusPegawaiResponse, StatusPegawaiResponse } from "@/types/master/status-pegawai";

/** Enum entities whose GET /list endpoint returns normalized EnumOption[]. */
export type EnumEntity = "status-pegawai" | "status-kerja" | "jenis-mutasi" | "jenis-sk" | "jenis-kontrak" | "jenis-sp";

type EnumResponse = ListResultEnumOption | ListResultStatusPegawaiResponse | ListResultJenisSpListResponse;

/**
 * Typed hook for fetching master-reference enum entities.
 *
 * - `status-pegawai` → `StatusPegawaiResponse[]` → maps to `EnumOption[]`
 * - `jenis-sp` → `JenisSpListResponse[]` → maps to `EnumOption[]`
 * - 4 others return `EnumOption[]` directly.
 */
export function useEnum(entity: EnumEntity) {
	const query = useQuery<EnumResponse>({
		queryKey: [entity, "list"],
		queryFn: () => api.listAll<EnumResponse>(entity),
		staleTime: 300_000,
	});

	const options: EnumOption[] = (() => {
		const raw = query.data;
		if (!raw) return [];
		if (entity === "status-pegawai") {
			return ((raw as ListResultStatusPegawaiResponse).data ?? []).map(
				(item: StatusPegawaiResponse): EnumOption => ({ id: item.id, nama: item.nama }),
			);
		}
		if (entity === "jenis-sp") {
			return ((raw as ListResultJenisSpListResponse).data ?? []).map(
				(item: JenisSpListResponse): EnumOption => ({ id: String(item.id ?? ""), nama: item.nama }),
			);
		}
		return (raw as ListResultEnumOption).data ?? [];
	})();

	return { options, isLoading: query.isLoading };
}
