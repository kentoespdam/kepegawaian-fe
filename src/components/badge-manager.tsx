"use client";

import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { CrudForm } from "@/components/crud-form";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBadgeMutations } from "@/hooks/useBadgeMutations";
import { useRoles } from "@/hooks/useRoles";
import { can } from "@/lib/auth/can";

const badgeSchema = z.object({ nama: z.string().min(1, "Nama harus diisi") });
interface BadgeItem {
	id?: number;
	nama?: string;
}
interface BadgeManagerProps {
	entity: "apd" | "alat-kerja";
	profesiId: number;
	items: BadgeItem[];
}

export function BadgeManager({ entity, profesiId, items }: BadgeManagerProps) {
	const roles = useRoles();
	const { create, update, remove } = useBadgeMutations(entity, profesiId);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<BadgeItem | null>(null);
	const [deletingItem, setDeletingItem] = useState<BadgeItem | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [delErr, setDelErr] = useState<string | null>(null);
	const label = entity === "apd" ? "APD" : "Alat Kerja";
	const canUpdate = can(roles, "update", "profesi");
	const canDelete = can(roles, "delete", "profesi");

	const handleSubmit = async (data: { nama: string }) => {
		setError(null);
		try {
			if (!editingItem) {
				await create.mutateAsync({ nama: data.nama });
				toast.success(`${label} berhasil ditambah`);
			} else {
				const itemId = editingItem.id;
				if (!itemId) throw new Error("ID item tidak valid");
				await update.mutateAsync({ id: String(itemId), data: { nama: data.nama } });
				toast.success(`${label} berhasil diubah`);
			}
			setDialogOpen(false);
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Terjadi kesalahan");
		}
	};

	const handleDelete = async () => {
		if (!deletingItem?.id) return;
		setDelErr(null);
		try {
			await remove.mutateAsync(String(deletingItem.id));
			toast.success(`${label} berhasil dihapus`);
		} catch (e: unknown) {
			setDelErr(e instanceof Error ? e.message : "Gagal menghapus");
			throw e;
		}
	};

	const dClose = () => setDialogOpen(false);

	return (
		<>
			<div className="flex flex-wrap items-center gap-1">
				{items.map((item) => (
					<Badge key={item.id} variant="outline" className="gap-0.5 pr-1">
						<span>{item.nama}</span>
						{canUpdate && (
							<button
								type="button"
								onClick={() => {
									setEditingItem(item);
									setError(null);
									setDialogOpen(true);
								}}
								className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded hover:bg-muted-foreground/20"
								aria-label={`Edit ${item.nama}`}
							>
								<Pencil className="size-2.5" />
							</button>
						)}
						{canDelete && (
							<button
								type="button"
								onClick={() => setDeletingItem(item)}
								className="inline-flex size-3.5 items-center justify-center rounded hover:bg-destructive/20 hover:text-destructive"
								aria-label={`Hapus ${item.nama}`}
							>
								<X className="size-2.5" />
							</button>
						)}
					</Badge>
				))}
				{canUpdate && (
					<button
						type="button"
						onClick={() => {
							setEditingItem(null);
							setError(null);
							setDialogOpen(true);
						}}
						className="inline-flex size-5 items-center justify-center rounded-full border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
						aria-label={`Tambah ${label}`}
					>
						<Plus className="size-3" />
					</button>
				)}
			</div>
			<Dialog
				open={dialogOpen}
				onOpenChange={(v) => {
					if (!v) dClose();
				}}
			>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>{editingItem ? `Edit ${label}` : `Tambah ${label}`}</DialogTitle>
					</DialogHeader>
					<CrudForm
						schema={badgeSchema}
						fields={[{ name: "nama", label: "Nama", required: true }]}
						defaultValues={{ nama: editingItem?.nama ?? "" }}
						onSubmit={handleSubmit}
						onCancel={dClose}
						submitLabel={editingItem ? "Simpan" : "Tambah"}
						error={error}
					/>
				</DialogContent>
			</Dialog>
			<ConfirmDeleteDialog
				open={!!deletingItem}
				onOpenChange={(v) => {
					if (!v) setDeletingItem(null);
				}}
				itemLabel={deletingItem?.nama ?? label}
				onConfirm={handleDelete}
				error={delErr}
			/>
		</>
	);
}
