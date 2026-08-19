"use client";

import { Users } from "lucide-react";
import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SectionLeftPanel } from "./section-left-panel";
import { SectionRightPanel } from "./section-right-panel";

export function DashboardClient({ pegawai, nik }: { pegawai: PegawaiResponseDetail | null; nik: string | null }) {
	// Pola sama dengan /cuti/pengajuan (CU-6): pegawai null (akun belum terhubung /
	// bridge identitas putus) → empty state di client, bukan error.
	if (!pegawai) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center">
				<div className="flex size-16 items-center justify-center rounded-full bg-muted mb-4">
					<Users className="size-8 text-muted-foreground" />
				</div>
				<h2 className="text-lg font-semibold text-foreground mb-2">Akun ini tidak terhubung ke data pegawai</h2>
				<p className="text-sm text-muted-foreground">Hubungi administrator untuk menghubungkan akun Anda.</p>
			</div>
		);
	}

	// ponytail: pegawai guaranteed non-null di sini (guard di atas)
	const pegawaiId = pegawai.id as number;

	return (
		<div className="space-y-5">
			<h2 className="text-lg font-semibold text-foreground">Dashboard Pegawai</h2>

			{/* 2-panel layout: side-by-side at lg, stacked below */}
			<div className="grid gap-5 lg:grid-cols-[38fr_62fr] lg:items-start *:min-w-0">
				<SectionLeftPanel pegawai={pegawai} nik={nik} />
				<SectionRightPanel pegawaiId={pegawaiId} nik={nik} />
			</div>
		</div>
	);
}
