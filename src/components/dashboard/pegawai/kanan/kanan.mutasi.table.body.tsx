import type { Pageable } from "@_types/index"
import type { RiwayatMutasi } from "@_types/kepegawaian/riwayat-mutasi"
import MutasiGolonganCell from "@components/kepegawaian/detail/mutasi/table.golongan.cell"
import MutasiJabatanCell from "@components/kepegawaian/detail/mutasi/table.jabatan.cell"
import MutasiOrganisasiCell from "@components/kepegawaian/detail/mutasi/table.organisasi.cell"
import RiwayatMutasiSKCell from "@components/kepegawaian/detail/mutasi/table.sk.cell"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store"
import { useRiwayatMutasiStore } from "@store/kepegawaian/detail/riwayat_mutasi"
import { useCallback, useMemo } from "react"

type KananDataMutasiTableBodyProps = {
	data: Pageable<RiwayatMutasi>
}
const KananDataMutasiTableBody = ({ data }: KananDataMutasiTableBodyProps) => {
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
		[selectedDataId, ref, refId, setSelectedDataId, setRefId, setRef]
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
						{ "bg-green-200 hover:bg-green-200": row.isSelected }
					)}
					onClick={() => handleSelect(row)}
				>
					<TableCell align="right" className="border-x">
						{row.urut}
					</TableCell>
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

export default KananDataMutasiTableBody
