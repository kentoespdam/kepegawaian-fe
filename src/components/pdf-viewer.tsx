"use client";

import { AlertCircle, ChevronLeft, ChevronRight, Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "@/components/ui/button";

// Worker pdf.js — file sudah di-copy ke public/ saat build/install
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfViewerProps {
	/** URL file PDF (via proxy, full URL). */
	url: string;
	/** Nama file untuk ditampilkan di toolbar. */
	fileName: string;
}

const ZOOM_STEP = 0.25;
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3.0;

export function PdfViewer({ url, fileName }: PdfViewerProps) {
	const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.0);
	const [fitToWidth, setFitToWidth] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);

	// Fetch PDF sebagai ArrayBuffer — bypass X-Frame-Options
	useEffect(() => {
		let cancelled = false;
		setIsLoading(true);
		setError(null);
		setPageNumber(1);
		setNumPages(null);

		fetch(url, { credentials: "include" })
			.then((res) => {
				if (!res.ok) throw new Error(`Gagal memuat PDF (${res.status})`);
				return res.arrayBuffer();
			})
			.then((buffer) => {
				if (!cancelled) {
					setPdfData(buffer);
					setIsLoading(false);
				}
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "Gagal memuat PDF");
					setIsLoading(false);
				}
			});

		return () => {
			cancelled = true;
		};
	}, [url]);

	// Ukur lebar container untuk fit-width rendering
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			const boxSize = entry.contentBoxSize?.[0];
			setContainerWidth(boxSize?.inlineSize ?? entry.contentRect.width);
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// Guard layout shift — tunggu containerWidth terukur
	const measuredWidth = containerWidth > 0 ? containerWidth : undefined;

	const onDocumentLoadSuccess = ({ numPages: pages }: { numPages: number }) => {
		setNumPages(pages);
	};

	const handleZoomIn = () => {
		setFitToWidth(false);
		setScale((s) => Math.min(s + ZOOM_STEP, ZOOM_MAX));
	};

	const handleZoomOut = () => {
		setFitToWidth(false);
		setScale((s) => Math.max(s - ZOOM_STEP, ZOOM_MIN));
	};

	const handleDownload = () => {
		if (!pdfData) return;
		const blob = new Blob([pdfData], { type: "application/pdf" });
		const blobUrl = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = blobUrl;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(blobUrl);
	};

	const zoomPercent = Math.round(scale * 100);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="size-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-20">
				<AlertCircle className="size-10 text-destructive" />
				<p className="text-sm text-muted-foreground">{error}</p>
				<Button variant="outline" size="sm" onClick={() => window.open(url, "_blank")}>
					Buka di Tab Baru
				</Button>
			</div>
		);
	}

	return (
		<div ref={containerRef} className="flex flex-col flex-1 min-h-0">
			{/* Toolbar */}
			<div className="flex items-center justify-between border-b bg-muted/30 px-2 sm:px-4 pr-16 sm:pr-4 py-2 sticky top-0 z-10 gap-2 flex-wrap">
				<span className="max-w-[40%] sm:max-w-[25%] truncate text-xs text-muted-foreground">{fileName}</span>

				{/* Zoom controls — sembunyi di layar kecil */}
				<div className="hidden sm:flex items-center gap-0.5">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleZoomOut}
						disabled={!fitToWidth && scale <= ZOOM_MIN}
						title="Perkecil"
					>
						<ZoomOut className="size-4" />
					</Button>
					<span className="min-w-12 text-center text-xs text-muted-foreground tabular-nums">
						{fitToWidth ? "Auto" : `${zoomPercent}%`}
					</span>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleZoomIn}
						disabled={!fitToWidth && scale >= ZOOM_MAX}
						title="Perbesar"
					>
						<ZoomIn className="size-4" />
					</Button>
					<div className="mx-1 h-4 w-px bg-border" />
				</div>

				{/* Page navigation */}
				<div className="flex items-center gap-1">
					<Button variant="ghost" size="icon" disabled={pageNumber <= 1} onClick={() => setPageNumber((p) => p - 1)}>
						<ChevronLeft className="size-4" />
					</Button>
					<span className="min-w-20 text-center text-xs text-muted-foreground tabular-nums">
						{pageNumber} / {numPages ?? "—"}
					</span>
					<Button
						variant="ghost"
						size="icon"
						disabled={pageNumber >= (numPages ?? 1)}
						onClick={() => setPageNumber((p) => p + 1)}
					>
						<ChevronRight className="size-4" />
					</Button>
				</div>

				{/* Download */}
				<div className="flex items-center mr-8">
					<Button variant="ghost" size="icon" onClick={handleDownload} title="Download PDF">
						<Download className="size-4" />
					</Button>
				</div>
			</div>

			{/* PDF Page */}
			<div className="flex flex-1 justify-center overflow-auto p-4">
				<Document
					file={pdfData}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="flex items-center justify-center py-10">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					}
					error={
						<div className="flex flex-col items-center gap-2 py-10">
							<AlertCircle className="size-6 text-destructive" />
							<p className="text-sm text-destructive">Gagal memproses PDF</p>
						</div>
					}
				>
					<Page
						pageNumber={pageNumber}
						width={fitToWidth ? measuredWidth : undefined}
						scale={fitToWidth ? undefined : scale}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						loading={
							<div className="flex items-center justify-center py-10">
								<Loader2 className="size-6 animate-spin text-muted-foreground" />
							</div>
						}
						error={
							<div className="flex flex-col items-center gap-2 py-10">
								<AlertCircle className="size-6 text-destructive" />
								<p className="text-sm text-destructive">Gagal memuat halaman</p>
							</div>
						}
					/>
				</Document>
			</div>
		</div>
	);
}
