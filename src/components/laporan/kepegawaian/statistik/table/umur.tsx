import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/lap_statistik"
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

const UmurTable1 = ({ data }: { data: StatistikUmurRoot }) => {
	const total = useMemo(
		() => data.umur.reduce((acc, item) => acc + item.total, 0),
		[data]
	)
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NO
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						UMUR
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						JML
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.umur.map((item, idx) => (
					<TableRow key={item.umur}>
						<TableCell
							className="border p-1"
							align="right"
							width={30}
						>
							{idx + 1}
						</TableCell>
						<TableCell className="text-nowrap border p-1">
							{item.umur} Tahun
						</TableCell>
						<TableCell
							className="border p-1"
							align="right"
							width={50}
						>
							{item.total}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell className="border p-1" colSpan={2}>
						Total
					</TableCell>
					<TableCell className="border p-1" align="right">
						{total}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	)
}

const UmurTable2 = ({ data }: { data: StatistikUmurRoot }) => {
	const total = useMemo(
		() => data.range.reduce((acc, item) => acc + item.total, 0),
		[data]
	)
	const persen = useMemo(
		() => data.range.reduce((acc, item) => acc + item.persen, 0).toFixed(2),
		[data]
	)
	let urut = 1
	return (
		<Table>
			<TableHeader>
				<TableRow className="sticky top-0 bg-primary">
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						NO
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						UMUR
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						JML
					</TableHead>
					<TableHead className="h-10 text-nowrap border-x bg-primary text-center text-primary-foreground">
						PERSEN
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.range.map((item) => (
					<TableRow key={item.range}>
						<TableCell
							className="border p-1"
							align="right"
							width={30}
						>
							{urut++}
						</TableCell>
						<TableCell className="border p-1">
							{item.range} Tahun
						</TableCell>
						<TableCell
							className="border p-1"
							align="right"
							width={50}
						>
							{item.total}
						</TableCell>
						<TableCell
							className="border p-1"
							align="right"
							width={50}
						>
							{item.persen}%
						</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell className="border p-1" colSpan={2}>
						Total
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

const StatistikUmurTable = ({ data }: { data: StatistikUmurRoot }) => {
	return (
		<div className="flex w-full gap-2">
			<UmurTable1 data={data} />
			<UmurTable2 data={data} />
		</div>
	)
}

export default StatistikUmurTable
