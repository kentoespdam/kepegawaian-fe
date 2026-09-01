import { useQuery } from "@tanstack/react-query";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { ListResultPrefPermission } from "@/types/system/permissions";

/** Fetch all available permissions (read-only catalog). */
export function useAllPermissions() {
	return useQuery({
		queryKey: systemKeys.permissions(),
		queryFn: async () => {
			const res = await fetch("/api/proxy/system/permissions");
			if (!res.ok) throw new Error("Gagal memuat katalog permission");
			const body = (await res.json()) as ListResultPrefPermission;
			return body.data ?? [];
		},
		staleTime: 5 * 60_000,
	});
}
