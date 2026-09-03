"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { penggajianKeys } from "@/hooks/keys/penggajian-keys";
import { fmtRupiah, throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse } from "@/types/penggajian/batch";
import { TambahanDialog } from "./tambah-komponen-dialog";

interface RincianGajiPanelProps {
	batchMasterId: number | null;
	canEdit: boolean;
	onDataChange?: () => void;
}

export function RincianGajiPanel({ batchMasterId, canEdit, onDataChange }: RincianGajiPanelProps) {
	const qc = useQueryClient();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const { data: prosesList, isPending } = useQuery<GajiBatchMasterProsesResponse[]>({
		queryKey: penggajianKeys.batch.pegawaiProses(String(batchMasterId ?? 0)),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${batchMasterId}/master`);
			throwIfNotOk(res, "Gagal memuat rincian komponen gaji");
			const body = (await res.json()) as { data: GajiBatchMasterProsesResponse[] };
			return body.data ?? [];
		},
		enabled: !!batchMasterId,
		staleTime: 30_000,
	});

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

	const penghasilanList = (prosesList ?? []).filter((k) => k.jenisGaji === "PEMASUKAN");
	const potonganList = (prosesList ?? []).filter((k) => k.jenisGaji === "POTONGAN");

	const totalPenghasilan = penghasilanList.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);
	const totalPotongan = potonganList.reduce((acc, curr) => acc + (curr.nilai ?? 0), 0);

	return (
		<div className="p-3 space-y-4 max-h-165 overflow-y-auto">
			{/* Seksi 1: Penghasilan */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Jenis: Penghasilan</div>
				</div>

				<Button
					size="sm"
					onClick={() => setDialogOpen(true)}
					disabled={!canEdit}
					className="w-full h-8 text-xs font-semibold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
				>
					<Plus className="size-3.5" />
					Tambah Komponen
				</Button>

				<div className="border rounded-md overflow-hidden bg-card text-xs">
					<table className="w-full border-collapse">
						<thead className="bg-emerald-600 text-white font-semibold">
							<tr>
								<th className="py-1.5 px-2 text-center w-12 border-r border-white/20">Aksi</th>
								<th className="py-1.5 px-2 border-r border-white/20 text-left">Komponen Gaji</th>
								<th className="py-1.5 px-2 text-right">Jumlah</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{penghasilanList.length === 0 ? (
								<tr>
									<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
										Tidak ada komponen penghasilan
									</td>
								</tr>
							) : (
								penghasilanList.map((item, idx) => {
									const isAdd = item.kode?.startsWith("ADD_");
									const isRowDeleting = deletingId === item.id;
									return (
										<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
											<td className="py-1 px-1 text-center">
												{canEdit && isAdd && item.id ? (
													<Button
														variant="ghost"
														size="icon"
														onClick={() => item.id && deleteProses.mutate(item.id)}
														disabled={deleteProses.isPending}
														className="size-6 text-destructive hover:bg-destructive/10"
														title="Hapus Komponen"
													>
														{isRowDeleting ? (
															<Loader2 className="size-3 animate-spin" />
														) : (
															<Trash2 className="size-3" />
														)}
													</Button>
												) : (
													<span className="text-muted-foreground/60 text-[11px]">{idx + 1}</span>
												)}
											</td>
											<td
												className={`py-1.5 px-2 ${isAdd ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-foreground"}`}
											>
												{item.nama ?? "-"}
											</td>
											<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
										</tr>
									);
								})
							)}
						</tbody>
						{penghasilanList.length > 0 && (
							<tfoot className="border-t-2 border-border font-bold bg-muted/40 text-foreground">
								<tr>
									<td colSpan={2} className="py-1.5 px-2 text-right">
										Total
									</td>
									<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(totalPenghasilan)}</td>
								</tr>
							</tfoot>
						)}
					</table>
				</div>
			</div>

			{/* Seksi 2: Potongan */}
			<div className="space-y-2">
				<div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">Jenis: Potongan</div>
				<div className="border rounded-md overflow-hidden bg-card text-xs">
					<table className="w-full border-collapse">
						<thead className="bg-emerald-600 text-white font-semibold">
							<tr>
								<th className="py-1.5 px-2 text-center w-12 border-r border-white/20">Aksi</th>
								<th className="py-1.5 px-2 border-r border-white/20 text-left">Komponen Gaji</th>
								<th className="py-1.5 px-2 text-right">Jumlah</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{potonganList.length === 0 ? (
								<tr>
									<td colSpan={3} className="py-3 text-center text-muted-foreground italic">
										Tidak ada komponen potongan
									</td>
								</tr>
							) : (
								potonganList.map((item, idx) => {
									const isAdd = item.kode?.startsWith("ADD_");
									const isRowDeleting = deletingId === item.id;
									return (
										<tr key={item.id ?? idx} className="hover:bg-accent/30 odd:bg-card even:bg-muted/15">
											<td className="py-1 px-1 text-center">
												{canEdit && isAdd && item.id ? (
													<Button
														variant="ghost"
														size="icon"
														onClick={() => item.id && deleteProses.mutate(item.id)}
														disabled={deleteProses.isPending}
														className="size-6 text-destructive hover:bg-destructive/10"
														title="Hapus Komponen"
													>
														{isRowDeleting ? (
															<Loader2 className="size-3 animate-spin" />
														) : (
															<Trash2 className="size-3" />
														)}
													</Button>
												) : (
													<span className="text-muted-foreground/60 text-[11px]">{idx + 1}</span>
												)}
											</td>
											<td
												className={`py-1.5 px-2 ${isAdd ? "text-sky-600 dark:text-sky-400 font-semibold" : "text-foreground"}`}
											>
												{item.nama ?? "-"}
											</td>
											<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(item.nilai)}</td>
										</tr>
									);
								})
							)}
						</tbody>
						{potonganList.length > 0 && (
							<tfoot className="border-t-2 border-border font-bold bg-muted/40 text-foreground">
								<tr>
									<td colSpan={2} className="py-1.5 px-2 text-right">
										Total
									</td>
									<td className="py-1.5 px-2 text-right tabular-nums">{fmtRupiah(totalPotongan)}</td>
								</tr>
							</tfoot>
						)}
					</table>
				</div>
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
