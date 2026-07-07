"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { CrudForm } from "@/components/crud-form";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MASTER_ENTITY_CONFIGS, type PaginatedResponse } from "@/config/master-config";
import { useResource } from "@/hooks/useResource";
import { api } from "@/lib/api/client";
import { ProfesiForm } from "./profesi-form";
import { SanksiForm } from "./sanksi-form";

function computeSubtreeIds(items: Record<string, unknown>[], startId: string, pf: string): Set<string> {
  const ids = new Set([startId]);
  for (const i of items)
    if (String(i[pf] ?? "") === startId) {
      for (const id of computeSubtreeIds(items, String(i.$id), pf)) ids.add(id);
    }
  return ids;
}

function buildTreeOptions(
  items: Record<string, unknown>[],
  editingId: string | undefined,
  pf: string,
): { value: string; label: string; disabled: boolean }[] {
  const excluded = editingId ? computeSubtreeIds(items, editingId, pf) : new Set<string>();
  const out: { value: string; label: string; disabled: boolean }[] = [
    { value: "", label: "Tanpa parent (root)", disabled: false },
  ];
  const add = (pid: string, d: number) => {
    for (const i of items
      .filter((x) => String(x[pf] ?? "") === pid)
      .sort((a, b) => String(a.nama ?? "").localeCompare(String(b.nama ?? "")))) {
      const id = String(i.$id);
      out.push({ value: id, label: "\u00A0\u00A0".repeat(d) + String(i.nama ?? ""), disabled: excluded.has(id) });
      add(id, d + 1);
    }
  };
  add("", 0);
  return out;
}

