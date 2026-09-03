"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchMasterProses } from "@/hooks/penggajian/useBatchMasterProses";
import { fmtRupiah } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse } from "@/types/penggajian/batch";
import { TambahanDialog } from "./tambah-komponen-dialog";

interface KomponenTableProps {
	items: GajiBatchMasterProsesResponse[];
	emptyLabel: string;
	canEdit: boolean;
	deletingId: number | null;
	onDelete: (id: number) => void;
	isDeletePending: boolean;
	highlightAddStyle?: string;
}

function KomponenTable({
	items,
	emptyLabel,
	canEdit,
	deletingId,
	onDelete,
	isDeletePending,
	highlightAddStyle = "text-sky-600 dark:text-sky-400 font-semibold",
}: KomponenTableProps) {
	const total = items.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);

	return (
		<div className="border rounded-md overflow-hidden bg-card text-xs">
			<table className="w-full border-collapse">
				<thead className="bg-primary text-primary-foreground font-semibold">
					<tr>
						<th className="py-1.5 px-2 text-center w-12 border-r border-primary-foreground/20">Aksi</th>
						<th className="py-1.5 px-2 border-r border-primary-foreground/20 text-left">Komponen Gaji</th>
						<th className="py-1.5 px-2 text-right">Jumlah</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{items.length === 0 ? (
						<tr>
							<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
								{emptyLabel}
							</td>
						</tr>
					) : (
						items.map((item, idx) => {
							const isAdd = item.kode?.startsWith("ADD_");
							const isRowDeleting = deletingId === item.id;
							return (
								<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
									<td className="py-1 px-1 text-center">
										{canEdit && isAdd && item.id ? (
											<Button
												variant="ghost"
												size="icon"
												onClick={() => item.id && onDelete(item.id)}
												disabled={isDeletePending}
												className="size-6 text-destructive hover:bg-destructive/10"
												title="Hapus Komponen"
											>
												{isRowDeleting ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
											</Button>
										) : (
											<span className="text-muted-foreground text-[11px]">{idx + 1}</span>
										)}
									</td>
									<td className={`py-1.5 px-2 ${isAdd ? highlightAddStyle : "text-foreground"}`}>{item.nama ?? "-"}</td>
									<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
								</tr>
							);
						})
					)}
				</tbody>
				{items.length > 0 && (
					<tfoot className="border-t-2 border-border font-bold bg-primary/10 text-primary">
						<tr>
							<td colSpan={2} className="py-1.5 px-2 text-right">
								Total
							</td>
							<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(total)}</td>
						</tr>
					</tfoot>
				)}
			</table>
		</div>
	);
}

interface RincianGajiPanelProps {
	batchMasterId: number | null;
	canEdit: boolean;
	onDataChange?: () => void;
}

export function RincianGajiPanel({ batchMasterId, canEdit, onDataChange }: RincianGajiPanelProps) {
	const qc = useQueryClient();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const { data: prosesList, isPending } = useBatchMasterProses(String(batchMasterId ?? 0));

	const createProses = useMutation({
		mutationFn: async (data: { batchMasterId: number; nama: string; jenisGaji: string; nilai: number }) => {
			const res = await fetch("/api/proxy/penggajian/batch/master/proses", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `Gagal menambahkan komponen (${res.status})`);
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() });
			toast.success("Komponen gaji berhasil ditambahkan");
			onDataChange?.();
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal menambahkan komponen");
		},
	});

	const deleteProses = useMutation({
		mutationFn: async (id: number) => {
			setDeletingId(id);
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `Gagal menghapus komponen (${res.status})`);
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: penggajianKeys.batch.all() });
			toast.success("Komponen gaji berhasil dihapus");
			onDataChange?.();
		},
		onError: (err: Error) => {
			toast.error(err.message || "Gagal menghapus komponen");
		},
		onSettled: () => {
			setDeletingId(null);
		},
	});

	if (!batchMasterId) {
		return (
			<div className="p-8 text-center text-xs text-muted-foreground">
				Klik salah satu baris pegawai pada tabel di kiri untuk melihat dan mengelola rincian gaji.
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="p-4 space-y-3">
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-6 w-32" />
				<Skeleton className="h-24 w-full" />
			</div>
		);
	}

	const items = prosesList ?? [];
	const penghasilanList = items.filter((k) => k.jenisGaji === "PEMASUKAN");
	const potonganList = items.filter((k) => k.jenisGaji === "POTONGAN");

	return (
		<div className="p-3 space-y-4 min-h-165">
			{/* Seksi 1: Penghasilan */}
			<div className="space-y-2">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
					Jenis: Penghasilan
				</div>

				<Button
					size="sm"
					onClick={() => setDialogOpen(true)}
					disabled={!canEdit}
					className="w-full h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
				>
					<Plus className="size-3.5" />
					Tambah Komponen
				</Button>

				<KomponenTable
					items={penghasilanList}
					emptyLabel="Tidak ada komponen penghasilan"
					canEdit={canEdit}
					deletingId={deletingId}
					onDelete={(id) => deleteProses.mutate(id)}
					isDeletePending={deleteProses.isPending}
					highlightAddStyle="text-primary font-medium"
				/>
			</div>

			{/* Seksi 2: Potongan */}
			<div className="space-y-2">
				<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Jenis: Potongan</div>

				<KomponenTable
					items={potonganList}
					emptyLabel="Tidak ada komponen potongan"
					canEdit={canEdit}
					deletingId={deletingId}
					onDelete={(id) => deleteProses.mutate(id)}
					isDeletePending={deleteProses.isPending}
					highlightAddStyle="text-sky-600 dark:text-sky-400 font-semibold"
				/>
			</div>

			<TambahanDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSuccess={() => setDialogOpen(false)}
				isSubmitting={createProses.isPending}
				onSubmit={async (data) => {
					await createProses.mutateAsync({
						batchMasterId: Number(batchMasterId),
						nama: data.nama,
						jenisGaji: data.jenisGaji,
						nilai: data.nilai,
					});
				}}
			/>
		</div>
	);
}
