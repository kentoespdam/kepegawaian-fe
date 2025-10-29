"use client"

import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const StatistikPendidikan1Bar = ({
	data,
}: {
	data: StatistikPendidikan1[]
}) => {
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

	if (data.length === 0) {
		return null
	}

	return (
		<ChartContainer
			config={chartConfig}
			className="max-h-[400px] min-h-[200px] w-[800px] lg:w-[1000px]"
		>
			<BarChart accessibilityLayer data={data} layout="vertical">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis
					dataKey="nama"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="text-nowrap"
					width={140}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="total"
					stackId="a"
					fill="hsl(var(--chart-2))"
					height={20}
					// className="max-h-2"
				/>
			</BarChart>
		</ChartContainer>
	)
}

export default StatistikPendidikan1Bar
