"use client";

import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	FileX2,
	Loader2,
	Pencil,
	RefreshCw,
	SearchX,
	Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Column<T> {
	id: string;
	header: string;
	sortable?: boolean;
	cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	isLoading: boolean;
	isPlaceholder: boolean;
	isError: boolean;
	error?: Error | null;
	onRetry?: () => void;
	sortBy?: string;
	sortDirection?: "asc" | "desc";
	onSort?: (key: string) => void;
	onEdit?: (item: T) => void;
	onDelete?: (item: T) => void;
	getRowId?: (item: T) => string | number;
	emptyMessage?: string;
	isFiltered?: boolean;
	onResetFilter?: () => void;
	toolbar?: React.ReactNode;
	pagination?: React.ReactNode;
}

export function DataTable<T>({
	columns,
	data,
	isLoading,
	isPlaceholder,
	isError,
	error,
	onRetry,
	sortBy,
	sortDirection,
	onSort,
	onEdit,
	onDelete,
	getRowId,
	emptyMessage = "Tidak ada data",
	isFiltered,
	onResetFilter,
	toolbar,
	pagination,
}: DataTableProps<T>) {
	if (isError) {
		return (
			<div>
				{toolbar}
				<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
					<div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
						<AlertTriangle className="size-6 text-destructive" />
					</div>
					<p className="text-sm font-medium text-foreground">Gagal memuat data</p>
					{error?.message && <p className="text-sm text-muted-foreground">{error.message}</p>}
					{onRetry && (
						<Button variant="outline" size="sm" onClick={onRetry}>
							<RefreshCw className="mr-1.5 size-3.5" />
							Coba lagi
						</Button>
					)}
				</div>
				{pagination}
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				{toolbar}
				<div className="rounded-lg border overflow-auto">
					<table className="w-full caption-bottom text-sm">
						<thead className="[&_tr]:border-b">
							<tr className="border-b">
								{columns.map((col) => (
									<th
										key={col.id}
										className="h-11 px-4 text-left align-middle font-medium text-xs uppercase tracking-wider"
									>
										{col.header}
									</th>
								))}
								{(onEdit || onDelete) && (
									<th className="h-11 px-4 text-right w-24">
										<span className="text-xs font-medium uppercase tracking-wider">Aksi</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 10 }, (_, i) => i).map((i) => (
								<tr key={`skeleton-${i}`} className="border-b">
									{columns.map((col) => (
										<td key={col.id} className="px-4 py-2 align-middle">
											<Skeleton className="h-4 w-3/4" />
										</td>
									))}
									{(onEdit || onDelete) && (
										<td className="px-4 py-2 align-middle text-right">
											<div className="flex justify-end gap-1">
												<Skeleton className="size-8 rounded-md" />
												<Skeleton className="size-8 rounded-md" />
											</div>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{pagination}
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div>
				{toolbar}
				<div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
					{isFiltered ? (
						<>
							<SearchX className="size-12 text-muted-foreground" />
							<p className="text-sm font-medium text-foreground">Tidak ada hasil</p>
							<p className="text-sm text-muted-foreground">Coba ubah filter pencarian</p>
							{onResetFilter && (
								<Button variant="outline" size="sm" onClick={onResetFilter}>
									Reset filter
								</Button>
							)}
						</>
					) : (
						<>
							<FileX2 className="size-12 text-muted-foreground" />
							<p className="text-sm font-medium text-foreground">{emptyMessage}</p>
						</>
					)}
				</div>
				{pagination}
			</div>
		);
	}

	return (
		<div>
			{toolbar}
			<div className="relative">
				<div className="rounded-lg border overflow-auto max-h-[75vh]">
					<table className="w-full caption-bottom text-sm">
						<thead className="sticky top-0 z-10 bg-card border-b-2 border-border">
							<tr>
								{columns.map((col) => (
									<th
										key={col.id}
										className={cn(
											"h-11 px-4 text-left align-middle font-medium text-xs uppercase tracking-wider text-muted-foreground",
											col.sortable && "cursor-pointer select-none hover:text-foreground",
										)}
										onClick={() => col.sortable && onSort?.(col.id)}
									>
										<span className="inline-flex items-center gap-1">
											{col.header}
											{col.sortable ? (
												sortBy === col.id ? (
													sortDirection === "asc" ? (
														<ArrowUp className="size-3.5" />
													) : (
														<ArrowDown className="size-3.5" />
													)
												) : (
													<ArrowUpDown className="size-3.5 opacity-30" />
												)
											) : null}
										</span>
									</th>
								))}
								{(onEdit || onDelete) && (
									<th className="h-11 px-4 text-right w-24">
										<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{data.map((item, i) => (
								<tr
									key={getRowId ? getRowId(item) : i}
									className={cn(
										"border-b transition-colors hover:bg-muted/50",
										i % 2 === 1 && "bg-muted hover:bg-muted/80",
										isPlaceholder && "opacity-50 pointer-events-none",
									)}
								>
									{columns.map((col) => (
										<td key={col.id} className="px-4 py-2 align-middle whitespace-nowrap tabular-nums">
											{col.cell ? col.cell(item) : String(item[col.id as keyof T] ?? "")}
										</td>
									))}
									{(onEdit || onDelete) && (
										<td className="px-4 py-2 align-middle text-right">
											<div className="inline-flex items-center gap-1">
												{onEdit && (
													<Button variant="ghost" size="icon" onClick={() => onEdit(item)} aria-label="Edit">
														{" "}
														<Pencil className="size-5" />
													</Button>
												)}
												{onDelete && (
													<Button variant="ghost" size="icon" onClick={() => onDelete(item)} aria-label="Hapus">
														{" "}
														<Trash2 className="size-5 text-destructive" />
													</Button>
												)}
											</div>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{isPlaceholder && (
					<div className="absolute top-3 right-3">
						<Loader2 className="size-4 animate-spin text-primary" />
					</div>
				)}
				{pagination}
			</div>
		</div>
	);
}
