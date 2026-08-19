"use client";

import { Loader2 } from "lucide-react";
import { FieldDate, FieldFk, FieldSelect, FieldText } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEditGajiPegawai } from "@/hooks/useEditGajiPegawai";

interface Props {
	pegawaiId: string | null;
	onClose: () => void;
}

export function SheetEditGaji({ pegawaiId, onClose }: Props) {
	const {
		detailQuery,
		errors,
		isSubmitting,
		setValue,
		watch,
		rhfSubmit,
		onSubmit,
		pajakOpts,
		statusPegawaiOpts,
		rumahDinasOpts,
		gajiProfilOpts,
	} = useEditGajiPegawai({ pegawaiId, onClose });

	const open = !!pegawaiId;
	const e = (name: keyof typeof errors) => (errors[name] ? String(errors[name]?.message ?? "") : undefined);

	return (
		<Sheet
			open={open}
			onOpenChange={(v) => {
				if (!v) onClose();
			}}
		>
			<SheetContent className="sm:max-w-120 flex flex-col gap-0 p-0">
				<SheetHeader className="shrink-0">
					<SheetTitle>Edit Gaji</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-4 pb-4">
					{detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="gaji-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-4 pt-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldSelect
									label="Status Pegawai"
									value={watch("statusPegawai")}
									options={statusPegawaiOpts}
									onChange={(v) => setValue("statusPegawai", v, { shouldValidate: true })}
									error={e("statusPegawai")}
									required
								/>
								<FieldDate
									label="TMT Kerja"
									value={watch("tmtKerja")}
									onChange={(v) => setValue("tmtKerja", v)}
									error={e("tmtKerja")}
								/>
								<FieldDate
									label="TMT Pensiun"
									value={watch("tmtPensiun")}
									onChange={(v) => setValue("tmtPensiun", v)}
									error={e("tmtPensiun")}
								/>
							</div>
							<FieldFk
								label="Kode Pajak"
								options={pajakOpts}
								value={watch("kodePajakId")}
								onChange={(v) => setValue("kodePajakId", v ?? "", { shouldValidate: true })}
								error={e("kodePajakId")}
								required
							/>
							<FieldFk
								label="Profil Gaji"
								options={gajiProfilOpts}
								value={watch("gajiProfilId")}
								onChange={(v) => setValue("gajiProfilId", v ?? "", { shouldValidate: true })}
								error={e("gajiProfilId")}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldText
									label="Gaji Pokok"
									type="number"
									value={watch("gajiPokok")}
									onChange={(v) => setValue("gajiPokok", v)}
									error={e("gajiPokok")}
									placeholder="0"
								/>
								<FieldText
									label="PHDP"
									type="number"
									value={watch("phdp")}
									onChange={(v) => setValue("phdp", v)}
									error={e("phdp")}
									placeholder="0"
								/>
							</div>
							<FieldSelect
								label="Askes"
								value={watch("isAskes")}
								options={[
									{ value: "true", label: "Ya" },
									{ value: "false", label: "Tidak" },
								]}
								onChange={(v) => setValue("isAskes", v)}
								error={e("isAskes")}
							/>
							<FieldFk
								label="Rumah Dinas"
								options={rumahDinasOpts}
								value={watch("rumahDinasId")}
								onChange={(v) => setValue("rumahDinasId", v)}
								error={e("rumahDinasId")}
							/>
						</form>
					)}
				</div>
				{errors.root && <p className="px-4 text-sm text-destructive">{errors.root.message}</p>}
				<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
					<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
						Batal
					</Button>
					<Button type="submit" form="gaji-form" disabled={isSubmitting || detailQuery.isPending}>
						{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
						{isSubmitting ? "Menyimpan\u2026" : "Simpan"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
