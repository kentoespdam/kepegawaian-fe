"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Download, FileSpreadsheet, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiErrorMessage } from "@/lib/utils";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

interface KuotaImportDialogProps {
	open: boolean;
	onOpenChange: (v: boolean) => void;
}

export function KuotaImportDialog({ open, onOpenChange }: KuotaImportDialogProps) {
	const qc = useQueryClient();
	const fileRef = useRef<HTMLInputElement>(null);
	const [tahun, setTahun] = useState(CURRENT_YEAR);
	// ponytail: summary + error ditampilkan DALAM dialog (user perlu baca detail — CU-5)
	const [result, setResult] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Download template — GET binary → blob → anchor download (filename dari server kalau ada)
	const downloadTemplate = async () => {
		try {
			const res = await fetch("/api/proxy/cuti/kuota/template");
			if (!res.ok) throw new Error("Gagal mengunduh template");
			const blob = await res.blob();
			const disposition = res.headers.get("content-disposition");
			const match = disposition?.match(/filename="?([^";]+)"?/i);
			const filename = match?.[1] ?? "template-kuota-cuti.xlsx";
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = filename;
			a.click();
			URL.revokeObjectURL(url);
		} catch (e) {
			const msg = e instanceof Error ? e.message : "Gagal mengunduh template";
			toast.error(msg);
		}
	};

	const importMutation = useMutation({
		mutationFn: async () => {
			const file = fileRef.current?.files?.[0];
			if (!file) throw new Error("Pilih file Excel/CSV terlebih dahulu");
			const fd = new FormData();
			fd.append("tahun", String(tahun));
			fd.append("file", file);
			const res = await fetch("/api/proxy/cuti/kuota/import", { method: "POST", body: fd });
			if (!res.ok) {
				const b = await res.json().catch(() => ({}));
				throw new Error(apiErrorMessage(b, "Gagal import kuota"));
			}
			const body = (await res.json()) as { data?: string };
			return body.data ?? "Import selesai";
		},
		onSuccess: (summary) => {
			setResult(summary);
			toast.success("Kuota berhasil diimport");
			onOpenChange(false);
			qc.invalidateQueries({ queryKey: ["cuti-kuota"] });
		},
		onError: (e: Error) => setError(e.message),
	});

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setResult(null);
		importMutation.mutate();
	};

	return (
		<Dialog open={open} onOpenChange={(v) => !v && onOpenChange(false)}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FileSpreadsheet className="size-4 text-primary" />
						Import Kuota Cuti
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={submit} className="space-y-4 pt-2">
					{/* Template helper */}
					<div className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2.5">
						<div>
							<p className="text-sm font-medium">Belum punya template?</p>
							<p className="text-xs text-muted-foreground">Unduh template Excel, isi, lalu upload di sini.</p>
						</div>
						<Button type="button" variant="outline" size="sm" onClick={downloadTemplate} className="gap-1.5">
							<Download className="size-3.5" />
							Unduh Template
						</Button>
					</div>

					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							Tahun <span className="text-destructive">*</span>
						</Label>
						<Select value={String(tahun)} onValueChange={(v) => setTahun(Number(v))}>
							<SelectTrigger className="h-11 w-full" aria-label="Tahun">
								<SelectValue placeholder="Pilih tahun" />
							</SelectTrigger>
							<SelectContent>
								{YEAR_OPTIONS.map((y) => (
									<SelectItem key={y} value={String(y)}>
										{y}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-1.5">
						<Label className="text-sm font-medium">
							File Excel/CSV <span className="text-destructive">*</span>
						</Label>
						<Input
							ref={fileRef}
							type="file"
							accept=".xlsx,.xls,.csv"
							className="h-11 cursor-pointer"
							onChange={() => {
								setError(null);
								setResult(null);
							}}
						/>
					</div>

					{/* ponytail: summary & error inline di dialog — user perlu baca detail (CU-5), bukan toast */}
					{result && (
						<div className="rounded-md bg-success/10 px-3 py-2 text-sm text-success">
							<strong>Hasil import:</strong> {result}
						</div>
					)}
					{error && <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</div>}

					<div className="flex justify-end gap-2 pt-2">
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
							Batal
						</Button>
						<Button type="submit" disabled={importMutation.isPending} className="gap-1.5">
							{importMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
							{importMutation.isPending ? "Mengimpor..." : "Import"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
