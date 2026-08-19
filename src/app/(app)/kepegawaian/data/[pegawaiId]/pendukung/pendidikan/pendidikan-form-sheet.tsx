"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldFk, FieldText } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { apiErrorMessage } from "@/lib/utils";
import type { PendidikanQuery, SingleResultPendidikanQuery } from "@/types/profil/pendidikan";

const CURRENT_YEAR = new Date().getFullYear();

// ── Schema (D5 terkunci) ──

const schema = z
	.object({
		jenjangPendidikanId: z.string().min(1, "Jenjang pendidikan wajib"),
		institusi: z.string().min(1, "Institusi wajib"),
		jurusan: z.string().optional(),
		kota: z.string().optional(),
		gelarDepan: z.string().optional(),
		gelarBelakang: z.string().optional(),
		tahunMasuk: z.string().optional(),
		isLulus: z.boolean().optional(),
		tahunLulus: z.string().optional(),
		gpa: z.string().optional(),
		isLatest: z.boolean().optional(),
	})
	.superRefine((v, ctx) => {
		// Cross-field: isLulus dicentang → tahunLulus wajib (D5)
		if (v.isLulus && !v.tahunLulus) {
			ctx.addIssue({ code: "custom", path: ["tahunLulus"], message: "Tahun lulus wajib diisi bila lulus" });
		}
		const year = (s: string | undefined) => (s ? Number(s) : undefined);
		const yIn = year(v.tahunMasuk);
		if (yIn !== undefined && (!Number.isInteger(yIn) || yIn < 1950 || yIn > CURRENT_YEAR)) {
			ctx.addIssue({ code: "custom", path: ["tahunMasuk"], message: `Tahun masuk antara 1950–${CURRENT_YEAR}` });
		}
		const yLul = year(v.tahunLulus);
		if (yLul !== undefined && (!Number.isInteger(yLul) || yLul < 1950 || yLul > CURRENT_YEAR)) {
			ctx.addIssue({ code: "custom", path: ["tahunLulus"], message: `Tahun lulus antara 1950–${CURRENT_YEAR}` });
		}
		if (v.gpa) {
			const g = Number(v.gpa);
			if (!Number.isFinite(g) || g < 0 || g > 4 || !/^\d+(\.\d{1,2})?$/.test(v.gpa)) {
				ctx.addIssue({ code: "custom", path: ["gpa"], message: "IPK 0–4, maksimal 2 desimal" });
			}
		}
	});

type FormValues = z.infer<typeof schema>;

// ── FK normalizer: nested {id,nama} → *Id scalar (jebakan FK) ──

function normalizeFk(d: PendidikanQuery | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		jenjangPendidikanId: String(d.jenjangPendidikan?.id ?? d.jenjangId ?? "") || undefined,
		institusi: d.institusi ?? "",
		jurusan: d.jurusan ?? "",
		kota: d.kota ?? "",
		gelarDepan: d.gelarDepan ?? "",
		gelarBelakang: d.gelarBelakang ?? "",
		tahunMasuk: String(d.tahunMasuk ?? "") || undefined,
		isLulus: d.isLulus ?? false,
		tahunLulus: String(d.tahunLulus ?? "") || undefined,
		gpa: d.gpa != null ? String(d.gpa) : undefined,
		isLatest: d.isLatest ?? false,
	};
}

interface Props {
	pegawaiId: string;
	nik: string | undefined;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function PendidikanFormSheet({ pegawaiId, nik, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["profil-pendidikan-detail", editingId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/profil/pendidikan/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data pendidikan");
			const body = (await res.json()) as SingleResultPendidikanQuery;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const jenjangOpts = useFkOptions("jenjang-pendidikan");

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
				institusi: values.institusi,
			};
			if (values.jenjangPendidikanId) payload.jenjangPendidikanId = Number(values.jenjangPendidikanId);
			if (values.jurusan) payload.jurusan = values.jurusan;
			if (values.kota) payload.kota = values.kota;
			if (values.gelarDepan) payload.gelarDepan = values.gelarDepan;
			if (values.gelarBelakang) payload.gelarBelakang = values.gelarBelakang;
			if (values.tahunMasuk) payload.tahunMasuk = Number(values.tahunMasuk);
			if (values.isLulus) payload.isLulus = true;
			// D5: tahunLulus hanya dikirim bila lulus — tidak dicentang → dikosongkan
			if (values.isLulus && values.tahunLulus) payload.tahunLulus = Number(values.tahunLulus);
			if (values.gpa) payload.gpa = Number(values.gpa);
			if (values.isLatest) payload.isLatest = true;

			const url = editingId ? `/api/proxy/admin/profil/pendidikan/${editingId}` : "/api/proxy/admin/profil/pendidikan";
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
			toast.success(editingId ? "Pendidikan berhasil diperbarui" : "Pendidikan berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["profil-pendidikan", pegawaiId] });
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
					<SheetTitle>{editingId ? "Edit Pendidikan" : "Tambah Pendidikan"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="pendidikan-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<FieldFk
								label="Jenjang Pendidikan"
								options={jenjangOpts}
								value={watch("jenjangPendidikanId")}
								onChange={(v) => setValue("jenjangPendidikanId", v ?? "")}
								error={e("jenjangPendidikanId")}
								required
								placeholder="Pilih jenjang pendidikan"
							/>
							<FieldText
								label="Institusi"
								value={watch("institusi")}
								onChange={(v) => setValue("institusi", v)}
								error={e("institusi")}
								required
							/>
							<FieldText
								label="Jurusan"
								value={watch("jurusan")}
								onChange={(v) => setValue("jurusan", v)}
								error={e("jurusan")}
							/>
							<FieldText label="Kota" value={watch("kota")} onChange={(v) => setValue("kota", v)} error={e("kota")} />
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldText
									label="Gelar Depan"
									value={watch("gelarDepan")}
									onChange={(v) => setValue("gelarDepan", v)}
									error={e("gelarDepan")}
								/>
								<FieldText
									label="Gelar Belakang"
									value={watch("gelarBelakang")}
									onChange={(v) => setValue("gelarBelakang", v)}
									error={e("gelarBelakang")}
								/>
							</div>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldText
									label="Tahun Masuk"
									type="number"
									value={watch("tahunMasuk")}
									onChange={(v) => setValue("tahunMasuk", v)}
									error={e("tahunMasuk")}
								/>
								<FieldText
									label="IPK"
									type="number"
									value={watch("gpa")}
									onChange={(v) => setValue("gpa", v)}
									error={e("gpa")}
									placeholder="0–4"
								/>
							</div>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("isLulus") ?? false}
									onChange={(ev) => {
										setValue("isLulus", ev.target.checked);
										// D5: tidak lulus → tahun lulus dikosongkan (tidak dikirim)
										if (!ev.target.checked) setValue("tahunLulus", undefined);
									}}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Lulus</span>
							</label>
							{watch("isLulus") && (
								<FieldText
									label="Tahun Lulus"
									type="number"
									value={watch("tahunLulus")}
									onChange={(v) => setValue("tahunLulus", v)}
									error={e("tahunLulus")}
								/>
							)}
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("isLatest") ?? false}
									onChange={(ev) => setValue("isLatest", ev.target.checked)}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Pendidikan Terakhir</span>
							</label>
						</form>
					)}
				</div>
				{errors.root && <p className="px-4 text-sm text-destructive">{errors.root.message}</p>}
				<div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-popover p-4">
					<Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
						Batal
					</Button>{" "}
					<Button
						type="submit"
						form="pendidikan-form"
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
