"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { EnumOption } from "@/types/_shared";
import type { StatusPegawaiResponse } from "@/types/master/status-pegawai";

/** Enum entities whose GET /list endpoint returns normalized EnumOption[]. */
export type EnumEntity = "status-pegawai" | "status-kerja" | "jenis-mutasi" | "jenis-sk" | "jenis-kontrak";

/**
 * Typed hook for fetching master-reference enum entities.
 *
 * - `status-pegawai` → `StatusPegawaiResponse[]` → maps to `EnumOption[]`
 * - 4 others return `EnumOption[]` directly.
 *
 * NOTE: `api.listAll` already unwraps the envelope via `handle<T>` (returns `body.data`),
 * so the raw data is an array, NOT an Envelope object with a `.data` property.
 */
export function useEnum(entity: EnumEntity) {
	const query = useQuery<unknown>({
		queryKey: [entity, "list"],
		queryFn: () => api.listAll<unknown>(entity),
		staleTime: 300_000,
	});

	const options: EnumOption[] = (() => {
		const raw = query.data;
		if (!raw) return [];
		if (entity === "status-pegawai") {
			return (raw as StatusPegawaiResponse[]).map(
				(item: StatusPegawaiResponse): EnumOption => ({ id: item.id, nama: item.nama }),
			);
		}
		return raw as EnumOption[];
	})();

	return { options, isLoading: query.isLoading };
}
