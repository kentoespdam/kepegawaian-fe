"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFkOptions } from "@/hooks/useFkOptions";
import type { SingleResultRiwayatSpQuery } from "@/types/kepegawaian/riwayat";

// ── Schema ──

const schema = z.object({
	nomorSp: z.string().min(1, "Nomor SP wajib"),
	jenisSpId: z.string().min(1, "Jenis SP wajib"),
	sanksiId: z.string().min(1, "Sanksi wajib"),
	tanggalSp: z.string().min(1, "Tanggal SP wajib"),
	tanggalMulai: z.string().min(1, "Tanggal mulai wajib"),
	tanggalSelesai: z.string().min(1, "Tanggal selesai wajib"),
	organisasiId: z.string().min(1, "Organisasi wajib"),
	jabatanId: z.string().min(1, "Jabatan wajib"),
	penandaTangan: z.string().min(1, "Penanda tangan wajib"),
	jabatanPenandaTangan: z.string().min(1, "Jabatan penanda tangan wajib"),
	sanksiNotes: z.string().optional(),
	tanggalEksekusiSanksi: z.string().optional(),
	notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

// ── Section label ──

function SectionLabel({ children }: { children: React.ReactNode }) {
	return <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>;
}

// ── Component ──

interface Props {
	pegawaiId: string;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function SpFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);

	// ── Detail fetch ──

	const detailQuery = useQuery({
		queryKey: ["riwayat-sp-detail", editingId],
		queryFn: async () => {
			if (!editingId) return undefined;
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data SP");
			const body = (await res.json()) as SingleResultRiwayatSpQuery;
			return body.data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

	// ponytail: normalize detail response to form values — flatten FK objects to their ids
	const defaults: Record<string, unknown> = (() => {
		const d = detailQuery.data;
		if (!d) return {};
		return {
			nomorSp: d.nomorSp ?? "",
			jenisSpId: String(d.jenisSp?.id ?? ""),
			sanksiId: String(d.sanksi?.id ?? ""),
			tanggalSp: d.tanggalSp ?? "",
			tanggalMulai: d.tanggalMulai ?? "",
			tanggalSelesai: d.tanggalSelesai ?? "",
			organisasiId: String(d.organisasi?.id ?? ""),
			jabatanId: String(d.jabatan?.id ?? ""),
			penandaTangan: d.penandaTangan ?? "",
			jabatanPenandaTangan: d.jabatanPenandaTangan ?? "",
			sanksiNotes: d.sanksiNotes ?? "",
			tanggalEksekusiSanksi: d.tanggalEksekusiSanksi ?? "",
			notes: d.notes ?? "",
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

	const jenisSpId = watch("jenisSpId");

	// ── FK options ──

	const jenisSpOptions = useFkOptions("jenis-sp", (i) => String(i.nama ?? ""));
	const organisasiOptions = useFkOptions("organisasi", (i) => String(i.nama ?? ""));
	const jabatanOptions = useFkOptions("jabatan", (i) => String(i.nama ?? ""));

	// ponytail: cascade sanksi — fetch only when jenisSpId is set
	const sanksiQuery = useQuery({
		queryKey: ["sanksi-by-jenis-sp", jenisSpId],
		queryFn: async () => {
			if (!jenisSpId) return [];
			const res = await fetch(`/api/proxy/master/sanksi/jenis-sp/${jenisSpId}`);
			if (!res.ok) throw new Error("Gagal memuat sanksi");
			const body = await res.json();
			const list = body.data as Array<{ id: number; keterangan: string }>;
			return (list ?? []).map((i) => ({
				value: String(i.id),
				label: i.keterangan ?? "",
			}));
		},
		enabled: !!jenisSpId,
		staleTime: 300_000,
	});

	const sanksiOptions = sanksiQuery.data ?? [];

	// ponytail: reset sanksiId when jenisSp changes
	const handleJenisSpChange = (v: string | undefined) => {
		setValue("jenisSpId", v ?? "");
		setValue("sanksiId", "");
	};

	// ── Submit (multipart/form-data) ──

	const onSubmit = async (values: FormValues) => {
		try {
			const fd = new FormData();
			fd.append("nomorSp", values.nomorSp);
			fd.append("pegawaiId", String(Number(pegawaiId)));
			fd.append("jenisSpId", values.jenisSpId);
			fd.append("sanksiId", values.sanksiId);
			fd.append("tanggalSp", values.tanggalSp);
			fd.append("tanggalMulai", values.tanggalMulai);
			fd.append("tanggalSelesai", values.tanggalSelesai);
			fd.append("organisasiId", values.organisasiId);
			fd.append("jabatanId", values.jabatanId);
			fd.append("penandaTangan", values.penandaTangan);
			fd.append("jabatanPenandaTangan", values.jabatanPenandaTangan);
			if (values.sanksiNotes) fd.append("sanksiNotes", values.sanksiNotes);
			if (values.tanggalEksekusiSanksi) fd.append("tanggalEksekusiSanksi", values.tanggalEksekusiSanksi);
			if (values.notes) fd.append("notes", values.notes);
			// ponytail: file hanya dikirim jika user pilih file baru — edit pertahankan file lama
			if (fileRef.current?.files?.[0]) fd.append("fileName", fileRef.current.files[0]);

			const url = editingId ? `/api/proxy/kepegawaian/riwayat/sp/${editingId}` : "/api/proxy/kepegawaian/riwayat/sp";
			const method = editingId ? "PUT" : "POST";

			// ponytail: JANGAN set Content-Type — browser auto-set boundary multipart
			const res = await fetch(url, { method, body: fd });

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				const msg = (body as { message?: string }).message ?? "Gagal menyimpan SP";
				throw new Error(msg);
			}

			toast.success(editingId ? "SP berhasil diperbarui" : "SP berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: ["riwayat-sp", pegawaiId] });
			onClose();
		} catch (e: unknown) {
			setError("root", { message: e instanceof Error ? e.message : "Terjadi kesalahan" });
		}
	};

	const fileNameLabel = detailQuery.data?.fileName;

	return (
		<Sheet
			open={isOpen}
			onOpenChange={(v) => {
				if (!v) onClose();
			}}
		>
			<SheetContent className="sm:max-w-xl">
				<SheetHeader>
					<SheetTitle>{editingId ? "Edit Surat Peringatan" : "Tambah Surat Peringatan"}</SheetTitle>
				</SheetHeader>

				<Separator />					<form onSubmit={rhfSubmit(onSubmit)} className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto overflow-x-hidden flex-1 min-h-0">
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}

					{/* ── Data SP ── */}
					<SectionLabel>Data SP</SectionLabel>

					<FieldText
						label="Nomor SP"
						value={watch("nomorSp")}
						onChange={(v) => setValue("nomorSp", v)}
						required
						error={errors.nomorSp?.message}
					/>

					<FieldFk
						label="Jenis SP"
						options={jenisSpOptions}
						value={watch("jenisSpId")}
						onChange={handleJenisSpChange}
						required
						error={errors.jenisSpId?.message}
					/>

					<FieldFk
						label="Sanksi"
						options={sanksiOptions}
						value={watch("sanksiId")}
						onChange={(v) => setValue("sanksiId", v ?? "")}
						required
						disabled={!jenisSpId}
						loading={jenisSpId ? sanksiQuery.isPending : false}
						error={errors.sanksiId?.message}
					/>

					<div className="grid grid-cols-2 gap-3">							<FieldDate
								label="Tgl SP"
								value={watch("tanggalSp")}
								onChange={(v) => setValue("tanggalSp", v)}
								required
								error={errors.tanggalSp?.message}
							/>							<FieldDate
								label="Tgl Mulai"
								value={watch("tanggalMulai")}
								onChange={(v) => setValue("tanggalMulai", v)}
								required
								error={errors.tanggalMulai?.message}
							/>
					</div>						<FieldDate
							label="Tgl Selesai"
							value={watch("tanggalSelesai")}
							onChange={(v) => setValue("tanggalSelesai", v)}
							required
							error={errors.tanggalSelesai?.message}
						/>

					<Separator />

					{/* ── Penandatangan ── */}
					<SectionLabel>Penandatangan</SectionLabel>

					<FieldFk
						label="Organisasi"
						options={organisasiOptions}
						value={watch("organisasiId")}
						onChange={(v) => setValue("organisasiId", v ?? "")}
						required
						error={errors.organisasiId?.message}
					/>

					<FieldFk
						label="Jabatan"
						options={jabatanOptions}
						value={watch("jabatanId")}
						onChange={(v) => setValue("jabatanId", v ?? "")}
						required
						error={errors.jabatanId?.message}
					/>

					<FieldText
						label="Penanda Tangan"
						value={watch("penandaTangan")}
						onChange={(v) => setValue("penandaTangan", v)}
						required
						error={errors.penandaTangan?.message}
					/>

					<FieldText
						label="Jabatan Penanda Tangan"
						value={watch("jabatanPenandaTangan")}
						onChange={(v) => setValue("jabatanPenandaTangan", v)}
						required
						error={errors.jabatanPenandaTangan?.message}
					/>

					<Separator />

					{/* ── Detail Tambahan ── */}
					<SectionLabel>Detail Tambahan</SectionLabel>

					<FieldText
						label="Catatan Sanksi"
						value={watch("sanksiNotes")}
						onChange={(v) => setValue("sanksiNotes", v)}
						error={errors.sanksiNotes?.message}
					/>						<FieldDate
							label="Tgl. Eksekusi Sanksi"
							value={watch("tanggalEksekusiSanksi")}
							onChange={(v) => setValue("tanggalEksekusiSanksi", v)}
							error={errors.tanggalEksekusiSanksi?.message}
						/>

					{/* ── File ── */}
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">File SP</Label>
						{fileNameLabel && <p className="text-xs text-muted-foreground mb-1">File saat ini: {fileNameLabel}</p>}
						<Input ref={fileRef} type="file" className="h-11 cursor-pointer" />
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
