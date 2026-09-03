"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MONTH_OPTIONS = [
	{ value: "01", label: "01 - Januari" },
	{ value: "02", label: "02 - Februari" },
	{ value: "03", label: "03 - Maret" },
	{ value: "04", label: "04 - April" },
	{ value: "05", label: "05 - Mei" },
	{ value: "06", label: "06 - Juni" },
	{ value: "07", label: "07 - Juli" },
	{ value: "08", label: "08 - Agustus" },
	{ value: "09", label: "09 - September" },
	{ value: "10", label: "10 - Oktober" },
	{ value: "11", label: "11 - November" },
	{ value: "12", label: "12 - Desember" },
];

export function getYearOptions(): string[] {
	const currentYear = new Date().getFullYear();
	const years: string[] = [];
	for (let y = currentYear + 1; y >= currentYear - 3; y--) {
		years.push(String(y));
	}
	return years;
}

interface PeriodeFilterProps {
	year: string;
	month: string;
	onYearChange: (year: string) => void;
	onMonthChange: (month: string) => void;
	searchQuery?: string;
	onSearchChange?: (q: string) => void;
	showSearch?: boolean;
}

export function PeriodeFilter({
	year,
	month,
	onYearChange,
	onMonthChange,
	searchQuery = "",
	onSearchChange,
	showSearch = true,
}: PeriodeFilterProps) {
	const years = getYearOptions();

	return (
		<div className="flex flex-wrap items-center gap-3">
			<div className="flex items-center gap-2">
				<Select value={year} onValueChange={(v) => v && onYearChange(v)}>
					<SelectTrigger className="w-32 h-10" aria-label="Pilih Tahun">
						<SelectValue placeholder="Tahun" />
					</SelectTrigger>
					<SelectContent>
						{years.map((y) => (
							<SelectItem key={y} value={y}>
								{y}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={month} onValueChange={(v) => v && onMonthChange(v)}>
					<SelectTrigger className="w-44 h-10" aria-label="Pilih Bulan">
						<SelectValue placeholder="Bulan" />
					</SelectTrigger>
					<SelectContent>
						{MONTH_OPTIONS.map((m) => (
							<SelectItem key={m.value} value={m.value}>
								{m.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{showSearch && onSearchChange && (
				<div className="relative flex-1 min-w-50 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder="Cari Nama / NIPAM…"
						className="pl-9 h-10"
					/>
				</div>
			)}
		</div>
	);
}
