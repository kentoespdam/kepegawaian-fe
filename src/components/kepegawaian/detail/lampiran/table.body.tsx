import type { LampiranSk } from "@_types/kepegawaian/lampiran_sk"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import LampiranSkTableAction from "./button.table.action"
import { memo, useMemo } from "react"
import { EllipsisIcon } from "lucide-react"
import { Button } from "@components/ui/button"

type LampiranSkTableBodyProps = {
	data: LampiranSk[]
	rootKey: string
	isKaryawanAktif: boolean
}

const ActionButton = memo(
	({
		rootKey,
		row,
		isKaryawanAktif,
	}: {
		rootKey: string
		row: LampiranSk
		isKaryawanAktif: boolean
	}) => {
		return (
			<TableCell className="w-20 border-x" align="center">
				{isKaryawanAktif ? (
					<LampiranSkTableAction data={row} rootKey={rootKey} />
				) : (
					<Button
						variant="secondary"
						size="icon"
						className="size-5"
						aria-label="Menu aksi"
					>
						<EllipsisIcon className="size-4" />
					</Button>
				)}
			</TableCell>
		)
	}
)
ActionButton.displayName = "ActionButton"

const LampiranSkTableBody = ({
	data,
	rootKey,
	isKaryawanAktif,
}: LampiranSkTableBodyProps) => {
	const tableRows = useMemo(() => {
		const urutStart = 1
		return data.map((row, index) => ({
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
					<TableCell className="border-x">{row.fileName}</TableCell>
					<TableCell className="border-x">{row.notes}</TableCell>
					<ActionButton
						row={row}
						rootKey={rootKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				</TableRow>
			))}
		</TableBody>
	)
}

export default LampiranSkTableBody
