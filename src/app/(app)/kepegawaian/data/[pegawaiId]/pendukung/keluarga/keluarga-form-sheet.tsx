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
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { ENUMS } from "@/lib/enums";
import { apiErrorMessage } from "@/lib/utils";
import type { ProfilKeluargaDetail, SingleResultProfilKeluargaDetail } from "@/types/profil/keluarga";

// ── Schema (K3, 12 field) — TANPA cross-field validation (keputusan HR: statusPendidikan
//    boleh ada tanpa pendidikanId dan sebaliknya) ──

const schema = z.object({
	nama: z.string().min(1, "Nama wajib"),
	nik: z.string().optional(),
	jenisKelamin: z.string().min(1, "Jenis kelamin wajib"),
	agama: z.string().min(1, "Agama wajib"),
	hubunganKeluarga: z.string().min(1, "Hubungan keluarga wajib"),
	tempatLahir: z.string().min(1, "Tempat lahir wajib"),
	tanggalLahir: z.string().min(1, "Tanggal lahir wajib"),
	tanggungan: z.boolean().optional(),
	pendidikanId: z.string().optional(),
	statusPendidikan: z.string().optional(),
	statusKawin: z.boolean().optional(),
	notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function normalizeFk(d: ProfilKeluargaDetail | undefined): Record<string, unknown> {
	const q = d?.query;
	if (!q) return {};
	return {
		nama: q.nama ?? "",
		nik: q.nik ?? "",
		jenisKelamin: q.jenisKelamin ?? "",
		agama: q.agama ?? "",
		hubunganKeluarga: q.hubunganKeluarga ?? "",
		tempatLahir: q.tempatLahir ?? "",
		tanggalLahir: q.tanggalLahir ?? "",
		tanggungan: q.tanggungan ?? false,
		pendidikanId: String(q.pendidikanId ?? "") || undefined,
		statusPendidikan: q.statusPendidikan ?? "",
		statusKawin: q.statusKawin ?? false,
		notes: q.notes ?? "",
	};
}

interface Props {
	pegawaiId: string;
	nik: string | undefined;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function KeluargaFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["profil-keluarga-detail", editingId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/keluarga/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data keluarga");
			const body = (await res.json()) as SingleResultProfilKeluargaDetail;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const jenjangOpts = useFkOptions("jenjang-pendidikan");

	const defaults = useMemo(() => {
		if (editingId) return normalizeFk(detailQuery.data);
		return {};
	}, [editingId, detailQuery.data]);

	const {
		setValue,
		watch,
		handleSubmit: rhfSubmit,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		values: defaults as FormValues | undefined,
	});

	const onSubmit = async (values: FormValues) => {
		try {
			const payload: Record<string, unknown> = {
				biodataId: nik,
				nama: values.nama,
				jenisKelamin: values.jenisKelamin,
				agama: values.agama,
				hubunganKeluarga: values.hubunganKeluarga,
				tempatLahir: values.tempatLahir,
				tanggalLahir: values.tanggalLahir,
				tanggungan: values.tanggungan ?? false,
				statusKawin: values.statusKawin ?? false,
			};
			if (values.nik) payload.nik = values.nik;
			if (values.pendidikanId) payload.pendidikanId = Number(values.pendidikanId);
			if (values.statusPendidikan) payload.statusPendidikan = values.statusPendidikan;
			if (values.notes) payload.notes = values.notes;

			const url = editingId ? `/api/proxy/admin/profil/keluarga/${editingId}` : "/api/proxy/admin/profil/keluarga";
			const method = editingId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan"));
			}
			toast.success(editingId ? "Anggota keluarga berhasil diperbarui" : "Anggota keluarga berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["profil-keluarga", pegawaiId] });
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
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) onClose();
			}}
		>
			<SheetContent className="sm:max-w-160 flex flex-col gap-0 p-0">
				<SheetHeader className="shrink-0">
					<SheetTitle>{editingId ? "Edit Anggota Keluarga" : "Tambah Anggota Keluarga"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="keluarga-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldText
								label="Nama"
								value={watch("nama")}
								onChange={(v) => setValue("nama", v)}
								error={e("nama")}
								required
							/>
							<FieldText
								label="NIK Anggota"
								value={watch("nik")}
								onChange={(v) => setValue("nik", v)}
								error={e("nik")}
								placeholder="Opsional"
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldSelect
									label="Jenis Kelamin"
									value={watch("jenisKelamin")}
									options={ENUMS.jenisKelamin}
									onChange={(v) => setValue("jenisKelamin", v)}
									error={e("jenisKelamin")}
									required
								/>
								<FieldSelect
									label="Agama"
									value={watch("agama")}
									options={ENUMS.agama}
									onChange={(v) => setValue("agama", v)}
									error={e("agama")}
									required
								/>
							</div>
							<FieldSelect
								label="Hubungan Keluarga"
								value={watch("hubunganKeluarga")}
								options={ENUMS.hubunganKeluarga}
								onChange={(v) => setValue("hubunganKeluarga", v)}
								error={e("hubunganKeluarga")}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldText
									label="Tempat Lahir"
									value={watch("tempatLahir")}
									onChange={(v) => setValue("tempatLahir", v)}
									error={e("tempatLahir")}
									required
								/>
								<FieldDate
									label="Tanggal Lahir"
									value={watch("tanggalLahir")}
									onChange={(v) => setValue("tanggalLahir", v)}
									error={e("tanggalLahir")}
									required
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										checked={watch("tanggungan") ?? false}
										onChange={(ev) => setValue("tanggungan", ev.target.checked)}
										className="size-4 accent-primary"
									/>
									<span className="text-sm font-normal">Tanggungan?</span>
								</label>
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										checked={watch("statusKawin") ?? false}
										onChange={(ev) => setValue("statusKawin", ev.target.checked)}
										className="size-4 accent-primary"
									/>
									<span className="text-sm font-normal">Sudah Kawin?</span>
								</label>
							</div>
							<FieldFk
								label="Pendidikan"
								options={jenjangOpts}
								value={watch("pendidikanId")}
								onChange={(v) => setValue("pendidikanId", v ?? "")}
								error={e("pendidikanId")}
								placeholder="Pilih jenjang pendidikan"
							/>
							<FieldSelect
								label="Status Pendidikan"
								value={watch("statusPendidikan")}
								options={ENUMS.statusPendidikanKeluarga}
								onChange={(v) => setValue("statusPendidikan", v)}
								error={e("statusPendidikan")}
							/>
							<FieldTextarea
								label="Catatan"
								value={watch("notes")}
								onChange={(v) => setValue("notes", v)}
								error={e("notes")}
							/>
						</form>
					)}
				</div>
				{errors.root && <p className="px-4 text-sm text-destructive">{errors.root.message}</p>}
				<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
					<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
						Batal
					</Button>
					<Button
						type="submit"
						form="keluarga-form"
						disabled={!nik || isSubmitting || (!!editingId && detailQuery.isPending)}
					>
						{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
						{isSubmitting ? "Menyimpan…" : "Simpan"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
