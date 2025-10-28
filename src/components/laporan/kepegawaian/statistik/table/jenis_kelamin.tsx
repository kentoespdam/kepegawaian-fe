import type { StatistikJenisKelamin } from "@_types/laporan/kepegawaian/lap_statistik"
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

interface StatistikJenisKelaminTableProps {
	data: StatistikJenisKelamin[]
}
const StatistikJenisKelaminTable = ({
	data,
}: StatistikJenisKelaminTableProps) => {
	const total = useMemo(
		() => data.reduce((acc, item) => acc + item.total, 0),
		[data]
	)
	const persen = useMemo(
		() => data.reduce((acc, item) => acc + item.persen, 0).toFixed(2),
		[data]
	)
	return (
		<Table className="w-fit">
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NO
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						JENIS KELAMIN
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
					<TableRow key={item.jenis_kelamin}>
						<TableCell className="border" align="right">
							{idx + 1}
						</TableCell>
						<TableCell className="border">
							{item.jenis_kelamin}
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

export default StatistikJenisKelaminTable
