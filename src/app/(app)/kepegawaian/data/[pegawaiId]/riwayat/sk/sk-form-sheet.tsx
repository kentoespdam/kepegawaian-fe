"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldDate, FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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

// ── Section label ──

function SectionLabel({ children }: { children: React.ReactNode }) {
	return <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>;
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

			const url = editingId ? `/api/proxy/kepegawaian/riwayat/sk/${editingId}` : "/api/proxy/kepegawaian/riwayat/sk";
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
		<Sheet
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) onClose();
			}}
		>
			<SheetContent className="sm:max-w-xl">
				<SheetHeader>
					<SheetTitle>{editingId ? "Edit Surat Keputusan" : "Tambah Surat Keputusan"}</SheetTitle>
				</SheetHeader>

				<Separator />

				<form onSubmit={rhfSubmit(onSubmit)} className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0">
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}

					{/* ── Data SK ── */}
					<SectionLabel>Data SK</SectionLabel>

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

					<div className="grid grid-cols-2 gap-3">							<FieldDate
								label="Tanggal SK"
								value={watch("tanggalSk")}
								onChange={(v) => setValue("tanggalSk", v)}
								required
								error={errors.tanggalSk?.message}
							/>							<FieldDate
								label="TMT Berlaku"
								value={watch("tmtBerlaku")}
								onChange={(v) => setValue("tmtBerlaku", v)}
								required
								error={errors.tmtBerlaku?.message}
							/>
					</div>

					<Separator />

					{/* ── Detail Kenaikan ── */}
					<SectionLabel>Detail Kenaikan</SectionLabel>

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
					</div>						<FieldDate
							label="Kenaikan Berikutnya"
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

					<Separator />

					{/* ── Detail Tambahan ── */}
					<SectionLabel>Detail Tambahan</SectionLabel>

					<div className="flex items-center gap-2">
						<Checkbox
							id="updateMaster"
							checked={watch("updateMaster") ?? false}
							onCheckedChange={(v) => setValue("updateMaster", v === true)}
						/>
						<Label htmlFor="updateMaster" className="text-sm font-medium leading-none">
							Perbarui data master pegawai sesuai SK ini
						</Label>
					</div>

					<FieldTextarea
						label="Notes"
						value={watch("notes")}
						onChange={(v) => setValue("notes", v)}
						error={errors.notes?.message}
					/>

					<div className="flex justify-end gap-2 pt-1">
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
