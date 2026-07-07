"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { MASTER_ENTITY_CONFIGS, type PaginatedResponse } from "@/config/master-config";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { useMasterTable } from "@/hooks/useMasterTable";
import { useResource } from "@/hooks/useResource";
import { EntityFormModal } from "./entity-form-modal";

export function MasterPageClient() {
  const params = useParams<{ entity: string }>();
  const entity = params.entity;
  const cfg = MASTER_ENTITY_CONFIGS[entity];
  const { page, size, sortBy, sortDir, setP } = useMasterSearchParams(entity);

  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isCreate = editing === null;

  const { list, listAll, create, update, remove } = useResource<PaginatedResponse<Record<string, unknown>>>(entity, {
    page: String(page),
    size: String(size),
    ...(sortBy && { sortBy, sortDirection: sortDir }),
  });

  const treeItems = (listAll.data as unknown as Record<string, unknown>[]) ?? [];

  const { resolvedItems, formFields } = useMasterTable({
    cfg,
    listData: list.data?.data,
    treeItems,
    editing,
  });

  const total = list.data?.total ?? 0;

  const openCreate = () => {
    setEditing(null);
    setError(null);
    setDialogOpen(true);
  };
  const openEdit = (item: Record<string, unknown>) => {
    setEditing(item);
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
      if (isCreate) await create.mutateAsync(data);
      else await update.mutateAsync({ id: String(editing?.$id), data });
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
      await remove.mutateAsync(String(deleting.$id));
      toast.success(`${cfg.label} berhasil dihapus`);
    } catch (e: unknown) {
      setDeleteError(e instanceof Error ? e.message : "Gagal menghapus");
      throw e;
    }
  };

  return (
    <div>
      <DataTableToolbar>
        <Button size="sm" onClick={openCreate}>
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
          else {
            setP("sortBy", key);
            setP("sortDirection", "asc");
          }
        }}
        onEdit={openEdit}
        onDelete={openDelete}
        getRowId={(i) => String(i.$id ?? "")}
        pagination={
          <DataTablePagination
            page={page}
            size={size}
            total={total}
            onPageChange={(p) => setP("page", String(p))}
            onSizeChange={(s) => {
              setP("size", String(s));
              setP("page", "1");
            }}
          />
        }
      />

      <EntityFormModal
        entity={entity}
        cfg={cfg}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        isCreate={isCreate}
        editing={editing}
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
