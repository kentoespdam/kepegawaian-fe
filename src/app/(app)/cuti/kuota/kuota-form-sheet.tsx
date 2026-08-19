"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FieldDate, FieldText } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cutiKeys } from "@/hooks/keys/cuti-keys";
import { apiErrorMessage } from "@/lib/utils";
import type { CutiKuotaPostRequest, CutiKuotaResponse } from "@/types/cuti/kuota";
import type { ListResultPegawaiListResponse, PegawaiListResponse } from "@/types/pegawai/pegawai";

// ponytail: form pegang string (input HTML), konversi → number saat submit
const numField = z
	.string()
	.optional()
	.refine((v) => !v || (!Number.isNaN(Number(v)) && Number(v) >= 0), "Angka 0 atau lebih");

const schema = z.object({
	pegawaiId: z.number().min(1, "Pegawai wajib dipilih"),
	tahun: z
		.string()
		.min(4, "Tahun wajib")
		.refine((v) => Number(v) >= 2000, "Tahun minimal 2000"),
	kuota: numField,
	kuotaTambahan: numField,
	sisaKuota: numField,
	expired: z.string().min(1, "Tanggal expired wajib"),
});
type FormValues = z.infer<typeof schema>;

/** String kosong → undefined (jangan kirim 0). */
function toNum(v: string | undefined): number | undefined {
	return v === "" || v === undefined ? undefined : Number(v);
}

interface KuotaFormSheetProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	editing: CutiKuotaResponse | null;
}

export function KuotaFormSheet({ open, onOpenChange, editing }: KuotaFormSheetProps) {
	const qc = useQueryClient();

	const {
		setValue,
		watch,
		handleSubmit: rhfSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	// ── Pegawai Picker (search dialog — pola terminasi-form-sheet) ──
	const [isPickerOpen, setIsPickerOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPegawai, setSelectedPegawai] = useState<PegawaiListResponse | null>(null);

	const [debouncedSearch, setDebouncedSearch] = useState("");
	useEffect(() => {
		const t = setTimeout(() => setDebouncedSearch(searchQuery), 300);
		return () => clearTimeout(t);
	}, [searchQuery]);

	const searchEnabled = debouncedSearch.length >= 2;
	const pegawaiSearch = useQuery({
		queryKey: ["pegawai-search", debouncedSearch],
		queryFn: async () => {
			const res = await fetch(
				`/api/proxy/pegawai/list?search=${encodeURIComponent(debouncedSearch)}&statusKerja=KARYAWAN_AKTIF`,
			);
			if (!res.ok) throw new Error("Gagal mencari pegawai");
			const body = (await res.json()) as ListResultPegawaiListResponse;
			return (body.data ?? []) as PegawaiListResponse[];
		},
		enabled: searchEnabled,
		staleTime: 60_000,
	});

	const selectPegawai = (item: PegawaiListResponse) => {
		if (!item.id) return;
		setValue("pegawaiId", item.id);
		setSelectedPegawai(item);
		setIsPickerOpen(false);
		setSearchQuery("");
	};

	const clearPegawai = () => {
		setValue("pegawaiId", 0);
		setSelectedPegawai(null);
	};

	// ── Pre-fill saat open: Tambah (reset kosong) / Edit (reset dari row) ──
	useEffect(() => {
		if (open) {
			if (editing) {
				reset({
					pegawaiId: editing.pegawai?.id ?? 0,
					tahun: String(editing.tahun ?? new Date().getFullYear()),
					kuota: editing.kuota != null ? String(editing.kuota) : "",
					kuotaTambahan: editing.kuotaTambahan != null ? String(editing.kuotaTambahan) : "",
					sisaKuota: editing.sisaKuota != null ? String(editing.sisaKuota) : "",
					expired: editing.expired ?? "",
				});
				setSelectedPegawai({
					id: editing.pegawai?.id,
					nipam: editing.pegawai?.nipam,
					nama: editing.pegawai?.nama,
				});
			} else {
				reset({
					pegawaiId: 0,
					tahun: String(new Date().getFullYear()),
					kuota: "",
					kuotaTambahan: "",
					sisaKuota: "",
					expired: "",
				});
				setSelectedPegawai(null);
			}
		}
	}, [open, editing, reset]);

	const saveMutation = useMutation({
		mutationFn: async (values: FormValues) => {
			const body: CutiKuotaPostRequest = {
				pegawaiId: values.pegawaiId,
				tahun: Number(values.tahun),
				kuota: toNum(values.kuota),
				kuotaTambahan: toNum(values.kuotaTambahan),
				sisaKuota: toNum(values.sisaKuota),
				expired: values.expired,
			};
			const res = await fetch(`/api/proxy/cuti/kuota${editing?.id ? `/${editing.id}` : ""}`, {
				method: editing?.id ? "PUT" : "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal menyimpan kuota"));
			}
		},
		onSuccess: () => {
			toast.success(editing ? "Kuota cuti berhasil diperbarui" : "Kuota cuti berhasil ditambahkan");
			onOpenChange(false);
			qc.invalidateQueries({ queryKey: cutiKeys.kuota.all() });
		},
		onError: (e: Error) => toast.error(e.message),
	});

	return (
		<Sheet open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
			<SheetContent className="sm:max-w-xl flex flex-col h-full">
				<SheetHeader>
					<SheetTitle>{editing ? "Edit Kuota Cuti" : "Tambah Kuota Cuti"}</SheetTitle>
				</SheetHeader>
				<Separator />
				<form
					onSubmit={rhfSubmit((v) => saveMutation.mutate(v))}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0"
				>
					{errors.root?.message && (
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
							</div>
							{!editing && (
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

					{/* ── Data Kuota ── */}
					<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data Kuota</p>
					<FieldText
						label="Tahun"
						type="number"
						value={watch("tahun")}
						onChange={(v) => setValue("tahun", v)}
						required
						error={errors.tahun?.message}
					/>
					<div className="grid grid-cols-3 gap-3">
						<FieldText
							label="Kuota"
							type="number"
							value={watch("kuota") ?? ""}
							onChange={(v) => setValue("kuota", v)}
							error={errors.kuota?.message}
						/>
						<FieldText
							label="Tambahan"
							type="number"
							value={watch("kuotaTambahan") ?? ""}
							onChange={(v) => setValue("kuotaTambahan", v)}
							error={errors.kuotaTambahan?.message}
						/>
						<FieldText
							label="Sisa Kuota"
							type="number"
							value={watch("sisaKuota") ?? ""}
							onChange={(v) => setValue("sisaKuota", v)}
							error={errors.sisaKuota?.message}
						/>
					</div>
					<FieldDate
						label="Expired"
						value={watch("expired")}
						onChange={(v) => setValue("expired", v)}
						required
						error={errors.expired?.message}
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
							{!searchEnabled ? (
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
