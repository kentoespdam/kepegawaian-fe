"use client";

import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UploadPotonganDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	rootBatchId: string;
	onSuccess: () => void;
}

export function UploadPotonganDialog({ open, onOpenChange, rootBatchId, onSuccess }: UploadPotonganDialogProps) {
	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleClose = (v: boolean) => {
		if (!v) {
			setFile(null);
			setIsUploading(false);
		}
		onOpenChange(v);
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) {
			toast.error("Pilih file potongan terlebih dahulu");
			return;
		}

		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("file", file);

			const res = await fetch(`/api/proxy/penggajian/batch/master/upload/${rootBatchId}`, {
				method: "PATCH",
				body: formData,
			});

			if (!res.ok) {
				const body = await res.json().catch(() => ({}));
				throw new Error(body.message ?? `Gagal mengunggah file (${res.status})`);
			}

			toast.success("File potongan gaji berhasil diunggah");
			setFile(null);
			onSuccess();
			onOpenChange(false);
		} catch (err: unknown) {
			toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah file");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-base font-semibold">Upload Potongan</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleUpload} className="space-y-4 pt-2">
					<div className="space-y-1.5">
						<Label htmlFor="batch-id" className="text-xs font-semibold">
							ID
						</Label>
						<Input
							id="batch-id"
							value={rootBatchId}
							readOnly
							className="h-9 text-xs bg-muted/30 font-mono text-primary font-medium"
						/>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="file-input" className="text-xs font-semibold">
							File
						</Label>
						<Input
							id="file-input"
							type="file"
							onChange={(e) => setFile(e.target.files?.[0] ?? null)}
							className="h-9 text-xs cursor-pointer file:text-xs file:font-medium file:text-foreground"
						/>
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<Button
							type="submit"
							size="sm"
							disabled={isUploading || !file}
							className="gap-1.5 h-9 text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
						>
							{isUploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
							Upload
						</Button>
						<Button
							type="button"
							variant="destructive"
							size="sm"
							onClick={() => handleClose(false)}
							disabled={isUploading}
							className="gap-1.5 h-9 text-xs"
						>
							<X className="size-3.5" />
							Batal
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
