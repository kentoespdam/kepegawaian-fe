"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { CrudForm } from "@/components/crud-form";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MASTER_ENTITY_CONFIGS, type PaginatedResponse } from "@/config/master-config";
import { useResource } from "@/hooks/useResource";

export function MasterPageClient() {
  const params = useParams<{ entity: string }>();
  const entity = params.entity;
  const cfg = MASTER_ENTITY_CONFIGS[entity];
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? "1");
  const size = Number(searchParams.get("size") ?? "10");
  const sortBy = searchParams.get("sortBy") ?? undefined;
  const sortDir = searchParams.get("sortDirection") as "asc" | "desc" | undefined;

  const setParam = (key: string, val: string | undefined) => {
    const p = new URLSearchParams(searchParams.toString());
    if (val) p.set(key, val);
    else p.delete(key);
    router.replace(`/master/${entity}?${p.toString()}`);
  };

  const { list, create, update, remove } = useResource<PaginatedResponse<Record<string, unknown>>>(entity, {
    page: String(page),
    size: String(size),
    ...(sortBy && { sortBy, sortDirection: sortDir }),
  });
  const items = list.data?.data ?? [];
  const total = list.data?.total ?? 0;
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isCreate = editing === null;

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
        data={items}
        isLoading={list.isPending}
        isPlaceholder={list.isPlaceholderData}
        isError={list.isError}
        error={list.error}
        onRetry={() => list.refetch()}
        sortBy={sortBy}
        sortDirection={sortDir}
        onSort={(key) => {
          if (sortBy === key) setParam("sortDirection", sortDir === "asc" ? "desc" : "asc");
          else {
            setParam("sortBy", key);
            setParam("sortDirection", "asc");
          }
        }}
        onEdit={openEdit}
        onDelete={openDelete}
        getRowId={(item) => String(item.$id ?? "")}
        pagination={
          <DataTablePagination
            page={page}
            size={size}
            total={total}
            onPageChange={(p) => setParam("page", String(p))}
            onSizeChange={(s) => {
              setParam("size", String(s));
              setParam("page", "1");
            }}
          />
        }
      />

      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          if (!v) setDialogOpen(false);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isCreate ? `Tambah ${cfg.label}` : `Edit ${cfg.label}`}</DialogTitle>
          </DialogHeader>
          <CrudForm
            schema={cfg.schema}
            fields={cfg.fields}
            defaultValues={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={() => setDialogOpen(false)}
            isSubmitting={create.isPending || update.isPending}
            error={error}
          />
        </DialogContent>
      </Dialog>

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
