"use client"

import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/lap_statistik"
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

const StatistikUmurBar = ({ data }: { data: StatistikUmurRoot }) => {
	const chartConfig = useMemo(
		() =>
			({
				total: {
					label: "Jumlah",
					color: "hsl(var(--chart-2))",
				},
			}) satisfies ChartConfig,
		[]
	)
	const chartData = useMemo(
		() =>
			data.range.map((item) => ({
				range: item.range,
				total: item.total,
			})),
		[data.range]
	)

	return (
		<ChartContainer
			config={chartConfig}
			className="max-h-[400px] min-h-[200px] w-[800px]"
		>
			<BarChart
				accessibilityLayer
				data={chartData}
				layout="vertical"
				height={400}
			>
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis dataKey="range" type="category" tickMargin={10} />
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelFormatter={(x) => `Umur ${x} Tahun`}
						/>
					}
				/>
				<ChartLegend content={<ChartLegendContent />} />
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

export default StatistikUmurBar
