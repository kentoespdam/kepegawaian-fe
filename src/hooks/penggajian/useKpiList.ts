"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { usePeriodeFilter } from "@/hooks/usePeriodeFilter";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { Page } from "@/lib/api/types";
import { fromPage, toApiParams } from "@/lib/paging";
import type { GajiKpiResponse } from "@/types/penggajian/kpi";

export function useKpiList() {
	const sp = useSearchParams();
	const router = useRouter();

	const { year, month, periode, years, setYear, setMonth, setPeriode } = usePeriodeFilter();

	const page = Number(sp.get("page") ?? "1");
	const size = Number(sp.get("size") ?? "10");
	const nipam = sp.get("nipam") ?? "";
	const sortBy = sp.get("sortBy") ?? undefined;
	const sortDirection = (sp.get("sortDirection") as "asc" | "desc") ?? undefined;

	const nav = (updates: Record<string, string | undefined>) => {
		const p = new URLSearchParams(sp ? sp.toString() : "");
		for (const [k, v] of Object.entries(updates)) {
			if (v) p.set(k, v);
			else p.delete(k);
		}
		router.replace(`?${p.toString()}`);
	};

	const params: Record<string, string> = {
		...toApiParams({ page, size, sortBy, sortDir: sortDirection }),
		periode,
		...(nipam ? { nipam } : {}),
	};

	const query = useQuery({
		queryKey: penggajianKeys.kpi.list(params),
		queryFn: () => penggajianApi.list<Page<GajiKpiResponse>>("kpi", params),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		gcTime: 300_000,
	});

	const pageView = fromPage(query.data);

	return {
		year,
		month,
		periode,
		years,
		setYear,
		setMonth,
		setPeriode,
		page,
		size,
		nipam,
		sortBy,
		sortDirection,
		nav,
		query,
		pageView,
	};
}
