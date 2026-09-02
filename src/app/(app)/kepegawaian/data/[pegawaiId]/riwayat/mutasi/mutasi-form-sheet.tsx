"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { normalizeFk, useJabatanProfesiCascade, useMutasiFormQueries } from "@/hooks/useMutasiFormQueries";
import { JENIS_MUTASI_OPTIONS } from "@/lib/riwayat-constants";
import { apiErrorMessage, cn } from "@/lib/utils";
import type { SingleResultDetailDasarGajiNominal } from "@/types/penggajian/detail-dasar-gaji";

// ponytail: jenisSk derived from jenisMutasi
const JENIS_SK_BY_MUTASI: Record<string, string> = {
	PENGANGKATAN_PERTAMA: "SK_CAPEG",
	MUTASI_LOKER: "SK_MUTASI",
	MUTASI_JABATAN: "SK_JABATAN",
	MUTASI_GOLONGAN: "SK_KENAIKAN_PANGKAT_GOLONGAN",
	MUTASI_GAJI: "SK_PENYESUAIAN_GAJI",
	MUTASI_GAJI_BERKALA: "SK_KENAIKAN_GAJI_BERKALA",
	TERMINASI: "SK_PENSIUN",
};

const schema = z.object({
	nomorSk: z.string().min(1, "Nomor SK wajib"),
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

function SectionLabel({ children }: { children: React.ReactNode }) {
	return <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>;
}

interface Props {
	pegawaiId: string;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function MutasiFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();
	const { detailQuery, mutasiCtxQuery, golonganOpts, orgOpts } = useMutasiFormQueries(pegawaiId, editingId);

	// Form defaults
	const defaults = (() => {
		if (editingId) return normalizeFk(detailQuery.data);
		const ctx = mutasiCtxQuery.data;
		if (!ctx) return { pegawaiId: Number(pegawaiId) };
		return {
			pegawaiId: Number(pegawaiId),
			golonganLamaId: String(ctx.golongan?.id ?? ""),
			organisasiLamaId: String(ctx.organisasi?.id ?? ""),
			jabatanLamaId: String(ctx.jabatan?.id ?? ""),
			profesiLamaId: String(ctx.profesi?.id ?? ""),
		};
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

	const jenisMutasi = watch("jenisMutasi");
	const organisasiId = watch("organisasiId");
	const jabatanId = watch("jabatanId");
	const golonganId = watch("golonganId");
	const mkgTahun = watch("mkgTahun");

	const { jabQuery, jabOpts, profesiQuery, profesiOpts } = useJabatanProfesiCascade(organisasiId, jabatanId);

	// Gaji lookup
	const [isSearchingGaji, setIsSearchingGaji] = useState(false);
	const [gajiLookup, setGajiLookup] = useState<{ tone: "success" | "warning" | "destructive"; text: string } | null>(
		null,
	);

	const handleCariGaji = async () => {
		if (!golonganId || !mkgTahun) return;
		setIsSearchingGaji(true);
		setGajiLookup(null);
		try {
			const res = await fetch(`/api/proxy/penggajian/detail-dasar-gaji/${golonganId}/${mkgTahun}`);
			if (!res.ok) throw new Error("Gagal mencari gaji pokok, isi manual");
			const body = (await res.json()) as SingleResultDetailDasarGajiNominal;
			if (body.data?.nominal != null) {
				setValue("gajiPokok", String(body.data.nominal));
				setGajiLookup({ tone: "success", text: "Gaji pokok ditemukan dan diisi otomatis" });
			} else {
				setGajiLookup({ tone: "warning", text: "Gaji pokok tidak ditemukan, isi manual" });
			}
		} catch {
			setGajiLookup({ tone: "destructive", text: "Gagal mencari gaji pokok, isi manual" });
		} finally {
			setIsSearchingGaji(false);
		}
	};

	const onJenisMutasiChange = (v: string) => {
		setValue("jenisMutasi", v);
		setGajiLookup(null);
		for (const f of [
			"golonganId",
			"mkgTahun",
			"mkgBulan",
			"kenaikanBerikutnya",
			"mkgbTahun",
			"mkgbBulan",
			"gajiPokok",
			"organisasiId",
			"jabatanId",
			"profesiId",
		] as const) {
			setValue(f, undefined);
		}
	};

	const isCascadeType = jenisMutasi === "MUTASI_LOKER" || jenisMutasi === "MUTASI_JABATAN";
	const isGolonganType =
		jenisMutasi === "MUTASI_GOLONGAN" || jenisMutasi === "MUTASI_GAJI" || jenisMutasi === "MUTASI_GAJI_BERKALA";
	const isGajiType = jenisMutasi === "MUTASI_GAJI" || jenisMutasi === "MUTASI_GAJI_BERKALA";

	// Submit
	const onSubmit = async (values: FormValues) => {
		try {
			const payload: Record<string, unknown> = {
				pegawaiId: Number(pegawaiId),
				nomorSk: values.nomorSk,
				jenisSk: JENIS_SK_BY_MUTASI[values.jenisMutasi] ?? "SK_LAINNYA",
				tanggalSk: values.tanggalSk,
				tmtBerlaku: values.tmtBerlaku,
				jenisMutasi: values.jenisMutasi,
			};
			if (values.gajiPokok) payload.gajiPokok = Number(values.gajiPokok);
			if (values.mkgTahun) payload.mkgTahun = Number(values.mkgTahun);
			if (values.mkgBulan) payload.mkgBulan = Number(values.mkgBulan);
			if (values.kenaikanBerikutnya) payload.kenaikanBerikutnya = values.kenaikanBerikutnya;
			if (values.mkgbTahun) payload.mkgbTahun = Number(values.mkgbTahun);
			if (values.mkgbBulan) payload.mkgbBulan = Number(values.mkgbBulan);
			if (values.notes) payload.notes = values.notes;
			if (values.tanggalBerakhir) payload.tanggalBerakhir = values.tanggalBerakhir;
			if (values.updateMaster) payload.updateMaster = true;
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
			const res = await fetch(url, {
				method: editingId ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan"));
			}
			toast.success(editingId ? "Mutasi berhasil diperbarui" : "Mutasi berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: riwayatKeys.mutasi.all() });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	const e = (name: keyof FormValues) => (errors[name] ? String(errors[name]?.message ?? "") : undefined);
	const val = (s: unknown) => (s == null || s === "" ? "—" : String(s));

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
				<Separator />
				<div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
					{editingId && detailQuery.isPending ? (
						<div className="flex items-center justify-center py-12">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					) : (
						<form id="mutasi-form" onSubmit={rhfSubmit(onSubmit)} className="space-y-3.5 pt-4">
							<SectionLabel>Data Pegawai</SectionLabel>
							{mutasiCtxQuery.isPending ? (
								<div className="flex items-center justify-center py-4">
									<Loader2 className="size-5 animate-spin text-muted-foreground" />
								</div>
							) : mutasiCtxQuery.isError ? (
								<button
									type="button"
									onClick={() => mutasiCtxQuery.refetch()}
									className="text-sm text-destructive hover:underline"
								>
									Gagal memuat — coba lagi
								</button>
							) : (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 rounded-lg border bg-muted/30 px-4 py-3 text-sm">
									{(
										[
											["NIPAM", val(mutasiCtxQuery.data?.nipam)],
											["Nama", val(mutasiCtxQuery.data?.nama)],
											["Golongan", val(mutasiCtxQuery.data?.golongan?.nama)],
											["Unit Kerja", val(mutasiCtxQuery.data?.organisasi?.nama)],
											["Jabatan", val(mutasiCtxQuery.data?.jabatan?.nama)],
											["Profesi", val(mutasiCtxQuery.data?.profesi?.nama)],
										] as const
									).map(([k, v]) => (
										<div key={k}>
											<span className="text-muted-foreground text-xs">{k}</span>
											<p className="font-medium">{v}</p>
										</div>
									))}
								</div>
							)}
							<Separator />
							<SectionLabel>Surat Keputusan</SectionLabel>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<FieldText
									label="Nomor SK"
									value={watch("nomorSk")}
									onChange={(v) => setValue("nomorSk", v)}
									error={e("nomorSk")}
									required
								/>
								<FieldDate
									label="Tanggal SK"
									value={watch("tanggalSk")}
									onChange={(v) => setValue("tanggalSk", v)}
									error={e("tanggalSk")}
									required
								/>
								<FieldDate
									label="TMT Berlaku"
									value={watch("tmtBerlaku")}
									onChange={(v) => setValue("tmtBerlaku", v)}
									error={e("tmtBerlaku")}
									required
								/>
							</div>
							<Separator />
							<SectionLabel>Data Mutasi</SectionLabel>
							<FieldSelect
								label="Jenis Mutasi"
								value={jenisMutasi}
								options={JENIS_MUTASI_OPTIONS}
								onChange={onJenisMutasiChange}
								error={e("jenisMutasi")}
								required
							/>
							{isCascadeType && (
								<div className="space-y-4 pl-2 border-l-2 border-primary/20">
									<p className="text-xs font-medium text-muted-foreground">Penempatan Baru</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<FieldFk
											label="Unit Kerja"
											options={orgOpts}
											value={watch("organisasiId")}
											onChange={(v) => {
												setValue("organisasiId", v);
												setValue("jabatanId", undefined);
												setValue("profesiId", undefined);
											}}
											error={e("organisasiId")}
											required
											placeholder="Pilih unit kerja"
										/>
										<FieldFk
											label="Jabatan"
											options={jabOpts}
											value={watch("jabatanId")}
											onChange={(v) => {
												setValue("jabatanId", v);
												setValue("profesiId", undefined);
											}}
											error={e("jabatanId")}
											disabled={!organisasiId}
											loading={jabQuery.isFetching}
											placeholder={organisasiId ? "Pilih jabatan" : "Pilih unit kerja dulu"}
										/>
										<FieldFk
											label="Profesi"
											options={profesiOpts}
											value={watch("profesiId")}
											onChange={(v) => setValue("profesiId", v)}
											error={e("profesiId")}
											disabled={!jabatanId}
											loading={profesiQuery.isFetching}
											placeholder={jabatanId ? "Pilih profesi" : "Pilih jabatan dulu"}
										/>
									</div>
								</div>
							)}
							{isGolonganType && (
								<div className="space-y-4 pl-2 border-l-2 border-primary/20">
									<p className="text-xs font-medium text-muted-foreground">Data Golongan</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<FieldFk
											label="Golongan (Baru)"
											options={golonganOpts}
											value={watch("golonganId")}
											onChange={(v) => {
												setValue("golonganId", v);
												setGajiLookup(null);
											}}
											error={e("golonganId")}
											required
										/>
										<FieldText
											label="MKG (Tahun)"
											type="number"
											value={watch("mkgTahun")}
											onChange={(v) => {
												setValue("mkgTahun", v);
												setGajiLookup(null);
											}}
											error={e("mkgTahun")}
										/>
										<FieldText
											label="MKG (Bulan)"
											type="number"
											value={watch("mkgBulan")}
											onChange={(v) => setValue("mkgBulan", v)}
											error={e("mkgBulan")}
										/>
										<FieldDate
											label="Kenaikan Berikutnya"
											value={watch("kenaikanBerikutnya")}
											onChange={(v) => setValue("kenaikanBerikutnya", v)}
											error={e("kenaikanBerikutnya")}
										/>
										<FieldText
											label="MKGB (Tahun)"
											type="number"
											value={watch("mkgbTahun")}
											onChange={(v) => setValue("mkgbTahun", v)}
											error={e("mkgbTahun")}
										/>
										<FieldText
											label="MKGB (Bulan)"
											type="number"
											value={watch("mkgbBulan")}
											onChange={(v) => setValue("mkgbBulan", v)}
											error={e("mkgbBulan")}
										/>
									</div>
									{isGajiType && (
										<div className="space-y-2">
											<p className="text-xs font-medium text-muted-foreground">Gaji Pokok</p>
											<div className="flex items-end gap-2">
												<div className="flex-1">
													<FieldText
														label="Gaji Pokok"
														type="number"
														value={watch("gajiPokok")}
														onChange={(v) => setValue("gajiPokok", v)}
														error={e("gajiPokok")}
														placeholder="0"
													/>
												</div>
												<Button
													type="button"
													variant="outline"
													size="icon"
													className="h-11 w-11 shrink-0"
													onClick={handleCariGaji}
													disabled={!golonganId || !mkgTahun || isSearchingGaji}
													title="Cari gaji pokok dari golongan & MKG"
												>
													{isSearchingGaji ? (
														<Loader2 className="size-4 animate-spin" />
													) : (
														<Search className="size-4" />
													)}
												</Button>
											</div>
											<p className="text-xs text-muted-foreground">
												{!golonganId || !mkgTahun
													? "Pilih golongan & isi MKG untuk mencari gaji pokok"
													: "Klik cari untuk mengisi otomatis dari data penggajian"}
											</p>
											{gajiLookup && (
												<output
													className={cn(
														"block text-xs font-medium",
														gajiLookup.tone === "success" && "text-success",
														gajiLookup.tone === "warning" && "text-warning",
														gajiLookup.tone === "destructive" && "text-destructive",
													)}
												>
													{gajiLookup.text}
												</output>
											)}
										</div>
									)}
								</div>
							)}
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
