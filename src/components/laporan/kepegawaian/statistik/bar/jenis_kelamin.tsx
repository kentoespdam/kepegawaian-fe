"use client"

import type { StatistikJenisKelamin } from "@_types/laporan/kepegawaian/lap_statistik"
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

const StatistikJenisKelaminBar = ({
	data,
}: {
	data: StatistikJenisKelamin[]
}) => {
	const chartConfig = useMemo(() => {
		const cfg: Record<string, { label: string; color: string }> = {}
		for (const item of data) {
			cfg[item.jenis_kelamin] = {
				label: item.jenis_kelamin,
				color: `hsl(var(--chart-${data.indexOf(item) + 1}))`,
			}
		}
		return cfg as unknown as ChartConfig
	}, [data])

	const chartData = useMemo(
		() =>
			data.map((item) => ({
				nama: item.jenis_kelamin,
				total: item.total,
			})),
		[data]
	)

	return data.length === 0 ? null : (
		<ChartContainer
			config={chartConfig}
			className="flex-2 max-h-[400px] min-h-[200px] w-[800px]"
		>
			<BarChart accessibilityLayer data={chartData} layout="vertical">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis
					dataKey="nama"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="w-auto text-nowrap"
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
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

export default StatistikJenisKelaminBar
