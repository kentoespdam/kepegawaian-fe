"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type TambahanForm, tambahanSchema } from "@/lib/validations/penggajian/tambahan.schema";

export function TambahanDialog({
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
