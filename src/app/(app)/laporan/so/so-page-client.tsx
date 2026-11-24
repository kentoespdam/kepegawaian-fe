"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLaporanSo } from "@/hooks/laporan/useLaporanSo";

const OrgChartView = dynamic(() => import("@/components/laporan/org-chart").then((mod) => mod.OrgChartView), {
	ssr: false,
	loading: () => (
		<div className="h-187.5 w-full flex items-center justify-center bg-muted/20 border rounded-xl">
			<div className="flex flex-col items-center gap-3 text-muted-foreground">
				<Skeleton className="h-28 w-60 rounded-xl" />
				<div className="flex gap-4">
					<Skeleton className="h-28 w-56 rounded-xl" />
					<Skeleton className="h-28 w-56 rounded-xl" />
				</div>
			</div>
		</div>
	),
});

export function SoPageClient() {
	const [maxLevel, setMaxLevel] = useState<number>(6);
	const { data, isLoading, isError, error, refetch } = useLaporanSo({
		maxLevel,
		format: "flat",
	});

	return (
		<div className="p-6 space-y-4">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-foreground">Struktur Organisasi Perusahaan</h1>
					<p className="text-sm text-muted-foreground">
						Bagan hierarki jabatan struktural dan persebaran pejabat aktif Perumdam Tirta Satria.
					</p>
				</div>

				{/* Filter Kedalaman Level */}
				<div className="flex items-center gap-2">
					<label htmlFor="maxLevelSelect" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
						Kedalaman Struktur:
					</label>
					<select
						id="maxLevelSelect"
						value={maxLevel}
						onChange={(e) => setMaxLevel(Number(e.target.value))}
						className="h-9 px-3 py-1.5 text-sm bg-background border border-input rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-ring"
					>
						<option value={2}>Direksi Saja (Level 1–2)</option>
						<option value={5}>Hingga Manajer (Level 1–5)</option>
						<option value={6}>Hingga Supervisor (Level 1–6) — Rekomendasi</option>
						<option value={7}>Seluruh Karyawan & Staf (Level 1–7)</option>
					</select>
				</div>
			</div>

			{isLoading && (
				<div className="h-187.5 w-full flex items-center justify-center bg-muted/20 border rounded-xl">
					<div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
						<Skeleton className="h-28 w-60 rounded-xl" />
						<div className="flex gap-4">
							<Skeleton className="h-28 w-56 rounded-xl" />
							<Skeleton className="h-28 w-56 rounded-xl" />
						</div>
					</div>
				</div>
			)}

			{isError && (
				<Card className="border-destructive/30 bg-destructive/5">
					<CardContent className="flex flex-col items-center justify-center py-12 gap-3 text-center">
						<AlertCircle className="w-8 h-8 text-destructive" />
						<div className="space-y-1">
							<p className="text-sm font-semibold text-destructive">Gagal memuat data struktur organisasi</p>
							<p className="text-xs text-muted-foreground">
								{error instanceof Error ? error.message : "Terjadi kesalahan saat memproses data"}
							</p>
						</div>
						<Button variant="outline" size="sm" onClick={() => refetch()} className="gap-1.5 mt-2">
							<RefreshCw className="w-3.5 h-3.5" />
							Coba Lagi
						</Button>
					</CardContent>
				</Card>
			)}

			{!isLoading && !isError && (!data || data.length === 0) && (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-16 gap-2 text-center text-muted-foreground">
						<p className="text-sm font-medium">Tidak ada data struktur organisasi untuk level yang dipilih.</p>
					</CardContent>
				</Card>
			)}

			{!isLoading && !isError && data && data.length > 0 && (
				<OrgChartView data={data} onRefresh={() => refetch()} isLoading={isLoading} />
			)}
		</div>
	);
}
