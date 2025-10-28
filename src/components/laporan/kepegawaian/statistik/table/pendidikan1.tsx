import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table"
import { useMemo } from "react"

interface TableStatistikPendidikan1ComponentProps {
	data: StatistikPendidikan1[]
}
const TableStatistikPendidikan1Component = ({
	data,
}: TableStatistikPendidikan1ComponentProps) => {
	const totalPegawai = useMemo(
		() => data.reduce((acc, item) => acc + item.total, 0),
		[data]
	)
	const totalPersen = useMemo(
		() => data.reduce((acc, item) => acc + item.persen, 0),
		[data]
	)

	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NO
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NAMA
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						TOTAL
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						PERSEN
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, idx) => (
					<TableRow key={item.nama}>
						<TableCell className="border" align="right">
							{idx + 1}
						</TableCell>
						<TableCell className="text-nowrap border">
							{item.nama}
						</TableCell>
						<TableCell className="border" align="right">
							{item.total}
						</TableCell>
						<TableCell className="border" align="right">
							{item.persen}%
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2} className="border" align="right">
						Total Pegawai
					</TableCell>
					<TableCell className="border" align="right">
						{totalPegawai}
					</TableCell>
					<TableCell className="border" align="right">
						{totalPersen}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

export default TableStatistikPendidikan1Component
