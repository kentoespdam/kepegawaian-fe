"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { apiErrorMessage } from "@/lib/utils";
import type { PelatihanDetail, SingleResultPelatihanDetail } from "@/types/profil/pelatihan";

// ── Schema (PL3) ──

const schema = z
	.object({
		jenisPelatihanId: z.string().min(1, "Jenis pelatihan wajib"),
		nama: z.string().min(1, "Nama pelatihan wajib"),
		lembaga: z.string().min(1, "Lembaga wajib"),
		tanggalMulai: z.string().min(1, "Tanggal mulai wajib"),
		tanggalSelesai: z.string().min(1, "Tanggal selesai wajib"),
		lulus: z.boolean().optional(),
		nilai: z.string().min(1, "Nilai wajib"),
		ikatanDinas: z.boolean().optional(),
		tanggalAkhirIkatan: z.string().optional(),
		notes: z.string().optional(),
	})
	.superRefine((v, ctx) => {
		// Cross-field 1 (PL3): tanggalSelesai ≥ tanggalMulai (string YYYY-MM-DD banding leksikal)
		if (v.tanggalMulai && v.tanggalSelesai && v.tanggalSelesai < v.tanggalMulai) {
			ctx.addIssue({
				code: "custom",
				path: ["tanggalSelesai"],
				message: "Tanggal selesai tidak boleh sebelum tanggal mulai",
			});
		}
		// Cross-field 2 (pola D5): ikatanDinas dicentang → tanggalAkhirIkatan wajib
		if (v.ikatanDinas && !v.tanggalAkhirIkatan) {
			ctx.addIssue({
				code: "custom",
				path: ["tanggalAkhirIkatan"],
				message: "Tanggal akhir ikatan wajib bila ikatan dinas",
			});
		}
	});

type FormValues = z.infer<typeof schema>;

function normalizeFk(d: PelatihanDetail | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		jenisPelatihanId: String(d.jenisPelatihanId ?? "") || undefined,
		nama: d.nama ?? "",
		lembaga: d.lembaga ?? "",
		tanggalMulai: d.tanggalMulai ?? "",
		tanggalSelesai: d.tanggalSelesai ?? "",
		lulus: d.lulus ?? false,
		nilai: d.nilai ?? "",
		ikatanDinas: d.ikatanDinas ?? false,
		tanggalAkhirIkatan: d.tanggalAkhirIkatan ?? "",
		notes: d.notes ?? "",
	};
}

interface Props {
	pegawaiId: string;
	nik: string | undefined;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function PelatihanFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: profilKeys.pelatihan.detail(editingId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/pelatihan/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data pelatihan");
			const body = (await res.json()) as SingleResultPelatihanDetail;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const jenisPelatihanOpts = useFkOptions("jenis-pelatihan");

	const defaults = (() => {
		if (editingId) return normalizeFk(detailQuery.data);
		return {};
	})();

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
				lembaga: values.lembaga,
				tanggalMulai: values.tanggalMulai,
				tanggalSelesai: values.tanggalSelesai,
				nilai: values.nilai,
			};
			if (values.jenisPelatihanId) payload.jenisPelatihanId = Number(values.jenisPelatihanId);
			if (values.lulus) payload.lulus = true;
			if (values.ikatanDinas) payload.ikatanDinas = true;
			// Cross-field 2: tanggalAkhirIkatan hanya dikirim bila ikatan dinas
			if (values.ikatanDinas && values.tanggalAkhirIkatan) payload.tanggalAkhirIkatan = values.tanggalAkhirIkatan;
			if (values.notes) payload.notes = values.notes;

			const url = editingId ? `/api/proxy/admin/profil/pelatihan/${editingId}` : "/api/proxy/admin/profil/pelatihan";
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
			toast.success(editingId ? "Pelatihan berhasil diperbarui" : "Pelatihan berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: profilKeys.pelatihan.all() });
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
					<SheetTitle>{editingId ? "Edit Pelatihan" : "Tambah Pelatihan"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="pelatihan-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldFk
								label="Jenis Pelatihan"
								options={jenisPelatihanOpts}
								value={watch("jenisPelatihanId")}
								onChange={(v) => setValue("jenisPelatihanId", v ?? "")}
								error={e("jenisPelatihanId")}
								required
								placeholder="Pilih jenis pelatihan"
							/>
							<FieldText
								label="Nama Pelatihan"
								value={watch("nama")}
								onChange={(v) => setValue("nama", v)}
								error={e("nama")}
								required
							/>
							<FieldText
								label="Lembaga"
								value={watch("lembaga")}
								onChange={(v) => setValue("lembaga", v)}
								error={e("lembaga")}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldDate
									label="Tanggal Mulai"
									value={watch("tanggalMulai")}
									onChange={(v) => setValue("tanggalMulai", v)}
									error={e("tanggalMulai")}
									required
								/>
								<FieldDate
									label="Tanggal Selesai"
									value={watch("tanggalSelesai")}
									onChange={(v) => setValue("tanggalSelesai", v)}
									error={e("tanggalSelesai")}
									required
								/>
							</div>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("lulus") ?? false}
									onChange={(ev) => setValue("lulus", ev.target.checked)}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Lulus</span>
							</label>
							<FieldText
								label="Nilai"
								value={watch("nilai")}
								onChange={(v) => setValue("nilai", v)}
								error={e("nilai")}
								required
							/>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("ikatanDinas") ?? false}
									onChange={(ev) => {
										setValue("ikatanDinas", ev.target.checked);
										// Cross-field 2: tidak ikatan → tanggal akhir dikosongkan
										if (!ev.target.checked) setValue("tanggalAkhirIkatan", undefined);
									}}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Ikatan Dinas</span>
							</label>
							{watch("ikatanDinas") && (
								<FieldDate
									label="Tanggal Akhir Ikatan"
									value={watch("tanggalAkhirIkatan")}
									onChange={(v) => setValue("tanggalAkhirIkatan", v)}
									error={e("tanggalAkhirIkatan")}
								/>
							)}
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
						form="pelatihan-form"
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
