"use client";

import { OrgChart } from "d3-org-chart";
import {
	ChevronDown,
	FileDown,
	FileImage,
	FileType,
	Loader2,
	Maximize2,
	RefreshCw,
	Search,
	ZoomIn,
	ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { SoResponse } from "@/types/laporan/kepegawaian";
import {
	type ExportOptions,
	exportHighDefChart,
	type OrgChartNode,
	renderNodeContent,
	sanitizeOrgChartData,
} from "./org-chart-utils";

export type { OrgChartNode };
export { sanitizeOrgChartData };

export interface OrgChartProps {
	data: SoResponse[];
	onRefresh?: () => void;
	isLoading?: boolean;
}

export function OrgChartView({ data, onRefresh, isLoading }: OrgChartProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<OrgChart<OrgChartNode> | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchError, setSearchError] = useState<string | null>(null);
	const [isExporting, setIsExporting] = useState(false);

	useEffect(() => {
		if (!containerRef.current || !data || data.length === 0) return;

		const validData = sanitizeOrgChartData(data);
		if (validData.length === 0) return;

		containerRef.current.innerHTML = "";

		const chart = new OrgChart<OrgChartNode>();
		chartRef.current = chart;

		chart
			.container(containerRef.current)
			.data(validData)
			.nodeId((d) => String(d.id ?? ""))
			.parentNodeId((d) => (d.parentId !== null && d.parentId !== undefined ? String(d.parentId) : null))
			.nodeWidth(() => 240)
			.nodeHeight(() => 110)
			.childrenMargin(() => 50)
			.compactMarginBetween(() => 25)
			.compactMarginPair(() => 50)
			.neighbourMargin(() => 25)
			.imageName("struktur-organisasi-perumdam")
			.nodeContent((d) => renderNodeContent(d.data))
			.render();

		chart.fit();

		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
			chartRef.current = null;
		};
	}, [data]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchError(null);

		if (!chartRef.current || !searchTerm.trim()) {
			chartRef.current?.clearHighlighting();
			return;
		}

		const term = searchTerm.toLowerCase().trim();
		const { allNodes } = chartRef.current.getChartState();
		const matches = allNodes.filter((node) => {
			const nama = node.data.namaPegawai?.toLowerCase() ?? "";
			const jabatan = node.data.namaJabatan?.toLowerCase() ?? "";
			const nipam = node.data.nipam?.toLowerCase() ?? "";
			return nama.includes(term) || jabatan.includes(term) || nipam.includes(term);
		});

		if (matches.length > 0) {
			chartRef.current.clearHighlighting();
			for (const node of matches) {
				chartRef.current.setHighlighted(node.data.id ?? "");
				chartRef.current.expandId(node.data.id ?? "");
			}
			chartRef.current.fit({ nodes: [matches[0]] });
		} else {
			setSearchError("Pegawai atau jabatan tidak ditemukan");
		}
	};

	const handleExport = (format: ExportOptions["format"], label: string) => {
		if (!chartRef.current || isExporting) return;
		setIsExporting(true);
		toast.loading(`Menyiapkan ekspor ${label}...`, { id: "export-so" });

		exportHighDefChart(
			chartRef.current,
			{ format, scale: 2 },
			{
				onSuccess: () => {
					setIsExporting(false);
					toast.success(`Berhasil mengunduh ${label}!`, { id: "export-so" });
				},
				onError: (err) => {
					setIsExporting(false);
					console.error("[OrgChart Export Error]", err);
					toast.error(`Gagal mengekspor ${label}`, { id: "export-so" });
				},
			},
		);
	};

	return (
		<div className="relative w-full h-[750px] bg-muted/20 border rounded-xl overflow-hidden shadow-sm">
			{/* Floating Toolbar */}
			<div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 items-center bg-background/95 backdrop-blur-sm p-2 rounded-lg border shadow-md">
				<form onSubmit={handleSearch} className="flex items-center gap-1.5">
					<div className="relative">
						<Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Cari pejabat / jabatan..."
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								if (searchError) setSearchError(null);
							}}
							className="pl-8 pr-3 h-8 text-sm w-48 md:w-60"
						/>
					</div>
					<Button type="submit" size="sm" variant="secondary" className="h-8 px-3 text-xs">
						Cari
					</Button>
				</form>

				<div className="h-5 w-px bg-border mx-1" />

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => chartRef.current?.zoomIn()}
					title="Perbesar (Zoom In)"
				>
					<ZoomIn className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => chartRef.current?.zoomOut()}
					title="Perkecil (Zoom Out)"
				>
					<ZoomOut className="w-4 h-4" />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					onClick={() => chartRef.current?.fit()}
					title="Reset Tampilan (Fit View)"
				>
					<Maximize2 className="w-4 h-4" />
				</Button>

				{/* Dropdown Menu Ekspor High-Definition */}
				<DropdownMenu>
					<DropdownMenuTrigger
						disabled={isExporting}
						className="inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 h-8 text-xs font-medium text-foreground hover:bg-muted transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50"
						title="Ekspor Bagan ke PDF / Gambar Resolusi Tinggi"
					>
						{isExporting ? (
							<Loader2 className="w-3.5 h-3.5 animate-spin" />
						) : (
							<FileDown className="w-3.5 h-3.5 text-primary" />
						)}
						<span>Ekspor</span>
						<ChevronDown className="w-3 h-3 text-muted-foreground" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-52">
						<DropdownMenuItem
							onClick={() => handleExport("pdf", "Dokumen PDF")}
							className="text-xs gap-2 cursor-pointer"
						>
							<FileDown className="w-4 h-4 text-rose-500" />
							<span>Dokumen PDF (.pdf) — Tajam</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleExport("jpeg", "Gambar JPG")}
							className="text-xs gap-2 cursor-pointer"
						>
							<FileImage className="w-4 h-4 text-amber-500" />
							<span>Gambar JPG (.jpg) — HD</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleExport("png", "Gambar PNG")}
							className="text-xs gap-2 cursor-pointer"
						>
							<FileImage className="w-4 h-4 text-sky-500" />
							<span>Gambar PNG (.png) — HD</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => handleExport("svg", "Vektor SVG")}
							className="text-xs gap-2 cursor-pointer"
						>
							<FileType className="w-4 h-4 text-emerald-500" />
							<span>Vektor SVG (.svg) — Lossless</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				{onRefresh && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="h-8 w-8"
						onClick={onRefresh}
						disabled={isLoading}
						title="Muat Ulang Data"
					>
						<RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
					</Button>
				)}
			</div>

			{searchError && (
				<div className="absolute top-16 left-4 z-20 px-3 py-1.5 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-md shadow">
					{searchError}
				</div>
			)}

			<div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
		</div>
	);
}
