"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Manages pagination + sort + filter state via URL search params for master entity pages.
 * URL = source of truth (bukan state komponen).
 *
 * `filters` = semua key URL kecuali page/size/sortBy/sortDirection —
 * langsung dari URL, belum divalidasi terhadap {Entity}SearchParams.
 */
export function useMasterSearchParams(entity: string) {
	const sp = useSearchParams();
	const router = useRouter();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;

	// Semua key non-pagination = filter values (sudah string dari URL)
	const paginationKeys = new Set(["page", "size", "sortBy", "sortDirection"]);
	const filters: Record<string, string> = {};
	for (const [k, v] of sp.entries()) {
		if (!paginationKeys.has(k) && v) {
			filters[k] = v;
		}
	}

	const setP = (k: string, v: string | undefined) => {
		const p = new URLSearchParams(sp.toString());
		if (v) p.set(k, v);
		else p.delete(k);
		router.replace(`/master/${entity}?${p.toString()}`);
	};

	return { page, size, sortBy, sortDir, filters, setP };
}
