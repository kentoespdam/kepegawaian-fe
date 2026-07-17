"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import type { EntityConfig } from "@/config/master-config";
import { MASTER_ENTITY_CONFIGS } from "@/config/master-config";
import type { MasterEntityName, MasterEntityTypes } from "@/config/master-entity-types";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { useMasterTable } from "@/hooks/useMasterTable";
import { useResource } from "@/hooks/useResource";
import { fromPage, toApiParams } from "@/lib/paging";
import { EntityFormModal } from "./entity-form-modal";

export function MasterPageClient<TEntity extends MasterEntityName>({ entity }: { entity: TEntity }) {
	type TItem = MasterEntityTypes[TEntity]["TItem"];
	type TPage = MasterEntityTypes[TEntity]["TPage"];
	type TReq = MasterEntityTypes[TEntity]["TReq"];

	// ponytail: map di-widen ke EntityConfig — cast via unknown karena tipe tidak overlapping
	const cfg = MASTER_ENTITY_CONFIGS[entity] as unknown as EntityConfig<TItem, TReq>;
	const { page, size, sortBy, sortDir, filters, setP, setFilter } = useMasterSearchParams(entity);

	const [editing, setEditing] = useState<TItem | null>(null);
	const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isCreate = editing === null;

	const { list, listAll, create, update, remove } = useResource<TPage, TReq>(
		entity as string,
		toApiParams({ page, size, sortBy, sortDir, filters }),
	);

	// ponytail: listAll return typed sebagai TPage tapi runtime TList — cast
	const treeItems = (listAll.data as Record<string, unknown>[] | undefined) ?? [];

	const pageView = fromPage(list.data);

	const handleFilterChange = (name: string, value: string | undefined) => {
		setFilter(name, value);
	};

	const { resolvedItems, formFields, fkOptions } = useMasterTable({
		cfg,
		listData: pageView.rows as Record<string, unknown>[],
		treeItems,
		editing: editing as Record<string, unknown> | null,
	});

	const total = pageView.total;

	const openCreate = () => {
		setEditing(null);
		setError(null);
		setDialogOpen(true);
	};
	const openEdit = (item: Record<string, unknown>) => {
		setEditing(item as TItem);
		setError(null);
		setDialogOpen(true);
	};
	const openDelete = (item: Record<string, unknown>) => {
		setDeleting(item);
		setDeleteError(null);
	};

	const handleSubmit = async (data: TReq) => {
		setError(null);
		try {
			if (isCreate) await create.mutateAsync(data);
			else
				await update.mutateAsync({
					id: String((editing as Record<string, unknown> | null)?.id ?? ""),
					data,
				});
			setDialogOpen(false);
			toast.success(isCreate ? `${cfg.label} berhasil ditambah` : `${cfg.label} berhasil diubah`);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	const handleDelete = async () => {
		if (!deleting) return;
		setDeleteError(null);
		try {
			await remove.mutateAsync(String(deleting.id));
			toast.success(`${cfg.label} berhasil dihapus`);
		} catch (e: unknown) {
			setDeleteError(e instanceof Error ? e.message : "Gagal menghapus");
			throw e;
		}
	};

	return (
		<div>
			<DataTableToolbar
				searchFields={cfg.searchFields}
				fkSources={cfg.fkSources}
				fkOptions={fkOptions}
				values={filters}
				onFilterChange={handleFilterChange}
			>
				<Button size="default" onClick={openCreate}>
					+ Tambah
				</Button>
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
				onEdit={openEdit}
				onDelete={openDelete}
				getRowId={(i) => String((i as Record<string, unknown>).id ?? "")}
				pagination={
					<DataTablePagination
						page={page}
						size={size}
						total={total}
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
				entity={entity as string}
				cfg={cfg as unknown as EntityConfig}
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				isCreate={isCreate}
				editing={editing as Record<string, unknown> | null}
				formFields={formFields}
				error={error}
				setError={setError}
				isSubmitting={create.isPending || update.isPending}
				onSubmit={handleSubmit as (data: Record<string, unknown>) => Promise<void>}
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
