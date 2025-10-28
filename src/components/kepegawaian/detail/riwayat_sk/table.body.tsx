import type { Pageable } from "@_types/index"
import type { RiwayatSk } from "@_types/kepegawaian/riwayat_sk"
import type { JenisSk } from "@_types/master/jenis_sk"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut, rupiah } from "@helpers/number"
import RiwayatSkActionButton from "./button.table.action"
import { useRiwayatSkStore } from "@store/kepegawaian/detail/riwayat_sk"
import { cn } from "@lib/utils"
import { memo, useCallback, useMemo } from "react"
import { useLampiranSkStore } from "@store/kepegawaian/detail/lampiran-sk-store"
import { Button } from "@components/ui/button"
import { EllipsisIcon } from "lucide-react"

type RiwayatSkTableBodyProps = {
	pegawaiId: number
	data: Pageable<RiwayatSk>
	jenisSkList: JenisSk[]
	isKaryawanAktif: boolean
}

const ActionButton = memo(
	({
		pegawaiId,
		row,
		isKaryawanAktif,
	}: {
		pegawaiId: number
		row: RiwayatSk
		isKaryawanAktif: boolean
	}) => {
		return (
			<TableCell className="border-x p-0" align="center">
				{isKaryawanAktif ? (
					<RiwayatSkActionButton pegawaiId={pegawaiId} data={row} />
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

const RiwayatSkTableBody = ({
	pegawaiId,
	data,
	jenisSkList,
	isKaryawanAktif,
}: RiwayatSkTableBodyProps) => {
	const { selectedDataId, setSelectedDataId } = useRiwayatSkStore(
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
		(data: RiwayatSk) => {
			setSelectedDataId(selectedDataId === data.id ? 0 : data.id)
			setRefId(refId === data.id ? 0 : data.id)
			setRef(ref === data.jenisSk ? "" : data.jenisSk)
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
					<TableCell align="right" width={60} className="border-x">
						{row.urut}
					</TableCell>
					<ActionButton
						pegawaiId={pegawaiId}
						row={row}
						isKaryawanAktif={isKaryawanAktif}
					/>
					<TableCell className="whitespace-nowrap border-x">
						{row.nomorSk}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{jenisSkList.find((x) => x.id === row.jenisSk)?.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.tanggalSk}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.tmtBerlaku}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.golongan?.golongan} - {row.golongan?.pangkat}
					</TableCell>
					<TableCell
						className="whitespace-nowrap border-x"
						align="right"
					>
						{rupiah(row.gajiPokok)}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.mkgTahun} Thn - {row.mkgBulan} Bln
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.kenaikanBerikutnya}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.mkgbTahun} Thn - {row.mkgbBulan} Bln
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.notes}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default RiwayatSkTableBody
