"use client";

import { Loader2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKpiForm } from "@/hooks/penggajian/useKpiForm";
import type { GajiKpiResponse } from "@/types/penggajian/kpi";

interface KpiFormDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialData?: GajiKpiResponse | null;
	defaultPeriode: string;
}

export function KpiFormDialog({ open, onOpenChange, initialData, defaultPeriode }: KpiFormDialogProps) {
	const {
		register,
		handleSubmit,
		errors,
		isSubmitting,
		isEditing,
		isPickerOpen,
		setIsPickerOpen,
		searchQuery,
		setSearchQuery,
		searchEnabled,
		pegawaiSearch,
		selectedPegawai,
		selectPegawai,
		clearPegawai,
		onSubmit,
	} = useKpiForm({
		open,
		initialData,
		defaultPeriode,
		onClose: () => onOpenChange(false),
	});

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="text-base font-semibold">
							{isEditing ? "Edit Data KPI" : "Tambah Data KPI"}
						</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
						{/* Pegawai Selection */}
						<div className="space-y-1.5">
							<Label className="text-xs font-semibold">
								Pegawai <span className="text-destructive">*</span>
							</Label>
							{selectedPegawai ? (
								<div className="flex items-start justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2.5">
									<div className="min-w-0 flex-1">
										<p className="text-sm font-medium truncate">
											<span className="text-muted-foreground font-normal mr-1.5 tabular-nums">
												{selectedPegawai.nipam}
											</span>
											{selectedPegawai.nama}
										</p>
										{(selectedPegawai.jabatan || selectedPegawai.organisasi) && (
											<p className="text-xs text-muted-foreground truncate">
												{selectedPegawai.jabatan ?? "—"}
												{selectedPegawai.organisasi && ` | ${selectedPegawai.organisasi}`}
											</p>
										)}
									</div>
									{!isEditing && (
										<Button type="button" variant="ghost" size="icon-sm" onClick={clearPegawai} title="Ganti pegawai">
											<X className="size-3.5" />
										</Button>
									)}
								</div>
							) : (
								<Button
									type="button"
									variant="outline"
									className="h-10 w-full justify-start text-muted-foreground font-normal text-xs"
									onClick={() => setIsPickerOpen(true)}
								>
									<Search className="size-3.5 mr-2 text-muted-foreground" />
									Cari Pegawai Aktif...
								</Button>
							)}
							{errors.nipam && <p className="text-xs text-destructive">{errors.nipam.message}</p>}
						</div>

						{/* Periode */}
						<div className="space-y-1.5">
							<Label htmlFor="form-periode" className="text-xs font-semibold">
								Periode <span className="text-destructive">*</span>
							</Label>
							<Input
								id="form-periode"
								readOnly
								className="h-9 text-xs bg-muted/30 font-mono text-primary font-medium tabular-nums"
								{...register("periode")}
							/>
							{errors.periode && <p className="text-xs text-destructive">{errors.periode.message}</p>}
						</div>

						{/* Tunjangan Kinerja */}
						<div className="space-y-1.5">
							<Label htmlFor="form-tunkin" className="text-xs font-semibold">
								Tunjangan Kinerja (Rp) <span className="text-destructive">*</span>
							</Label>
							<Input
								id="form-tunkin"
								type="number"
								min={0}
								step="any"
								placeholder="0"
								className="h-10 text-sm tabular-nums"
								{...register("tunkin")}
							/>
							{errors.tunkin && <p className="text-xs text-destructive">{errors.tunkin.message}</p>}
						</div>

						{/* PPh 21 TER */}
						<div className="space-y-1.5">
							<Label htmlFor="form-pph21" className="text-xs font-semibold">
								PPh 21 TER (Rp)
							</Label>
							<Input
								id="form-pph21"
								type="number"
								min={0}
								step="any"
								placeholder="0"
								className="h-10 text-sm tabular-nums"
								{...register("pph21Ter")}
							/>
							{errors.pph21Ter && <p className="text-xs text-destructive">{errors.pph21Ter.message}</p>}
						</div>

						{/* Action Buttons */}
						<div className="flex items-center justify-end gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => onOpenChange(false)}
								disabled={isSubmitting}
								className="gap-1.5 h-9 text-xs"
							>
								<X className="size-3.5" />
								Batal
							</Button>
							<Button type="submit" size="sm" disabled={isSubmitting} className="gap-1.5 h-9 text-xs">
								{isSubmitting && <Loader2 className="size-3.5 animate-spin" />}
								{isEditing ? "Perbarui" : "Simpan"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Pegawai Picker Inline Dialog */}
			<Dialog open={isPickerOpen} onOpenChange={setIsPickerOpen}>
				<DialogContent className="sm:max-w-lg">
					<DialogHeader>
						<DialogTitle className="text-base font-semibold">Cari Pegawai Aktif</DialogTitle>
					</DialogHeader>
					<Input
						type="search"
						placeholder="Cari nama atau NIPAM..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-10 text-sm"
						autoFocus
					/>
					<div className="max-h-64 overflow-y-auto -mx-4">
						{!searchEnabled ? (
							<p className="px-4 py-6 text-center text-sm text-muted-foreground">Ketik minimal 2 karakter</p>
						) : pegawaiSearch.isPending ? (
							<p className="px-4 py-6 text-center text-sm text-muted-foreground">Mencari...</p>
						) : pegawaiSearch.isError ? (
							<p className="px-4 py-6 text-center text-sm text-destructive">Gagal memuat data pegawai</p>
						) : pegawaiSearch.data?.length === 0 ? (
							<p className="px-4 py-6 text-center text-sm text-muted-foreground">Pegawai tidak ditemukan</p>
						) : (
							<div className="divide-y divide-border">
								{pegawaiSearch.data?.map((item) => (
									<button
										key={item.id ?? item.nipam}
										type="button"
										onClick={() => selectPegawai(item)}
										className="w-full px-4 py-2.5 text-left hover:bg-accent transition-colors cursor-pointer"
									>
										<p className="text-sm font-medium">
											{item.nipam && (
												<span className="text-muted-foreground font-normal mr-1.5 tabular-nums">{item.nipam}</span>
											)}
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
		</>
	);
}
