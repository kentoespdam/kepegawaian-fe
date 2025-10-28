import type { StatistikAgama } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table"
import React, { useMemo } from "react"

interface StatistikAgamaTableProps {
	data: StatistikAgama[]
}
const StatistikAgamaTable = ({ data }: StatistikAgamaTableProps) => {
	const total = useMemo(
		() => data.reduce((acc, item) => acc + item.total, 0),
		[data]
	)
	const persen = useMemo(
		() => data.reduce((acc, item) => acc + item.persen, 0).toFixed(2),
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
						AGAMA
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						JUMLAH
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						PERSEN
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, idx) => (
					<TableRow key={item.agama}>
						<TableCell className="border" align="right">
							{idx + 1}
						</TableCell>
						<TableCell className="text-nowrap border">
							{item.agama}
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
						{total}
					</TableCell>
					<TableCell className="border" align="right">
						{persen}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

export default StatistikAgamaTable
