"use client";

import { FileDown, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadKpi } from "@/hooks/penggajian/useKpiMutations";
import { penggajianApi } from "@/lib/api/penggajian-client";

interface UploadKpiDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	periode: string;
	onSuccess?: () => void;
}

export function UploadKpiDialog({ open, onOpenChange, periode, onSuccess }: UploadKpiDialogProps) {
	const [file, setFile] = useState<File | null>(null);
	const uploadMutation = useUploadKpi();

	const handleClose = (v: boolean) => {
		if (!v) {
			setFile(null);
		}
		onOpenChange(v);
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) {
			toast.error("Pilih file Excel KPI terlebih dahulu");
			return;
		}

		uploadMutation.mutate(
			{ file, periode },
			{
				onSuccess: () => {
					setFile(null);
					onOpenChange(false);
					onSuccess?.();
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-base font-semibold">Upload Data KPI</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleUpload} className="space-y-4 pt-2">
					<div className="space-y-1.5">
						<Label htmlFor="kpi-periode" className="text-xs font-semibold">
							Periode
						</Label>
						<Input
							id="kpi-periode"
							value={periode}
							readOnly
							className="h-9 text-xs bg-muted/30 font-mono text-primary font-medium"
						/>
					</div>

					<div className="space-y-1.5">
						<div className="flex items-center justify-between">
							<Label htmlFor="kpi-file-input" className="text-xs font-semibold">
								File Excel (.xlsx)
							</Label>
							<Button
								type="button"
								variant="link"
								size="sm"
								onClick={() => penggajianApi.downloadKpiTemplate()}
								className="h-auto p-0 text-xs text-primary gap-1"
							>
								<FileDown className="size-3.5" />
								Unduh Template
							</Button>
						</div>
						<Input
							id="kpi-file-input"
							type="file"
							accept=".xlsx,.xls,.csv"
							onChange={(e) => setFile(e.target.files?.[0] ?? null)}
							className="h-9 text-xs cursor-pointer file:text-xs file:font-medium file:text-foreground"
						/>
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => handleClose(false)}
							disabled={uploadMutation.isPending}
							className="gap-1.5 h-9 text-xs"
						>
							<X className="size-3.5" />
							Batal
						</Button>
						<Button
							type="submit"
							size="sm"
							disabled={uploadMutation.isPending || !file}
							className="gap-1.5 h-9 text-xs"
						>
							{uploadMutation.isPending ? (
								<Loader2 className="size-3.5 animate-spin" />
							) : (
								<Upload className="size-3.5" />
							)}
							Upload
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
