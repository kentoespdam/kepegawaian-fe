"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BATCH_COLUMNS, getPeriodeOptions, STATUS_OPTIONS } from "@/config/penggajian/batch-list.config";
import { useBatchList } from "@/hooks/penggajian/useBatchList";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { toApiParams } from "@/lib/paging";
import { CreateBatchDialog } from "./create-batch-dialog";

const ENTITY = "batch";
const BATCH_BASE = "/penggajian/batch";

export function BatchListClient() {
	const router = useRouter();
	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(ENTITY, BATCH_BASE);

	const [createOpen, setCreateOpen] = useState(false);

	const list = useBatchList(toApiParams({ page, size, sortBy, sortDir, filters }));
	const pageView = {
		rows: list.data?.data ?? [],
		total: list.data?.data?.length ?? 0,
		totalPages: 1,
		page: 1,
		first: true,
		last: true,
	};

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	const handleCreateSuccess = (id: string) => {
		setCreateOpen(false);
		router.push(`/penggajian/batch/${id}/setup`);
	};

	return (
		<div>
			<DataTableToolbar
				searchFields={[]}
				values={filters}
				onFilterChange={handleFilterChange}
				hasActive={Object.keys(filters).length > 0 || !!sortBy}
				onReset={resetAll}
			>
				<Button className="h-11 px-4 text-sm font-semibold" onClick={() => setCreateOpen(true)}>
					+ Buat Proses Gaji Baru
				</Button>
			</DataTableToolbar>

			{/* Ponytail: filter periode + status inline di toolbar */}
			<div className="flex gap-2 mb-4">
				<Select
					value={(filters.periode as string) ?? ""}
					onValueChange={(v) => handleFilterChange("periode", v || undefined)}
				>
					<SelectTrigger className="w-40 h-9">
						<SelectValue placeholder="Semua Periode" />
					</SelectTrigger>
					<SelectContent>
						{getPeriodeOptions().map((o) => (
							<SelectItem key={o.value} value={o.value}>
								{o.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={(filters.status as string) ?? ""}
					onValueChange={(v) => handleFilterChange("status", v || undefined)}
				>
					<SelectTrigger className="w-48 h-9">
						<SelectValue placeholder="Semua Status" />
					</SelectTrigger>
					<SelectContent>
						{STATUS_OPTIONS.map((o) => (
							<SelectItem key={o.value} value={o.value}>
								{o.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<DataTable
				columns={BATCH_COLUMNS}
				data={(pageView.rows as Record<string, unknown>[]) ?? []}
				isLoading={list.isPending}
				isPlaceholder={list.isPlaceholderData}
				isError={list.isError}
				error={list.error}
				onRetry={() => list.refetch()}
				sortBy={sortBy}
				sortDirection={sortDir}
				onSort={(key) => {
					if (sortBy === key) setP("sortDirection", sortDir === "asc" ? "desc" : "asc");
					else setP({ sortBy: key, sortDirection: "asc" });
				}}
				onEdit={(item) => {
					const id = item.id as string;
					if (id) router.push(`/penggajian/batch/${id}/setup`);
				}}
				getRowId={(i) => String((i as Record<string, unknown>).id ?? "")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => setP("page", String(p))}
						onSizeChange={(s) => {
							setP("size", String(s));
							setP("page", "1");
						}}
					/>
				}
			/>

			<CreateBatchDialog open={createOpen} onOpenChange={setCreateOpen} onSuccess={handleCreateSuccess} />
		</div>
	);
}
