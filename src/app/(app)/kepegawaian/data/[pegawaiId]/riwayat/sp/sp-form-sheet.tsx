"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { SingleResultRiwayatSpQuery } from "@/types/kepegawaian/riwayat";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";

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

	const jenisSpQuery = useQuery({
		queryKey: ["jenis-sp-list"],
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
	const jenisSpOptions = jenisSpQuery.data ?? [];

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

	// ── Picker Penanda Tangan ──

	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedSigner, setSelectedSigner] = useState<PegawaiListResponse | null>(null);

	// ponytail: debounce search query — trigger fetch after 300ms idle
	const [debouncedSearch, setDebouncedSearch] = useState("");
	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
		return () => clearTimeout(t);
	}, [searchQuery]);

	const searchQuery_enabled = debouncedSearch.length >= 2;
	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search", debouncedSearch],
		queryFn: async () => {
			if (!searchQuery_enabled) return [];
			const res = await fetch(
				`/api/proxy/pegawai/list?search=${encodeURIComponent(debouncedSearch)}&statusKerja=KARYAWAN_AKTIF`,
			);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = (await res.json()) as ListResultPegawaiListResponse;
			return (body.data ?? []) as PegawaiListResponse[];
		},
		enabled: searchQuery_enabled,
		staleTime: 60_000,
	});

	const selectSigner = (item: PegawaiListResponse) => {
		setValue("organisasiId", String(item.organisasi?.id ?? ""));
		setValue("jabatanId", String(item.jabatan?.id ?? ""));
		setValue("penandaTangan", item.nama ?? "");
		setValue("jabatanPenandaTangan", item.jabatan?.nama ?? "");
		setSelectedSigner(item);
		setIsPickerOpen(false);
		setSearchQuery("");
	};

	const clearSigner = () => {
		setValue("organisasiId", "");
		setValue("jabatanId", "");
		setValue("penandaTangan", "");
		setValue("jabatanPenandaTangan", "");
		setSelectedSigner(null);
	};

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

	// ponytail: prefill selectedSigner on edit mode — construct from detail data
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
				<Separator />{" "}
				<form
					onSubmit={rhfSubmit(onSubmit)}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto overflow-x-hidden flex-1 min-h-0"
				>
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
					<div className="grid grid-cols-2 gap-3">
						{" "}
						<FieldDate
							label="Tgl SP"
							value={watch("tanggalSp")}
							onChange={(v) => setValue("tanggalSp", v)}
							required
							error={errors.tanggalSp?.message}
						/>{" "}
						<FieldDate
							label="Tgl Mulai"
							value={watch("tanggalMulai")}
							onChange={(v) => setValue("tanggalMulai", v)}
							required
							error={errors.tanggalMulai?.message}
						/>
					</div>{" "}
					<FieldDate
						label="Tgl Selesai"
						value={watch("tanggalSelesai")}
						onChange={(v) => setValue("tanggalSelesai", v)}
						required
						error={errors.tanggalSelesai?.message}
					/>
					<Separator />
					{/* ── Penandatangan ── */}
					<SectionLabel>Penandatangan</SectionLabel>
					{/* Hidden fields — di-set oleh picker */}
					<input type="hidden" value={watch("organisasiId") ?? ""} />
					<input type="hidden" value={watch("jabatanId") ?? ""} />
					{selectedSigner ? (
						<div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium truncate">{selectedSigner.nama}</p>
								<p className="text-xs text-muted-foreground truncate">
									{selectedSigner.jabatan?.nama ?? "—"}
									{selectedSigner.organisasi?.nama && `  |  ${selectedSigner.organisasi.nama}`}
								</p>
							</div>
							<div className="flex gap-1 shrink-0">
								<Button type="button" variant="outline" size="sm" onClick={() => setIsPickerOpen(true)}>
									<Search className="size-3.5 mr-1" />
									{editingId ? "Ganti" : "Ubah"}
								</Button>
								<Button type="button" variant="ghost" size="icon-sm" onClick={clearSigner} title="Hapus penanda tangan">
									<X className="size-3.5" />
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-1.5">
							<Button type="button" variant="outline" className="h-11 w-full" onClick={() => setIsPickerOpen(true)}>
								<Search className="size-4 mr-2" />
								Cari Penanda Tangan
							</Button>
							{errors.organisasiId?.message && (
								<p className="text-xs text-destructive">Pilih penanda tangan terlebih dahulu</p>
							)}
						</div>
					)}
					{/* ── Picker Modal ── */}
					<Dialog
						open={isPickerOpen}
						onOpenChange={(v) => {
							if (!v) {
								setIsPickerOpen(false);
								setSearchQuery("");
							}
						}}
					>
						<DialogContent className="sm:max-w-lg">
							<DialogHeader>
								<DialogTitle>Cari Penanda Tangan</DialogTitle>
							</DialogHeader>

							<Input
								type="search"
								placeholder="Cari berdasarkan nama atau NIPAM..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="h-11"
								autoFocus
							/>

							<div className="max-h-64 overflow-y-auto -mx-4">
								{!searchQuery_enabled ? (
									<p className="px-4 py-6 text-center text-sm text-muted-foreground">
										Ketik minimal 2 karakter untuk mencari
									</p>
								) : pegawaiSearch.isPending ? (
									<div className="space-y-2 px-4 py-4">
										<div className="h-10 animate-pulse rounded-md bg-muted" />
										<div className="h-10 animate-pulse rounded-md bg-muted" />
										<div className="h-10 animate-pulse rounded-md bg-muted" />
									</div>
								) : pegawaiSearch.isError ? (
									<p className="px-4 py-6 text-center text-sm text-destructive">Gagal memuat data. Coba lagi.</p>
								) : pegawaiSearch.data?.length === 0 ? (
									<p className="px-4 py-6 text-center text-sm text-muted-foreground">Tidak ditemukan</p>
								) : (
									<div className="divide-y divide-border">
										{pegawaiSearch.data?.map((item) => (
											<button
												key={item.id}
												type="button"
												onClick={() => selectSigner(item)}
												className="w-full px-4 py-2.5 text-left hover:bg-accent transition-colors duration-100"
											>
												<p className="text-sm font-medium">
													{item.nipam && <span className="text-muted-foreground font-normal mr-1.5">{item.nipam}</span>}
													{item.nama}
												</p>
												<p className="text-xs text-muted-foreground truncate">
													{item.jabatan?.nama ?? "—"}
													{item.organisasi?.nama && `  |  ${item.organisasi.nama}`}
												</p>
											</button>
										))}
									</div>
								)}
							</div>
						</DialogContent>
					</Dialog>
					<Separator />
					{/* ── Detail Tambahan ── */}
					<SectionLabel>Detail Tambahan</SectionLabel>
					<FieldText
						label="Catatan Sanksi"
						value={watch("sanksiNotes")}
						onChange={(v) => setValue("sanksiNotes", v)}
						error={errors.sanksiNotes?.message}
					/>{" "}
					<FieldDate
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
