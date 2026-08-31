"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateBatchMasterProses } from "@/hooks/penggajian/useCreateBatchMasterProses";
import { useDeleteBatchMasterProses } from "@/hooks/penggajian/useDeleteBatchMasterProses";
import { throwIfNotOk } from "@/lib/utils";
import type { GajiBatchMasterProsesResponse, GajiBatchMasterResponse } from "@/types/penggajian/batch";

const tambahanSchema = z.object({
	nama: z.string().min(1, "Nama wajib diisi"),
	jenisGaji: z.enum(["NONE", "PEMASUKAN", "POTONGAN"]),
	nilai: z.number().min(0, "Nilai tidak boleh negatif"),
});

type TambahanForm = z.infer<typeof tambahanSchema>;

const ORG_HEADER_CLASS = "bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-2";

export function TambahanClient() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const sp = useSearchParams();
	const selectedPegawaiId = sp.get("pegawaiId");

	const createProses = useCreateBatchMasterProses();
	const deleteProses = useDeleteBatchMasterProses();

	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedBatchMasterId, setSelectedBatchMasterId] = useState<number | null>(null);

	const {
		data: pegawaiList,
		isPending,
		refetch: refetchList,
	} = useQuery<GajiBatchMasterResponse[]>({
		queryKey: ["penggajian", "batch", params.id, "master"],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master?gajiBatchRootId=${params.id}`);
			throwIfNotOk(res, "Gagal memuat daftar pegawai");
			const body = (await res.json()) as { data: GajiBatchMasterResponse[] };
			return body.data;
		},
		staleTime: 30_000,
	});

	const grouped = (() => {
		if (!pegawaiList) return [];
		const map = new Map<
			string,
			{ id: number; nipam?: string; nama?: string; namaJabatan?: string; golongan?: string }[]
		>();
		for (const p of pegawaiList) {
			const org = p.namaOrganisasi ?? "Tanpa Organisasi";
			if (!map.has(org)) map.set(org, []);
			map.get(org)?.push({
				id: p.id ?? 0,
				nipam: p.nipam,
				nama: p.nama,
				namaJabatan: p.namaJabatan,
				golongan: p.golongan,
			});
		}
		return Array.from(map.entries());
	})();

	const handleSelectPegawai = (id: number) => {
		const p = new URLSearchParams(sp.toString());
		p.set("pegawaiId", String(id));
		router.replace(`/penggajian/batch/${params.id}/tambahan?${p.toString()}`);
	};

	const handleOpenAdd = (batchMasterId: number) => {
		setSelectedBatchMasterId(batchMasterId);
		setDialogOpen(true);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">Tambah komponen gaji di luar sistem</p>
			</div>

			<div className="flex flex-col lg:flex-row gap-4">
				<div className="w-full lg:w-96 shrink-0 rounded-lg border bg-card shadow-sm">
					<div className="p-4 border-b border-border">
						<h2 className="text-sm font-semibold">Daftar Pegawai</h2>
					</div>
					<div className="max-h-[600px] overflow-y-auto">
						{isPending ? (
							<div className="p-4 space-y-2">
								{[1, 2, 3].map((i) => (
									<Skeleton key={i} className="h-12 w-full" />
								))}
							</div>
						) : grouped.length === 0 ? (
							<div className="p-4 text-center text-sm text-muted-foreground">Belum ada data</div>
						) : (
							grouped.map(([org, rows]) => (
								<div key={org}>
									<div className={ORG_HEADER_CLASS}>{org}</div>
									{rows.map((row) => (
										<button
											key={row.id}
											type="button"
											onClick={() => handleSelectPegawai(row.id)}
											className={`w-full text-left px-3 py-2 border-b border-border text-sm transition-colors ${
												selectedPegawaiId === String(row.id) ? "bg-primary/5 text-primary" : "hover:bg-accent/50"
											}`}
										>
											<div className="font-medium">{row.nama}</div>
											<div className="text-xs text-muted-foreground">
												{row.nipam} • {row.namaJabatan ?? "-"}
											</div>
										</button>
									))}
								</div>
							))
						)}
					</div>
				</div>

				<div className="flex-1 min-w-0">
					{selectedPegawaiId ? (
						<PegawaiTambahanPanel
							pegawaiId={selectedPegawaiId}
							onAdd={handleOpenAdd}
							onDelete={async (id) => {
								await deleteProses.mutateAsync(id);
								toast.success("Komponen berhasil dihapus");
								refetchList();
							}}
						/>
					) : (
						<div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
							Pilih pegawai di panel kiri
						</div>
					)}
				</div>
			</div>

			<TambahanDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				onSuccess={() => {
					setDialogOpen(false);
					refetchList();
				}}
				isSubmitting={createProses.isPending}
				onSubmit={async (data) => {
					if (!selectedBatchMasterId) return;
					await createProses.mutateAsync({ ...data, batchMasterId: selectedBatchMasterId });
					toast.success("Komponen berhasil ditambah");
				}}
			/>
		</div>
	);
}

function PegawaiTambahanPanel({
	pegawaiId,
	onAdd,
	onDelete,
}: {
	pegawaiId: string;
	onAdd: (batchMasterId: number) => void;
	onDelete: (id: number) => void;
}) {
	const { data: komponen, isPending } = useQuery({
		queryKey: ["penggajian", "batch", "pegawai", pegawaiId, "proses"],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/pegawai/${pegawaiId}`);
			throwIfNotOk(res, "Gagal memuat data");
			const body = (await res.json()) as { data: GajiBatchMasterResponse };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	const { data: tambahanList, isPending: isTambahanPending } = useQuery<GajiBatchMasterProsesResponse[]>({
		queryKey: ["penggajian", "batch", "proses", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/penggajian/batch/master/proses/${pegawaiId}/master`);
			throwIfNotOk(res, "Gagal memuat tambahan komponen");
			const body = (await res.json()) as { data: GajiBatchMasterProsesResponse[] };
			return body.data;
		},
		enabled: !!pegawaiId,
		staleTime: 30_000,
	});

	if (isPending) {
		return (
			<div className="space-y-3">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-64 w-full" />
			</div>
		);
	}

	if (!komponen) {
		return <div className="text-center text-sm text-muted-foreground py-8">Data tidak ditemukan</div>;
	}

	const tambahan = tambahanList ?? [];
	const pemasukan = tambahan.filter((t) => t.jenisGaji === "PEMASUKAN");
	const potongan = tambahan.filter((t) => t.jenisGaji === "POTONGAN");

	return (
		<div className="rounded-lg border bg-card shadow-sm p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="font-semibold">{komponen.nama}</h3>
					<p className="text-sm text-muted-foreground">
						{komponen.nipam} • {komponen.namaJabatan ?? "-"}
					</p>
				</div>
				<Button size="sm" onClick={() => onAdd(komponen.id ?? 0)}>
					<Plus className="size-4 mr-1" /> Tambah Komponen
				</Button>
			</div>

			{/* Pemasukan */}
			<div>
				<h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Pemasukan Tambahan</h4>
				{isTambahanPending ? (
					<Skeleton className="h-16 w-full" />
				) : pemasukan.length === 0 ? (
					<p className="text-sm text-muted-foreground">Belum ada tambahan</p>
				) : (
					<div className="space-y-1">
						{pemasukan.map((item) => (
							<div key={item.id} className="flex items-center justify-between px-3 py-2 border rounded text-sm">
								<span>{item.nama}</span>
								<div className="flex items-center gap-2">
									<span className="font-medium">{fmtRupiah(item.nilai)}</span>
									<button
										type="button"
										onClick={() => onDelete(item.id ?? 0)}
										className="text-destructive hover:text-destructive/80"
									>
										<Trash2 className="size-4" />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Potongan */}
			<div>
				<h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Potongan Tambahan</h4>
				{isTambahanPending ? (
					<Skeleton className="h-16 w-full" />
				) : potongan.length === 0 ? (
					<p className="text-sm text-muted-foreground">Belum ada tambahan</p>
				) : (
					<div className="space-y-1">
						{potongan.map((item) => (
							<div key={item.id} className="flex items-center justify-between px-3 py-2 border rounded text-sm">
								<span>{item.nama}</span>
								<div className="flex items-center gap-2">
									<span className="font-medium">{fmtRupiah(item.nilai)}</span>
									<button
										type="button"
										onClick={() => onDelete(item.id ?? 0)}
										className="text-destructive hover:text-destructive/80"
									>
										<Trash2 className="size-4" />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

function TambahanDialog({
	open,
	onOpenChange,
	onSuccess,
	isSubmitting,
	onSubmit,
}: {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess: () => void;
	isSubmitting: boolean;
	onSubmit: (data: TambahanForm) => Promise<void>;
}) {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<TambahanForm>({
		resolver: zodResolver(tambahanSchema),
		defaultValues: { nama: "", jenisGaji: "PEMASUKAN", nilai: 0 },
	});

	const handleFormSubmit = async (data: TambahanForm) => {
		await onSubmit(data);
		reset();
		onSuccess();
	};

	const handleClose = (v: boolean) => {
		if (!v) reset();
		onOpenChange(v);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Tambah Komponen Gaji</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="nama" className="text-sm font-medium">
							Nama <span className="text-destructive">*</span>
						</Label>
						<Input id="nama" {...register("nama")} className="h-11" />
						{errors.nama && <p className="text-xs text-destructive">{errors.nama.message}</p>}
					</div>

					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							Jenis Gaji <span className="text-destructive">*</span>
						</Label>
						<Select
							value={watch("jenisGaji")}
							onValueChange={(v) => setValue("jenisGaji", v as TambahanForm["jenisGaji"])}
						>
							<SelectTrigger className="h-11">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="PEMASUKAN">Pemasukan</SelectItem>
								<SelectItem value="POTONGAN">Potongan</SelectItem>
								<SelectItem value="NONE">-</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="nilai" className="text-sm font-medium">
							Nilai <span className="text-destructive">*</span>
						</Label>
						<Input id="nilai" type="number" {...register("nilai", { valueAsNumber: true })} className="h-11" />
						{errors.nilai && <p className="text-xs text-destructive">{errors.nilai.message}</p>}
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							size="lg"
							onClick={() => handleClose(false)}
							disabled={isSubmitting}
						>
							Batal
						</Button>
						<Button type="submit" size="lg" disabled={isSubmitting}>
							{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
							Simpan
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

function fmtRupiah(v: number | undefined): string {
	return `Rp ${Number(v ?? 0).toLocaleString("id-ID")}`;
}
