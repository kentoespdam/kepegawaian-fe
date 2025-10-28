import type { LampiranProfil } from "@_types/profil/lampiran"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import LampiranProfilTableAction from "./table-action"
import type { JenisLampiranProfil } from "@_types/enums/jenisl_lampiran_profil"
import { memo, useMemo } from "react"
import { Button } from "@components/ui/button"
import { EllipsisIcon } from "lucide-react"

interface LampiranProfilTableBodyProps {
	data: LampiranProfil[]
	jenis: JenisLampiranProfil
	rootKey: string
	isKaryawanAktif: boolean
}

const ActionButton = memo(
	({
		rootKey,
		row,
		jenis,
		isKaryawanAktif,
	}: {
		rootKey: string
		row: LampiranProfil
		jenis: JenisLampiranProfil
		isKaryawanAktif: boolean
	}) => {
		return (
			<TableCell className="w-20 border-x" align="center">
				{isKaryawanAktif ? (
					<LampiranProfilTableAction
						data={row}
						jenis={jenis}
						rootKey={rootKey}
					/>
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
const LampiranProfilTableBody = ({
	data,
	jenis,
	rootKey,
	isKaryawanAktif,
}: LampiranProfilTableBodyProps) => {
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
						jenis={jenis}
						rootKey={rootKey}
						isKaryawanAktif={isKaryawanAktif}
					/>
				</TableRow>
			))}
		</TableBody>
	)
}

export default LampiranProfilTableBody
