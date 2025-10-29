import type { Pageable } from "@_types/index"
import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store"
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi"
import MutasiGolonganCell from "./table.golongan.cell"
import MutasiJabatanCell from "./table.jabatan.cell"
import MutasiOrganisasiCell from "./table.organisasi.cell"
import RiwayatMutasiSKCell from "./table.sk.cell"
import RiwayatMutasiTableAction from "./button.table.action"
import { memo, useCallback, useMemo } from "react"
import { Button } from "@components/ui/button"
import { EllipsisIcon } from "lucide-react"

export interface MutasiRowProps {
	row: RiwayatMutasi
}

const ActionButton = memo(
	({
		pegawaiId,
		row,
		isKaryawanAktif,
	}: {
		pegawaiId: number
		row: RiwayatMutasi
		isKaryawanAktif: boolean
	}) => {
		return (
			<TableCell className="border-x p-0" align="center">
				{isKaryawanAktif ? (
					<RiwayatMutasiTableAction
						pegawaiId={pegawaiId}
						data={row}
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
ActionButton.displayName = "MutasiRowAction"

type RiwayatMutasiTableBodyProps = {
	pegawaiId: number
	data: Pageable<RiwayatMutasi>
	isKaryawanAktif: boolean
}
const RiwayatMutasiTableBody = ({
	pegawaiId,
	data,
	isKaryawanAktif,
}: RiwayatMutasiTableBodyProps) => {
	const { selectedDataId, setSelectedDataId } = useRiwayatMutasiStore(
		(state) => ({
			selectedDataId: state.selectedDataId,
			setSelectedDataId: state.setSelectedDataId,
		})
	)
	const { ref, setRef, refId, setRefId } = useLampiranSkStore((state) => ({
		ref: state.ref,
		setRef: state.setRef,
		refId: state.refId,
		setRefId: state.setRefId,
	}))

	const handleSelect = useCallback(
		(data: RiwayatMutasi) => {
			setSelectedDataId(selectedDataId === data.id ? 0 : data.id)
			setRefId(refId === data.skMutasi.id ? 0 : data.skMutasi.id)
			setRef(ref === data.skMutasi.jenisSk ? "" : data.skMutasi.jenisSk)
		},
		[selectedDataId, ref, refId, setSelectedDataId, setRef, setRefId]
	)

	const tableRows = useMemo(() => {
		const urutStart = getUrut(data)
		return data.content.map((row, index) => ({
			...row,
			urut: urutStart + index,
			isSelected: selectedDataId === row.id,
		}))
	}, [data, selectedDataId])

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					key={row.id}
					className={cn(
						"transition-colors odd:bg-muted/50 hover:bg-green-100",
						{
							"bg-green-200 odd:bg-green-300 hover:bg-green-200":
								row.isSelected,
						}
					)}
					onClick={() => handleSelect(row)}
				>
					<TableCell align="right" className="border-x">
						{row.urut}
					</TableCell>
					<ActionButton
						row={row}
						pegawaiId={pegawaiId}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<RiwayatMutasiSKCell row={row} />
					<TableCell className="whitespace-nowrap border-x">
						{row.jenisMutasi
							.replaceAll("_", " ")
							.replace("MUTASI", "")}
					</TableCell>
					<MutasiGolonganCell row={row} />
					<MutasiOrganisasiCell row={row} />
					<MutasiJabatanCell row={row} />
					<TableCell className="whitespace-nowrap border-x">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default RiwayatMutasiTableBody
