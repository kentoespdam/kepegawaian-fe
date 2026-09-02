"use client";

import { useState } from "react";
import { FormulaEditor } from "@/components/formula-editor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useKomponenForm } from "@/hooks/penggajian/useKomponenForm";
import type { TipeKomponen } from "@/types/_shared";
import type { GajiKomponenResponse } from "@/types/penggajian/komponen";

interface KomponenDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	editing: GajiKomponenResponse | null;
	profilId: number | null;
	onSubmit: (data: Record<string, unknown>) => void;
	isPending: boolean;
}

export function KomponenDialog({ open, onOpenChange, editing, profilId, onSubmit, isPending }: KomponenDialogProps) {
	const form = useKomponenForm(profilId, editing);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const f = form.form;
		if (!f.kode.trim() || !f.nama.trim() || !profilId) return;
		setError(null);
		const payload = {
			profilGajiId: profilId,
			kode: f.kode.trim(),
			nama: f.nama.trim(),
			...(f.jenisGaji ? { jenisGaji: f.jenisGaji } : {}),
			...(f.nilai ? { nilai: Number(f.nilai) } : {}),
			...(f.formula ? { formula: f.formula } : {}),
			...(f.urut ? { urut: Number(f.urut) } : {}),
		};
		onSubmit(payload);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				if (!v) onOpenChange(false);
			}}
		>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>{editing ? "Edit Komponen Gaji" : "Tambah Komponen Gaji"}</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="kode" className="text-sm font-medium">
							Kode<span className="ml-0.5 text-destructive">*</span>
						</Label>
						<Input
							id="kode"
							value={form.form.kode}
							onChange={(e) => form.setField("kode", e.target.value)}
							placeholder="Kode komponen"
							className="h-11"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="nama-komponen" className="text-sm font-medium">
							Nama<span className="ml-0.5 text-destructive">*</span>
						</Label>
						<Input
							id="nama-komponen"
							value={form.form.nama}
							onChange={(e) => form.setField("nama", e.target.value)}
							placeholder="Nama komponen gaji"
							className="h-11"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<Label className="text-sm font-medium">Jenis Gaji</Label>
							<Select value={form.form.jenisGaji} onValueChange={(v) => form.setField("jenisGaji", v as TipeKomponen)}>
								<SelectTrigger className="h-11">
									<SelectValue placeholder="Pilih jenis" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="PEMASUKAN">Pemasukan</SelectItem>
									<SelectItem value="POTONGAN">Potongan</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="urut" className="text-sm font-medium">
								Urut
							</Label>
							<Input
								id="urut"
								type="number"
								value={form.form.urut}
								onChange={(e) => form.setField("urut", e.target.value)}
								placeholder={form.urutAuto != null ? String(form.urutAuto) : "Auto"}
								className="h-11"
							/>
						</div>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="nilai" className="text-sm font-medium">
							Nilai
						</Label>
						<Input
							id="nilai"
							type="number"
							value={form.form.nilai}
							onChange={(e) => form.setField("nilai", e.target.value)}
							placeholder="0"
							className="h-11"
						/>
					</div>
					<div className="space-y-1.5">
						<Label className="text-sm font-medium">Formula</Label>
						<FormulaEditor
							value={form.form.formula}
							onFormulaChange={form.setFormula}
							onAppendKode={form.appendKodeToFormula}
							kodeList={form.availableKode}
						/>
					</div>
					{error && <p className="text-sm text-destructive">{error}</p>}
					<div className="flex items-center justify-end gap-2 pt-2">
						<Button type="button" variant="outline" size="lg" onClick={() => onOpenChange(false)} disabled={isPending}>
							Batal
						</Button>
						<Button type="submit" size="lg" disabled={isPending || !form.form.kode.trim() || !form.form.nama.trim()}>
							{isPending ? "Menyimpan…" : "Simpan"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
