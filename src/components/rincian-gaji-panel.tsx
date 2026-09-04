"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TambahanDialog } from "@/components/tambah-komponen-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { useBatchMasterProses } from "@/hooks/penggajian/useBatchMasterProses";
import { cn, fmtRupiah } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse, GajiBatchMasterResponse } from "@/types/penggajian/batch";

interface KomponenTableProps {
	items: GajiBatchMasterProsesResponse[];
	emptyLabel: string;
	canEdit?: boolean;
	deletingId?: number | null;
	onDelete?: (id: number) => void;
	isDeletePending?: boolean;
	highlightAddStyle?: string;
}

function KomponenTable({
	items,
	emptyLabel,
	canEdit = false,
	deletingId,
	onDelete,
	isDeletePending = false,
	highlightAddStyle = "text-sky-600 dark:text-sky-400 font-semibold",
}: KomponenTableProps) {
	const total = items.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);
	const colSpan = canEdit ? 4 : 3;

	return (
		<div className="border rounded-md overflow-hidden bg-card text-xs shadow-2xs">
			<table className="w-full border-collapse">
				<thead className="bg-primary text-primary-foreground font-semibold">
					<tr>
						<th className="py-1.5 px-2 text-center w-10 border-r border-primary-foreground/20">No</th>
						<th className="py-1.5 px-2 border-r border-primary-foreground/20 text-left">Komponen Gaji</th>
						<th className="py-1.5 px-2.5 text-right whitespace-nowrap">Jumlah</th>
						{canEdit && <th className="py-1.5 px-1 text-center w-9 border-l border-primary-foreground/20">Aksi</th>}
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{items.length === 0 ? (
						<tr>
							<td colSpan={colSpan} className="py-3 text-center text-muted-foreground italic">
								{emptyLabel}
							</td>
						</tr>
					) : (
						items.map((item, idx) => {
							const isAdd = item.kode?.startsWith("ADD_");
							const isRowDeleting = deletingId === item.id;
							return (
								<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15 transition-colors">
									<td className="py-1 px-1 text-center text-muted-foreground font-mono text-[11px] w-10">{idx + 1}</td>
									<td className={`py-1.5 px-2 ${isAdd ? highlightAddStyle : "text-foreground font-medium"}`}>
										{item.nama ?? "-"}
									</td>
									<td className="py-1.5 px-2.5 text-right tabular-nums whitespace-nowrap font-medium text-foreground">
										{fmtRupiah(item.nilai)}
									</td>
									{canEdit && (
										<td className="py-0.5 px-1 text-center w-9">
											{isAdd && item.id ? (
												<Button
													variant="ghost"
													size="icon-xs"
													onClick={() => item.id && onDelete?.(item.id)}
													disabled={isDeletePending}
													className="size-6 text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer mx-auto"
													title="Hapus Komponen"
													aria-label={`Hapus ${item.nama ?? "komponen"}`}
												>
													{isRowDeleting ? (
														<Loader2 className="size-3.5 animate-spin" />
													) : (
														<Trash2 className="size-3.5" />
													)}
												</Button>
											) : (
												<span className="text-muted-foreground/40 select-none text-[11px]">-</span>
											)}
										</td>
									)}
								</tr>
							);
						})
					)}
				</tbody>
				{items.length > 0 && (
					<tfoot className="border-t-2 border-border font-bold bg-primary/10 text-primary">
						<tr>
							<td colSpan={2} className="py-2 px-2 text-right">
								Total
							</td>
							<td className="py-2 px-2.5 text-right tabular-nums whitespace-nowrap">{fmtRupiah(total)}</td>
							{canEdit && <td className="py-2 px-1 text-center w-9" />}
						</tr>
					</tfoot>
				)}
			</table>
		</div>
	);
}

export interface RincianGajiPanelProps {
	batchMasterId?: number | null;
	selectedPegawai?: GajiBatchMasterResponse | null;
	canEdit?: boolean;
	showAddButton?: boolean;
	onDataChange?: () => void;
	className?: string;
}

export function RincianGajiPanel({
	batchMasterId,
	selectedPegawai,
	canEdit = false,
	showAddButton = false,
	onDataChange,
	className,
}: RincianGajiPanelProps) {
	const resolvedId = batchMasterId ?? selectedPegawai?.id ?? null;
	const pegawaiNama = selectedPegawai?.nama;

	const qc = useQueryClient();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const { data: prosesList, isPending } = useBatchMasterProses(String(resolvedId ?? 0));

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

	const items = prosesList ?? [];
	const penghasilanList = items.filter((k) => k.jenisGaji === "PEMASUKAN");
	const potonganList = items.filter((k) => k.jenisGaji === "POTONGAN");

	return (
		<div
			className={cn(
				"w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-xs overflow-hidden sticky top-4",
				className,
			)}
		>
			<div className="p-3 border-b bg-muted/20 flex items-center justify-between">
				<h2 className="text-xs font-bold uppercase tracking-wider text-foreground">Rincian Gaji</h2>
				{pegawaiNama && (
					<span className="text-[11px] text-muted-foreground truncate max-w-44" title={pegawaiNama}>
						{pegawaiNama}
					</span>
				)}
			</div>

			{!resolvedId ? (
				<div className="p-8 text-center text-xs text-muted-foreground">
					Klik salah satu baris pegawai pada tabel di kiri untuk melihat rincian gaji.
				</div>
			) : isPending ? (
				<div className="p-4 space-y-3">
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-24 w-full" />
					<Skeleton className="h-6 w-32" />
					<Skeleton className="h-24 w-full" />
				</div>
			) : (
				<div className="p-3 space-y-4 min-h-150">
					{/* Seksi 1: Penghasilan */}
					<div className="space-y-2">
						<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
							Jenis: Penghasilan
						</div>

						{showAddButton && (
							<Button
								size="sm"
								onClick={() => setDialogOpen(true)}
								disabled={!canEdit}
								className="w-full h-8 text-xs font-semibold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
							>
								<Plus className="size-3.5" />
								Tambah Komponen
							</Button>
						)}

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
						<div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
							Jenis: Potongan
						</div>

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

					{showAddButton && (
						<TambahanDialog
							open={dialogOpen}
							onOpenChange={setDialogOpen}
							onSuccess={() => setDialogOpen(false)}
							isSubmitting={createProses.isPending}
							onSubmit={async (data) => {
								await createProses.mutateAsync({
									batchMasterId: Number(resolvedId),
									nama: data.nama,
									jenisGaji: data.jenisGaji,
									nilai: data.nilai,
								});
							}}
						/>
					)}
				</div>
			)}
		</div>
	);
}

// Alias for backward compatibility
export const PegawaiDetailKomponenPanel = RincianGajiPanel;
