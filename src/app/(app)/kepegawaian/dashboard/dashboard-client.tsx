"use client";

import type { PegawaiResponseDetail } from "@/types/pegawai/pegawai";
import { SectionBiodata } from "./section-biodata";
import { SectionDetail } from "./section-detail";
import { SectionKarier } from "./section-karier";
import { SectionPenggajian } from "./section-penggajian";

export function DashboardClient({ pegawai, nik }: { pegawai: PegawaiResponseDetail; nik: string | null }) {
	// ponytail: pegawai guaranteed non-null by server check in page.tsx
	const pegawaiId = pegawai.id as number;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-lg font-semibold text-foreground">Dashboard Pegawai</h2>
				<p className="text-sm text-muted-foreground">
					{pegawai.biodata?.nama} — {pegawai.nipam}
				</p>
			</div>

			<div className="grid gap-6">
				<SectionDetail pegawai={pegawai} />
				<SectionKarier pegawaiId={pegawaiId} />
				<SectionBiodata nik={nik} />
				<SectionPenggajian pegawaiId={pegawaiId} />
			</div>
		</div>
	);
}
