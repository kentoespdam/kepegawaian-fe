import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api/client";

/**
 * Fetch FK options for a master entity via `api.listAll`.
 *
 * @param entity — Master entity slug (e.g. "organisasi", "jabatan", "golongan").
 * @param labelFn — Optional label formatter; defaults to `i.nama`.
 */
export function useFkOptions(entity: string, labelFn?: (i: Record<string, unknown>) => string) {
	const query = useQuery({
		queryKey: [entity, "list"],
		queryFn: () => api.listAll<Record<string, unknown>>(entity),
		staleTime: 300_000,
	});
	return ((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
		value: String(i.id),
		label: labelFn?.(i) ?? String(i.nama ?? ""),
	}));
}