export function MasterPageClient() {
  const params = useParams<{ entity: string }>();
  const entity = params.entity;
  const cfg = MASTER_ENTITY_CONFIGS[entity];
  const sp = useSearchParams();
  const router = useRouter();

  const page = Number(sp.get("page") ?? "1");
  const size = Number(sp.get("size") ?? "10");
  const sortBy = sp.get("sortBy") ?? undefined;
  const sortDir = sp.get("sortDirection") as "asc" | "desc" | undefined;

  const setP = (k: string, v: string | undefined) => {
    const p = new URLSearchParams(sp.toString());
    if (v) p.set(k, v);
    else p.delete(k);
    router.replace(`/master/${entity}?${p.toString()}`);
  };

  const { list, listAll, create, update, remove } = useResource<PaginatedResponse<Record<string, unknown>>>(entity, {
    page: String(page),
    size: String(size),
    ...(sortBy && { sortBy, sortDirection: sortDir }),
  });

  // ponytail: tree parent data from same entity's listAll
  const treeItems = (listAll.data as unknown as Record<string, unknown>[]) ?? [];

  // ponytail: FK source lists — declared unconditionally, enabled only for matching entity
  const fkSources = cfg.fkSources ?? [];
  const fkQ1 = useQuery({
    queryKey: [fkSources[0]?.entity, "list"],
    queryFn: () => api.listAll(fkSources[0]?.entity ?? ""),
    enabled: fkSources.length > 0,
    staleTime: 300_000,
  });
  const fkQ2 = useQuery({
    queryKey: [fkSources[1]?.entity, "list"],
    queryFn: () => api.listAll(fkSources[1]?.entity ?? ""),
    enabled: fkSources.length > 1,
    staleTime: 300_000,
  });
  const fkQ3 = useQuery({
    queryKey: [fkSources[2]?.entity, "list"],
    queryFn: () => api.listAll(fkSources[2]?.entity ?? ""),
    enabled: fkSources.length > 2,
    staleTime: 300_000,
  });

  // Build FK lookup map
  const fkLookup = useMemo(() => {
    const map = new Map<string, Map<string, Record<string, unknown>>>();
    const allData = [
      fkQ1.data as Record<string, unknown>[] | undefined,
      fkQ2.data as Record<string, unknown>[] | undefined,
      fkQ3.data as Record<string, unknown>[] | undefined,
    ];
    for (let i = 0; i < fkSources.length; i++) {
      const data = allData[i] ?? [];
      const m = new Map<string, Record<string, unknown>>();
      for (const item of data) m.set(String(item.$id), item);
      map.set(fkSources[i]?.field, m);
    }
    return map;
  }, [fkSources, fkQ1.data, fkQ2.data, fkQ3.data]);

  // Resolve FK names + tree parent in table items
  const resolvedItems = useMemo(
    () =>
      (list.data?.data ?? []).map((item) => {
        const e = { ...item };
        if (cfg.treeField) {
          const pid = String(item[cfg.treeField] ?? "");
          e._parentName = pid
            ? String((treeItems as Record<string, unknown>[]).find((x) => String(x.$id) === pid)?.nama ?? pid)
            : "";
        }
        for (const fk of fkSources) {
          const fkId = String(item[fk.field] ?? "");
          const nameField = `_${fk.field.replace("Id", "")}Name`;
          const lookupMap = fkLookup.get(fk.field);
          if (lookupMap && fkId) e[nameField] = String(lookupMap.get(fkId)?.nama ?? fkId);
        }
        return e;
      }),
    [list.data, treeItems, cfg.treeField, fkSources, fkLookup],
  );

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

  // Build form fields enriched with tree + FK options
  const formFields = useMemo(() => {
    let ff = [...cfg.fields];
    if (cfg.treeField) {
      const opts = buildTreeOptions(treeItems, editing?.$id as string | undefined, cfg.treeField);
      ff = [...ff, { name: cfg.treeField, label: "Parent", type: "select" as const, options: opts }];
    }
    return ff.map((f) => {
      if (f.type !== "select" || f.options) return f;
      const fk = fkSources.find((s) => s.field === f.name);
      if (!fk) return f;
      const lm = fkLookup.get(fk.field);
      const opts = lm ? [...lm.entries()].map(([value, item]) => ({ value, label: String(item.nama ?? value) })) : [];
      return { ...f, options: opts };
    });
  }, [cfg.fields, cfg.treeField, treeItems, editing, fkSources, fkLookup]);

  const isSanksi = entity === "sanksi";
  const isProfesi = entity === "profesi";

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

      {isSanksi && (
        <Sheet
          open={dialogOpen}
          onOpenChange={(v) => {
            if (!v) setDialogOpen(false);
          }}
        >
          <SheetContent className="sm:max-w-[480px] flex flex-col gap-0 p-0">
            <SheetHeader className="shrink-0">
              <SheetTitle>{isCreate ? "Tambah Sanksi" : "Edit Sanksi"}</SheetTitle>
            </SheetHeader>
            <SanksiForm
              editing={editing}
              onCancel={() => setDialogOpen(false)}
              error={error}
              setError={setError}
              isSubmitting={create.isPending || update.isPending}
              submit={handleSubmit}
            />
          </SheetContent>
        </Sheet>
      )}
      {isProfesi && (
        <Sheet
          open={dialogOpen}
          onOpenChange={(v) => {
            if (!v) setDialogOpen(false);
          }}
        >
          <SheetContent className="sm:max-w-[480px] flex flex-col gap-0 p-0">
            <SheetHeader className="shrink-0">
              <SheetTitle>{isCreate ? "Tambah Profesi" : "Edit Profesi"}</SheetTitle>
            </SheetHeader>
            <ProfesiForm
              editing={editing}
              onCancel={() => setDialogOpen(false)}
              error={error}
              setError={setError}
              isSubmitting={create.isPending || update.isPending}
              submit={handleSubmit}
            />
          </SheetContent>
        </Sheet>
      )}
      {!isSanksi && !isProfesi && (
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
              fields={formFields}
              defaultValues={editing ?? undefined}
              onSubmit={handleSubmit}
              onCancel={() => setDialogOpen(false)}
              isSubmitting={create.isPending || update.isPending}
              error={error}
            />
          </DialogContent>
        </Dialog>
      )}

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
