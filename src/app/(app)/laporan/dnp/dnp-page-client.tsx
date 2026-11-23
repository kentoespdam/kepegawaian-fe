"use client";

import { FileSpreadsheet, Loader2, RefreshCw } from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncReportExport } from "@/hooks/laporan/useAsyncReportExport";
import { useLaporanDnp } from "@/hooks/laporan/useLaporanDnp";
import type { DnpResponse } from "@/types/laporan/kepegawaian";

export interface DnpItemWithIndex {
	item: DnpResponse;
	groupIndex: number;
}

export interface DnpGroup {
	organisasi: string;
	items: DnpItemWithIndex[];
}

export function formatDnpDate(date: unknown): string {
	if (typeof date !== "string" || !date || date === "-" || date.trim() === "") return "-";
	const trimmed = date.trim();
	const dateOnly = trimmed.split("T")[0];
	const parts = dateOnly.split("-");
	if (parts.length === 3) {
		const [y, m, d] = parts;
		if (y === "0000" || m === "00" || d === "00") return "-";
		if (y.length === 4 && m.length <= 2 && d.length <= 2) {
			return `${d.padStart(2, "0")}.${m.padStart(2, "0")}.${y}`;
		}
	}
	return trimmed;
}

export function groupDnpByOrganisasi(list: DnpResponse[]): DnpGroup[] {
	const groups: DnpGroup[] = [];
	const groupMap = new Map<string, DnpGroup>();

	for (const item of list) {
		const org = item.orgGroup?.trim() || item.kodeOrganisasi?.trim() || "LAINNYA";
		let group = groupMap.get(org);
		if (!group) {
			group = { organisasi: org, items: [] };
			groupMap.set(org, group);
			groups.push(group);
		}
		group.items.push({
			item,
			groupIndex: group.items.length + 1,
		});
	}

	return groups;
}

