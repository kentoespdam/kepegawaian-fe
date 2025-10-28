"use client"

import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Pie, PieChart } from "recharts"

const StatistikUmurPie = ({ data }: { data: StatistikUmurRoot }) => {
	const chartData = useMemo(
		() =>
			data.range.map((item, index) => ({
				label: item.range,
				value: item.persen,
				fill: `hsl(var(--chart-${index + 1}))`,
			})),
		[data]
	)

	const chartConfig = useMemo(() => {
		const cfg: Record<string, { label: string; color?: string }> = {
			value: {
				label: "Jumlah",
			},
		} satisfies ChartConfig
		for (const item of data.range) {
			cfg[item.range] = {
				label: item.range,
				color: `hsl(var(--chart-${data.range.indexOf(item) + 1}))`,
			}
		}
		return cfg
	}, [data])

	return (
		<ChartContainer config={chartConfig} className="mx-auto w-[600px]">
			<PieChart>
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelKey="label"
							labelFormatter={(x) => `Umur ${x} Tahun`}
						/>
					}
				/>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="label"
					label={({ payload, ...props }) => (
						<text
							cx={props.cx}
							cy={props.cy}
							x={props.x}
							y={props.y}
							textAnchor={props.textAnchor}
							dominantBaseline={props.dominantBaseline}
							fill={payload.fill}
							className="font-bold"
						>
							Umur {payload.label} Tahun: {payload.value}%
						</text>
					)}
				/>
			</PieChart>
		</ChartContainer>
	)
}

export default StatistikUmurPie
