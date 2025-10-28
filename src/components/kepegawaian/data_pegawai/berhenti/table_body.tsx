import type { Pageable } from "@_types/index"
import type { Pegawai } from "@_types/pegawai"
import { Button } from "@components/ui/button"
import { TableBody, TableCell, TableRow } from "@components/ui/table"
import { getUrut } from "@helpers/number"
import { cn } from "@lib/utils"
import { useRingkasanPegawaiStore } from "@store/kepegawaian/data_pegawai/ringkasan-pegawai-store"
import { EyeIcon } from "lucide-react"

type BerhentiTableBodyProps = {
	data: Pageable<Pegawai>
}
const BerhentiTableBody = ({ data }: BerhentiTableBodyProps) => {
	const { pegawaiId, setPegawaiId } = useRingkasanPegawaiStore()
	let urut = getUrut(data)

	const onSelectRow = (row: Pegawai) => {
		if (pegawaiId === row.id) setPegawaiId(0)
		else setPegawaiId(row.id)
	}
	return (
		<TableBody>
			{data.content.map((row) => (
				<TableRow
					className={cn("odd:bg-muted hover:bg-green-200", {
						"bg-green-300 odd:bg-green-300": pegawaiId === row.id,
					})}
					key={row.id}
				>
					<TableCell align="right" width={60} className="border-x">
						{urut++}
					</TableCell>
					<TableCell className="whitespace-nowrap border-x">
						<div className="flex items-center gap-2">
							<Button
								size="icon"
								variant="ghost"
								className="h-6 w-6 text-cyan-400 hover:bg-transparent hover:text-cyan-700"
								onClick={() => onSelectRow(row)}
							>
								<EyeIcon />
							</Button>
						</div>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	)
}

export default BerhentiTableBody
