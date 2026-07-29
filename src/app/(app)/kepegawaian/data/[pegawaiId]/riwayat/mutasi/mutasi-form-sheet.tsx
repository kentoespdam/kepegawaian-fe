"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { api } from "@/lib/api/client";
import { JENIS_MUTASI_OPTIONS } from "@/lib/riwayat-constants";
import type { RiwayatMutasiQuery, SingleResultRiwayatMutasiQuery } from "@/types/kepegawaian/riwayat";
import type { SingleResultPegawaiResponseMutasiContext } from "@/types/pegawai/pegawai";
import type { SingleResultDetailDasarGajiNominal } from "@/types/penggajian/detail-dasar-gaji";

// ponytail: jenisSk derived from jenisMutasi — no UI select, no validasi. BE can override if needed.
const JENIS_SK_BY_MUTASI: Record<string, string> = {
	PENGANGKATAN_PERTAMA: "SK_CAPEG",
	MUTASI_LOKER: "SK_MUTASI",
	MUTASI_JABATAN: "SK_JABATAN",
	MUTASI_GOLONGAN: "SK_KENAIKAN_PANGKAT_GOLONGAN",
	MUTASI_GAJI: "SK_PENYESUAIAN_GAJI",
	MUTASI_GAJI_BERKALA: "SK_KENAIKAN_GAJI_BERKALA",
	TERMINASI: "SK_PENSIUN",
};

// ── Schema ──

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

// ── FK normalizer ──

