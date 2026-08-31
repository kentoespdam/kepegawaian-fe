"use client";

import { useState } from "react";
import { toast } from "sonner";
import { EntityFormModal } from "@/app/(app)/master/entity-form-modal";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { potonganTkkConfig } from "@/config/penggajian/potongan-tkk.config";
import { usePenggajianResource } from "@/hooks/penggajian/usePenggajianResource";
import { useAuth } from "@/hooks/useAuth";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { useMasterTable } from "@/hooks/useMasterTable";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import type { GajiPotonganTkkResponse, PageGajiPotonganTkkResponse } from "@/types/penggajian/potongan-tkk";

const ENTITY = "potongan-tkk";
const BASE = "/penggajian/setup/potongan-tkk";

export function PotonganTkkClient() {
	const cfg = potonganTkkConfig;
	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(ENTITY, BASE);

	const { permissions } = useAuth();
	const canWrite = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);
	const canDelete = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);

	const [editing, setEditing] = useState<GajiPotonganTkkResponse | null>(null);
	const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isCreate = editing === null;

	const { list, create, update, remove } = usePenggajianResource<
		PageGajiPotonganTkkResponse,
		GajiPotonganTkkResponse
	>(ENTITY, toApiParams({ page, size, sortBy, sortDir, filters }));

	const pageView = fromPage(list.data);

	const { resolvedItems, formFields } = useMasterTable({
		cfg,
		listData: pageView.rows as Record<string, unknown>[],
		treeItems: [],
		editing: editing as Record<string, unknown> | null,
	});

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	const openCreate = () => {
		setEditing(null);
		setError(null);
		setDialogOpen(true);
	};
	const openEdit = (item: Record<string, unknown>) => {
		setEditing(item as GajiPotonganTkkResponse);
		setError(null);
		setDialogOpen(true);
	};
	const openDelete = (item: Record<string, unknown>) => {
		setDeleting(item);
		setDeleteError(null);
	};

	const handleSubmit = async (data: Record<string, unknown>) => {
		setError(null);
		try {
			if (isCreate) await create.mutateAsync(data as never);
			else await update.mutateAsync({ id: String(editing?.id ?? ""), data: data as never });
			setDialogOpen(false);
			toast.success(isCreate ? "Berhasil ditambah" : "Berhasil diubah");
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	const handleDelete = async () => {
		if (!deleting) return;
		setDeleteError(null);
		try {
			await remove.mutateAsync(String(deleting.id));
			toast.success("Berhasil dihapus");
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Gagal menghapus");
			throw e;
		}
	};

	return (
		<div>
			<DataTableToolbar
				searchFields={cfg.searchFields}
				values={filters}
				onFilterChange={handleFilterChange}
				hasActive={Object.keys(filters).length > 0 || !!sortBy}
				onReset={resetAll}
			>
				{canWrite && (
					<Button className="h-11 px-4 text-sm font-semibold" onClick={openCreate}>
						+ Tambah
					</Button>
				)}
			</DataTableToolbar>

			<DataTable
				columns={cfg.columns}
				data={resolvedItems}
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
				onEdit={canWrite ? openEdit : undefined}
				onDelete={canDelete ? openDelete : undefined}
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

			<EntityFormModal
				entity={ENTITY}
				cfg={cfg}
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				isCreate={isCreate}
				editing={editing as Record<string, unknown> | null}
				formFields={formFields}
				error={error}
				setError={setError}
				isSubmitting={create.isPending || update.isPending}
				onSubmit={handleSubmit}
			/>

			<ConfirmDeleteDialog
				open={!!deleting}
				onOpenChange={(v) => {
					if (!v) {
						setDeleting(null);
						setDeleteError(null);
					}
				}}
				itemLabel={cfg.label}
				onConfirm={handleDelete}
				error={deleteError}
			/>
		</div>
	);
}
