"use client"

import React, { useMemo } from "react"
import type { StatistikAgama } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const StatistikAgamaBar = ({ data }: { data: StatistikAgama[] }) => {
	const chartConfig = useMemo(() => {
		// build a config object without mutating the original repeatedly
		const cfg: Record<string, { label: string }> = {
			agama: { label: "Jumlah" },
		}
		for (const item of data) {
			cfg[item.agama] = { label: item.agama }
		}
		return cfg as unknown as ChartConfig
	}, [data])

	const chartData = useMemo(
		() => data.map((item) => ({ agama: item.agama, total: item.total })),
		[data]
	)

	if (data.length === 0) return null

	return (
		<ChartContainer
			config={chartConfig}
			className="max-h-[400px] min-h-[200px] w-[800px] border lg:w-[1000px]"
		>
			<BarChart accessibilityLayer data={chartData} layout="vertical">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis
					dataKey="agama"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="w-auto text-nowrap"
					width={150}
				/>
				<ChartTooltip
					content={<ChartTooltipContent labelKey="agama" />}
				/>
				<ChartLegend content={<ChartLegendContent nameKey="agama" />} />
				<Bar
					dataKey="total"
					stackId="a"
					fill="hsl(var(--chart-2))"
					className="h-2"
					label={{ position: "right" }}
				/>
			</BarChart>
		</ChartContainer>
	)
}

export default StatistikAgamaBar
