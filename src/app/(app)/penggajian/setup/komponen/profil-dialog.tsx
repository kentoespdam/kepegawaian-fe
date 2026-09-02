"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfilDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (nama: string) => void;
	isPending: boolean;
}

export function ProfilDialog({ open, onOpenChange, onSubmit, isPending }: ProfilDialogProps) {
	const [nama, setNama] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!nama.trim()) return;
		setError(null);
		onSubmit(nama.trim());
	};

	const reset = () => {
		setNama("");
		setError(null);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(v) => {
				if (!v) reset();
				onOpenChange(v);
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tambah Profil Gaji</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-1.5">
						<Label htmlFor="namaProfil" className="text-sm font-medium">
							Nama<span className="ml-0.5 text-destructive">*</span>
						</Label>
						<Textarea
							id="namaProfil"
							value={nama}
							onChange={(e) => setNama(e.target.value)}
							placeholder="Nama profil gaji"
							className="min-h-20"
						/>
					</div>
					{error && <p className="text-sm text-destructive">{error}</p>}
					<div className="flex items-center justify-end gap-2 pt-2">
						<Button type="button" variant="outline" size="lg" onClick={() => onOpenChange(false)} disabled={isPending}>
							Batal
						</Button>
						<Button type="submit" size="lg" disabled={isPending || !nama.trim()}>
							{isPending ? "Menyimpan…" : "Simpan"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
