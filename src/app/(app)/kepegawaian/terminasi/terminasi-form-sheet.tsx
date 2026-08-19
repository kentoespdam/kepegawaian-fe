"use client";

import { Search, X } from "lucide-react";

import { FieldDate, FieldFk, FieldText, FieldTextarea } from "@/components/field-renderers";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useTerminasiForm } from "@/hooks/useTerminasiForm";
import type { PegawaiResponse } from "@/types/kepegawaian/riwayat";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	initialPegawai?: PegawaiResponse | null;
}

export function TerminasiFormSheet({ isOpen, onClose, initialPegawai }: Props) {
	const {
		form: { watch, errors, isSubmitting, handleSubmit },
		alasanOptions,
		alasanLoading,
		isPickerOpen,
		setIsPickerOpen,
		searchQuery,
		setSearchQuery,
		searchEnabled,
		pegawaiSearch,
		selectedPegawai,
		selectPegawai,
		clearPegawai,
		fileRef,
		fileError,
		setFileError,
		setValue,
		onSubmit,
	} = useTerminasiForm({ isOpen, initialPegawai, onClose });

	return (
		<Sheet open={isOpen} onOpenChange={(v) => !v && onClose()}>
			<SheetContent className="sm:max-w-xl flex flex-col h-full">
				<SheetHeader>
					<SheetTitle>Tambah Terminasi Pegawai</SheetTitle>
				</SheetHeader>
				<Separator />
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="px-4 sm:px-6 pb-4 space-y-3.5 overflow-y-auto flex-1 min-h-0"
				>
					{errors.root && (
						<div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{errors.root.message}</div>
					)}

					{/* Pegawai */}
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

					{/* SK & Terminasi */}
					<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
						Data SK &amp; Terminasi
					</p>
					<FieldFk
						label="Alasan Terminasi"
						options={alasanOptions}
						value={watch("alasanTerminasiId")}
						onChange={(v) => setValue("alasanTerminasiId", v ?? "")}
						required
						loading={alasanLoading}
						error={errors.alasanTerminasiId?.message}
					/>
					<FieldText
						label="Nomor SK"
						value={watch("nomorSk")}
						onChange={(v) => setValue("nomorSk", v)}
						required
						error={errors.nomorSk?.message}
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
					{/* File */}
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">File SK</Label>
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

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Batal
						</Button>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Menyimpan..." : "Simpan Terminasi"}
						</Button>
					</div>
				</form>

				{/* Dialog Picker */}
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
