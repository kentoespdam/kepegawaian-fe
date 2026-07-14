"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import type { EnumOption, ListResultEnumOption } from "@/types/master/_shared";
import type { ListResultStatusPegawaiResponse, StatusPegawaiResponse } from "@/types/master/status-pegawai";

/** 5 enum entities whose GET /list endpoint returns EnumOption[]. */
export type EnumEntity =
  | "status-pegawai"
  | "status-kerja"
  | "jenis-mutasi"
  | "jenis-sk"
  | "jenis-kontrak";

/**
 * Typed hook for fetching master-reference enum entities.
 *
 * - `status-pegawai` uses `StatusPegawaiResponse` shape (id, nama, urut)
 *   → maps to normalized `EnumOption[]`.
 * - 4 others (`status-kerja`, `jenis-mutasi`, `jenis-sk`, `jenis-kontrak`)
 *   return `EnumOption[]` directly.
 */
export function useEnum(entity: EnumEntity) {
  const isStatusPegawai = entity === "status-pegawai";

  const query = useQuery<ListResultEnumOption | ListResultStatusPegawaiResponse>({
    queryKey: [entity, "list"],
    queryFn: () => api.listAll<ListResultEnumOption | ListResultStatusPegawaiResponse>(entity),
    staleTime: 300_000,
  });

  // Normalise both shapes to EnumOption[]
  const options: EnumOption[] = isStatusPegawai
    ? ((query.data as ListResultStatusPegawaiResponse | undefined)?.data ?? []).map(
        (item: StatusPegawaiResponse): EnumOption => ({
          id: item.id,
          nama: item.nama,
        }),
      )
    : ((query.data as ListResultEnumOption | undefined)?.data ?? []);

  return { options, isLoading: query.isLoading };
}
