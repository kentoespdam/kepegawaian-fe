import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function usePajakOptions() {
	const query = useQuery({
		queryKey: ["gaji-pendapatan-non-pajak", "list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/penggajian/pendapatan-non-pajak/list");
			if (!res.ok) throw new Error("Gagal memuat data pajak");
			const body = await res.json();
			return body.data as Record<string, unknown>[];
		},
		staleTime: 300_000,
	});
	return useMemo(
		() =>
			((query.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: `${String(i.kode ?? "")} - ${String(i.nama ?? "")}`,
			})),
		[query.data],
	);
}
