"use client"
import type {
	BaseLaporanStatistik,
	StatistikPendidikan2,
} from "@_types/laporan/kepegawaian/lap_statistik"
import { Button } from "@components/ui/button"
import { Separator } from "@components/ui/separator"
import { getNamaBulan } from "@helpers/tanggal"
import { FileDownIcon } from "lucide-react"
import { useCallback, useMemo, useRef, useState } from "react"
import StatistikBarPicker from "./bar/bar.picker"
import StatistikPiePicker from "./pie/pie.picker"
import SelectStatistikComponent from "./select.statisitk"
import TableStatistikPendidikan2Component from "./table/pendidikan2"
import StatistikTablePicker from "./table/table.picker"

export interface StatistikComponentProps {
	slug: string
	statistikData?: BaseLaporanStatistik[]
}
const StatistikComponent = ({
	slug,
	statistikData,
}: StatistikComponentProps) => {
	const titlesMap: Record<string, [string, string]> = useMemo(
		() => ({
			pendidikan1: ["TINGKAT PENDIDIKAN", "TINGKAT PENDIDIKAN"],
			pendidikan2: ["TINGKAT PENDIDIKAN", "TINGKAT PENDIDIKAN"],
			umur: ["UMUR", "UMUR"],
			jenis_kelamin: ["JENIS KELAMIN", "JENIS KELAMIN"],
			gelar_akademik: ["GELAR PENDIDIKAN", "GELAR PENDIDIKAN"],
			agama: ["AGAMA", "AGAMA"],
			status_pegawai: ["STATUS PEGAWAI", "STATUS PEGAWAI"],
			golongan: ["PANGKAT DAN GOLONGAN", "PANGKAT DAN GOLONGAN"],
		}),
		[]
	)

	const [titleSuffix, title2Suffix] = titlesMap[slug] ?? titlesMap.golongan
	const title = `STATISTIK PEGAWAI BERDASARKAN ${titleSuffix}`
	const title2 = `KOMPOSISI PEGAWAI BERDASARKAN ${title2Suffix}`

	const now = new Date()
	const namaBulan = getNamaBulan(now.getMonth())

	const componentRef = useRef<HTMLDivElement>(null)
	const [isGenerating, setIsGenerating] = useState(false)

	const handleGeneratePdf = useCallback(async () => {
		if (!componentRef.current || isGenerating) return
		setIsGenerating(true)
		try {
			// Lazy-load heavy libraries to keep initial bundle small
			const [{ default: html2canvas }, jspdfModule] = await Promise.all([
				import("html2canvas"),
				import("jspdf"),
			])
			const { jsPDF } = jspdfModule as typeof import("jspdf")

			const pdf = new jsPDF()
			const canvas = await html2canvas(componentRef.current)
			const imgData = canvas.toDataURL("image/png")
			const imgProps = pdf.getImageProperties(imgData)
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

			// sanitize filename
			const safeName = title.replace(/[^a-z0-9\-_. ]+/gi, "_")
			pdf.save(`${safeName}.pdf`)
		} catch (err) {
			// swallow errors silently here, could add a toast in the future
			// console.error(err);
		} finally {
			setIsGenerating(false)
		}
	}, [title, isGenerating])

	return (
		<div className="grid gap-8">
			<div className="flex justify-end gap-2">
				<SelectStatistikComponent slug={slug} />
				<Button
					onClick={handleGeneratePdf}
					disabled={isGenerating}
					aria-busy={isGenerating}
				>
					<FileDownIcon className="mr-2 h-4 w-4" />
					{isGenerating ? "Generating..." : "Generate PDF"}
				</Button>
			</div>
			<div className={"grid w-full gap-8 p-4"} ref={componentRef}>
				<div className="grid">
					<h3 className="text-center">{title}</h3>
					<h3 className="text-center">
						BULAN : {namaBulan} {now.getFullYear()}
					</h3>
				</div>
				{slug !== "pendidikan2" ? (
					<>
						<div className="flex w-full flex-row content-around justify-between gap-2">
							<div className="max-h-[600px] w-fit">
								<StatistikBarPicker
									slug={slug}
									statistikData={statistikData}
								/>
							</div>
							<div className="w-fit">
								<StatistikTablePicker
									slug={slug}
									statistikData={statistikData}
								/>
							</div>
						</div>
						<Separator />
						<div className="grid w-full gap-4">
							<h2 className="text-center">{title2}</h2>
							<StatistikPiePicker
								slug={slug}
								statistikData={statistikData}
							/>
						</div>
					</>
				) : (
					<TableStatistikPendidikan2Component
						statistikData={statistikData as StatistikPendidikan2[]}
					/>
				)}
			</div>
		</div>
	)
}

export default StatistikComponent
