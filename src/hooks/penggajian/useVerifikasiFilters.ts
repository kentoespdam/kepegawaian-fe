import { useState } from "react";
import { getYearOptions } from "@/app/(app)/penggajian/_components/periode-filter";

export function useVerifikasiFilters() {
	const now = new Date();
	const [year, setYear] = useState(String(now.getFullYear()));
	const [month, setMonth] = useState(String(now.getMonth() + 1).padStart(2, "0"));

	const periode = `${year}${month}`;
	const years = getYearOptions();

	return { year, setYear, month, setMonth, periode, years };
}
