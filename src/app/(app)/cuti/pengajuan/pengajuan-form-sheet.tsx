"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Loader2, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { apiErrorMessage } from "@/lib/utils";
import type { ListResultCutiJenisMiniResponse } from "@/types/cuti/jenis";
import type { CutiPengajuanResponse } from "@/types/cuti/pengajuan";

// ── Zod (CU-8) ──

const schema = z.object({
	jenisCutiId: z.number().min(1, "Jenis cuti wajib dipilih"),
	subJenisCutiId: z.number().optional(),
	tanggalMulai: z.string().min(1, "Tanggal mulai wajib"),
	tanggalSelesai: z.string().min(1, "Tanggal selesai wajib"),
	jumlahHariKerja: z.number().min(1, "Jumlah hari kerja wajib"),
	alasan: z.string().min(1, "Alasan wajib diisi"),
});
type FormValues = z.infer<typeof schema>;

// ── Helpers ──

/** Selisih hari kalender + 1 (inklusi kedua ujung) — CU-8. */
function selisihHari(mulai: string | undefined, selesai: string | undefined): number | null {
	if (!mulai || !selesai) return null;
	const a = new Date(`${mulai}T00:00:00`);
	const b = new Date(`${selesai}T00:00:00`);
	if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
	const diff = Math.round((b.getTime() - a.getTime()) / 86_400_000) + 1;
	return diff >= 1 ? diff : null;
}

interface PengajuanFormSheetProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	pegawaiId: number;
	nama: string | null;
	nipam: string | null;
	jabatan: string | null;
	editing: CutiPengajuanResponse | null;
}