export function DnpPageClient() {
	const { data: list, isLoading, isError, error, refetch } = useLaporanDnp();
	const { exportReport, isExporting } = useAsyncReportExport();

	const handleExport = () => {
		exportReport({
			endpoint: "/api/proxy/laporan/kepegawaian/dnp/export",
			reportName: "Laporan DNP",
		});
	};

	const currentMonthYear = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });
	const groups = list ? groupDnpByOrganisasi(list) : [];
	let globalIndex = 0;

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Daftar Nominatif Pegawai (DNP)</h1>
					<p className="text-sm text-muted-foreground">
						Rekapitulasi Daftar Nominatif Pegawai (DNP) berdasarkan struktur organisasi, jabatan, dan masa kerja.
					</p>
				</div>
				<Button onClick={handleExport} disabled={isExporting} className="gap-2 self-start sm:self-auto">
					{isExporting ? <Loader2 className="size-4 animate-spin" /> : <FileSpreadsheet className="size-4" />}
					{isExporting ? "Menyiapkan Ekspor..." : "Simpan ke Excel"}
				</Button>
			</div>

			<Card>
				<CardHeader className="text-center border-b pb-4">
					<CardTitle className="text-lg font-bold">DAFTAR NOMINATIF PEGAWAI</CardTitle>
					<CardDescription className="text-xs font-semibold uppercase tracking-wide text-foreground">
						BULAN: {currentMonthYear}
					</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					{isLoading ? (
						<div className="p-6 space-y-4">
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					) : isError ? (
						<div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
							<p className="text-sm text-destructive">
								Gagal memuat data DNP: {error instanceof Error ? error.message : "Terjadi kesalahan"}
							</p>
							<Button variant="outline" onClick={() => refetch()} className="gap-2">
								<RefreshCw className="size-4" /> Coba Lagi
							</Button>
						</div>
					) : !list || list.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-16 gap-2 text-center text-muted-foreground">
							<p className="text-sm">Tidak ada data laporan DNP.</p>
						</div>
					) : (
						<div className="overflow-x-auto max-h-150">
							<table className="w-full border-collapse text-xs">
								<thead>
									<tr className="bg-muted/70 text-center font-semibold border-b">
										<th rowSpan={3} colSpan={2} className="border p-2 w-16">
											NO
										</th>
										<th rowSpan={3} className="border p-2 text-left min-w-36">
											NAMA
										</th>
										<th rowSpan={3} className="border p-2 min-w-24">
											NIPAM
										</th>
										<th rowSpan={3} className="border p-2 text-left min-w-36">
											JABATAN
										</th>
										<th rowSpan={3} className="border p-2 min-w-20">
											TMT JABATAN
										</th>
										<th rowSpan={3} className="border p-2 text-left min-w-28">
											PANGKAT
										</th>
										<th rowSpan={3} className="border p-2 min-w-12">
											GOL.
										</th>
										<th rowSpan={3} className="border p-2 min-w-20">
											TMT
										</th>
										<th colSpan={2} rowSpan={2} className="border p-1.5">
											<div>MASA KERJA</div>
											<div className="font-normal text-[11px]">GOL. TERAKHIR</div>
										</th>
										<th colSpan={3} className="border p-1.5">
											MASA KERJA
										</th>
										<th rowSpan={3} className="border p-2 text-left min-w-36">
											PENDIDIKAN
										</th>
										<th rowSpan={3} className="border p-2 text-left min-w-36">
											TEMPAT/TGL. LAHIR
										</th>
									</tr>
									<tr className="bg-muted/60 text-center font-medium border-b">
										<th rowSpan={2} className="border p-1.5 min-w-20">
											MULAI BEKERJA
										</th>
										<th colSpan={2} className="border p-1.5">
											SELURUH
										</th>
									</tr>
									<tr className="bg-muted/50 text-center font-medium border-b">
										<th className="border p-1 w-10">TH</th>
										<th className="border p-1 w-10">BLN</th>
										<th className="border p-1 w-10">TH</th>
										<th className="border p-1 w-10">BLN</th>
									</tr>
									<tr className="bg-muted/30 text-center text-[10px] text-muted-foreground border-b font-mono">
										<th className="border p-1"></th>
										<th className="border p-1">1</th>
										<th className="border p-1">2</th>
										<th className="border p-1">3</th>
										<th className="border p-1">4</th>
										<th className="border p-1">5</th>
										<th className="border p-1">6</th>
										<th className="border p-1">7</th>
										<th className="border p-1">8</th>
										<th colSpan={2} className="border p-1">
											9
										</th>
										<th className="border p-1">10</th>
										<th colSpan={2} className="border p-1">
											11
										</th>
										<th className="border p-1">12</th>
										<th className="border p-1">13</th>
									</tr>
								</thead>
								<tbody>
									{groups.map((group) => (
										<Fragment key={group.organisasi}>
											<tr className="bg-muted/30 font-bold">
												<td className="border p-2"></td>
												<td colSpan={15} className="border p-2 font-bold uppercase tracking-wider text-left">
													{group.organisasi}
												</td>
											</tr>
											{group.items.map(({ item, groupIndex: grpIdx }) => {
												globalIndex += 1;
												const currentGlobal = globalIndex;
												return (
													<tr
														key={`${item.nipam ?? "dnp"}-${currentGlobal}`}
														className="hover:bg-muted/20 transition-colors"
													>
														<td className="border p-2 text-center tabular-nums">{currentGlobal}</td>
														<td className="border p-2 text-center tabular-nums">{grpIdx}</td>
														<td className="border p-2 font-medium whitespace-nowrap">{item.nama ?? "-"}</td>
														<td className="border p-2 text-center font-mono tabular-nums">{item.nipam ?? "-"}</td>
														<td className="border p-2 whitespace-nowrap">{item.namaJabatan ?? "-"}</td>
														<td className="border p-2 text-center whitespace-nowrap">
															{formatDnpDate(item.tmtJabatan)}
														</td>
														<td className="border p-2 whitespace-nowrap">{item.pangkat ?? "-"}</td>
														<td className="border p-2 text-center">{item.golongan ?? "-"}</td>
														<td className="border p-2 text-center whitespace-nowrap">
															{formatDnpDate(item.tmtGolongan)}
														</td>
														<td className="border p-2 text-center tabular-nums">{item.mkgTahun ?? "-"}</td>
														<td className="border p-2 text-center tabular-nums">{item.mkgBulan ?? "-"}</td>
														<td className="border p-2 text-center whitespace-nowrap">{formatDnpDate(item.tmtKerja)}</td>
														<td className="border p-2 text-center tabular-nums">{item.mkTahun ?? "-"}</td>
														<td className="border p-2 text-center tabular-nums">{item.mkBulan ?? "-"}</td>
														<td className="border p-2 whitespace-nowrap">{item.pendidikan ?? "-"}</td>
														<td className="border p-2 whitespace-nowrap">{item.ttl ?? "-"}</td>
													</tr>
												);
											})}
										</Fragment>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
