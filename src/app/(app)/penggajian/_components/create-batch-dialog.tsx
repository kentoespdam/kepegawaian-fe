"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBatch } from "@/hooks/penggajian/useCreateBatch";

const schema = z.object({
	tahun: z.string().min(1, "Tahun wajib diisi"),
	bulan: z.string().min(1, "Bulan wajib diisi"),
	diProsesOleh: z.string().min(1, "Di Proses Oleh wajib diisi"),
	jabatanPemroses: z.string().min(1, "Jabatan Pemroses wajib diisi"),
});

type FormValues = z.infer<typeof schema>;

interface CreateBatchDialogProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	onSuccess: (id: string) => void;
	userName?: string;
	jabatanNama?: string;
}

export function CreateBatchDialog({ open, onOpenChange, onSuccess, userName, jabatanNama }: CreateBatchDialogProps) {
	const createBatch = useCreateBatch();
	const fileRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const now = new Date();
	const currentYear = String(now.getFullYear());
	const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			tahun: currentYear,
			bulan: currentMonth,
			diProsesOleh: userName ?? "",
			jabatanPemroses: jabatanNama ?? "Staf SDM",
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			const result = await createBatch.mutateAsync({
				...data,
				file: file ?? undefined,
			});
			toast.success("Proses gaji baru berhasil dibuat");
			reset();
			setFile(null);
			if (fileRef.current) fileRef.current.value = "";
			onSuccess(result.id ?? "");
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal membuat proses gaji");
		}
	};

	const handleClose = (v: boolean) => {
		if (!v) {
			reset();
			setFile(null);
			if (fileRef.current) fileRef.current.value = "";
		}
		onOpenChange(v);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold">Buat Proses Gaji Baru</DialogTitle>
					<p className="text-xs text-muted-foreground mt-0.5">
						Inisiasi batch payroll bulanan baru untuk seluruh pegawai Perumdam Tirta Satria
					</p>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<Label htmlFor="tahun" className="text-xs font-semibold">
								Tahun <span className="text-destructive">*</span>
							</Label>
							<Input id="tahun" {...register("tahun")} placeholder="2026" className="h-10 text-sm" />
							{errors.tahun ? (
								<p className="text-xs text-destructive">{errors.tahun.message}</p>
							) : (
								<p className="text-[11px] text-muted-foreground">Format 4 digit (e.g. 2026)</p>
							)}
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="bulan" className="text-xs font-semibold">
								Bulan <span className="text-destructive">*</span>
							</Label>
							<Input id="bulan" {...register("bulan")} placeholder="08" className="h-10 text-sm" />
							{errors.bulan ? (
								<p className="text-xs text-destructive">{errors.bulan.message}</p>
							) : (
								<p className="text-[11px] text-muted-foreground">Format 2 digit (01-12)</p>
							)}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="diProsesOleh" className="text-xs font-semibold">
									Di Proses Oleh <span className="text-destructive">*</span>
								</Label>
								<span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Otomatis</span>
							</div>
							<Input id="diProsesOleh" {...register("diProsesOleh")} readOnly className="h-10 text-sm bg-muted/60" />
							{errors.diProsesOleh && <p className="text-xs text-destructive">{errors.diProsesOleh.message}</p>}
						</div>
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="jabatanPemroses" className="text-xs font-semibold">
									Jabatan Pemroses <span className="text-destructive">*</span>
								</Label>
								<span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Otomatis</span>
							</div>
							<Input
								id="jabatanPemroses"
								{...register("jabatanPemroses")}
								readOnly
								className="h-10 text-sm bg-muted/60"
							/>
							{errors.jabatanPemroses && <p className="text-xs text-destructive">{errors.jabatanPemroses.message}</p>}
						</div>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="file" className="text-xs font-semibold">
							Lampiran Potongan TKK <span className="text-muted-foreground font-normal">(opsional)</span>
						</Label>
						<Input
							id="file"
							type="file"
							ref={fileRef}
							onChange={(e) => setFile(e.target.files?.[0] ?? null)}
							className="h-10 text-sm file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
						/>
						<p className="text-[11px] text-muted-foreground">
							Upload file lampiran potongan TKK jika ada (format PDF, Excel, atau CSV)
						</p>
					</div>

					<div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
						<Button
							type="button"
							variant="outline"
							size="default"
							onClick={() => handleClose(false)}
							disabled={createBatch.isPending}
						>
							Batal
						</Button>
						<Button type="submit" size="default" disabled={createBatch.isPending}>
							{createBatch.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
							{createBatch.isPending ? "Membuat…" : "Buat Proses Gaji"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
