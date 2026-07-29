"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { JENIS_SK_OPTIONS } from "@/lib/riwayat-constants";
import type { SingleResultRiwayatSkQuery } from "@/types/kepegawaian/riwayat";

// ── Schema ──

const schema = z.object({
	jenisSk: z.string().min(1, "Jenis SK wajib"),
	nomorSk: z.string().min(1, "Nomor SK wajib"),
	tanggalSk: z.string().min(1, "Tanggal SK wajib"),
	tmtBerlaku: z.string().min(1, "TMT berlaku wajib"),
	golonganId: z.string().optional(),
	gajiPokok: z.string().optional(),
	mkgTahun: z.string().optional(),
	mkgBulan: z.string().optional(),
	kenaikanBerikutnya: z.string().optional(),
	mkgbTahun: z.string().optional(),
	mkgbBulan: z.string().optional(),
	updateMaster: z.boolean().optional(),
	notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── FK options ──

function useGolonganOptions() {
	return useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
}

// ── Normalizer ──

function normalizeFk(d: SingleResultRiwayatSkQuery["data"] | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		jenisSk: d.jenisSk ?? "",
		nomorSk: d.nomorSk ?? "",
		tanggalSk: d.tanggalSk ?? "",
		tmtBerlaku: d.tmtBerlaku ?? "",
		golonganId: String(d.golongan?.id ?? "") || undefined,
		gajiPokok: String(d.gajiPokok ?? "") || undefined,
		mkgTahun: String(d.mkgTahun ?? "") || undefined,
		mkgBulan: String(d.mkgBulan ?? "") || undefined,
		kenaikanBerikutnya: d.kenaikanBerikutnya ?? "",
		mkgbTahun: String(d.mkgbTahun ?? "") || undefined,
		mkgbBulan: String(d.mkgbBulan ?? "") || undefined,
		updateMaster: d.updateMaster ?? false,
		notes: d.notes ?? "",
	};
}

// ── Component ──

interface Props {
	pegawaiId: string;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function SkFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["riwayat-sk-detail", editingId],
		queryFn: async () => {
			if (!editingId) return undefined;
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sk/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data SK");
			const body = (await res.json()) as SingleResultRiwayatSkQuery;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const defaults = normalizeFk(detailQuery.data);

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

	const golonganOpts = useGolonganOptions();

	// ── Submit ──

	const onSubmit = async (values: FormValues) => {
		try {
			const payload: Record<string, unknown> = {
				pegawaiId: Number(pegawaiId),
				jenisSk: values.jenisSk,
				nomorSk: values.nomorSk,
				tanggalSk: values.tanggalSk,
				tmtBerlaku: values.tmtBerlaku,
			};
			if (values.golonganId) payload.golonganId = Number(values.golonganId);
			if (values.gajiPokok) payload.gajiPokok = Number(values.gajiPokok);
			if (values.mkgTahun) payload.mkgTahun = Number(values.mkgTahun);
			if (values.mkgBulan) payload.mkgBulan = Number(values.mkgBulan);
			if (values.kenaikanBerikutnya) payload.kenaikanBerikutnya = values.kenaikanBerikutnya;
			if (values.mkgbTahun) payload.mkgbTahun = Number(values.mkgbTahun);
			if (values.mkgbBulan) payload.mkgbBulan = Number(values.mkgbBulan);
			if (values.updateMaster) payload.updateMaster = true;
			if (values.notes) payload.notes = values.notes;

			const url = editingId
				? `/api/proxy/kepegawaian/riwayat/sk/${editingId}`
				: "/api/proxy/kepegawaian/riwayat/sk";
			const method = editingId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				const msg = (body as { message?: string }).message ?? "Gagal menyimpan SK";
				throw new Error(msg);
			}

			toast.success(editingId ? "SK berhasil diperbarui" : "SK berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["riwayat-sk", pegawaiId] });
			onClose();
		} catch (e: unknown) {
			setError("root", { message: e instanceof Error ? e.message : "Terjadi kesalahan" });
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={(v) => { if (!v) onClose(); }}>
			<SheetContent className="sm:max-w-xl overflow-y-auto">
				<SheetHeader>
					<SheetTitle>{editingId ? "Edit Surat Keputusan" : "Tambah Surat Keputusan"}</SheetTitle>
				</SheetHeader>

				<form onSubmit={rhfSubmit(onSubmit)} className="mt-6 space-y-5">
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{errors.root.message}
						</div>
					)}

					<FieldSelect
						label="Jenis SK"
						value={watch("jenisSk")}
						onChange={(v) => setValue("jenisSk", v)}
						options={JENIS_SK_OPTIONS}
						required
						error={errors.jenisSk?.message}
					/>

					<FieldText
						label="Nomor SK"
						value={watch("nomorSk")}
						onChange={(v) => setValue("nomorSk", v)}
						required
						error={errors.nomorSk?.message}
					/>

					<FieldText
						label="Tanggal SK"
						type="date"
						value={watch("tanggalSk")}
						onChange={(v) => setValue("tanggalSk", v)}
						required
						error={errors.tanggalSk?.message}
					/>

					<FieldText
						label="TMT Berlaku"
						type="date"
						value={watch("tmtBerlaku")}
						onChange={(v) => setValue("tmtBerlaku", v)}
						required
						error={errors.tmtBerlaku?.message}
					/>

					<FieldFk
						label="Golongan"
						options={golonganOpts}
						value={watch("golonganId")}
						onChange={(v) => setValue("golonganId", v)}
						error={errors.golonganId?.message}
					/>

					<FieldText
						label="Gaji Pokok"
						value={watch("gajiPokok")}
						onChange={(v) => setValue("gajiPokok", v)}
						error={errors.gajiPokok?.message}
					/>

					<div className="grid grid-cols-2 gap-3">
						<FieldText
							label="MKG (Tahun)"
							type="number"
							value={watch("mkgTahun")}
							onChange={(v) => setValue("mkgTahun", v)}
							error={errors.mkgTahun?.message}
						/>
						<FieldText
							label="MKG (Bulan)"
							type="number"
							value={watch("mkgBulan")}
							onChange={(v) => setValue("mkgBulan", v)}
							error={errors.mkgBulan?.message}
						/>
					</div>

					<FieldText
						label="Kenaikan Berikutnya"
						type="date"
						value={watch("kenaikanBerikutnya")}
						onChange={(v) => setValue("kenaikanBerikutnya", v)}
						error={errors.kenaikanBerikutnya?.message}
					/>

					<div className="grid grid-cols-2 gap-3">
						<FieldText
							label="MKGB (Tahun)"
							type="number"
							value={watch("mkgbTahun")}
							onChange={(v) => setValue("mkgbTahun", v)}
							error={errors.mkgbTahun?.message}
						/>
						<FieldText
							label="MKGB (Bulan)"
							type="number"
							value={watch("mkgbBulan")}
							onChange={(v) => setValue("mkgbBulan", v)}
							error={errors.mkgbBulan?.message}
						/>
					</div>

					<Field name="updateMaster">
						<div className="flex items-center gap-2">
							<Checkbox
								checked={watch("updateMaster") ?? false}
								onCheckedChange={(v) => setValue("updateMaster", v === true)}
							/>
							<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
								Perbarui data master pegawai sesuai SK ini
							</label>
						</div>
					</Field>

					<FieldTextarea
						label="Notes"
						value={watch("notes")}
						onChange={(v) => setValue("notes", v)}
						error={errors.notes?.message}
					/>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Batal
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Menyimpan..." : "Simpan"}
						</Button>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
