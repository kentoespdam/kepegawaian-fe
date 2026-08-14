"use client";

import { Clock, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { CrudForm } from "@/components/crud-form";
import { type Column, DataTable } from "@/components/data-table";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { SectionConf } from "./section-right-panel";

interface SlotQuery {
	data?:
		| {
				rows: Record<string, unknown>[];
				total: number;
				totalPages: number;
				page: number;
				first: boolean;
				last: boolean;
		  }
		| undefined;
	isPending: boolean;
	isPlaceholderData: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => unknown;
}

interface CrudLike {
	create: { mutateAsync: (data: Record<string, unknown>) => Promise<void> };
	update: { mutateAsync: (data: { id: string | number } & Record<string, unknown>) => Promise<void> };
	remove: { mutateAsync: (id: string | number) => Promise<void> };
}

interface SectionCrudSlotProps {
	conf: SectionConf;
	q: SlotQuery;
	nik: string | null;
	size: number;
	onPageChange: (page: number) => void;
	onSizeChange: (size: number) => void;
	crud?: CrudLike;
	fkOptions: Record<string, { value: string; label: string }[]>;
}

type Editing = { mode: "create" } | { mode: "edit"; row: Record<string, unknown> } | null;

/**
 * Satu section panel kanan: DataTable + (bila crudConfig ada) tombol Tambah,
 * kolom aksi per-row dengan guard changedStatus (pending → Edit/Hapus di-unmount),
 * satu Dialog form + satu ConfirmDeleteDialog per section.
 */
export function SectionCrudSlot({
	conf,
	q,
	nik,
	size,
	onPageChange,
	onSizeChange,
	crud,
	fkOptions,
}: SectionCrudSlotProps) {
	const [editing, setEditing] = useState<Editing>(null);
	const [deleting, setDeleting] = useState<Record<string, unknown> | null>(null);
	const [formError, setFormError] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const view = q.data;
	const crudConf = conf.crudConfig;
	const editable = !!crud && !!nik && !!crudConf;

	const columns: Column<Record<string, unknown>>[] = editable
		? [
				...conf.columns,
				{
					id: "aksi",
					header: "Aksi",
					align: "right",
					cell: (row) =>
						// ponytail: changedStatus truthy = pending approval → tombol di-unmount, tampil badge
						row.changedStatus ? (
							<Badge variant="outline" className="gap-1 text-warning border-warning/30 bg-warning/5">
								<Clock className="size-3" />
								Menunggu
							</Badge>
						) : (
							<div className="inline-flex items-center gap-1">
								<Button
									variant="ghost"
									size="icon"
									title="Edit"
									aria-label="Edit"
									onClick={(e) => {
										e.stopPropagation();
										setEditing({ mode: "edit", row });
									}}
								>
									<Pencil className="size-5" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									title="Hapus"
									aria-label="Hapus"
									onClick={(e) => {
										e.stopPropagation();
										setDeleting(row);
									}}
								>
									<Trash2 className="size-5 text-destructive" />
								</Button>
							</div>
						),
				},
			]
		: conf.columns;

	// ponytail: FK combobox options di-merge dari useFkOptions di parent (hook tidak bisa di-loop)
	const fields = crudConf
		? crudConf.formFields.map((f) => {
				const src = crudConf.fkSources?.find((s) => s.field === f.name);
				return src ? { ...f, options: fkOptions[src.entity] ?? [] } : f;
			})
		: [];

	const handleSubmit = async (data: Record<string, unknown>) => {
		if (!crud) return;
		setFormError(null);
		try {
			if (editing?.mode === "edit") {
				await crud.update.mutateAsync({ id: editing.row.id as string | number, ...data });
			} else {
				await crud.create.mutateAsync(data);
			}
			setEditing(null);
		} catch (e) {
			setFormError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	const handleDelete = async () => {
		if (!crud || !deleting) return;
		setDeleteError(null);
		try {
			await crud.remove.mutateAsync(deleting.id as string | number);
			setDeleting(null);
		} catch (e) {
			setDeleteError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	return (
		<>
			{crudConf && editable && (
				<div className="flex items-center justify-end px-4 pt-3">
					<Button size="sm" onClick={() => setEditing({ mode: "create" })}>
						<Plus className="mr-1.5 size-4" />
						Tambah
					</Button>
				</div>
			)}

			<DataTable<Record<string, unknown>>
				bare
				columns={columns}
				data={view?.rows ?? []}
				isLoading={q.isPending}
				isPlaceholder={q.isPlaceholderData}
				isError={q.isError}
				error={q.error}
				onRetry={() => q.refetch()}
				emptyMessage="Tidak ada data"
				pagination={
					view ? (
						<DataTablePagination
							page={view.page}
							size={size}
							total={view.total}
							totalPages={view.totalPages}
							first={view.first}
							last={view.last}
							onPageChange={onPageChange}
							onSizeChange={onSizeChange}
						/>
					) : undefined
				}
			/>

			{crudConf && editable && (
				<>
					<Dialog
						open={!!editing}
						onOpenChange={(v) => {
							if (!v) {
								setEditing(null);
								setFormError(null);
							}
						}}
					>
						<DialogContent className="flex flex-col max-h-[85dvh] sm:max-w-lg p-0 gap-0 overflow-hidden">
							<DialogHeader className="shrink-0 px-4 pt-4 pb-2 shadow">
								<DialogTitle>
									{editing?.mode === "edit" ? `Edit ${crudConf.label}` : `Tambah ${crudConf.label}`}
								</DialogTitle>
							</DialogHeader>
							<div className="py-2 flex-1 overflow-y-auto px-4 pb-0 [&>form]:flex [&>form]:flex-1 [&>form]:flex-col [&>form>div:last-of-type]:mt-auto [&>form>div:last-of-type]:sticky [&>form>div:last-of-type]:bottom-0 [&>form>div:last-of-type]:bg-popover [&>form>div:last-of-type]:pt-4 [&>form>div:last-of-type]:pb-4 [&>form>div:last-of-type]:border-t [&>form>div:last-of-type]:border-border [&>form>div:last-of-type]:-mx-4 [&>form>div:last-of-type]:px-4">
								<CrudForm
									schema={crudConf.formSchema as never}
									fields={fields}
									defaultValues={crudConf.defaultValues(editing?.mode === "edit" ? editing.row : {})}
									onSubmit={handleSubmit}
									onCancel={() => {
										setEditing(null);
										setFormError(null);
									}}
									error={formError}
									submitLabel={editing?.mode === "edit" ? "Simpan Perubahan" : "Simpan"}
								/>
							</div>
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
						itemLabel={crudConf.label}
						error={deleteError}
						onConfirm={handleDelete}
					/>
				</>
			)}
		</>
	);
}
