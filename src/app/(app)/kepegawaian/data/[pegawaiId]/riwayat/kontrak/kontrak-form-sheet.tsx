"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldFk, FieldSelect, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import { JENIS_AKSI_KONTRAK_OPTIONS } from "@/lib/riwayat-constants";
import type { SingleResultRiwayatKontrakQuery } from "@/types/kepegawaian/riwayat";

// ── Schema ──

const schema = z.object({
	jenisKontrak: z.string().min(1, "Jenis aksi wajib"),
	nipam: z.string().min(1, "NIPAM wajib"),
	nama: z.string().min(1, "Nama wajib"),
	nomorKontrak: z.string().min(1, "Nomor kontrak wajib"),
	tanggalSk: z.string().min(1, "Tanggal SK wajib"),
	tanggalMulai: z.string().min(1, "Tanggal mulai wajib"),
	tanggalSelesai: z.string().optional(),
	// ponytail: golonganId optional in Zod — detail query (RiwayatKontrakQuery) doesn't return golongan field
	// Always shown in form; conditional gate per jenisKontrak when BE confirms golonganId can be omitted
	golonganId: z.string().optional(),
	gajiPokok: z.string().optional(),
	isLatest: z.boolean().optional(),
	notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── FK options ──

function useGolonganOptions() {
	return useFkOptions("golongan", (i) => `${String(i.golongan ?? "")} - ${String(i.pangkat ?? "")}`);
}

// ── Normalizer ──

function normalizeFk(d: SingleResultRiwayatKontrakQuery["data"] | undefined): Record<string, unknown> {
	if (!d) return {};
	return {
		jenisKontrak: d.jenisKontrak ?? "",
		nipam: d.nipam ?? "",
		nama: d.nama ?? "",
		nomorKontrak: d.nomorKontrak ?? "",
		tanggalSk: d.tanggalSk ?? "",
		tanggalMulai: d.tanggalMulai ?? "",
		tanggalSelesai: d.tanggalSelesai ?? "",
		golonganId: "",
		gajiPokok: "",
		isLatest: false,
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

export function KontrakFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();

	const detailQuery = useQuery({
		queryKey: ["riwayat-kontrak-detail", editingId],
		queryFn: async () => {
			if (!editingId) return undefined;
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/kontrak/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data kontrak");
			const body = (await res.json()) as SingleResultRiwayatKontrakQuery;
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
				jenisKontrak: values.jenisKontrak,
				nipam: values.nipam,
				nama: values.nama,
				nomorKontrak: values.nomorKontrak,
				tanggalSk: values.tanggalSk,
				tanggalMulai: values.tanggalMulai,
			};
			if (values.tanggalSelesai) payload.tanggalSelesai = values.tanggalSelesai;
			if (values.golonganId) payload.golonganId = Number(values.golonganId);
			if (values.gajiPokok) payload.gajiPokok = Number(values.gajiPokok);
			if (values.isLatest) payload.isLatest = true;
			if (values.notes) payload.notes = values.notes;

			const url = editingId
				? `/api/proxy/kepegawaian/riwayat/kontrak/${editingId}`
				: "/api/proxy/kepegawaian/riwayat/kontrak";
			const method = editingId ? "PUT" : "POST";

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				const msg = (body as { message?: string }).message ?? "Gagal menyimpan kontrak";
				throw new Error(msg);
			}

			toast.success(editingId ? "Kontrak berhasil diperbarui" : "Kontrak berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["riwayat-kontrak", pegawaiId] });
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
			<SheetContent className="sm:max-w-xl overflow-y-auto">
				<SheetHeader>
					<SheetTitle>{editingId ? "Edit Riwayat Kontrak" : "Tambah Riwayat Kontrak"}</SheetTitle>
				</SheetHeader>

				<form onSubmit={rhfSubmit(onSubmit)} className="mt-6 space-y-5">
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}

					<FieldSelect
						label="Jenis Aksi"
						value={watch("jenisKontrak")}
						onChange={(v) => setValue("jenisKontrak", v)}
						options={JENIS_AKSI_KONTRAK_OPTIONS}
						required
						error={errors.jenisKontrak?.message}
					/>

					<FieldText
						label="NIPAM"
						value={watch("nipam")}
						onChange={(v) => setValue("nipam", v)}
						required
						error={errors.nipam?.message}
					/>

					<FieldText
						label="Nama"
						value={watch("nama")}
						onChange={(v) => setValue("nama", v)}
						required
						error={errors.nama?.message}
					/>

					<FieldText
						label="Nomor Kontrak"
						value={watch("nomorKontrak")}
						onChange={(v) => setValue("nomorKontrak", v)}
						required
						error={errors.nomorKontrak?.message}
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
						label="Tanggal Mulai"
						type="date"
						value={watch("tanggalMulai")}
						onChange={(v) => setValue("tanggalMulai", v)}
						required
						error={errors.tanggalMulai?.message}
					/>

					<FieldText
						label="Tanggal Selesai"
						type="date"
						value={watch("tanggalSelesai")}
						onChange={(v) => setValue("tanggalSelesai", v)}
						error={errors.tanggalSelesai?.message}
					/>

					{/* ponytail: golonganId always shown. Conditional per jenisKontrak when BE confirms optional */}
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

					<div className="flex items-center gap-2">
						<Checkbox
							id="isLatest"
							checked={watch("isLatest") ?? false}
							onCheckedChange={(v) => setValue("isLatest", v === true)}
						/>
						<Label htmlFor="isLatest" className="text-sm font-medium leading-none">
							Kontrak Terbaru
						</Label>
					</div>

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
