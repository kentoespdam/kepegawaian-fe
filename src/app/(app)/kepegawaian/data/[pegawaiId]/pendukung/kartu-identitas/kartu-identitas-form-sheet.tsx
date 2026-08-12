"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { apiErrorMessage } from "@/lib/utils";
import type { KartuIdentitasDetail, SingleResultKartuIdentitasDetail } from "@/types/profil/kartu-identitas";

// ── Schema (KI3) ──

const schema = z
	.object({
		jenisKartuId: z.string().min(1, "Jenis kartu wajib"),
		nomorKartu: z.string().min(1, "Nomor kartu wajib"),
		tanggalTerima: z.string().optional(),
		tanggalExpired: z.string().optional(),
		notes: z.string().optional(),
	})
	.superRefine((v, ctx) => {
		// Cross-field (KI3): masa berlaku harus setelah tanggal terima (string YYYY-MM-DD banding leksikal)
		if (v.tanggalTerima && v.tanggalExpired && v.tanggalExpired <= v.tanggalTerima) {
			ctx.addIssue({ code: "custom", path: ["tanggalExpired"], message: "Masa berlaku harus setelah tanggal terima" });
		}
	});

type FormValues = z.infer<typeof schema>;

function normalizeFk(d: KartuIdentitasDetail | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		jenisKartuId: String(d.jenisKartuId ?? "") || undefined,
		nomorKartu: d.nomorKartu ?? "",
		tanggalTerima: d.tanggalTerima ?? "",
		tanggalExpired: d.tanggalExpired ?? "",
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

export function KartuIdentitasFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["profil-kartu-identitas-detail", editingId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/kartu-identitas/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data kartu identitas");
			const body = (await res.json()) as SingleResultKartuIdentitasDetail;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const jenisKartuOpts = useFkOptions("jenis-kitas");

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
				// P6: request kartu-identitas pakai `nik`, bukan `biodataId` (nilainya sama)
				nik,
				nomorKartu: values.nomorKartu,
			};
			if (values.jenisKartuId) payload.jenisKartuId = Number(values.jenisKartuId);
			if (values.tanggalTerima) payload.tanggalTerima = values.tanggalTerima;
			if (values.tanggalExpired) payload.tanggalExpired = values.tanggalExpired;
			if (values.notes) payload.notes = values.notes;

			const url = editingId ? `/api/proxy/profil/kartu-identitas/${editingId}` : "/api/proxy/profil/kartu-identitas";
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
			toast.success(editingId ? "Kartu identitas berhasil diperbarui" : "Kartu identitas berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["profil-kartu-identitas", pegawaiId] });
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
					<SheetTitle>{editingId ? "Edit Kartu Identitas" : "Tambah Kartu Identitas"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="kartu-identitas-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldFk
								label="Jenis Kartu"
								options={jenisKartuOpts}
								value={watch("jenisKartuId")}
								onChange={(v) => setValue("jenisKartuId", v ?? "")}
								error={e("jenisKartuId")}
								required
								placeholder="Pilih jenis kartu"
							/>
							<FieldText
								label="Nomor Kartu"
								value={watch("nomorKartu")}
								onChange={(v) => setValue("nomorKartu", v)}
								error={e("nomorKartu")}
								required
							/>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldDate
									label="Tanggal Terima"
									value={watch("tanggalTerima")}
									onChange={(v) => setValue("tanggalTerima", v)}
									error={e("tanggalTerima")}
								/>
								<FieldDate
									label="Masa Berlaku"
									value={watch("tanggalExpired")}
									onChange={(v) => setValue("tanggalExpired", v)}
									error={e("tanggalExpired")}
								/>
							</div>
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
						form="kartu-identitas-form"
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
