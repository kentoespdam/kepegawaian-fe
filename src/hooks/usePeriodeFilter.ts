"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { getYearOptions, MONTH_OPTIONS } from "@/components/periode-filter";

export interface UsePeriodeFilterOptions {
	defaultYear?: string;
	defaultMonth?: string;
}

export function usePeriodeFilter(options?: UsePeriodeFilterOptions) {
	const sp = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const now = new Date();
	const defaultYear = options?.defaultYear ?? String(now.getFullYear());
	const defaultMonth = options?.defaultMonth ?? String(now.getMonth() + 1).padStart(2, "0");

	const rawYear = sp ? sp.get("year") : null;
	const rawMonth = sp ? sp.get("month") : null;

	// Validate year: must be 4 digits
	const isValidYear = rawYear && /^\d{4}$/.test(rawYear);
	const year = isValidYear ? rawYear : defaultYear;

	// Validate month: must be 01 to 12
	const isValidMonth = rawMonth && MONTH_OPTIONS.some((m) => m.value === rawMonth);
	const month = isValidMonth ? rawMonth : defaultMonth;

	const periode = `${year}${month}`;
	const years = useMemo(() => getYearOptions(), []);

	const updateUrl = useCallback(
		(updates: { year?: string; month?: string }) => {
			const p = new URLSearchParams(sp ? sp.toString() : "");
			if (updates.year) p.set("year", updates.year);
			if (updates.month) p.set("month", updates.month);
			const targetPath = pathname || "";
			router.replace(`${targetPath}?${p.toString()}`);
		},
		[router, pathname, sp],
	);

	const setYear = useCallback(
		(newYear: string) => {
			updateUrl({ year: newYear });
		},
		[updateUrl],
	);

	const setMonth = useCallback(
		(newMonth: string) => {
			updateUrl({ month: newMonth });
		},
		[updateUrl],
	);

	const setPeriode = useCallback(
		(newYear: string, newMonth: string) => {
			updateUrl({ year: newYear, month: newMonth });
		},
		[updateUrl],
	);

	return {
		year,
		month,
		periode,
		years,
		setYear,
		setMonth,
		setPeriode,
	};
}