function normalizeFk(d: RiwayatMutasiQuery | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		nomorSk: d.skMutasi?.nomorSk ?? "",
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
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function MutasiFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	// ── Queries ──

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

	const mutasiCtxQuery = useQuery({
		queryKey: ["pegawai-mutasi-context", pegawaiId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/pegawai/${pegawaiId}/mutasi-context`);
			if (!res.ok) throw new Error("Gagal memuat data pegawai");
			const body = (await res.json()) as SingleResultPegawaiResponseMutasiContext;
			return body.data;
		},
		staleTime: 5 * 60_000,
	});

	// ── Form defaults ──
	// ponytail: create mode populates *LamaId from mutasi-context; edit mode from record

	const defaults = useMemo(() => {
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
	}, [editingId, detailQuery.data, mutasiCtxQuery.data, pegawaiId]);

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
	const golonganId = watch("golonganId");
	const mkgTahun = watch("mkgTahun");

	// ── Cascade queries ──

	const golonganOpts = useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);

	const orgOpts = useFkOptions("organisasi");

	const jabQuery = useQuery({
		queryKey: ["jabatan", "organisasi", organisasiId],
		queryFn: () => api.listBy<Record<string, unknown>>("jabatan", "organisasi", String(organisasiId)),
		enabled: !!organisasiId,
		staleTime: 300_000,
	});
	const jabOpts = useMemo(
		() =>
			((jabQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: String(i.nama ?? ""),
			})),
		[jabQuery.data],
	);

	const jabatanId = watch("jabatanId");
	const profesiQuery = useQuery({
		queryKey: ["profesi", "jabatan", jabatanId],
		queryFn: () => api.listBy<Record<string, unknown>>("profesi", "jabatan", String(jabatanId)),
		enabled: !!jabatanId,
		staleTime: 300_000,
	});
	const profesiOpts = useMemo(
		() =>
			((profesiQuery.data ?? []) as Record<string, unknown>[]).map((i) => ({
				value: String(i.id),
				label: String(i.nama ?? ""),
			})),
		[profesiQuery.data],
	);

	// ── Gaji lookup ──

	const [isSearchingGaji, setIsSearchingGaji] = useState(false);

	const handleCariGaji = async () => {
		if (!golonganId || !mkgTahun) return;
		setIsSearchingGaji(true);
		try {
			// ponytail: assume masaKerja = mkgTahun (tahun saja). BE confirmed this interpretation.
			const res = await fetch(`/api/proxy/penggajian/detail-dasar-gaji/${golonganId}/${mkgTahun}`);
			if (!res.ok) return;
			const body = (await res.json()) as SingleResultDetailDasarGajiNominal;
			if (body.data?.nominal != null) {
				setValue("gajiPokok", String(body.data.nominal));
				toast.success("Gaji pokok ditemukan");
			} else {
				toast.info("Gaji pokok tidak ditemukan, isi manual");
			}
		} catch {
			// 404/error → field dikosongkan, HR isi manual
			toast.info("Gagal mencari gaji pokok, isi manual");
		} finally {
			setIsSearchingGaji(false);
		}
	};

	// ── Reset semantics (Keputusan 7b) ──
	// ponytail: setValue(field, undefined) for hidden fields when jenisMutasi changes

	const onJenisMutasiChange = (v: string) => {
		setValue("jenisMutasi", v);
		// ponytail: always clear all conditional fields — setValue(undefined) is cheap
		// and avoids tracking which section was visible before the change
		setValue("golonganId", undefined);
		setValue("mkgTahun", undefined);
		setValue("mkgBulan", undefined);
		setValue("kenaikanBerikutnya", undefined);
		setValue("mkgbTahun", undefined);
		setValue("mkgbBulan", undefined);
		setValue("gajiPokok", undefined);
		setValue("organisasiId", undefined);
		setValue("jabatanId", undefined);
		setValue("profesiId", undefined);
	};

	const isCascadeType = jenisMutasi === "MUTASI_LOKER" || jenisMutasi === "MUTASI_JABATAN";
	const isGolonganType =
		jenisMutasi === "MUTASI_GOLONGAN" || jenisMutasi === "MUTASI_GAJI" || jenisMutasi === "MUTASI_GAJI_BERKALA";
	const isGajiType = jenisMutasi === "MUTASI_GAJI" || jenisMutasi === "MUTASI_GAJI_BERKALA";

	// ── Submit ──

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

	function val(s: unknown): string {
		if (s == null || s === "") return "—";
		return String(s);
	}

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
							{/* Data Pegawai (read-only) */}
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Pegawai</h3>
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
									<div>
										<span className="text-muted-foreground text-xs">NIPAM</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.nipam)}</p>
									</div>
									<div>
										<span className="text-muted-foreground text-xs">Nama</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.nama)}</p>
									</div>
									<div>
										<span className="text-muted-foreground text-xs">Golongan</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.golongan?.nama)}</p>
									</div>
									<div>
										<span className="text-muted-foreground text-xs">Unit Kerja</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.organisasi?.nama)}</p>
									</div>
									<div>
										<span className="text-muted-foreground text-xs">Jabatan</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.jabatan?.nama)}</p>
									</div>
									<div>
										<span className="text-muted-foreground text-xs">Profesi</span>
										<p className="font-medium">{val(mutasiCtxQuery.data?.profesi?.nama)}</p>
									</div>
								</div>
							)}

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
							</div>

							{/* Grup Data Mutasi */}
							<h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Mutasi</h3>
							<FieldSelect
								label="Jenis Mutasi"
								value={jenisMutasi}
								options={JENIS_MUTASI_OPTIONS}
								onChange={onJenisMutasiChange}
								error={e("jenisMutasi")}
								required
							/>

							{/* Conditional: cascade organisasi → jabatan → profesi */}
							{isCascadeType && (
								<div className="space-y-4 pl-2 border-l-2 border-primary/20">
									<p className="text-xs font-medium text-muted-foreground">Penempatan Baru</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

							{/* Conditional: golongan + MKG fields */}
							{isGolonganType && (
								<div className="space-y-4 pl-2 border-l-2 border-primary/20">
									<p className="text-xs font-medium text-muted-foreground">Data Golongan</p>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<FieldFk
											label="Golongan (Baru)"
											options={golonganOpts}
											value={watch("golonganId")}
											onChange={(v) => setValue("golonganId", v)}
											error={e("golonganId")}
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

									{/* Gaji Pokok (only for MUTASI_GAJI / MUTASI_GAJI_BERKALA) */}
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
