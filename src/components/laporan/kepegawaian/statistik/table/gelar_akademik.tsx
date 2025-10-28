import type { StatistikGelarAkademik } from "@_types/laporan/kepegawaian/lap_statistik"
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

interface StatistikGelarAkademikTableProps {
	data: StatistikGelarAkademik[]
}
const StatistikGelarAkademikTable = ({
	data,
}: StatistikGelarAkademikTableProps) => {
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
				<TableRow className="sticky top-0">
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NO
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						TINGKAT
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						GELAR
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
					<TableRow key={`${item.gelar}-${item.jenjang}`}>
						<TableCell className="border p-1" align="right">
							{idx + 1}
						</TableCell>
						<TableCell className="text-nowrap border p-1">
							{item.jenjang}
						</TableCell>
						<TableCell className="text-nowrap border p-1">
							{item.gelar}
						</TableCell>
						<TableCell className="border p-1" align="right">
							{item.total}
						</TableCell>
						<TableCell className="border p-1" align="right">
							{item.persen.toFixed(2)}%
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3} className="border p-1" align="right">
						Total Pegawai
					</TableCell>
					<TableCell className="border p-1" align="right">
						{total}
					</TableCell>
					<TableCell className="border p-1" align="right">
						{persen}%
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

export default StatistikGelarAkademikTable
