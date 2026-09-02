"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { masterKeys } from "@/hooks/keys/master-keys";
import { riwayatKeys } from "@/hooks/keys/riwayat-keys";
import { apiErrorMessage } from "@/lib/utils";
import type { SingleResultRiwayatSpQuery } from "@/types/kepegawaian/riwayat";
import type { PegawaiListResponse } from "@/types/pegawai/pegawai";
import { SignerPicker } from "./signer-picker";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

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

function SectionLabel({ children }: { children: React.ReactNode }) {
	return <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</p>;
}

interface Props {
	pegawaiId: string;
	editingId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

export function SpFormSheet({ pegawaiId, editingId, isOpen, onClose }: Props) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);
	const [fileError, setFileError] = useState<string | null>(null);

	// Detail fetch
	const detailQuery = useQuery({
		queryKey: riwayatKeys.sp.detail(editingId),
		queryFn: async () => {
			if (!editingId) return undefined;
			const res = await fetch(`/api/proxy/kepegawaian/riwayat/sp/${editingId}`);
			if (!res.ok) throw new Error("Gagal memuat data SP");
			return ((await res.json()) as SingleResultRiwayatSpQuery).data;
		},
		enabled: !!editingId,
		staleTime: 60_000,
	});

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

	// FK options
	const jenisSpQuery = useQuery({
		queryKey: masterKeys.list("jenis-sp"),
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/jenis-sp/list");
			if (!res.ok) return [];
			const body = await res.json();
			return ((body.data ?? []) as Array<{ id: number; nama: string }>).map((i) => ({
				value: String(i.id),
				label: i.nama ?? "",
			}));
		},
		staleTime: 300_000,
	});
	const sanksiQuery = useQuery({
		queryKey: ["sanksi-by-jenis-sp", jenisSpId],
		queryFn: async () => {
			const res = await fetch(`/api/proxy/master/sanksi/jenis-sp/${jenisSpId}`);
			if (!res.ok) throw new Error("Gagal memuat sanksi");
			const body = await res.json();
			return ((body.data ?? []) as Array<{ id: number; keterangan: string }>).map((i) => ({
				value: String(i.id),
				label: i.keterangan ?? "",
			}));
		},
		enabled: !!jenisSpId,
		staleTime: 300_000,
	});

	// Signer state
	const [selectedSigner, setSelectedSigner] = useState<PegawaiListResponse | null>(null);
	const handleJenisSpChange = (v: string | undefined) => {
		setValue("jenisSpId", v ?? "");
		setValue("sanksiId", "");
	};

	useEffect(() => {
		const d = detailQuery.data;
		if (d) {
			setSelectedSigner({
				id: d.organisasi?.id,
				nipam: "",
				nama: d.penandaTangan ?? "",
				statusPegawai: undefined,
				organisasi: d.organisasi ?? { id: undefined, nama: undefined },
				jabatan: { id: d.jabatan?.id, nama: d.jabatanPenandaTangan },
				golongan: undefined,
			});
		}
	}, [detailQuery.data]);

	// Submit (multipart/form-data)
	const onSubmit = async (values: FormValues) => {
		try {
			const file = fileRef.current?.files?.[0];
			if (file && file.size > MAX_FILE_SIZE_BYTES) {
				setFileError("File terlalu besar — maksimal 5 MB");
				return;
			}
			setFileError(null);
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
			if (fileRef.current?.files?.[0]) fd.append("fileName", fileRef.current.files[0]);
			const url = editingId ? `/api/proxy/kepegawaian/riwayat/sp/${editingId}` : "/api/proxy/kepegawaian/riwayat/sp";
			const res = await fetch(url, { method: editingId ? "PUT" : "POST", body: fd });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan SP"));
			}
			toast.success(editingId ? "SP berhasil diperbarui" : "SP berhasil ditambahkan");
			qc.invalidateQueries({ queryKey: riwayatKeys.sp.all() });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
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
					<SheetTitle>{editingId ? "Edit Surat Peringatan" : "Tambah Surat Peringatan"}</SheetTitle>
				</SheetHeader>
				<Separator />
				<form
					onSubmit={rhfSubmit(onSubmit)}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto overflow-x-hidden flex-1 min-h-0"
				>
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}
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
						options={jenisSpQuery.data ?? []}
						value={watch("jenisSpId")}
						onChange={handleJenisSpChange}
						required
						error={errors.jenisSpId?.message}
					/>
					<FieldFk
						label="Sanksi"
						options={sanksiQuery.data ?? []}
						value={watch("sanksiId")}
						onChange={(v) => setValue("sanksiId", v ?? "")}
						required
						disabled={!jenisSpId}
						loading={jenisSpId ? sanksiQuery.isPending : false}
						error={errors.sanksiId?.message}
					/>
					<div className="grid grid-cols-2 gap-3">
						<FieldDate
							label="Tgl SP"
							value={watch("tanggalSp")}
							onChange={(v) => setValue("tanggalSp", v)}
							required
							error={errors.tanggalSp?.message}
						/>
						<FieldDate
							label="Tgl Mulai"
							value={watch("tanggalMulai")}
							onChange={(v) => setValue("tanggalMulai", v)}
							required
							error={errors.tanggalMulai?.message}
						/>
					</div>
					<FieldDate
						label="Tgl Selesai"
						value={watch("tanggalSelesai")}
						onChange={(v) => setValue("tanggalSelesai", v)}
						required
						error={errors.tanggalSelesai?.message}
					/>
					<Separator />
					<SectionLabel>Penandatangan</SectionLabel>
					<input type="hidden" value={watch("organisasiId") ?? ""} />
					<input type="hidden" value={watch("jabatanId") ?? ""} />
					<SignerPicker
						selectedSigner={selectedSigner}
						onSelect={(item) => {
							setValue("organisasiId", String(item.organisasi?.id ?? ""));
							setValue("jabatanId", String(item.jabatan?.id ?? ""));
							setValue("penandaTangan", item.nama ?? "");
							setValue("jabatanPenandaTangan", item.jabatan?.nama ?? "");
							setSelectedSigner(item);
						}}
						onClear={() => {
							setValue("organisasiId", "");
							setValue("jabatanId", "");
							setValue("penandaTangan", "");
							setValue("jabatanPenandaTangan", "");
							setSelectedSigner(null);
						}}
						showError={!!errors.organisasiId?.message}
					/>
					<Separator />
					<SectionLabel>Detail Tambahan</SectionLabel>
					<FieldText
						label="Catatan Sanksi"
						value={watch("sanksiNotes")}
						onChange={(v) => setValue("sanksiNotes", v)}
						error={errors.sanksiNotes?.message}
					/>
					<FieldDate
						label="Tgl. Eksekusi Sanksi"
						value={watch("tanggalEksekusiSanksi")}
						onChange={(v) => setValue("tanggalEksekusiSanksi", v)}
						error={errors.tanggalEksekusiSanksi?.message}
					/>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">File SP</Label>
						{detailQuery.data?.fileName && (
							<p className="text-xs text-muted-foreground mb-1">File saat ini: {detailQuery.data.fileName}</p>
						)}
						<p className="text-xs text-muted-foreground mb-1">Maksimal 5 MB</p>
						<Input ref={fileRef} type="file" className="h-11 cursor-pointer" onChange={() => setFileError(null)} />
						{fileError && <p className="text-xs text-destructive">{fileError}</p>}
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
