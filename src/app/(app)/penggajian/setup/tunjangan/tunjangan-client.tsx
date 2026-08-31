"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { EntityFormModal } from "@/app/(app)/master/entity-form-modal";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { Button } from "@/components/ui/button";
import { tunjanganConfig } from "@/config/penggajian/tunjangan.config";
import { useTunjanganResource } from "@/hooks/penggajian/useTunjanganResource";
import { useAuth } from "@/hooks/useAuth";
import { useMasterSearchParams } from "@/hooks/useMasterSearchParams";
import { useMasterTable } from "@/hooks/useMasterTable";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";
import { fromPage, toApiParams } from "@/lib/paging";
import type { GajiTunjanganResponse, PageGajiTunjanganResponse } from "@/types/penggajian/tunjangan";

const ENTITY = "tunjangan";
const BASE = "/penggajian/setup/tunjangan";

export function TunjanganClient() {
	const cfg = tunjanganConfig;
	const { page, size, sortBy, sortDir, filters, setP, setFilter, resetAll } = useMasterSearchParams(ENTITY, BASE);

	const { permissions } = useAuth();
	const canWrite = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);
	const canDelete = hasPermission(permissions, PERMISSION.PENGGAJIAN_SETUP);

	const [editing, setEditing] = useState<GajiTunjanganResponse | null>(null);
	const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isCreate = editing === null;

	// Set default filter: jenisTunjangan = JABATAN when not specified
	useEffect(() => {
		if (!filters.jenisTunjangan) {
			setFilter("jenisTunjangan", "JABATAN");
		}
	}, []);

	const jenisTunjangan = filters.jenisTunjangan as string | undefined;
	const { list, create, update, remove } = useTunjanganResource(
		jenisTunjangan,
		toApiParams({ page, size, sortBy, sortDir, filters }),
	);

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
		setEditing(item as GajiTunjanganResponse);
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

	// Fetch level options for FK filter
	const levelQuery = useQuery<Record<string, unknown>[]>({
		queryKey: ["level", "list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/level/list");
			if (!res.ok) throw new Error("Gagal memuat data level");
			const body = await res.json();
			return body.data as Record<string, unknown>[];
		},
		staleTime: 300_000,
	});

	const fkOptions = {
		jenisTunjangan: [
			{ value: "JABATAN", label: "Jabatan" },
			{ value: "KINERJA", label: "Kinerja" },
			{ value: "BERAS", label: "Beras" },
			{ value: "AIR", label: "Air" },
		],
		levelId: (levelQuery.data ?? []).map((lvl) => ({
			value: String(lvl.id ?? ""),
			label: String(lvl.nama ?? ""),
		})),
	};

	return (
		<div>
			<DataTableToolbar
				fkSources={cfg.fkSources}
				fkOptions={fkOptions}
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
