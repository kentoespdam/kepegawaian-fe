"use client"

import type { StatistikGelarAkademik } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const StatistikGelarAkademikBar = ({
	data,
}: {
	data: StatistikGelarAkademik[]
}) => {
	const chartConfig = useMemo(
		() =>
			({
				jumlah: {
					label: "Jumlah",
				},
			}) satisfies ChartConfig,
		[]
	)

	const chartData = useMemo(
		() =>
			data.map((item, index) => ({
				index: index,
				nama: `${item.jenjang} - ${item.gelar}`,
				total: item.total,
			})),
		[data]
	)

	return data.length === 0 ? null : (
		<ChartContainer
			config={chartConfig}
			className="max-h-[400px] min-h-[200px] w-[800px]"
		>
			<BarChart accessibilityLayer data={chartData} layout="vertical">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis
					dataKey="nama"
					type="category"
					tickLine={false}
					tickMargin={10}
					className="w-auto text-nowrap"
					width={300}
				/>
				<ChartTooltip
					content={<ChartTooltipContent nameKey="jumlah" />}
				/>
				<ChartLegend
					content={<ChartLegendContent nameKey="jumlah" />}
				/>
				<Bar
					dataKey="total"
					stackId="a"
					fill="hsl(var(--chart-1))"
					className="h-2"
				/>
			</BarChart>
		</ChartContainer>
	)
}

export default StatistikGelarAkademikBar
