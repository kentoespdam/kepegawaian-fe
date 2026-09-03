"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const MONTH_OPTIONS = [
	{ value: "01", label: "Januari" },
	{ value: "02", label: "Februari" },
	{ value: "03", label: "Maret" },
	{ value: "04", label: "April" },
	{ value: "05", label: "Mei" },
	{ value: "06", label: "Juni" },
	{ value: "07", label: "Juli" },
	{ value: "08", label: "Agustus" },
	{ value: "09", label: "September" },
	{ value: "10", label: "Oktober" },
	{ value: "11", label: "November" },
	{ value: "12", label: "Desember" },
];

export function getYearOptions(rangeBack = 3, rangeForward = 1): string[] {
	const currentYear = new Date().getFullYear();
	const years: string[] = [];
	for (let y = currentYear + rangeForward; y >= currentYear - rangeBack; y--) {
		years.push(String(y));
	}
	return years;
}

export interface PeriodeSelectProps {
	year: string;
	month: string;
	onYearChange: (year: string) => void;
	onMonthChange: (month: string) => void;
	label?: string;
	required?: boolean;
	size?: "sm" | "default";
	className?: string;
}

export function PeriodeSelect({
	year,
	month,
	onYearChange,
	onMonthChange,
	label,
	required = false,
	size = "default",
	className,
}: PeriodeSelectProps) {
	const years = getYearOptions();
	const selectedMonthLabel = MONTH_OPTIONS.find((m) => m.value === month)?.label ?? month;

	const isSm = size === "sm";

	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{label && (
				<span className={cn("font-semibold text-foreground mr-1", isSm ? "text-xs" : "text-sm")}>
					{label}:{required && <span className="text-destructive ml-0.5">*</span>}
				</span>
			)}

			<Select value={month} onValueChange={(v) => v && onMonthChange(v)}>
				<SelectTrigger className={cn(isSm ? "w-36 h-9 text-xs" : "w-44 h-10 text-sm")} aria-label="Pilih Bulan">
					<SelectValue placeholder="Pilih Bulan">{month ? selectedMonthLabel : undefined}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{MONTH_OPTIONS.map((m) => (
						<SelectItem key={m.value} value={m.value} className={cn(isSm && "text-xs")}>
							{m.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select value={year} onValueChange={(v) => v && onYearChange(v)}>
				<SelectTrigger className={cn(isSm ? "w-24 h-9 text-xs" : "w-32 h-10 text-sm")} aria-label="Pilih Tahun">
					<SelectValue placeholder="Pilih Tahun">{year ? year : undefined}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{years.map((y) => (
						<SelectItem key={y} value={y} className={cn(isSm && "text-xs")}>
							{y}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

export interface PeriodeFilterProps extends PeriodeSelectProps {
	searchQuery?: string;
	onSearchChange?: (q: string) => void;
	showSearch?: boolean;
	searchPlaceholder?: string;
}

export function PeriodeFilter({
	year,
	month,
	onYearChange,
	onMonthChange,
	label,
	required,
	size = "default",
	searchQuery = "",
	onSearchChange,
	showSearch = true,
	searchPlaceholder = "Cari Nama / NIPAM…",
	className,
}: PeriodeFilterProps) {
	return (
		<div className={cn("flex flex-wrap items-center gap-3", className)}>
			<PeriodeSelect
				year={year}
				month={month}
				onYearChange={onYearChange}
				onMonthChange={onMonthChange}
				label={label}
				required={required}
				size={size}
			/>

			{showSearch && onSearchChange && (
				<div className="relative flex-1 min-w-50 max-w-sm">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
					<Input
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						placeholder={searchPlaceholder}
						className={cn(size === "sm" ? "pl-9 h-9 text-xs" : "pl-9 h-10")}
					/>
				</div>
			)}
		</div>
	);
}
