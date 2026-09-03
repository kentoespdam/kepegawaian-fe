"use client";

import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, fmtRupiah } from "@/lib/utils";
import type { GajiBatchMasterResponse } from "@/types/penggajian/batch";

export interface OrganisasiTableGroupProps {
	orgName: string;
	rows: GajiBatchMasterResponse[];
	startNum: number;
	selectedBatchMasterId: number | null;
	onSelectRow: (id: number) => void;
	variant?: "verifikasi" | "tambahan";
}

export function OrganisasiTableGroup({
	orgName,
	rows,
	startNum,
	selectedBatchMasterId,
	onSelectRow,
	variant = "verifikasi",
}: OrganisasiTableGroupProps) {
	return (
		<>
			<tr className={cn("font-bold text-xs uppercase tracking-wide bg-primary/10 text-primary")}>
				<td colSpan={11} className={cn("py-2 px-3", variant !== "tambahan" && "border-y border-primary/20")}>
					{orgName}
				</td>
			</tr>
			{rows.map((row, i) => {
				const num = startNum + i;
				const isSelected = selectedBatchMasterId === row.id;
				return (
					<tr
						key={row.id}
						onClick={() => row.id != null && onSelectRow(row.id)}
						className={cn(
							"cursor-pointer transition-colors text-xs border-b border-border/60",
							isSelected
								? "bg-primary/15 font-medium text-foreground"
								: "hover:bg-accent/40 text-foreground/90 odd:bg-card even:bg-muted/20",
						)}
					>
						<td className="py-2 px-2 text-center text-muted-foreground font-mono">{num}</td>
						<td className="py-2 px-2.5 font-mono text-[11px]">{row.nipam ?? "-"}</td>
						<td className="py-2 px-2.5 font-medium">{row.nama ?? "-"}</td>
						{variant === "verifikasi" ? (
							<>
								<td className="py-2 px-2 text-center">{row.golongan ?? "-"}</td>
								<td className="py-2 px-2.5 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
								<td className="py-2 px-2 text-center tabular-nums">{row.jmlJiwa ?? 0}</td>
								<td className="py-2 px-2 text-center text-muted-foreground">{row.kodePajak ?? "-"}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanKotor)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.totalPotongan)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.pembulatan)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums font-semibold text-primary">
									{fmtRupiah(row.penghasilanBersihFinal)}
								</td>
							</>
						) : (
							<>
								<td className="py-2 px-2.5 text-muted-foreground">{row.namaJabatan ?? "-"}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanKotor)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.totalPotongan)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.pembulatan)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums">{fmtRupiah(row.penghasilanBersih)}</td>
								<td className="py-2 px-2.5 text-right tabular-nums text-primary font-medium">
									{fmtRupiah(row.totalAddTambahan)}
								</td>
								<td className="py-2 px-2.5 text-right tabular-nums text-sky-600 dark:text-sky-400 font-medium">
									{fmtRupiah(row.totalAddPotongan)}
								</td>
								<td className="py-2 px-2.5 text-right tabular-nums font-semibold text-primary">
									{fmtRupiah(row.penghasilanBersihFinal)}
								</td>
							</>
						)}
					</tr>
				);
			})}
		</>
	);
}

export interface PegawaiOrganisasiTableProps {
	pegawaiList?: GajiBatchMasterResponse[] | null;
	isPending?: boolean;
	periodeLabel: string;
	selectedBatchMasterId: number | null;
	onSelectRow: (id: number) => void;
	variant?: "verifikasi" | "tambahan";
	titlePrefix?: string;
	className?: string;
}

