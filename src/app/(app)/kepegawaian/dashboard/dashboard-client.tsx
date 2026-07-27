"use client";

import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SectionLeftPanel } from "./section-left-panel";
import { SectionRightPanel } from "./section-right-panel";

export function DashboardClient({ pegawai, nik }: { pegawai: PegawaiResponseDetail; nik: string | null }) {
	// ponytail: pegawai guaranteed non-null by server check in page.tsx
	const pegawaiId = pegawai.id as number;

	return (
		<div className="space-y-5">
			<h2 className="text-lg font-semibold text-foreground">Dashboard Pegawai</h2>

			{/* 2-panel layout: side-by-side at lg, stacked below */}
			<div className="grid gap-5 lg:grid-cols-[38fr_62fr] lg:items-start">
				<SectionLeftPanel pegawai={pegawai} nik={nik} />
				<SectionRightPanel pegawaiId={pegawaiId} nik={nik} />
			</div>
		</div>
	);
}
