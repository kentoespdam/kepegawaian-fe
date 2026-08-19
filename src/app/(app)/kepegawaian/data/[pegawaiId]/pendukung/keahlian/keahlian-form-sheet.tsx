"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldFk, FieldSelect, FieldText } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { profilKeys } from "@/hooks/keys/profil-keys";
import { useFkOptions } from "@/hooks/useFkOptions";
import { apiErrorMessage } from "@/lib/utils";
import type { KeahlianDetail, SingleResultKeahlianDetail } from "@/types/profil/keahlian";

const CURRENT_YEAR = new Date().getFullYear();

// ponytail: label enum kualifikasi — map lokal (sama dengan kolom tabel K1)
const TINGKAT_OPTIONS = [
	{ value: "CUKUP", label: "Cukup" },
	{ value: "BAIK", label: "Baik" },
	{ value: "KURANG", label: "Kurang" },
] as const;

// ── Schema (K3) ──

const schema = z
	.object({
		keahlianId: z.string().min(1, "Jenis keahlian wajib"),
		kualifikasi: z.string().min(1, "Tingkat kemampuan wajib"),
		sertifikasi: z.boolean().optional(),
		institusi: z.string().min(1, "Institusi wajib"),
		tahun: z.string().optional(),
		masaBerlaku: z.string().optional(),
	})
	.superRefine((v, ctx) => {
		if (v.tahun) {
			const t = Number(v.tahun);
			if (!Number.isInteger(t) || t < 1970 || t > CURRENT_YEAR) {
				ctx.addIssue({ code: "custom", path: ["tahun"], message: `Tahun antara 1970–${CURRENT_YEAR}` });
			}
		}
	});

type FormValues = z.infer<typeof schema>;

// ponytail: detail keahlian membungkus query di `.query` (KeahlianDetail{query,lampiran})
function normalizeFk(d: KeahlianDetail | undefined): Record<string, unknown> {
	const q = d?.query;
	if (!q) return {};
	return {
		keahlianId: String(q.jenisKeahlian?.id ?? "") || undefined,
		kualifikasi: q.kualifikasi ?? "",
		sertifikasi: q.sertifikasi ?? false,
		institusi: q.institusi ?? "",
		tahun: String(q.tahun ?? "") || undefined,
		masaBerlaku: q.masaBerlaku ?? "",
	};
}

interface Props {
	pegawaiId: string;
	nik: string | undefined;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function KeahlianFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: profilKeys.keahlian.detail(editingId),
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/keahlian/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data keahlian");
			const body = (await res.json()) as SingleResultKeahlianDetail;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const jenisKeahlianOpts = useFkOptions("jenis-keahlian");

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
				kualifikasi: values.kualifikasi,
				institusi: values.institusi,
			};
			// P4: form tidak menyentuh disetujui — BE yang mengelola
			if (values.keahlianId) payload.keahlianId = Number(values.keahlianId);
			if (values.sertifikasi) payload.sertifikasi = true;
			if (values.tahun) payload.tahun = Number(values.tahun);
			if (values.masaBerlaku) payload.masaBerlaku = values.masaBerlaku;

			const url = editingId ? `/api/proxy/admin/profil/keahlian/${editingId}` : "/api/proxy/admin/profil/keahlian";
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
			toast.success(editingId ? "Keahlian berhasil diperbarui" : "Keahlian berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: profilKeys.keahlian.all() });
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
					<SheetTitle>{editingId ? "Edit Keahlian" : "Tambah Keahlian"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="keahlian-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldFk
								label="Jenis Keahlian"
								options={jenisKeahlianOpts}
								value={watch("keahlianId")}
								onChange={(v) => setValue("keahlianId", v ?? "")}
								error={e("keahlianId")}
								required
								placeholder="Pilih jenis keahlian"
							/>
							<FieldSelect
								label="Tingkat Kemampuan"
								value={watch("kualifikasi")}
								options={TINGKAT_OPTIONS}
								onChange={(v) => setValue("kualifikasi", v)}
								error={e("kualifikasi")}
								required
							/>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("sertifikasi") ?? false}
									onChange={(ev) => setValue("sertifikasi", ev.target.checked)}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Sertifikasi</span>
							</label>
							<FieldText
								label="Institusi"
								value={watch("institusi")}
								onChange={(v) => setValue("institusi", v)}
								error={e("institusi")}
								required
							/>
							<FieldText
								label="Tahun"
								type="number"
								value={watch("tahun")}
								onChange={(v) => setValue("tahun", v)}
								error={e("tahun")}
							/>
							<FieldText
								label="Masa Berlaku"
								value={watch("masaBerlaku")}
								onChange={(v) => setValue("masaBerlaku", v)}
								error={e("masaBerlaku")}
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
						form="keahlian-form"
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
