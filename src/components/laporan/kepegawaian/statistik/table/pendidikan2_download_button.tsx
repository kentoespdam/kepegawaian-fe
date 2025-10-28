import type { FilterLaporanPendidikan2Schema } from "@_types/laporan/kepegawaian/lap_statistik"
import { LoadingButtonClient } from "@components/builder/loading-button-client"
import TooltipBuilder from "@components/builder/tooltip"
import { base64toBlob } from "@helpers/string"
import { useMutation } from "@tanstack/react-query"
import { FileSpreadsheetIcon } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import { downloadPendidikan2 } from "../action"

type Pendidikan2DownloadButtonProps = {
	form: UseFormReturn<FilterLaporanPendidikan2Schema>
}
const Pendidikan2DownloadButton = ({
	form,
}: Pendidikan2DownloadButtonProps) => {
	const downloadFile = useMutation({
		mutationFn: downloadPendidikan2,
		onSuccess: (data) => {
			const blob = base64toBlob(data.base64, data.type)
			const url = URL.createObjectURL(blob)
			const link = document.createElement("a")
			link.href = url
			link.setAttribute("download", data.filename ?? "pendidikan2.xlsx")
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		},
	})

	const handleDownload = () => {
		downloadFile.mutate(form.getValues())
	}
	return (
		<TooltipBuilder
			text="Download File Excel"
			delayDuration={10}
			className="bg-warning text-warning-foreground"
		>
			<LoadingButtonClient
				pending={downloadFile.isPending}
				onClick={handleDownload}
				icon={<FileSpreadsheetIcon />}
				title="Download Excel"
				className="mt-2 bg-warning text-warning-foreground hover:bg-warning-foreground hover:text-warning"
			/>
		</TooltipBuilder>
	)
}

export default Pendidikan2DownloadButton