export function PegawaiOrganisasiTable({
	pegawaiList,
	isPending = false,
	periodeLabel,
	selectedBatchMasterId,
	onSelectRow,
	variant = "verifikasi",
	titlePrefix,
	className,
}: PegawaiOrganisasiTableProps) {
	const [searchQuery, setSearchQuery] = useState("");

	// Filter pegawai
	const q = searchQuery.toLowerCase().trim();
	const filtered = pegawaiList
		? q
			? pegawaiList.filter(
					(p) =>
						p.nama?.toLowerCase().includes(q) ||
						p.nipam?.toLowerCase().includes(q) ||
						p.namaJabatan?.toLowerCase().includes(q) ||
						p.namaOrganisasi?.toLowerCase().includes(q),
				)
			: pegawaiList
		: [];

	// Group by organisasi (Map merges same-name units into one group)
	const map = new Map<string, GajiBatchMasterResponse[]>();
	for (const p of filtered) {
		const org = p.namaOrganisasi ?? "Tanpa Organisasi";
		if (!map.has(org)) map.set(org, []);
		map.get(org)?.push(p);
	}
	const grouped = Array.from(map.entries());

	const groupStarts: number[] = [];
	{
		let acc = 0;
		for (const [, rows] of grouped) {
			groupStarts.push(acc + 1);
			acc += rows.length;
		}
	}

	return (
		<div className={cn("rounded-lg border bg-card shadow-xs overflow-hidden flex-1", className)}>
			{/* Header with Title and Search Toolbar */}
			<div className="p-3 border-b bg-muted/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
				<div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
					<span>{titlePrefix ?? (variant === "tambahan" ? "Tambah Komponen Gaji [Periode" : "Gaji [Periode")}</span>
					<span className="text-primary font-bold">{periodeLabel}</span>
					<span>]</span>
				</div>

				<div className="flex items-center gap-2 w-full sm:w-auto">
					<div className="relative w-full sm:w-60">
						<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
						<Input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Cari Nama Pegawai..."
							className="pl-8 h-8 text-xs"
						/>
					</div>

					{searchQuery && (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setSearchQuery("")}
							className="size-8 text-muted-foreground hover:text-foreground"
							title="Reset Pencarian"
						>
							<RotateCcw className="size-3.5" />
						</Button>
					)}
				</div>
			</div>

			{/* Scrollable Data Table */}
			<div className="max-h-160 overflow-auto border-b">
				{isPending ? (
					<div className="p-4 space-y-2">
						{[1, 2, 3, 4, 5].map((i) => (
							<Skeleton key={i} className="h-10 w-full" />
						))}
					</div>
				) : grouped.length === 0 ? (
					<div className="p-12 text-center text-sm text-muted-foreground">
						{searchQuery ? "Tidak ada pegawai yang cocok dengan kata kunci pencarian" : "Belum ada data pegawai"}
					</div>
				) : (
					<table className="w-full text-xs text-left border-collapse">
						<thead className="sticky top-0 z-10 bg-primary text-primary-foreground font-semibold shadow-xs">
							{variant === "verifikasi" ? (
								<tr>
									<th className="py-2.5 px-2 text-center w-10 border-r border-primary-foreground/20">No</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">NIK</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Nama Pegawai</th>
									<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">Golongan</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Jabatan</th>
									<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">Jiwa</th>
									<th className="py-2.5 px-2 text-center border-r border-primary-foreground/20">PTKP</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Penghasilan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Potongan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pembulatan</th>
									<th className="py-2.5 px-2.5 text-right">Net. Gaji</th>
								</tr>
							) : (
								<tr>
									<th className="py-2.5 px-2 text-center w-10 border-r border-primary-foreground/20">No</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">NIK</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Nama Pegawai</th>
									<th className="py-2.5 px-2.5 border-r border-primary-foreground/20">Jabatan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Penghasilan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Potongan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pembulatan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Jml. Gaji</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Peng. Tambahan</th>
									<th className="py-2.5 px-2.5 text-right border-r border-primary-foreground/20">Pot. Tambahan</th>
									<th className="py-2.5 px-2.5 text-right">Jml. Gaji Final</th>
								</tr>
							)}
						</thead>
						<tbody className="divide-y divide-border">
							{grouped.map(([org, rows], groupIdx) => (
								<OrganisasiTableGroup
									key={org}
									orgName={org}
									rows={rows}
									startNum={groupStarts[groupIdx]}
									selectedBatchMasterId={selectedBatchMasterId}
									onSelectRow={onSelectRow}
									variant={variant}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
