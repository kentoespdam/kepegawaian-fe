import { useQuery } from "@tanstack/react-query";
import { systemKeys } from "@/hooks/keys/system-keys";
import type { ListResultPrefRole } from "@/types/system/roles";

/** Fetch all roles + permissions (list endpoint, no paging). */
export function useAllRoles() {
	return useQuery({
		queryKey: systemKeys.roles.all(),
		queryFn: async () => {
			const res = await fetch("/api/proxy/system/roles/list");
			if (!res.ok) throw new Error("Gagal memuat daftar role");
			const body = (await res.json()) as ListResultPrefRole;
			return body.data ?? [];
		},
		staleTime: 30_000,
	});
}
