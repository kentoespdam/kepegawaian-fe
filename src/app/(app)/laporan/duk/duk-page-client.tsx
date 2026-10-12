"use client";

import { FileSpreadsheet, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncReportExport } from "@/hooks/laporan/useAsyncReportExport";
import { useLaporanDuk } from "@/hooks/laporan/useLaporanDuk";
import { formatDateDotted } from "@/lib/utils";
import type { DukResponse } from "@/types/laporan/kepegawaian";

const COLUMN_NUMBERS = Array.from({ length: 16 }, (_, i) => i + 1);

export function DukPageClient() {
	const { data: list, isLoading, isError, error, refetch } = useLaporanDuk();
	const { exportReport, isExporting } = useAsyncReportExport();

	const handleExport = () => {
		exportReport({
			endpoint: "/api/proxy/laporan/kepegawaian/duk/export",
			reportName: "Laporan DUK",
		});
	};

	const currentMonthYear = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

	return (
		<div className="flex flex-col gap-6 p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Daftar Urut Kepangkatan (DUK)</h1>
					<p className="text-sm text-muted-foreground">
						Rekapitulasi Daftar Urut Kepangkatan (DUK) pegawai berdasarkan golongan, masa kerja, dan pendidikan.
					</p>
				</div>
				<Button onClick={handleExport} disabled={isExporting} className="gap-2 self-start sm:self-auto">
					{isExporting ? <Loader2 className="size-4 animate-spin" /> : <FileSpreadsheet className="size-4" />}
					{isExporting ? "Menyiapkan Ekspor..." : "Simpan ke Excel"}
				</Button>
			</div>

			<Card>
				<CardHeader className="text-center border-b pb-4">
					<CardTitle className="text-lg font-bold">DAFTAR URUTAN KEPANGKATAN</CardTitle>
					<CardDescription className="text-xs uppercase tracking-wide">Periode: {currentMonthYear}</CardDescription>
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
								Gagal memuat data DUK: {error instanceof Error ? error.message : "Terjadi kesalahan"}
							</p>
							<Button variant="outline" onClick={() => refetch()} className="gap-2">
								<RefreshCw className="size-4" /> Coba Lagi
							</Button>
						</div>
					) : !list || list.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-16 gap-2 text-center text-muted-foreground">
							<p className="text-sm">Tidak ada data laporan DUK.</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full border-collapse text-xs">
								<thead>
									<tr className="bg-muted/70 text-center font-semibold border-b">
										<th rowSpan={2} className="border p-2 w-10">
											NO
										</th>
										<th rowSpan={2} className="border p-2 min-w-35 text-left">
											NAMA
										</th>
										<th rowSpan={2} className="border p-2 min-w-25">
											NIPAM
										</th>
										<th colSpan={3} className="border p-2">
											GOLONGAN
										</th>
										<th colSpan={2} className="border p-2">
											JABATAN
										</th>
										<th colSpan={3} className="border p-2">
											MASA KERJA KESELURUHAN
										</th>
										<th colSpan={3} className="border p-2">
											PENDIDIKAN
										</th>
										<th rowSpan={2} className="border p-2 w-16">
											USIA
										</th>
										<th rowSpan={2} className="border p-2 w-24">
											STATUS
										</th>
									</tr>
									<tr className="bg-muted/50 text-center font-medium border-b">
										<th className="border p-1.5">GOL.</th>
										<th className="border p-1.5">PANGKAT</th>
										<th className="border p-1.5">TMT</th>
										<th className="border p-1.5">NAMA</th>
										<th className="border p-1.5">TMT</th>
										<th className="border p-1.5">MULAI KERJA</th>
										<th className="border p-1.5">THN</th>
										<th className="border p-1.5">BLN</th>
										<th className="border p-1.5">NAMA</th>
										<th className="border p-1.5">LULUS THN</th>
										<th className="border p-1.5">TINGKAT</th>
									</tr>
									<tr className="bg-muted/30 text-center text-[10px] text-muted-foreground border-b font-mono">
										{COLUMN_NUMBERS.map((colNum) => (
											<th key={colNum} className="border p-1">
												{colNum}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{list.map((item: DukResponse, idx: number) => (
										<tr
											key={`${item.nipam ?? "duk"}-${item.nama ?? ""}`}
											className="hover:bg-muted/20 transition-colors"
										>
											<td className="border p-2 text-center tabular-nums">{idx + 1}</td>
											<td className="border p-2 font-medium">{item.nama ?? "-"}</td>
											<td className="border p-2 text-center font-mono tabular-nums">{item.nipam ?? "-"}</td>
											<td className="border p-2 text-center">{item.golongan ?? "-"}</td>
											<td className="border p-2">{item.pangkat ?? "-"}</td>
											<td className="border p-2 text-center">{formatDateDotted(item.tmtGolongan)}</td>
											<td className="border p-2">{item.namaJabatan ?? "-"}</td>
											<td className="border p-2 text-center">{formatDateDotted(item.tmtJabatan)}</td>
											<td className="border p-2 text-center">{formatDateDotted(item.tmtKerja)}</td>
											<td className="border p-2 text-center tabular-nums">{item.mkTahun ?? 0}</td>
											<td className="border p-2 text-center tabular-nums">{item.mkBulan ?? 0}</td>
											<td className="border p-2">{item.jurusan ?? "-"}</td>
											<td className="border p-2 text-center tabular-nums">{item.tahunLulus ?? "-"}</td>
											<td className="border p-2 text-center">{item.tingkatPendidikan ?? "-"}</td>
											<td className="border p-2 text-center tabular-nums">{item.usia ?? "-"}</td>
											<td className="border p-2 text-center">{item.statusPegawai ?? "-"}</td>
										</tr>
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
