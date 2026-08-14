"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { api } from "@/lib/api/client";
import { ENUMS } from "@/lib/enums";
import { apiErrorMessage } from "@/lib/utils";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";

const schema = z.object({
	nipam: z.string().min(1, "NIPAM wajib"),
	nama: z.string().min(1, "Nama wajib"),
	jenisKelamin: z.string().optional(),
	statusKawin: z.string().optional(),
	agama: z.string().optional(),
	tempatLahir: z.string().optional(),
	tanggalLahir: z.string().optional(),
	alamat: z.string().optional(),
	ibuKandung: z.string().optional(),
	telp: z.string().optional(),
	golonganId: z.string().optional(),
	organisasiId: z.string().optional(),
	jabatanId: z.string().optional(),
	profesiId: z.string().optional(),
	email: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// Normalize nested FK to scalar id string (bd memory 9x2)
function toDefaults(d: PegawaiResponseDetail): Record<string, unknown> {
	const b = d.biodata;
	return {
		nipam: d.nipam ?? "",
		nama: b?.nama ?? "",
		jenisKelamin: b?.jenisKelamin ?? "",
		statusKawin: b?.statusKawin ?? "",
		agama: b?.agama ?? "",
		tempatLahir: b?.tempatLahir ?? "",
		tanggalLahir: b?.tanggalLahir ?? "",
		alamat: b?.alamat ?? "",
		ibuKandung: b?.ibuKandung ?? "",
		telp: b?.telp ?? "",
		golonganId: String(d.golongan?.id ?? "") || undefined,
		organisasiId: String(d.organisasi?.id ?? "") || undefined,
		jabatanId: String(d.jabatan?.id ?? "") || undefined,
		profesiId: String(d.profesi?.id ?? "") || undefined,
		email: d.email ?? "",
	};
}

interface Props {
	pegawaiId: string | null;
	onClose: () => void;
}

export function SheetEditProfil({ pegawaiId, onClose }: Props) {
	const qc = useQueryClient();
	const open = !!pegawaiId;

	const detailQuery = useQuery({
		queryKey: ["pegawai", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}`);
			if (!res.ok) throw new Error("Gagal memuat detail pegawai");
			const body = await res.json();
			return body.data as PegawaiResponseDetail;
		},
		enabled: open,
		staleTime: 60_000,
	});

	const defaults = useMemo(() => (detailQuery.data ? toDefaults(detailQuery.data) : undefined), [detailQuery.data]);

	const {
		handleSubmit: rhfSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(schema as never),
		values: defaults as FormValues | undefined,
	});

	const orgOpts = useFkOptions("organisasi");
	const profesiOpts = useFkOptions("profesi");
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);

	const organisasiId = watch("organisasiId");
	const jabQuery = useQuery({
		queryKey: ["jabatan", "organisasi", organisasiId],
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = useMemo(
		() =>
			((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: String(i.nama ?? ""),
			})),
		[jabQuery.data],
	);

	const onSubmit = async (values: FormValues) => {
		try {
			// ponytail: jangan andalkan dirtyFields — setValue-controlled (tanpa shouldDirty) tidak pernah
			// mem-populate dirtyFields di RHF v7 → payload dulu cuma {id, nipam, nama}, field lain raib.
			// Server WAJIB terima FK kepegawaian sebagai angka (min 0) — kirim 0 bila kosong,
			// JANGAN dihilangkan dari request (hilang = 500 "The given id must not be null").
			// 0 = "tidak diisi" untuk profesi/golongan (divalidasi server); organisasi/jabatan selalu ada.
			const payload: Record<string, unknown> = {
				id: Number(pegawaiId),
				nipam: values.nipam,
				nama: values.nama,
				organisasiId: Number(values.organisasiId ?? 0),
				jabatanId: Number(values.jabatanId ?? 0),
				profesiId: Number(values.profesiId ?? 0),
				golonganId: Number(values.golonganId ?? 0),
			};
			for (const [key, v] of Object.entries(values)) {
				if (key === "nipam" || key === "nama" || key.endsWith("Id")) continue;
				if (v === "" || v === undefined) continue;
				payload[key] = v;
			}

			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/profil`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan"));
			}
			toast.success("Profil berhasil diperbarui");
			qc.invalidateQueries({ queryKey: ["/api/proxy/pegawai"] });
			qc.invalidateQueries({ queryKey: ["ringkasan", pegawaiId] });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	const e = (name: keyof FormValues) => (errors[name] ? String(errors[name]?.message ?? "") : undefined);

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
