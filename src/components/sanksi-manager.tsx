"use client";

import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SanksiForm } from "@/app/(app)/master/sanksi/form";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { type FullSanksiPayload, useSanksiMutations } from "@/hooks/useSanksiMutations";
import { hasPermission } from "@/lib/auth/can";
import { PERMISSION } from "@/lib/auth/permissions";

interface SanksiRow {
	id?: number;
	kode?: string;
	keterangan?: string;
}

interface SanksiManagerProps {
	jenisSpId: number;
	items: SanksiRow[];
}
export function SanksiManager({ jenisSpId, items }: SanksiManagerProps) {
	const { roles, permissions } = useAuth();
	const { create, update, remove } = useSanksiMutations(jenisSpId);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<SanksiRow | null>(null);
	const [deletingItem, setDeletingItem] = useState<SanksiRow | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [delErr, setDelErr] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const canUpdate = hasPermission(permissions, PERMISSION.MASTER_WRITE, roles);
	const canDelete = hasPermission(permissions, PERMISSION.MASTER_DELETE, roles);

	const dClose = () => {
		setDialogOpen(false);
		setEditingItem(null);
		setError(null);
	};

	const handleSubmit = async (data: Record<string, unknown>) => {
		setError(null);
		setIsSubmitting(true);
		try {
			const payload: Omit<FullSanksiPayload, "jenisSpId"> = {
				kode: String(data.kode ?? ""),
				keterangan: String(data.keterangan ?? ""),
				potTkk: Boolean(data.potTkk),
				jmlPotTkk: data.jmlPotTkk !== undefined ? Number(data.jmlPotTkk) : undefined,
				isPendingPangkat: Boolean(data.isPendingPangkat),
				isPendingGaji: Boolean(data.isPendingGaji),
				isTurunPangkat: Boolean(data.isTurunPangkat),
				isTurunJabatan: Boolean(data.isTurunJabatan),
				isSuspension: Boolean(data.isSuspension),
				isTerminateDh: Boolean(data.isTerminateDh),
				isTerminateTh: Boolean(data.isTerminateTh),
			};
			if (!editingItem) {
				await create.mutateAsync(payload);
				toast.success("Sanksi berhasil ditambah");
			} else {
				const itemId = editingItem.id;
				if (!itemId) throw new Error("ID sanksi tidak valid");
				await update.mutateAsync({ id: String(itemId), data: payload });
				toast.success("Sanksi berhasil diubah");
			}
			dClose();
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
		} finally {
			setIsSubmitting(false);
		}
	};

	const openCreate = () => {
		setEditingItem(null);
		setError(null);
		setDialogOpen(true);
	};

	const openEdit = (item: SanksiRow) => {
		setEditingItem(item);
		setError(null);
		setDialogOpen(true);
	};

	const handleDelete = async () => {
		if (!deletingItem?.id) return;
		setDelErr(null);
		try {
			await remove.mutateAsync(String(deletingItem.id));
			toast.success("Sanksi berhasil dihapus");
		} catch (e: unknown) {
			setDelErr(e instanceof Error ? e.message : "Gagal menghapus");
			throw e;
		}
	};

	return (
		<>
			<div className="flex flex-wrap items-center gap-1">
				{items.map((item) => (
					<Badge key={item.id} variant="outline" className="gap-0.5 pr-1">
						<span>
							{item.kode} — {item.keterangan}
						</span>
						{canUpdate && (
							<button
								type="button"
								onClick={() => openEdit(item)}
								className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded hover:bg-muted-foreground/20"
								aria-label={`Edit ${item.kode}`}
							>
								<Pencil className="size-2.5" />
							</button>
						)}
						{canDelete && (
							<button
								type="button"
								onClick={() => setDeletingItem(item)}
								className="inline-flex size-3.5 items-center justify-center rounded hover:bg-destructive/20 hover:text-destructive"
								aria-label={`Hapus ${item.kode}`}
							>
								<X className="size-2.5" />
							</button>
						)}
					</Badge>
				))}
				{canUpdate && (
					<button
						type="button"
						onClick={openCreate}
						className="inline-flex size-5 items-center justify-center rounded-full border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
						aria-label="Tambah sanksi"
					>
						<Plus className="size-3" />
					</button>
				)}
			</div>
			<Sheet
				open={dialogOpen}
				onOpenChange={(v) => {
					if (!v) dClose();
				}}
			>
				<SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">
					<SheetHeader className="shrink-0">
						<SheetTitle>{editingItem ? "Edit Sanksi" : "Tambah Sanksi"}</SheetTitle>
					</SheetHeader>
					<SanksiForm
						editing={
							editingItem
								? ({ ...editingItem, jenisSpId } as unknown as Record<string, unknown>)
								: ({ jenisSpId } as unknown as Record<string, unknown>)
						}
						onCancel={dClose}
						error={error}
						setError={setError}
						isSubmitting={isSubmitting}
						submit={handleSubmit}
					/>
				</SheetContent>
			</Sheet>
			<ConfirmDeleteDialog
				open={!!deletingItem}
				onOpenChange={(v) => {
					if (!v) setDeletingItem(null);
				}}
				itemLabel={deletingItem ? `${deletingItem.kode} — ${deletingItem.keterangan}` : "Sanksi"}
				onConfirm={handleDelete}
				error={delErr}
			/>
		</>
	);
}
