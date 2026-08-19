"use client";

import { Loader2 } from "lucide-react";
import { FieldDate, FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useEditProfilPegawai } from "@/hooks/useEditProfilPegawai";
import { ENUMS } from "@/lib/enums";

interface Props {
	pegawaiId: string | null;
	onClose: () => void;
}

export function SheetEditProfil({ pegawaiId, onClose }: Props) {
	const {
		detailQuery,
		errors,
		isSubmitting,
		setValue,
		watch,
		rhfSubmit,
		onSubmit,
		orgOpts,
		profesiOpts,
		golonganOpts,
		jabQuery,
		jabOpts,
	} = useEditProfilPegawai({ pegawaiId, onClose });

	const open = !!pegawaiId;
	const organisasiId = watch("organisasiId");
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
					<SheetTitle>Edit Profil</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-4 pb-4">
					{detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="profil-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-4 pt-4">
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Identitas</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldText
									label="NIPAM"
									value={watch("nipam")}
									onChange={(v) => setValue("nipam", v)}
									error={e("nipam")}
									required
								/>
								<FieldText
									label="Nama"
									value={watch("nama")}
									onChange={(v) => setValue("nama", v)}
									error={e("nama")}
									required
								/>
								<FieldText
									label="Email"
									type="email"
									value={watch("email")}
									onChange={(v) => setValue("email", v)}
									error={e("email")}
								/>
								<FieldText label="Telp" value={watch("telp")} onChange={(v) => setValue("telp", v)} error={e("telp")} />
							</div>
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">Pribadi</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldSelect
									label="Jenis Kelamin"
									value={watch("jenisKelamin")}
									options={ENUMS.jenisKelamin}
									onChange={(v) => setValue("jenisKelamin", v)}
									error={e("jenisKelamin")}
								/>
								<FieldSelect
									label="Agama"
									value={watch("agama")}
									options={ENUMS.agama}
									onChange={(v) => setValue("agama", v)}
									error={e("agama")}
								/>
								<FieldSelect
									label="Status Kawin"
									value={watch("statusKawin")}
									options={ENUMS.statusKawin}
									onChange={(v) => setValue("statusKawin", v)}
									error={e("statusKawin")}
								/>
								<FieldText
									label="Tempat Lahir"
									value={watch("tempatLahir")}
									onChange={(v) => setValue("tempatLahir", v)}
									error={e("tempatLahir")}
								/>
								<FieldDate
									label="Tanggal Lahir"
									value={watch("tanggalLahir")}
									onChange={(v) => setValue("tanggalLahir", v)}
									error={e("tanggalLahir")}
								/>
							</div>
							<FieldText
								label="Ibu Kandung"
								value={watch("ibuKandung")}
								onChange={(v) => setValue("ibuKandung", v)}
								error={e("ibuKandung")}
							/>
							<FieldTextarea
								label="Alamat"
								value={watch("alamat")}
								onChange={(v) => setValue("alamat", v)}
								error={e("alamat")}
							/>
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">Kepegawaian</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldFk
									label="Organisasi"
									options={orgOpts}
									value={watch("organisasiId")}
									onChange={(v) => {
										setValue("organisasiId", v);
										setValue("jabatanId", undefined);
									}}
									error={e("organisasiId")}
								/>
								<FieldFk
									label="Jabatan"
									options={jabOpts}
									value={watch("jabatanId")}
									onChange={(v) => setValue("jabatanId", v)}
									error={e("jabatanId")}
									disabled={!organisasiId}
									loading={jabQuery.isFetching}
									placeholder={organisasiId ? "Pilih jabatan" : "Pilih organisasi dulu"}
								/>
								<FieldFk
									label="Golongan"
									options={golonganOpts}
									value={watch("golonganId")}
									onChange={(v) => setValue("golonganId", v)}
									error={e("golonganId")}
								/>
								<FieldFk
									label="Profesi"
									options={profesiOpts}
									value={watch("profesiId")}
									onChange={(v) => setValue("profesiId", v)}
									error={e("profesiId")}
								/>
							</div>
						</form>
					)}
				</div>
				{errors.root && <p className="px-4 text-sm text-destructive">{errors.root.message}</p>}
				<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
					<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
						Batal
					</Button>
					<Button type="submit" form="profil-form" disabled={isSubmitting || detailQuery.isPending}>
						{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
						{isSubmitting ? "Menyimpan…" : "Simpan"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
