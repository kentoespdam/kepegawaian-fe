"use client";
import type { StatistikGolongan } from "@_types/laporan/kepegawaian/lap_statistik";
import StatistikBarPicker from "@components/laporan/kepegawaian/statistik/bar/bar.picker";
import StatistikPiePicker from "@components/laporan/kepegawaian/statistik/pie/pie.picker";
import StatistikTablePicker from "@components/laporan/kepegawaian/statistik/table/table.picker";
import { Separator } from "@components/ui/separator";
import { getNamaBulan } from "@helpers/tanggal";
import { useRef } from "react";

const DasboardStatistikPegawai = ({
	slug,
	statistikData,
}: { slug: string; statistikData: StatistikGolongan[] }) => {
	const title = "STATISTIK PEGAWAI BERDASARKAN PANGKAT DAN GOLONGAN";
	const title2 = "KOMPOSISI PEGAWAI BERDASARKAN PANGKAT DAN GOLONGAN";

	const now = new Date();
	const namaBulan = getNamaBulan(now.getMonth());

	const componentRef = useRef<HTMLDivElement>(null);

	return (
		<div className={"w-full grid gap-8 p-4"} ref={componentRef}>
			<div className="grid">
				<h3 className="text-center">{title}</h3>
				<h3 className="text-center">
					BULAN : {namaBulan} {now.getFullYear()}
				</h3>
			</div>
			<div className="w-full flex flex-row justify-between content-around gap-2">
				<div className="w-fit max-h-[600px]">
					<StatistikBarPicker slug={slug} statistikData={statistikData} />
				</div>
				<div className="w-fit">
					<StatistikTablePicker slug={slug} statistikData={statistikData} />
				</div>
			</div>
			<Separator />
			<div className="w-full grid gap-4">
				<h2 className="text-center">{title2}</h2>
				<StatistikPiePicker slug={slug} statistikData={statistikData} />
			</div>
		</div>
	);
};

export default DasboardStatistikPegawai;
