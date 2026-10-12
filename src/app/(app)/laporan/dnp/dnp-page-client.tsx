"use client";

import { FileSpreadsheet, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAsyncReportExport } from "@/hooks/laporan/useAsyncReportExport";
import { useLaporanDnp } from "@/hooks/laporan/useLaporanDnp";
import type { DnpResponse } from "@/types/laporan/kepegawaian";

function formatDate(v?: string): string {
	if (!v) return "-";
	try {
		return new Date(v).toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
	} catch {
		return String(v);
	}
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
						<div className="overflow-x-auto">
							<table className="w-full border-collapse text-xs">
								<thead>
									<tr className="bg-muted/70 text-center font-semibold border-b">
										<th className="border p-2 w-10">NO</th>
										<th className="border p-2 text-left">NAMA</th>
										<th className="border p-2">NIPAM</th>
										<th className="border p-2">KODE ORG</th>
										<th className="border p-2">JABATAN</th>
										<th className="border p-2">TMT JABATAN</th>
										<th className="border p-2">PANGKAT / GOL</th>
										<th className="border p-2">TMT GOL.</th>
										<th className="border p-2">MKG (THN/BLN)</th>
										<th className="border p-2">MK (THN/BLN)</th>
										<th className="border p-2">PENDIDIKAN</th>
										<th className="border p-2">TTL</th>
									</tr>
								</thead>
								<tbody>
									{list.map((item: DnpResponse, idx: number) => (
										<tr key={`${item.nipam ?? "dnp"}`} className="hover:bg-muted/20 transition-colors">
											<td className="border p-2 text-center tabular-nums">{idx + 1}</td>
											<td className="border p-2 font-medium">{item.nama ?? "-"}</td>
											<td className="border p-2 text-center font-mono tabular-nums">{item.nipam ?? "-"}</td>
											<td className="border p-2 text-center">{item.kodeOrganisasi ?? "-"}</td>
											<td className="border p-2">{item.namaJabatan ?? "-"}</td>
											<td className="border p-2 text-center">{formatDate(item.tmtJabatan)}</td>
											<td className="border p-2 text-center">
												{item.pangkat ? `${item.pangkat} (${item.golongan ?? "-"})` : (item.golongan ?? "-")}
											</td>
											<td className="border p-2 text-center">{formatDate(item.tmtGolongan)}</td>
											<td className="border p-2 text-center tabular-nums">
												{item.mkgTahun ?? 0} thn {item.mkgBulan ?? 0} bln
											</td>
											<td className="border p-2 text-center tabular-nums">
												{item.mkTahun ?? 0} thn {item.mkBulan ?? 0} bln
											</td>
											<td className="border p-2">{item.pendidikan ?? "-"}</td>
											<td className="border p-2 text-center">{item.ttl ?? "-"}</td>
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
