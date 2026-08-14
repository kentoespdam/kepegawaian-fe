"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { apiErrorMessage } from "@/lib/utils";
import type { PegawaiResponse, RiwayatTerminasiPostRequest } from "@/types/kepegawaian/riwayat";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";

const JENIS_SK_OPTIONS = [
	{ value: "SK_PENSIUN", label: "SK Pensiun" },
	{ value: "SK_LAINNYA", label: "SK Lainnya" },
	{ value: "SK_MUTASI", label: "SK Mutasi" },
];

const schema = z.object({
	pegawaiId: z.number().min(1, "Pegawai wajib dipilih"),
	nipam: z.string().min(1, "NIPAM wajib"),
	nama: z.string().min(1, "Nama wajib"),
	organisasiId: z.number().min(1, "Organisasi wajib"),
	jabatanId: z.number().min(1, "Jabatan wajib"),
	golonganId: z.number().optional(),
	alasanTerminasiId: z.string().min(1, "Alasan terminasi wajib"),
	nomorSk: z.string().min(1, "Nomor SK wajib"),
	jenisSk: z.string().min(1, "Jenis SK wajib"),
	tanggalSk: z.string().min(1, "Tanggal SK wajib"),
	tmtBerlaku: z.string().min(1, "TMT Berlaku wajib"),
	notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
	isOpen: boolean;
	onClose: () => void;
	initialPegawai?: PegawaiResponse | null;
}

export function TerminasiFormSheet({ isOpen, onClose, initialPegawai }: Props) {
	const qc = useQueryClient();

	const {
		setValue,
		watch,
		handleSubmit: rhfSubmit,
		reset,
		formState: { errors, isSubmitting },
		setError,
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			jenisSk: "SK_PENSIUN",
		},
	});

	// ── Alasan Terminasi Options ──
	const alasanQuery = useQuery({
		queryKey: ["alasan-berhenti-list"],
		queryFn: async () => {
			const res = await fetch("/api/proxy/master/alasan-berhenti/list");
			if (!res.ok) return [];
			const body = await res.json();
			return ((body.data ?? []) as Array<{ id: number; nama: string }>).map((i) => ({
				value: String(i.id),
				label: i.nama ?? "",
			}));
		},
		staleTime: 300_000,
	});

	// ── Pegawai Picker ──
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawai, setSelectedPegawai] = useState<{
		id?: number;
		nipam?: string;
		nama?: string;
		organisasi?: string;
		jabatan?: string;
	} | null>(null);

	const [debouncedSearch, setDebouncedSearch] = useState("");
	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
		return () => clearTimeout(t);
	}, [searchQuery]);

	const searchQuery_enabled = debouncedSearch.length >= 2;
	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search-aktif", debouncedSearch],
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

	const selectPegawai = (item: PegawaiListResponse) => {
		if (!item.id || !item.organisasi?.id || !item.jabatan?.id) {
			toast.error("Data pegawai terpilih tidak lengkap (id/organisasi/jabatan)");
			return;
		}
		setValue("pegawaiId", item.id);
		setValue("nipam", item.nipam ?? "");
		setValue("nama", item.nama ?? "");
		setValue("organisasiId", item.organisasi.id);
		setValue("jabatanId", item.jabatan.id);
		if (item.golongan?.id) setValue("golonganId", item.golongan.id);

		setSelectedPegawai({
			id: item.id,
			nipam: item.nipam,
			nama: item.nama,
			organisasi: item.organisasi?.nama,
			jabatan: item.jabatan?.nama,
		});
		setIsPickerOpen(false);
		setSearchQuery("");
	};

	const clearPegawai = () => {
		setValue("pegawaiId", 0);
		setValue("nipam", "");
		setValue("nama", "");
		setValue("organisasiId", 0);
		setValue("jabatanId", 0);
		setValue("golonganId", undefined);
		setSelectedPegawai(null);
	};

	// ── Pre-fill dari initialPegawai ──
	useEffect(() => {
		if (isOpen) {
			if (initialPegawai?.id) {
				const pId = initialPegawai.id;
				const pNipam = String(initialPegawai.nipam ?? "");
				const pNama = String(initialPegawai.biodata?.nama ?? "");
				const orgId = initialPegawai.organisasi?.id ?? 0;
				const jabId = initialPegawai.jabatan?.id ?? 0;
				const golId = initialPegawai.golongan?.id;

				reset({
					pegawaiId: pId,
					nipam: pNipam,
					nama: pNama,
					organisasiId: orgId,
					jabatanId: jabId,
					golonganId: golId,
					jenisSk: "SK_PENSIUN",
					nomorSk: "",
					tanggalSk: "",
					tmtBerlaku: initialPegawai.tmtPensiun ?? "",
					alasanTerminasiId: "",
					notes: "",
				});

				setSelectedPegawai({
					id: pId,
					nipam: pNipam,
					nama: pNama,
					organisasi: initialPegawai.organisasi?.nama,
					jabatan: initialPegawai.jabatan?.nama,
				});
			} else {
				reset({
					pegawaiId: 0,
					nipam: "",
					nama: "",
					organisasiId: 0,
					jabatanId: 0,
					jenisSk: "SK_PENSIUN",
					nomorSk: "",
					tanggalSk: "",
					tmtBerlaku: "",
					alasanTerminasiId: "",
					notes: "",
				});
				setSelectedPegawai(null);
			}
		}
	}, [isOpen, initialPegawai, reset]);

	// ── Submit ──
	const onSubmit = async (values: FormValues) => {
		try {
			const payload: RiwayatTerminasiPostRequest = {
				pegawaiId: values.pegawaiId,
				nipam: values.nipam,
				nama: values.nama,
				organisasiId: values.organisasiId,
				jabatanId: values.jabatanId,
				golonganId: values.golonganId,
				alasanTerminasiId: Number(values.alasanTerminasiId),
				nomorSk: values.nomorSk,
				jenisSk: values.jenisSk as RiwayatTerminasiPostRequest["jenisSk"],
				tanggalSk: values.tanggalSk,
				tmtBerlaku: values.tmtBerlaku,
				notes: values.notes,
			};

			const res = await fetch("/api/proxy/kepegawaian/riwayat/terminasi", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal menyimpan terminasi"));
			}

			toast.success("Terminasi pegawai berhasil disimpan");
			qc.invalidateQueries({ queryKey: ["/api/proxy/kepegawaian/riwayat/terminasi/calon-pensiun"] });
			qc.invalidateQueries({ queryKey: ["/api/proxy/kepegawaian/riwayat/terminasi"] });
			onClose();
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : "Terjadi kesalahan";
			toast.error(msg);
			setError("root", { message: msg });
		}
	};

	return (
		<Sheet open={isOpen} onOpenChange={(v) => !v && onClose()}>
			<SheetContent className="sm:max-w-xl flex flex-col h-full">
				<SheetHeader>
					<SheetTitle>Tambah Terminasi Pegawai</SheetTitle>
				</SheetHeader>
				<Separator />
				<form onSubmit={rhfSubmit(onSubmit)} className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0">
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}

					{/* ── Pegawai ── */}
					<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pegawai</p>
					{selectedPegawai ? (
						<div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium truncate">
									{selectedPegawai.nipam && (
										<span className="text-muted-foreground font-normal mr-1.5">{selectedPegawai.nipam}</span>
									)}
									{selectedPegawai.nama}
								</p>
								<p className="text-xs text-muted-foreground truncate">
									{selectedPegawai.jabatan ?? "—"}
									{selectedPegawai.organisasi && `  |  ${selectedPegawai.organisasi}`}
								</p>
							</div>
							{!initialPegawai && (
								<Button type="button" variant="ghost" size="icon-sm" onClick={clearPegawai} title="Ganti pegawai">
									<X className="size-3.5" />
								</Button>
							)}
						</div>
					) : (
						<div className="space-y-1.5">
							<Button
								type="button"
								variant="outline"
								className="h-11 w-full justify-start text-muted-foreground font-normal"
								onClick={() => setIsPickerOpen(true)}
							>
								<Search className="size-4 mr-2 text-muted-foreground" />
								Cari Pegawai Aktif...
							</Button>
							{errors.pegawaiId?.message && <p className="text-xs text-destructive">{errors.pegawaiId.message}</p>}
						</div>
					)}

					<Separator />

					{/* ── SK & Terminasi ── */}
					<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Data SK &amp; Terminasi
					</p>
					<FieldFk
						label="Alasan Terminasi"
						options={alasanQuery.data ?? []}
						value={watch("alasanTerminasiId")}
						onChange={(v) => setValue("alasanTerminasiId", v ?? "")}
						required
						loading={alasanQuery.isPending}
						error={errors.alasanTerminasiId?.message}
					/>
					<FieldText
						label="Nomor SK"
						value={watch("nomorSk")}
						onChange={(v) => setValue("nomorSk", v)}
						required
						error={errors.nomorSk?.message}
					/>
					<FieldFk
						label="Jenis SK"
						options={JENIS_SK_OPTIONS}
						value={watch("jenisSk")}
						onChange={(v) => setValue("jenisSk", v ?? "SK_PENSIUN")}
						required
						error={errors.jenisSk?.message}
					/>
					<div className="grid grid-cols-2 gap-3">
						<FieldDate
							label="Tgl. SK"
							value={watch("tanggalSk")}
							onChange={(v) => setValue("tanggalSk", v)}
							required
							error={errors.tanggalSk?.message}
						/>
						<FieldDate
							label="TMT Berlaku"
							value={watch("tmtBerlaku")}
							onChange={(v) => setValue("tmtBerlaku", v)}
							required
							error={errors.tmtBerlaku?.message}
						/>
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
							{isSubmitting ? "Menyimpan..." : "Simpan Terminasi"}
						</Button>
					</div>
				</form>

				{/* ── Dialog Picker ── */}
				<Dialog open={isPickerOpen} onOpenChange={(v) => !v && setIsPickerOpen(false)}>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle>Cari Pegawai Aktif</DialogTitle>
						</DialogHeader>
						<Input
							type="search"
							placeholder="Cari nama atau NIPAM..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="h-11"
							autoFocus
						/>
						<div className="max-h-64 overflow-y-auto -mx-4">
							{!searchQuery_enabled ? (
								<p className="px-4 py-6 text-center text-sm text-muted-foreground">Ketik minimal 2 karakter</p>
							) : pegawaiSearch.isPending ? (
								<p className="px-4 py-6 text-center text-sm text-muted-foreground">Mencari...</p>
							) : pegawaiSearch.isError ? (
								<p className="px-4 py-6 text-center text-sm text-destructive">Gagal memuat data</p>
							) : pegawaiSearch.data?.length === 0 ? (
								<p className="px-4 py-6 text-center text-sm text-muted-foreground">Tidak ditemukan</p>
							) : (
								<div className="divide-y divide-border">
									{pegawaiSearch.data?.map((item) => (
										<button
											key={item.id}
											type="button"
											onClick={() => selectPegawai(item)}
											className="w-full px-4 py-2.5 text-left hover:bg-accent transition-colors"
										>
											<p className="text-sm font-medium">
												{item.nipam && <span className="text-muted-foreground font-normal mr-1.5">{item.nipam}</span>}
												{item.nama}
											</p>
											<p className="text-xs text-muted-foreground truncate">
												{item.jabatan?.nama ?? "—"} {item.organisasi?.nama && ` | ${item.organisasi.nama}`}
											</p>
										</button>
									))}
								</div>
							)}
						</div>
					</DialogContent>
				</Dialog>
			</SheetContent>
		</Sheet>
	);
}
