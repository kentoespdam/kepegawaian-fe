"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
	page: number;
	size: number;
	total: number;
	totalPages: number;
	first: boolean;
	last: boolean;
	onPageChange: (page: number) => void;
	onSizeChange: (size: number) => void;
}

export function DataTablePagination({
	page,
	size,
	total,
	totalPages,
	first,
	last,
	onPageChange,
	onSizeChange,
}: DataTablePaginationProps) {
	// Rentang baris = display math (tetap 1-based); batas prev/next dari backend (first/last).
	const from = total === 0 ? 0 : (page - 1) * size + 1;
	const to = Math.min(page * size, total);

	return (
		<div className="flex items-center justify-between text-sm text-muted-foreground">
			<span>
				Menampilkan {from}–{to} dari {total}
			</span>
			<div className="flex items-center gap-4">
				<select
					value={size}
					onChange={(e) => onSizeChange(Number(e.target.value))}
					className="h-11 rounded-lg border border-input bg-transparent pl-3 pr-8 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
				>
					<option value={10}>10</option>
					<option value={20}>20</option>
					<option value={50}>50</option>
				</select>
				<div className="flex items-center gap-1">
					<Button variant="outline" size="icon-xs" disabled={first} onClick={() => onPageChange(page - 1)}>
						<ChevronLeft className="size-3.5" />
					</Button>
					<span className="min-w-[5ch] text-center tabular-nums">
						{page} / {totalPages || 1}
					</span>
					<Button variant="outline" size="icon-xs" disabled={last} onClick={() => onPageChange(page + 1)}>
						<ChevronRight className="size-3.5" />
					</Button>
				</div>
			</div>
		</div>
	);
}
