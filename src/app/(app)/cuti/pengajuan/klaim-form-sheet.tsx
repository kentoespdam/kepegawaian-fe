"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldDate, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cutiKeys } from "@/hooks/keys/cuti-keys";
import { formatDate } from "@/lib/utils";
import type { CutiPengajuanResponse } from "@/types/cuti/pengajuan";
import type { KlaimFormValues as FormValues } from "./klaim-form-schema";
import { generateListHari, hitungHari, klaimFormSchema } from "./klaim-form-schema";

interface KlaimFormSheetProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	pegawaiId: number;
	pengajuan: CutiPengajuanResponse;
}

export function KlaimFormSheet({ open, onOpenChange, pegawaiId, pengajuan }: KlaimFormSheetProps) {
	const qc = useQueryClient();

	// CU-25/26: schema divalidasi terhadap rentang pengajuan asal
	const schema = useMemo(() => klaimFormSchema(pengajuan), [pengajuan]);

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
	const jumlahHari = hitungHari(tanggalMulai, tanggalSelesai);

	// CU-25: Default = full range dari pengajuan asal
	useEffect(() => {
		if (open) {
			reset({
				tanggalMulai: pengajuan.tanggalMulai ?? "",
				tanggalSelesai: pengajuan.tanggalSelesai ?? "",
				keterangan: "",
			});
		}
	}, [open, pengajuan, reset]);

	// CU-25: Submit klaim
	const klaimMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			// ponytail: fetch csrfToken dari endpoint yang sudah ada
			const csrfRes = await fetch("/api/proxy/auth/csrf-token");
			if (!csrfRes.ok) throw new Error("Gagal mendapatkan token keamanan");
			const csrfBody = (await csrfRes.json()) as { data?: string };

			const body = {
				csrfToken: csrfBody.data ?? "",
				refCutiId: pengajuan.id ?? 0,
				pegawaiId,
				listHari: generateListHari(values.tanggalMulai, values.tanggalSelesai),
				keterangan: values.keterangan || undefined,
			};
			const res = await fetch("/api/proxy/cuti/pengajuan/klaim", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(b.message ?? "Gagal mengajukan klaim cuti");
			}
		},
		onSuccess: () => {
			toast.success("Klaim cuti berhasil dikirim");
			onOpenChange(false);
			qc.invalidateQueries({ queryKey: cutiKeys.pengajuan.all() });
			qc.invalidateQueries({ queryKey: cutiKeys.kuota.all() });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	return (
		<Sheet open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
			<SheetContent className="sm:max-w-xl flex flex-col h-full">
				<SheetHeader>
					<SheetTitle className="flex items-center gap-2">
						<CalendarDays className="size-4 text-primary" />
						Klaim Cuti
					</SheetTitle>
				</SheetHeader>
				<Separator />
				<form
					onSubmit={rhfSubmit((v) => klaimMutation.mutate(v))}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0"
				>
					{/* CU-25: Info Pengajuan Asal (read-only) */}
					<div className="rounded-lg border bg-muted/30 px-3 py-2.5 space-y-2">
						<p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Info Pengajuan Asal</p>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								<span className="text-muted-foreground">Jenis Cuti: </span>
								<span className="font-medium">{pengajuan.jenisCuti?.nama ?? "—"}</span>
							</div>
							<div>
								<span className="text-muted-foreground">Jumlah Hari: </span>
								<span className="font-medium">{pengajuan.jumlahHari ?? "—"}</span>
							</div>
							<div className="col-span-2">
								<span className="text-muted-foreground">Periode: </span>
								<span className="font-medium">
									{formatDate(pengajuan.tanggalMulai)} – {formatDate(pengajuan.tanggalSelesai)}
								</span>
							</div>
						</div>
					</div>

					{/* CU-26: Range Picker — Tanggal Mulai & Selesai */}
					<div className="grid grid-cols-2 gap-3">
						<FieldDate
							label="Tanggal Mulai Klaim"
							value={tanggalMulai}
							onChange={(v) => setValue("tanggalMulai", v)}
							required
							min={pengajuan.tanggalMulai}
							error={errors.tanggalMulai?.message}
						/>
						<FieldDate
							label="Tanggal Selesai Klaim"
							value={tanggalSelesai}
							onChange={(v) => setValue("tanggalSelesai", v)}
							required
							min={tanggalMulai || pengajuan.tanggalMulai}
							error={errors.tanggalSelesai?.message}
						/>
					</div>

					{/* CU-25: Jumlah Hari Klaim (read-only) */}
					<div className="space-y-1.5">
						<p className="text-sm font-medium">Jumlah Hari Klaim</p>
						<div className="flex h-11 items-center rounded-lg border border-input bg-muted/30 px-2.5 text-base tabular-nums md:text-sm">
							{jumlahHari ?? "—"}
						</div>
					</div>

					{/* CU-33: Keterangan (optional) */}
					<FieldTextarea
						label="Keterangan"
						value={watch("keterangan") ?? ""}
						onChange={(v) => setValue("keterangan", v)}
					/>

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Batal
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Mengirim..." : "Kirim Klaim"}
						</Button>
					</div>
				</form>
			</SheetContent>
		</Sheet>
	);
}