export function PengajuanFormSheet({
	open,
	onOpenChange,
	pegawaiId,
	nama,
	nipam,
	jabatan,
	editing,
}: PengajuanFormSheetProps) {
	const qc = useQueryClient();
	const [jenisCutiId, setJenisCutiId] = useState<number | undefined>(undefined);

	const {
		setValue,
		watch,
		handleSubmit: rhfSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const tanggalMulai = watch("tanggalMulai");
	const tanggalSelesai = watch("tanggalSelesai");
	const jumlahHari = useMemo(() => selisihHari(tanggalMulai, tanggalSelesai), [tanggalMulai, tanggalSelesai]);

	// ── Pre-fill saat open ──
	useEffect(() => {
		if (open) {
			if (editing) {
				setJenisCutiId(editing.jenisCuti?.id ?? undefined);
				reset({
					jenisCutiId: editing.jenisCuti?.id ?? 0,
					subJenisCutiId: editing.subJenisCuti?.id ?? undefined,
					tanggalMulai: editing.tanggalMulai ?? "",
					tanggalSelesai: editing.tanggalSelesai ?? "",
					jumlahHariKerja: editing.jumlahHariKerja ?? 0,
					alasan: editing.alasan ?? "",
				});
			} else {
				setJenisCutiId(undefined);
				reset({
					jenisCutiId: 0,
					subJenisCutiId: undefined,
					tanggalMulai: "",
					tanggalSelesai: "",
					jumlahHariKerja: 0,
					alasan: "",
				});
			}
		}
	}, [open, editing, reset]);

	// ── Jenis & Sub-Jenis — satu fetch flat list; filter parentId client-side (CU-16) ──
	const jenisQuery = useQuery({
		queryKey: ["cuti-jenis-list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/cuti/jenis/list");
			if (!res.ok) throw new Error("Gagal memuat jenis cuti");
			const body = (await res.json()) as ListResultCutiJenisMiniResponse;
			return body.data ?? [];
		},
		staleTime: 300_000,
	});

	// CU-16: combo Jenis = root saja (parentId null); combo Sub-Jenis = turunan jenis terpilih.
	// ponytail: sub-jenis kosong → field tidak ditampilkan (bukan tampil + disabled) — CU-8
	const jenisOptions = (jenisQuery.data ?? [])
		.filter((i) => i.parentId == null)
		.map((i) => ({ value: String(i.id), label: i.nama ?? "" }));
	const subJenisOptions = (jenisQuery.data ?? [])
		.filter((i) => i.parentId === jenisCutiId)
		.map((i) => ({ value: String(i.id), label: i.nama ?? "" }));

	// ── Jumlah Hari Kerja (fetched saat kedua tanggal terisi) ──
	const hariKerjaQuery = useQuery({
		queryKey: ["cuti-total-hari-kerja", tanggalMulai, tanggalSelesai],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/cuti/pengajuan/${tanggalMulai}/${tanggalSelesai}/total-hari-kerja`);
			if (!res.ok) throw new Error("Gagal menghitung hari kerja");
			const body = (await res.json()) as { data?: number };
			return body.data ?? 0;
		},
		enabled: !!tanggalMulai && !!tanggalSelesai && tanggalSelesai >= tanggalMulai,
		staleTime: 60_000,
	});

	// Sync hasil hitung ke form field jumlahHariKerja (read-only display)
	useEffect(() => {
		if (hariKerjaQuery.data != null && hariKerjaQuery.isSuccess) {
			setValue("jumlahHariKerja", hariKerjaQuery.data);
		}
	}, [hariKerjaQuery.data, hariKerjaQuery.isSuccess, setValue]);

	// ── Submit (POST/PUT + csrfToken) ──
	const saveMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			// ponytail: BE minta csrfToken di body; FE tidak punya mekanisme mint —
			// fetch token dari GET /auth/csrf-token saat submit (endpoint yang tersedia)
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const body = {
				csrfToken: csrfBody.data ?? "",
				pegawaiId,
				jenisCutiId: values.jenisCutiId,
				subJenisCutiId: values.subJenisCutiId,
				tanggalMulai: values.tanggalMulai,
				tanggalSelesai: values.tanggalSelesai,
				jumlahHariKerja: values.jumlahHariKerja,
				alasan: values.alasan,
			};
			const res = await fetch(`/api/proxy/cuti/pengajuan${editing?.id ? `/${editing.id}` : ""}`, {
				method: editing?.id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal menyimpan pengajuan"));
			}
		},
		onSuccess: () => {
			toast.success(editing ? "Pengajuan cuti diperbarui" : "Pengajuan cuti berhasil dikirim");
			onOpenChange(false);
			qc.invalidateQueries({ queryKey: ["cuti-pengajuan"] });
			qc.invalidateQueries({ queryKey: ["cuti-kuota"] });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	return (
		<Sheet open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
			<SheetContent className="sm:max-w-xl flex flex-col h-full">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-2">
						<CalendarDays className="size-4 text-primary" />
						{editing ? "Edit Pengajuan Cuti" : "Tambah Pengajuan Cuti"}
					</SheetTitle>
				</SheetHeader>
				<Separator />
				<form
					onSubmit={rhfSubmit((v) => saveMutation.mutate(v))}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0"
				>
					{/* ── Info Pegawai (read-only header) — CU-8 ── */}
					<div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2.5">
						<div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
							<UserRound className="size-5" />
						</div>
						<div className="min-w-0">
							<p className="text-sm font-semibold truncate">
								{nama ?? "—"} {nipam && <span className="font-normal text-muted-foreground">({nipam})</span>}
							</p>
							<p className="text-xs text-muted-foreground truncate">{jabatan ?? "—"}</p>
						</div>
					</div>

					{/* ── Jenis & Sub-Jenis (berantai) ── */}
					<FieldFk
						label="Jenis Cuti"
						options={jenisOptions}
						value={jenisCutiId != null ? String(jenisCutiId) : undefined}
						onChange={(v) => {
							const id = v ? Number(v) : undefined;
							setJenisCutiId(id);
							setValue("jenisCutiId", id ?? 0);
							setValue("subJenisCutiId", undefined);
						}}
						required
						loading={jenisQuery.isPending}
						error={errors.jenisCutiId?.message}
					/>
					{subJenisOptions.length > 0 && (
						<FieldFk
							label="Sub-Jenis Cuti"
							options={subJenisOptions}
							value={watch("subJenisCutiId") != null ? String(watch("subJenisCutiId")) : undefined}
							onChange={(v) => setValue("subJenisCutiId", v ? Number(v) : undefined)}
							loading={jenisQuery.isPending}
						/>
					)}

					{/* ── Tanggal ── */}
					<div className="grid grid-cols-2 gap-3">
						<FieldDate
							label="Tanggal Mulai"
							value={tanggalMulai}
							onChange={(v) => setValue("tanggalMulai", v)}
							required
							error={errors.tanggalMulai?.message}
						/>
						<FieldDate
							label="Tanggal Selesai"
							value={tanggalSelesai}
							onChange={(v) => setValue("tanggalSelesai", v)}
							required
							error={errors.tanggalSelesai?.message}
						/>
					</div>

					{/* ── Jumlah Hari (computed) + Jumlah Hari Kerja (fetched, read-only) ── */}
					<div className="grid grid-cols-2 gap-3">
						<FieldText label="Jumlah Hari" value={jumlahHari != null ? String(jumlahHari) : "—"} onChange={() => {}} />
						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<p className="text-sm font-medium">
									Jumlah Hari Kerja <span className="text-destructive">*</span>
								</p>
								{hariKerjaQuery.isFetching && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
							</div>
							{/* ponytail: error fetch → "—" inline, bukan toast (CU-13) */}
							<div className="flex h-11 items-center rounded-lg border border-input bg-muted/30 px-2.5 text-base tabular-nums md:text-sm">
								{hariKerjaQuery.isError ? "—" : (hariKerjaQuery.data ?? "—")}
							</div>
							{errors.jumlahHariKerja?.message && (
								<p className="text-xs text-destructive">{errors.jumlahHariKerja.message}</p>
							)}
						</div>
					</div>

					<FieldTextarea
						label="Alasan"
						value={watch("alasan")}
						onChange={(v) => setValue("alasan", v)}
						required
						error={errors.alasan?.message}
					/>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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
