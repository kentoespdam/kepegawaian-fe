"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { apiErrorMessage } from "@/lib/utils";
import type { PengalamanKerjaDetail, SingleResultPengalamanKerjaDetail } from "@/types/profil/pengalaman-kerja";

const CURRENT_YEAR = new Date().getFullYear();

// ── Schema (W4) ──

const schema = z
	.object({
		namaPerusahaan: z.string().min(1, "Nama perusahaan wajib"),
		typePerusahaan: z.string().optional(),
		jabatan: z.string().optional(),
		lokasi: z.string().optional(),
		tahunMasuk: z.string().optional(),
		tahunKeluar: z.string().optional(),
		notes: z.string().optional(),
	})
	.superRefine((v, ctx) => {
		const year = (s: string | undefined) => (s ? Number(s) : undefined);
		const yIn = year(v.tahunMasuk);
		if (yIn !== undefined && (!Number.isInteger(yIn) || yIn < 1950 || yIn > CURRENT_YEAR)) {
			ctx.addIssue({ code: "custom", path: ["tahunMasuk"], message: `Tahun masuk antara 1950–${CURRENT_YEAR}` });
		}
		const yOut = year(v.tahunKeluar);
		if (yOut !== undefined && (!Number.isInteger(yOut) || yOut < 1950 || yOut > CURRENT_YEAR)) {
			ctx.addIssue({ code: "custom", path: ["tahunKeluar"], message: `Tahun keluar antara 1950–${CURRENT_YEAR}` });
		}
		// Cross-field (W4): tahunKeluar kosong = masih bekerja; bila terisi wajib ≥ tahunMasuk
		if (yIn !== undefined && yOut !== undefined && yOut < yIn) {
			ctx.addIssue({ code: "custom", path: ["tahunKeluar"], message: "Tahun keluar tidak boleh sebelum tahun masuk" });
		}
	});

type FormValues = z.infer<typeof schema>;

function normalizeFk(d: PengalamanKerjaDetail | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		namaPerusahaan: d.namaPerusahaan ?? "",
		typePerusahaan: d.typePerusahaan ?? "",
		jabatan: d.jabatan ?? "",
		lokasi: d.lokasi ?? "",
		tahunMasuk: String(d.tahunMasuk ?? "") || undefined,
		tahunKeluar: String(d.tahunKeluar ?? "") || undefined,
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

export function PengalamanKerjaFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["profil-pengalaman-kerja-detail", editingId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/pengalaman-kerja/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data pengalaman kerja");
			const body = (await res.json()) as SingleResultPengalamanKerjaDetail;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

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
				namaPerusahaan: values.namaPerusahaan,
			};
			if (values.typePerusahaan) payload.typePerusahaan = values.typePerusahaan;
			if (values.jabatan) payload.jabatan = values.jabatan;
			if (values.lokasi) payload.lokasi = values.lokasi;
			if (values.tahunMasuk) payload.tahunMasuk = Number(values.tahunMasuk);
			// W4: tahunKeluar kosong = masih bekerja → tidak dikirim
			if (values.tahunKeluar) payload.tahunKeluar = Number(values.tahunKeluar);
			if (values.notes) payload.notes = values.notes;

			const url = editingId
				? `/api/proxy/admin/profil/pengalaman-kerja/${editingId}`
				: "/api/proxy/admin/profil/pengalaman-kerja";
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
			toast.success(editingId ? "Pengalaman kerja berhasil diperbarui" : "Pengalaman kerja berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["profil-pengalaman-kerja", pegawaiId] });
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
					<SheetTitle>{editingId ? "Edit Pengalaman Kerja" : "Tambah Pengalaman Kerja"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="pengalaman-kerja-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldText
								label="Nama Perusahaan"
								value={watch("namaPerusahaan")}
								onChange={(v) => setValue("namaPerusahaan", v)}
								error={e("namaPerusahaan")}
								required
							/>
							<FieldText
								label="Jenis Perusahaan"
								value={watch("typePerusahaan")}
								onChange={(v) => setValue("typePerusahaan", v)}
								error={e("typePerusahaan")}
							/>
							<FieldText
								label="Jabatan"
								value={watch("jabatan")}
								onChange={(v) => setValue("jabatan", v)}
								error={e("jabatan")}
							/>
							<FieldText
								label="Lokasi"
								value={watch("lokasi")}
								onChange={(v) => setValue("lokasi", v)}
								error={e("lokasi")}
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldText
									label="Tahun Masuk"
									type="number"
									value={watch("tahunMasuk")}
									onChange={(v) => setValue("tahunMasuk", v)}
									error={e("tahunMasuk")}
								/>
								<FieldText
									label="Tahun Keluar"
									type="number"
									value={watch("tahunKeluar")}
									onChange={(v) => setValue("tahunKeluar", v)}
									error={e("tahunKeluar")}
								/>
							</div>
							<p className="-mt-2 text-xs text-muted-foreground">Kosongkan tahun keluar bila masih bekerja</p>
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
						form="pengalaman-kerja-form"
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
