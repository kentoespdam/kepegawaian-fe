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

// const orgLevels = [
// 	{ level: 1, label: "Level 1" },
// 	{ level: 2, label: "Level 2" },
// 	{ level: 3, label: "Level 3" },
// 	{ level: 4, label: "Level 4" },
// 	{ level: 5, label: "Level 5" },
// 	{ level: 6, label: "Level 6" },
// 	{ level: 7, label: "Level 7" },
// ];

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
			.svgHeight(640)
			.data(validData)
			.nodeId((d) => String(d.id ?? ""))
			.parentNodeId((d) => (d.parentId !== null && d.parentId !== undefined ? String(d.parentId) : null))
			.nodeWidth(() => 304)
			.nodeHeight(() => 176)
			.childrenMargin(() => 64)
			.compactMarginBetween(() => 32)
			.compactMarginPair(() => 64)
			.neighbourMargin(() => 32)
			.imageName("struktur-organisasi-perumdam")
			.nodeContent((d) => renderNodeContent(d.data))
			.render();

		const topLevels = chart.getChartState().allNodes.filter(({ data }) => Number(data.level ?? 1) <= 2);
		chart.fit({ nodes: topLevels });

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
		<section aria-label="Bagan struktur organisasi" className="min-w-0 overflow-hidden rounded-xl border bg-card">
			<div className="flex flex-col justify-between gap-4 border-b bg-muted/30 p-4 2xl:flex-row 2xl:items-end">
				<form onSubmit={handleSearch} className="w-full space-y-2 2xl:max-w-md">
					<label htmlFor="so-search" className="block text-sm font-medium">
						Cari dalam bagan
					</label>
					<div className="flex items-center gap-2">
						<div className="relative min-w-0 flex-1">
							<Search
								aria-hidden="true"
								className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground"
							/>
							<Input
								id="so-search"
								type="text"
								placeholder="Nama, jabatan, atau NIPAM"
								aria-invalid={Boolean(searchError)}
								aria-describedby={searchError ? "so-search-error" : undefined}
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									if (searchError) setSearchError(null);
								}}
								className="h-11 w-full border-2 border-input bg-card pl-10 pr-3 text-sm focus-visible:border-primary"
							/>
						</div>
						<Button
							type="submit"
							className="h-11 bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Cari
						</Button>
					</div>
				</form>

				<div className="flex flex-wrap items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="icon"
						className="size-11 border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						onClick={() => chartRef.current?.zoomIn()}
						title="Perbesar bagan"
						aria-label="Perbesar bagan"
					>
						<ZoomIn className="size-5" />
					</Button>
					<Button
						type="button"
						variant="outline"
						size="icon"
						className="size-11 border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						onClick={() => chartRef.current?.zoomOut()}
						title="Perkecil bagan"
						aria-label="Perkecil bagan"
					>
						<ZoomOut className="size-5" />
					</Button>
					<Button
						type="button"
						variant="outline"
						className="h-11 gap-2 border-border bg-background px-3 text-foreground transition-colors hover:bg-muted"
						onClick={() => chartRef.current?.fit()}
						title="Tampilkan seluruh bagan"
					>
						<Maximize2 className="size-5" />
						<span>Pas di layar</span>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger
							disabled={isExporting}
							className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50"
							title="Ekspor bagan"
						>
							{isExporting ? (
								<Loader2 className="size-5 animate-spin motion-reduce:animate-none" />
							) : (
								<FileDown className="size-5" />
							)}
							<span>Ekspor</span>
							<ChevronDown className="size-4 text-muted-foreground" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-60">
							<DropdownMenuItem
								onClick={() => handleExport("pdf", "Dokumen PDF")}
								className="min-h-11 cursor-pointer gap-2 text-sm"
							>
								<FileDown className="size-5" />
								<span>Dokumen PDF (.pdf)</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleExport("jpeg", "Gambar JPG")}
								className="min-h-11 cursor-pointer gap-2 text-sm"
							>
								<FileImage className="size-5" />
								<span>Gambar JPG (.jpg)</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleExport("png", "Gambar PNG")}
								className="min-h-11 cursor-pointer gap-2 text-sm"
							>
								<FileImage className="size-5" />
								<span>Gambar PNG (.png)</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => handleExport("svg", "Vektor SVG")}
								className="min-h-11 cursor-pointer gap-2 text-sm"
							>
								<FileType className="size-5" />
								<span>Vektor SVG (.svg)</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{onRefresh && (
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="size-11 transition-colors"
							onClick={onRefresh}
							disabled={isLoading}
							title="Muat ulang data"
							aria-label="Muat ulang data"
						>
							<RefreshCw className={`size-5 ${isLoading ? "animate-spin motion-reduce:animate-none" : ""}`} />
						</Button>
					)}
				</div>
			</div>

			{searchError && (
				<div id="so-search-error" role="alert" className="border-b bg-destructive/5 px-4 py-3 text-sm text-destructive">
					{searchError}
				</div>
			)}

			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
				<p>Geser bagan untuk menjelajah, gunakan + / − untuk memperbesar atau memperkecil</p>
				{/* <div className="flex flex-wrap items-center gap-3">
					<span className="flex min-w-0 items-center gap-2">
						<span className="flex flex-wrap gap-2">
							{orgLevels.map(({ level, label }) => (
								<span
									key={level}
									className="inline-flex min-h-9 items-center gap-2 rounded-md border px-2 text-sm font-medium text-foreground"
									style={{
										backgroundColor: `var(--org-level-${level}-fill, color-mix(in oklch, var(--org-level-${level}) 36%, var(--card)))`,
										borderColor: `var(--org-level-${level})`,
									}}
								>
									<span
										aria-hidden="true"
										className="size-3 shrink-0 rounded-sm"
										style={{ backgroundColor: `var(--org-level-${level})` }}
									/>
									<span>{label}</span>
								</span>
							))}
						</span>
					</span>
				</div> */}
			</div>
			<div
				ref={containerRef}
				className="h-160 w-full cursor-grab overflow-hidden bg-background active:cursor-grabbing"
			/>
		</section>
	);
}
