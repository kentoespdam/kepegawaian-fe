"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPeriode } from "@/lib/kepegawaian-formatters";

// Dynamic import untuk PdfViewer (browser-only, no SSR)
const PdfViewer = dynamic(() => import("@/components/pdf-viewer").then((m) => m.PdfViewer), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center py-20">
			<Loader2 className="size-8 animate-spin text-muted-foreground" />
		</div>
	),
});

interface SlipGajiPreviewDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	batchMasterId: number | null;
	periode?: string | null;
}

export function SlipGajiPreviewDialog({ open, onOpenChange, batchMasterId, periode }: SlipGajiPreviewDialogProps) {
	const formattedPeriode = formatPeriode(periode);
	const url = batchMasterId ? `/api/proxy/penggajian/batch/master/${batchMasterId}/slip-gaji` : "";
	const fileName = `slip-gaji-${periode ?? batchMasterId ?? "dokumen"}.pdf`;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col p-6 gap-4 overflow-hidden">
				<DialogHeader>
					<DialogTitle>Pratinjau Slip Gaji — Periode {formattedPeriode}</DialogTitle>
				</DialogHeader>

				<div className="flex-1 min-h-0 overflow-hidden flex flex-col">
					{batchMasterId && url ? (
						<PdfViewer url={url} fileName={fileName} />
					) : (
						<div className="flex items-center justify-center py-20 text-muted-foreground">
							Tidak ada dokumen slip gaji untuk ditampilkan.
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
