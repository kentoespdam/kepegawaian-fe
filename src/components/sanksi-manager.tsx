"use client";

import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";
import { CrudForm } from "@/components/crud-form";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRoles } from "@/hooks/useRoles";
import { useSanksiMutations } from "@/hooks/useSanksiMutations";
import { can } from "@/lib/auth/can";

interface SanksiRow {
	id?: number;
	kode?: string;
	keterangan?: string;
}

interface SanksiManagerProps {
	jenisSpId: number;
	items: SanksiRow[];
}

const sanksiSchema = z.object({
	kode: z.string().min(1, "Kode wajib diisi"),
	keterangan: z.string().min(1, "Keterangan wajib diisi"),
});

export function SanksiManager({ jenisSpId, items }: SanksiManagerProps) {
	const roles = useRoles();
	const { create, update, remove } = useSanksiMutations(jenisSpId);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<SanksiRow | null>(null);
	const [deletingItem, setDeletingItem] = useState<SanksiRow | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [delErr, setDelErr] = useState<string | null>(null);
	const canUpdate = can(roles, "update", "jenis-sp");
	const canDelete = can(roles, "delete", "jenis-sp");

	const handleSubmit = async (data: { kode: string; keterangan: string }) => {
		setError(null);
		try {
			if (!editingItem) {
				await create.mutateAsync(data);
				toast.success("Sanksi berhasil ditambah");
			} else {
				const itemId = editingItem.id;
				if (!itemId) throw new Error("ID sanksi tidak valid");
				await update.mutateAsync({ id: String(itemId), data });
				toast.success("Sanksi berhasil diubah");
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
			toast.success("Sanksi berhasil dihapus");
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
						<span>
							{item.kode} — {item.keterangan}
						</span>
						{canUpdate && (
							<button
								type="button"
								onClick={() => {
									setEditingItem(item);
									setError(null);
									setDialogOpen(true);
								}}
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
						onClick={() => {
							setEditingItem(null);
							setError(null);
							setDialogOpen(true);
						}}
						className="inline-flex size-5 items-center justify-center rounded-full border border-dashed border-muted-foreground/40 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
						aria-label="Tambah sanksi"
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
						<DialogTitle>{editingItem ? "Edit Sanksi" : "Tambah Sanksi"}</DialogTitle>
					</DialogHeader>
					<CrudForm
						schema={sanksiSchema}
						fields={[
							{ name: "kode", label: "Kode", required: true },
							{ name: "keterangan", label: "Keterangan", required: true },
						]}
						defaultValues={{ kode: editingItem?.kode ?? "", keterangan: editingItem?.keterangan ?? "" }}
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
				itemLabel={deletingItem ? `${deletingItem.kode} — ${deletingItem.keterangan}` : "Sanksi"}
				onConfirm={handleDelete}
				error={delErr}
			/>
		</>
	);
}
