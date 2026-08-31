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
}

export function CreateBatchDialog({ open, onOpenChange, onSuccess }: CreateBatchDialogProps) {
	const createBatch = useCreateBatch();
	const fileRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
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
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Buat Proses Gaji Baru</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="tahun" className="text-sm font-medium">
							Tahun <span className="text-destructive">*</span>
						</Label>
						<Input id="tahun" {...register("tahun")} placeholder="2026" className="h-11" />
						{errors.tahun && <p className="text-xs text-destructive">{errors.tahun.message}</p>}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="bulan" className="text-sm font-medium">
							Bulan <span className="text-destructive">*</span>
						</Label>
						<Input id="bulan" {...register("bulan")} placeholder="08" className="h-11" />
						{errors.bulan && <p className="text-xs text-destructive">{errors.bulan.message}</p>}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="diProsesOleh" className="text-sm font-medium">
							Di Proses Oleh <span className="text-destructive">*</span>
						</Label>
						<Input id="diProsesOleh" {...register("diProsesOleh")} className="h-11" />
						{errors.diProsesOleh && <p className="text-xs text-destructive">{errors.diProsesOleh.message}</p>}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="jabatanPemroses" className="text-sm font-medium">
							Jabatan Pemroses <span className="text-destructive">*</span>
						</Label>
						<Input id="jabatanPemroses" {...register("jabatanPemroses")} className="h-11" />
						{errors.jabatanPemroses && <p className="text-xs text-destructive">{errors.jabatanPemroses.message}</p>}
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="file" className="text-sm font-medium">
							Lampiran Potongan TKK
						</Label>
						<Input
							id="file"
							type="file"
							ref={fileRef}
							onChange={(e) => setFile(e.target.files?.[0] ?? null)}
							className="h-11"
						/>
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							size="lg"
							onClick={() => handleClose(false)}
							disabled={createBatch.isPending}
						>
							Batal
						</Button>
						<Button type="submit" size="lg" disabled={createBatch.isPending}>
							{createBatch.isPending && <Loader2 className="mr-1.5 size-4 animate-spin" />}
							{createBatch.isPending ? "Membuat…" : "Buat Proses Gaji"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
