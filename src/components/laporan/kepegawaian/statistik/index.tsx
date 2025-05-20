"use client";
import type {
	StatistikGelarAkademik,
	StatistikGolongan,
	StatistikJenisKelamin,
	StatistikPendidikan1,
	StatistikUmurRoot,
} from "@_types/laporan/kepegawaian/LapStatistik";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { getNamaBulan } from "@helpers/tanggal";
import { cn } from "@lib/utils";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FileDownIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import StatistikBarPicker from "./bar/bar.picker";
import StatistikPiePicker from "./pie/pie.picker";
import SelectStatistikComponent from "./select.statisitk";
import StatistikTablePicker from "./table/table.picker";

export interface StatistikComponentProps {
	slug: string;
	statistikData:
		| (
				| StatistikGolongan
				| StatistikPendidikan1
				| StatistikJenisKelamin
				| StatistikGelarAkademik
		  )[]
		| StatistikUmurRoot;
}
const StatistikComponent = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	const [isPrint, setIsPrint] = useState(false);
	const [gambar, setGambar] = useState("");
	let title = "STATISTIK PEGAWAI BERDASARKAN ";
	let title2 = "KOMPOSISI PEGAWAI BERDASARKAN ";

	switch (slug) {
		case "pendidikan1":
			title += "TINGKAT PENDIDIKAN";
			title2 += "TINGKAT PENDIDIKAN";
			break;
		case "pendidikan2":
			title += "TINGKAT PENDIDIKAN";
			title2 += "TINGKAT PENDIDIKAN";
			break;
		case "umur":
			title += "UMUR";
			title2 += "UMUR";
			break;
		case "jenis_kelamin":
			title += "JENIS KELAMIN";
			title2 += "JENIS KELAMIN";
			break;
		case "gelar_akademik":
			title += "GELAR PENDIDIKAN";
			title2 += "GELAR PENDIDIKAN";
			break;
		default:
			title += "PANGKAT DAN GOLONGAN";
			title2 += "PANGKAT DAN GOLONGAN";
			break;
	}

	const now = new Date();
	const namaBulan = getNamaBulan(now.getMonth());

	const componentRef = useRef<HTMLDivElement>(null);
	const tableRef = useRef<HTMLDivElement>(null);

	const handleGeneratePdf = async () => {
		if (!componentRef.current) return;

		const pdf = new jsPDF();
		const canvas = await html2canvas(componentRef.current);
		const imgData = canvas.toDataURL("image/png");
		const imgProps = pdf.getImageProperties(imgData);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
		pdf.save(`${title}.pdf`);
	};

	return (
		<div className="grid gap-8">
			<img src={gambar} alt="" width={600} />
			<div className="flex gap-2 justify-end">
				<SelectStatistikComponent slug={slug} />
				<Button onClick={handleGeneratePdf}>
					<FileDownIcon className="mr-2 h-4 w-4" />
					Generate PDF
				</Button>
			</div>
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
					<div className="w-fit" ref={tableRef}>
						<StatistikTablePicker slug={slug} statistikData={statistikData} />
					</div>
				</div>
				<Separator />
				<div className="w-full grid gap-4">
					<h2 className="text-center">{title2}</h2>
					<StatistikPiePicker slug={slug} statistikData={statistikData} />
				</div>
			</div>
		</div>
	);
};

export default StatistikComponent;
