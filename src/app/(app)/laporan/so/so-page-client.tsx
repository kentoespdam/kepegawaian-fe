"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLaporanSo } from "@/hooks/laporan/useLaporanSo";
import { SoChartSkeleton } from "./so-page-skeleton";

const OrgChartView = dynamic(() => import("@/components/laporan/org-chart").then((mod) => mod.OrgChartView), {
	ssr: false,
	loading: () => <SoChartSkeleton />,
});

export function SoPageClient() {
	const [maxLevel, setMaxLevel] = useState<number>(6);
	const { data, isLoading, isError, error, refetch } = useLaporanSo({
		maxLevel,
		format: "flat",
	});

	return (
		<div className="min-w-0 space-y-6 p-4 md:p-6">
			<div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
				<div className="space-y-2">
					<h1 className="text-2xl font-semibold text-foreground">Struktur organisasi</h1>
					<p className="text-sm text-muted-foreground">Hierarki jabatan dan pejabat aktif Perumdam Tirta Satria</p>
				</div>

				<div className="w-full space-y-2 sm:max-w-sm xl:w-80 xl:shrink-0">
					<label htmlFor="maxLevelSelect" className="block text-sm font-medium">
						Tampilkan hingga
					</label>
					<select
						id="maxLevelSelect"
						value={maxLevel}
						onChange={(e) => setMaxLevel(Number(e.target.value))}
						className="h-11 w-full cursor-pointer rounded-lg border-2 border-input bg-card px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
					>
						<option value={2}>Direksi (level 1–2)</option>
						<option value={5}>Manajer (level 1–5)</option>
						<option value={6}>Supervisor (level 1–6)</option>
						<option value={7}>Seluruh karyawan dan staf (level 1–7)</option>
					</select>
				</div>
			</div>

			{isLoading && <SoChartSkeleton />}

			{isError && (
				<Card className="border-destructive/30 bg-destructive/5">
					<CardContent className="flex flex-col items-center justify-center py-12 gap-3 text-center">
						<AlertCircle className="w-8 h-8 text-destructive" />
						<div className="space-y-1">
							<p className="text-sm font-semibold text-destructive">Gagal memuat data struktur organisasi</p>
							<p className="text-sm text-muted-foreground">
								{error instanceof Error ? error.message : "Terjadi kesalahan saat memproses data"}
							</p>
						</div>
						<Button variant="outline" onClick={() => refetch()} className="mt-2 h-11 gap-2 px-4 transition-colors">
							<RefreshCw className="size-5" />
							Coba lagi
						</Button>
					</CardContent>
				</Card>
			)}

			{!isLoading && !isError && (!data || data.length === 0) && (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-16 gap-2 text-center text-muted-foreground">
						<p className="text-base font-medium text-foreground">Belum ada struktur organisasi</p>
						<p className="text-sm">Coba pilih kedalaman struktur lainnya</p>
					</CardContent>
				</Card>
			)}

			{!isLoading && !isError && data && data.length > 0 && (
				<OrgChartView data={data} onRefresh={() => refetch()} isLoading={isLoading} />
			)}
		</div>
	);
}
