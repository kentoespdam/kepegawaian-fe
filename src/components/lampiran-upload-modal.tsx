"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiErrorMessage } from "@/lib/utils";

export interface LampiranUploadModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;

	/** Entity reference type (e.g. `"SK_MUTASI"` or `"PROFIL_PENDIDIKAN"`). */
	ref: string;

	/** Entity reference ID. */
	refId: string | number;

	/** TanStack Query key prefix — invalidasi setelah upload. */
	queryKey: readonly string[];

	/** URL POST upload (FormData). */
	uploadUrl: string;

	/** Judul modal. */
	title?: string;
}

export function LampiranUploadModal({
	open,
	onOpenChange,
	ref,
	refId,
	queryKey,
	uploadUrl,
	title = "Unggah Lampiran",
}: LampiranUploadModalProps) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);
	const [hasFile, setHasFile] = useState(false);
	const [notes, setNotes] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const handleUpload = async () => {
		const file = fileRef.current?.files?.[0];
		if (!file) return;
		setIsUploading(true);
		try {
			const fd = new FormData();
			fd.append("ref", ref);
			fd.append("refId", String(refId));
			fd.append("fileName", file);
			if (notes) fd.append("notes", notes);
			// SPIKE issue 7eo5.5: jangan set Content-Type — biar browser set boundary
			const res = await fetch(uploadUrl, { method: "POST", body: fd });
			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(body, "Gagal mengunggah"));
			}
			toast.success("Lampiran berhasil diunggah");
			qc.invalidateQueries({ queryKey: [...queryKey, ref, refId] });
			if (fileRef.current) fileRef.current.value = "";
			setHasFile(false);
			setNotes("");
			onOpenChange(false);
		} catch (e: unknown) {
			toast.error(e instanceof Error ? e.message : "Gagal mengunggah");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className="space-y-4 pt-2">
					<div className="space-y-1.5">
						<Label className="text-xs text-muted-foreground">Pilih file</Label>
						<input
							ref={fileRef}
							type="file"
							// Re-render saat file dipilih — kalau tak ada onChange, tombol
							// Unggah tak pernah tahu file sudah ada (ref dibaca saat render).
							onChange={(e) => setHasFile(Boolean(e.target.files?.[0]))}
							className="block w-full text-sm text-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
						/>
					</div>

					<div className="space-y-1.5">
						<Label className="text-xs text-muted-foreground">Keterangan</Label>
						<Input placeholder="Catatan untuk lampiran ini" value={notes} onChange={(e) => setNotes(e.target.value)} />
						<p className="text-xs text-muted-foreground">Opsional — boleh dikosongkan.</p>
					</div>

					<div className="flex justify-end gap-2 pt-2">
						<Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
							Batal
						</Button>
						<Button onClick={handleUpload} disabled={isUploading || !hasFile}>
							{isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
							{isUploading ? "Mengunggah…" : "Unggah"}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
