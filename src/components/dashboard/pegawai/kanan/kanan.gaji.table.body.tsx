import type { Pageable } from "@_types/index"
import type { GajiBatchMaster } from "@_types/penggajian/gaji_batch_master"
import TooltipBuilder from "@components/builder/tooltip"
import { Button } from "@components/ui/button"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut, rupiah } from "@helpers/number"
import { useSlipGajiStore } from "@store/penggajian/slip"
import { PrinterIcon } from "lucide-react"
import { memo, useCallback, useMemo } from "react"

type KananDataGajiTableBodyProps = {
	data: Pageable<GajiBatchMaster>
}

const useSlipGajiButton = () => {
	const { setGajiId, setOpen } = useSlipGajiStore((state) => ({
		setGajiId: state.setGajiId,
		setOpen: state.setOpen,
	}))
	const handleOpenSlip = useCallback(
		(gajiId: number) => {
			setGajiId(gajiId)
			setOpen(true)
		},
		[setGajiId, setOpen]
	)

	return {
		handleOpenSlip: handleOpenSlip,
	}
}

const SlipGajiButton = memo(({ id }: { id: number }) => {
	const { handleOpenSlip } = useSlipGajiButton()
	return (
		<TableCell className="text-nowrap border-x" align="center">
			<TooltipBuilder
				text="Cetak Slip Gaji"
				delayDuration={100}
				className="bg-warning text-warning-foreground"
			>
				<Button
					size="icon"
					className="size-6 bg-warning text-warning-foreground"
					onClick={() => handleOpenSlip(id)}
				>
					<PrinterIcon className="size-4" />
				</Button>
			</TooltipBuilder>
		</TableCell>
	)
})
SlipGajiButton.displayName = "SlipGajiButton"

const KananDataGajiTableBody = ({ data }: KananDataGajiTableBodyProps) => {
	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
		}))
	}, [data])

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow key={row.id}>
					<TableCell align="right" width={60} className="border-x">
						{row.urut}
					</TableCell>
					<TableCell className="text-nowrap border-x">
						{row.periode}
					</TableCell>
					<TableCell className="text-nowrap border-x">
						{row.namaJabatan}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.penghasilanKotor)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.totalPotongan)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.pembulatan)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.penghasilanBersih)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.totalAddTambahan)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.totalAddPotongan)}
					</TableCell>
					<TableCell className="text-nowrap border-x" align="right">
						{rupiah(row.penghasilanBersihFinal2)}
					</TableCell>
					<SlipGajiButton id={row.id} />
				</TableRow>
			))}
		</TableBody>
	)
}

export default KananDataGajiTableBody
