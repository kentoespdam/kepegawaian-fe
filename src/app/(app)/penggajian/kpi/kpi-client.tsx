"use client";

import { FileDown, Plus, Search, Upload } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { PeriodeSelect } from "@/components/periode-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KPI_COLUMNS } from "@/config/penggajian/kpi.config";
import { useKpiList } from "@/hooks/penggajian/useKpiList";
import { useDeleteKpi } from "@/hooks/penggajian/useKpiMutations";
import { penggajianApi } from "@/lib/api/penggajian-client";
import type { GajiKpiResponse } from "@/types/penggajian/kpi";
import { KpiFormDialog } from "./_components/kpi-form-dialog";
import { UploadKpiDialog } from "./_components/upload-kpi-dialog";

export function KpiClient() {
	const { year, month, periode, setYear, setMonth, page, size, nipam, sortBy, sortDirection, nav, query, pageView } =
		useKpiList();

	const [formOpen, setFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<GajiKpiResponse | null>(null);
	const [uploadOpen, setUploadOpen] = useState(false);
	const [deletingItem, setDeletingItem] = useState<GajiKpiResponse | null>(null);

	const deleteMutation = useDeleteKpi();

	const handleOpenCreate = () => {
		setEditingItem(null);
		setFormOpen(true);
	};

	const handleOpenEdit = (item: GajiKpiResponse) => {
		setEditingItem(item);
		setFormOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deletingItem?.id) return;
		await deleteMutation.mutateAsync(deletingItem.id);
		setDeletingItem(null);
	};

	return (
		<div className="flex flex-col gap-4">
			{/* Page Header */}
			<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-xl font-bold tracking-tight text-foreground">00. Input Data KPI</h1>
					<p className="text-sm text-muted-foreground">
						Kelola data Tunjangan Kinerja dan PPh 21 TER per pegawai sebelum proses gaji bulanan
					</p>
				</div>
			</div>

			{/* Filter and Action Toolbar */}
			<div className="flex flex-col gap-3 rounded-lg border bg-card p-3.5 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap items-center gap-2.5">
					<PeriodeSelect year={year} month={month} onYearChange={setYear} onMonthChange={setMonth} size="sm" />
					<div className="relative w-44">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
						<Input
							placeholder="Filter NIPAM…"
							value={nipam}
							onChange={(e) => nav({ nipam: e.target.value || undefined, page: "1" })}
							className="h-9 pl-8 text-xs"
						/>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => penggajianApi.downloadKpiTemplate()}
						className="gap-1.5 h-9 text-xs"
					>
						<FileDown className="size-3.5" />
						Unduh Template
					</Button>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => setUploadOpen(true)}
						className="gap-1.5 h-9 text-xs"
					>
						<Upload className="size-3.5" />
						Upload Excel
					</Button>
					<Button type="button" size="sm" onClick={handleOpenCreate} className="gap-1.5 h-9 text-xs">
						<Plus className="size-3.5" />
						Tambah Data
					</Button>
				</div>
			</div>

			{/* Main Data Table */}
			<DataTable
				columns={KPI_COLUMNS}
				data={pageView.rows}
				isLoading={query.isPending}
				isPlaceholder={query.isPlaceholderData}
				isError={query.isError}
				error={query.error}
				onRetry={() => query.refetch()}
				sortBy={sortBy}
				sortDirection={sortDirection}
				onSort={(key) => {
					if (sortBy === key) {
						nav({ sortDirection: sortDirection === "asc" ? "desc" : "asc" });
					} else {
						nav({ sortBy: key, sortDirection: "asc" });
					}
				}}
				onEdit={handleOpenEdit}
				onDelete={(item) => setDeletingItem(item)}
				getRowId={(item) => String(item.id ?? item.nipam ?? "")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={pageView.total}
						totalPages={pageView.totalPages}
						first={pageView.first}
						last={pageView.last}
						onPageChange={(p) => nav({ page: String(p) })}
						onSizeChange={(s) => nav({ size: String(s), page: "1" })}
					/>
				}
			/>

			{/* Form Dialog for Create & Edit */}
			<KpiFormDialog open={formOpen} onOpenChange={setFormOpen} initialData={editingItem} defaultPeriode={periode} />

			{/* Upload Excel Dialog */}
			<UploadKpiDialog
				open={uploadOpen}
				onOpenChange={setUploadOpen}
				periode={periode}
				onSuccess={() => query.refetch()}
			/>

			{/* Confirm Delete Dialog */}
			<ConfirmDeleteDialog
				open={!!deletingItem}
				onOpenChange={(v) => !v && setDeletingItem(null)}
				itemLabel={deletingItem ? `Data KPI NIPAM ${deletingItem.nipam}` : ""}
				onConfirm={handleDeleteConfirm}
			/>
		</div>
	);
}
