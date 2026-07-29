"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { JENIS_MUTASI_OPTIONS, JENIS_SK_OPTIONS } from "@/lib/riwayat-constants";
import type { RiwayatMutasiQuery, SingleResultRiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";

// ── Schema ──

const schema = z.object({
	nomorSk: z.string().min(1, "Nomor SK wajib"),
	jenisSk: z.string().min(1, "Jenis SK wajib"),
	tanggalSk: z.string().min(1, "Tanggal SK wajib"),
	tmtBerlaku: z.string().min(1, "TMT berlaku wajib"),
	jenisMutasi: z.string().min(1, "Jenis mutasi wajib"),
	gajiPokok: z.string().optional(),
	mkgTahun: z.string().optional(),
	mkgBulan: z.string().optional(),
	kenaikanBerikutnya: z.string().optional(),
	mkgbTahun: z.string().optional(),
	mkgbBulan: z.string().optional(),
	updateMaster: z.boolean().optional(),
	notes: z.string().optional(),
	tanggalBerakhir: z.string().optional(),
	golonganId: z.string().optional(),
	organisasiId: z.string().optional(),
	jabatanId: z.string().optional(),
	profesiId: z.string().optional(),
	golonganLamaId: z.string().optional(),
	organisasiLamaId: z.string().optional(),
	jabatanLamaId: z.string().optional(),
	profesiLamaId: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── FK normalizer: response bawa FK nested {id,nama}, PostRequest punya scalar *Id ──

function normalizeFk(d: RiwayatMutasiQuery | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		nomorSk: d.skMutasi?.nomorSk ?? "",
		jenisSk: d.skMutasi?.jenisSk ?? "",
		tanggalSk: d.skMutasi?.tanggalSk ?? "",
		tmtBerlaku: d.skMutasi?.tmtBerlaku ?? "",
		gajiPokok: String(d.skMutasi?.gajiPokok ?? "") || undefined,
		mkgTahun: String(d.skMutasi?.mkgTahun ?? "") || undefined,
		mkgBulan: String(d.skMutasi?.mkgBulan ?? "") || undefined,
		kenaikanBerikutnya: d.skMutasi?.kenaikanBerikutnya ?? "",
		mkgbTahun: String(d.skMutasi?.mkgbTahun ?? "") || undefined,
		mkgbBulan: String(d.skMutasi?.mkgbBulan ?? "") || undefined,
		updateMaster: d.skMutasi?.updateMaster ?? false,
		notes: d.notes ?? "",
		jenisMutasi: d.jenisMutasi ?? "",
		tanggalBerakhir: d.tanggalBerakhir ?? "",
		golonganId: String(d.golongan?.id ?? "") || undefined,
		organisasiId: String(d.organisasi?.id ?? "") || undefined,
		jabatanId: String(d.jabatan?.id ?? "") || undefined,
		profesiId: String(d.profesi?.id ?? "") || undefined,
		golonganLamaId: String(d.golonganLama?.id ?? "") || undefined,
		organisasiLamaId: String(d.organisasiLama?.id ?? "") || undefined,
		jabatanLamaId: String(d.jabatanLama?.id ?? "") || undefined,
		profesiLamaId: String(d.profesiLama?.id ?? "") || undefined,
	};
}

// ── Component ──

interface Props {
	pegawaiId: string;
	editingId: string | null; // null = create (open but no id), string = edit
	isOpen: boolean;
	onClose: () => void;
}

export function MutasiFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["riwayat-mutasi-detail", editingId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/mutasi/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data mutasi");
			const body = (await res.json()) as SingleResultRiwayatMutasiQuery;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	const defaults = useMemo(
		() => (editingId ? normalizeFk(detailQuery.data) : { pegawaiId: Number(pegawaiId) }),
		[editingId, detailQuery.data, pegawaiId],
	);

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

	const orgOpts = useFkOptions("organisasi");
	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
	const profesiOpts = useFkOptions("profesi");

	const onSubmit = async (values: FormValues) => {
		try {
			const payload: Record<string, unknown> = {
				pegawaiId: Number(pegawaiId),
				nomorSk: values.nomorSk,
				jenisSk: values.jenisSk,
				tanggalSk: values.tanggalSk,
				tmtBerlaku: values.tmtBerlaku,
				jenisMutasi: values.jenisMutasi,
			};
			// Optional fields — only send if non-empty
			if (values.gajiPokok) payload.gajiPokok = Number(values.gajiPokok);
			if (values.mkgTahun) payload.mkgTahun = Number(values.mkgTahun);
			if (values.mkgBulan) payload.mkgBulan = Number(values.mkgBulan);
			if (values.kenaikanBerikutnya) payload.kenaikanBerikutnya = values.kenaikanBerikutnya;
			if (values.mkgbTahun) payload.mkgbTahun = Number(values.mkgbTahun);
			if (values.mkgbBulan) payload.mkgbBulan = Number(values.mkgbBulan);
			if (values.notes) payload.notes = values.notes;
			if (values.tanggalBerakhir) payload.tanggalBerakhir = values.tanggalBerakhir;
			if (values.updateMaster) payload.updateMaster = true;
			// FK scalars
			for (const fk of [
				"golonganId",
				"organisasiId",
				"jabatanId",
				"profesiId",
				"golonganLamaId",
				"organisasiLamaId",
				"jabatanLamaId",
				"profesiLamaId",
			] as const) {
				if (values[fk]) payload[fk] = Number(values[fk]);
			}

			const url = editingId
				? `/api/proxy/kepegawaian/riwayat/mutasi/${editingId}`
				: "/api/proxy/kepegawaian/riwayat/mutasi";
			const method = editingId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error((body as { message?: string }).message ?? "Gagal menyimpan");
			}
			toast.success(editingId ? "Mutasi berhasil diperbarui" : "Mutasi berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["riwayat-mutasi", pegawaiId] });
			onClose();
		} catch (e: unknown) {
			setError("root", { message: e instanceof Error ? e.message : "Terjadi kesalahan" });
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
					<SheetTitle>{editingId ? "Edit Mutasi" : "Tambah Mutasi"}</SheetTitle>
				</SheetHeader>
				<div className="flex-1 overflow-y-auto px-4 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="mutasi-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-4 pt-4">
							{/* Grup Surat Keputusan */}
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Surat Keputusan</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldText
									label="Nomor SK"
									value={watch("nomorSk")}
									onChange={(v) => setValue("nomorSk", v)}
									error={e("nomorSk")}
									required
								/>
								<FieldSelect
									label="Jenis SK"
									value={watch("jenisSk")}
									options={JENIS_SK_OPTIONS}
									onChange={(v) => setValue("jenisSk", v)}
									error={e("jenisSk")}
									required
								/>
								<FieldText
									label="Tanggal SK"
									type="date"
									value={watch("tanggalSk")}
									onChange={(v) => setValue("tanggalSk", v)}
									error={e("tanggalSk")}
									required
								/>
								<FieldText
									label="TMT Berlaku"
									type="date"
									value={watch("tmtBerlaku")}
									onChange={(v) => setValue("tmtBerlaku", v)}
									error={e("tmtBerlaku")}
									required
								/>
								<FieldText
									label="Gaji Pokok"
									type="number"
									value={watch("gajiPokok")}
									onChange={(v) => setValue("gajiPokok", v)}
									error={e("gajiPokok")}
								/>
								<FieldText
									label="MKG (Tahun)"
									type="number"
									value={watch("mkgTahun")}
									onChange={(v) => setValue("mkgTahun", v)}
									error={e("mkgTahun")}
								/>
								<FieldText
									label="MKG (Bulan)"
									type="number"
									value={watch("mkgBulan")}
									onChange={(v) => setValue("mkgBulan", v)}
									error={e("mkgBulan")}
								/>
								<FieldText
									label="Kenaikan Berikutnya"
									type="date"
									value={watch("kenaikanBerikutnya")}
									onChange={(v) => setValue("kenaikanBerikutnya", v)}
									error={e("kenaikanBerikutnya")}
								/>
								<FieldText
									label="MKG B (Tahun)"
									type="number"
									value={watch("mkgbTahun")}
									onChange={(v) => setValue("mkgbTahun", v)}
									error={e("mkgbTahun")}
								/>
								<FieldText
									label="MKG B (Bulan)"
									type="number"
									value={watch("mkgbBulan")}
									onChange={(v) => setValue("mkgbBulan", v)}
									error={e("mkgbBulan")}
								/>
							</div>
							<label className="flex items-center gap-2 cursor-pointer">
								<input
									type="checkbox"
									checked={watch("updateMaster") ?? false}
									onChange={(e) => setValue("updateMaster", e.target.checked)}
									className="size-4 accent-primary"
								/>
								<span className="text-sm font-normal">Perbarui data pegawai sesuai mutasi ini</span>
							</label>
							<FieldTextarea
								label="Notes"
								value={watch("notes")}
								onChange={(v) => setValue("notes", v)}
								error={e("notes")}
							/>

							{/* Grup Mutasi */}
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pt-2">Perubahan</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<FieldSelect
									label="Jenis Mutasi"
									value={watch("jenisMutasi")}
									options={JENIS_MUTASI_OPTIONS}
									onChange={(v) => setValue("jenisMutasi", v)}
									error={e("jenisMutasi")}
									required
								/>
								<FieldText
									label="Tanggal Berakhir"
									type="date"
									value={watch("tanggalBerakhir")}
									onChange={(v) => setValue("tanggalBerakhir", v)}
									error={e("tanggalBerakhir")}
								/>
								{/* Pasangan Lama/Baru */}
								<FieldFk
									label="Golongan (Lama)"
									options={golonganOpts}
									value={watch("golonganLamaId")}
									onChange={(v) => setValue("golonganLamaId", v)}
									error={e("golonganLamaId")}
								/>
								<FieldFk
									label="Golongan (Baru)"
									options={golonganOpts}
									value={watch("golonganId")}
									onChange={(v) => setValue("golonganId", v)}
									error={e("golonganId")}
								/>
								<FieldFk
									label="Organisasi (Lama)"
									options={orgOpts}
									value={watch("organisasiLamaId")}
									onChange={(v) => setValue("organisasiLamaId", v)}
									error={e("organisasiLamaId")}
								/>
								<FieldFk
									label="Organisasi (Baru)"
									options={orgOpts}
									value={watch("organisasiId")}
									onChange={(v) => setValue("organisasiId", v)}
									error={e("organisasiId")}
								/>
								<FieldFk
									label="Profesi (Lama)"
									options={profesiOpts}
									value={watch("profesiLamaId")}
									onChange={(v) => setValue("profesiLamaId", v)}
									error={e("profesiLamaId")}
								/>
								<FieldFk
									label="Profesi (Baru)"
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
					<Button type="submit" form="mutasi-form" disabled={isSubmitting || (!!editingId && detailQuery.isPending)}>
						{isSubmitting && <Loader2 className="mr-1.5 size-4 animate-spin" />}
						{isSubmitting ? "Menyimpan…" : "Simpan"}
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
