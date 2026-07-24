"use client";

import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	CircleCheck,
	CircleX,
	FileX2,
	Loader2,
	Pencil,
	RefreshCw,
	SearchX,
	Trash2,
	Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface Column<T> {
	id: string;
	header: string;
	sortable?: boolean;
	/** Kolom identitas baris (mis. NAMA): weight 600 + text-foreground. Kolom lain di-mute. */
	primary?: boolean;
	cell?: (item: T) => React.ReactNode;
	align?: "center" | "left" | "right" | "justify" | "char";
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
	onEditGaji?: (item: T) => void;
	onDelete?: (item: T) => void;
	onRowClick?: (item: T) => void;
	selectedRowId?: string | number;
	getRowId?: (item: T) => string | number;
	emptyMessage?: string;
	isFiltered?: boolean;
	onResetFilter?: () => void;
	toolbar?: React.ReactNode;
	pagination?: React.ReactNode;
}

/** Render default cell — auto-detect boolean sebagai ikon check/uncheck. */
function cellContent(v: unknown): React.ReactNode {
	if (typeof v === "boolean") {
		return v ? (
			<CircleCheck className="size-4 text-success shrink-0" aria-label="Ya" />
		) : (
			<CircleX className="size-4 text-muted-foreground shrink-0" aria-label="Tidak" />
		);
	}
	return String(v ?? "");
}

function PaginationFooter({ children }: { children: React.ReactNode }) {
	if (!children) return null;
	return <div className="border-t shrink-0 px-4 py-2.5">{children}</div>;
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
	onEditGaji,
	onDelete,
	onRowClick,
	selectedRowId,
	getRowId,
	emptyMessage = "Tidak ada data",
	isFiltered,
	onResetFilter,
	toolbar,
	pagination,
}: DataTableProps<T>) {
	const hasActions = !!(onEdit || onEditGaji || onDelete);

	if (isError) {
		return (
			<div>
				{toolbar}
				<div className="rounded-lg border bg-card shadow-md">
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
					<PaginationFooter>{pagination}</PaginationFooter>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				{toolbar}
				<div className="rounded-lg border bg-card shadow-md flex flex-col">
					<div className="overflow-auto flex-1">
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
									{hasActions && (
										<th className="h-11 px-4 text-right w-28">
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
										{hasActions && (
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
					<PaginationFooter>{pagination}</PaginationFooter>
				</div>
			</div>
		);
	}

	if (data.length === 0) {
		return (
			<div>
				{toolbar}
				<div className="rounded-lg border bg-card shadow-md">
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
					<PaginationFooter>{pagination}</PaginationFooter>
				</div>
			</div>
		);
	}

	return (
		<div>
			{toolbar}
			<div className="rounded-lg border bg-card shadow-md flex flex-col max-h-[75vh] relative p-1">
				<div className="overflow-auto flex-1">
					<table className="w-full caption-bottom text-sm">
						<thead className="sticky top-0 z-5 bg-card border-b-2 border-border">
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
								{hasActions && (
									<th className="h-11 px-4 text-right w-28">
										<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{data.map((item, i) => (
								<tr
									key={getRowId ? getRowId(item) : i}
									onClick={() => onRowClick?.(item)}
									className={cn(
										"transition-colors hover:bg-row-hover",
										i % 2 === 1 && "bg-row-stripe",
										isPlaceholder && "opacity-50 pointer-events-none",
										onRowClick && "cursor-pointer",
										selectedRowId !== undefined &&
											getRowId &&
											String(getRowId(item)) === String(selectedRowId) &&
											"bg-row-selected",
									)}
								>
									{columns.map((col) => (
										<td
											key={col.id}
											className={cn(
												"px-4 py-2 align-middle whitespace-nowrap tabular-nums",
												col.primary ? "font-semibold text-foreground" : "text-muted-foreground",
											)}
											align={col.align}
										>
											{" "}
											{col.cell ? col.cell(item) : cellContent(item[col.id as keyof T])}
										</td>
									))}
									{hasActions && (
										<td className="px-4 py-2 align-middle text-right">
											<div className="inline-flex items-center gap-1">
												{onEdit && (
													<Button
														variant="ghost"
														size="icon"
														title="Edit Profil"
														onClick={(e) => {
															e.stopPropagation();
															onEdit(item);
														}}
														aria-label="Edit Profil"
													>
														<Pencil className="size-5" />
													</Button>
												)}
												{onEditGaji && (
													<Button
														variant="ghost"
														size="icon"
														title="Edit Gaji"
														onClick={(e) => {
															e.stopPropagation();
															onEditGaji(item);
														}}
														aria-label="Edit Gaji"
													>
														<Wallet className="size-5" />
													</Button>
												)}
												{onDelete && (
													<Button
														variant="ghost"
														size="icon"
														title="Hapus"
														onClick={(e) => {
															e.stopPropagation();
															onDelete(item);
														}}
														aria-label="Hapus"
													>
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
					<div className="absolute top-3 right-3 z-10">
						<Loader2 className="size-4 animate-spin text-primary" />
					</div>
				)}
				<PaginationFooter>{pagination}</PaginationFooter>
			</div>
		</div>
	);
}
