import type { Pageable } from "@_types/index"
import type { Pegawai } from "@_types/pegawai"
import { Button } from "@components/ui/button"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store"
import { EyeIcon } from "lucide-react"
import { useCallback, useMemo } from "react"
import KepegawaianTableAction from "./table-action"

type PegawaiTableBodyProps = {
	data: Pageable<Pegawai>
}
const PegawaiTableBody = ({ data }: PegawaiTableBodyProps) => {
	const { pegawaiId, setPegawaiId } = useRingkasanPegawaiStore()
	const urutStart = useMemo(() => getUrut(data), [data])

	const onSelectRow = useCallback(
		(id: number) => {
			if (pegawaiId === id) setPegawaiId(0)
			else setPegawaiId(id)
		},
		[pegawaiId, setPegawaiId]
	)

	const renderAction = useCallback(
		(row: Pegawai) => (
			<div className="flex items-center gap-2">
				<Button
					size="icon"
					variant="ghost"
					className="h-6 w-6 text-cyan-400 hover:bg-transparent hover:text-cyan-700"
					onClick={() => onSelectRow(row.id)}
				>
					<EyeIcon />
				</Button>
				<KepegawaianTableAction data={row} />
			</div>
		),
		[onSelectRow]
	)

	const tableRows = useMemo(
		() =>
			data.content.map((row, index) => ({
				...row,
				urut: urutStart + index,
				isSelected: pegawaiId === row.id,
			})),
		[data.content, pegawaiId, urutStart]
	)

	return (
		<TableBody>
			{tableRows.map((row) => (
				<TableRow
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": pegawaiId === row.id,
					})}
					key={row.id}
				>
					<TableCell align="right" width={60} className="border-x">
						{row.urut}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{renderAction(row)}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.nipam}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.biodata.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.biodata.jenisKelamin.replace("_", " ") ?? "-"}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.golongan?.golongan} - {row.golongan?.pangkat}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.organisasi?.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.jabatan?.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.profesi?.nama}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.biodata.tanggalLahir}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.tmtPensiun}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.biodata.statusKawin.replace("_", "") ?? "-"}
					</TableCell>
					<TableCell className="border-x">
						{row.kodePajak?.kode}
					</TableCell>
					<TableCell className="border-x">
						{row.isAskes ? "Ya" : "Tidak"}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						{row.statusPegawai}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default PegawaiTableBody
