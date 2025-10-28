"use client"

import type { StatistikAgama } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Pie, PieChart } from "recharts"

const StatistikAgamaPie = ({ data }: { data: StatistikAgama[] }) => {
	const chartConfig = useMemo(() => {
		// build a config object without mutating the original repeatedly
		const cfg: Record<string, { label: string; color?: string }> = {
			agama: { label: "Jumlah" },
		}
		for (const item of data) {
			cfg[item.agama] = {
				label: item.agama,
				color: `hsl(var(--chart-${data.indexOf(item) + 1}))`,
			}
		}
		return cfg as unknown as ChartConfig
	}, [data])

	const chartData = useMemo(
		() =>
			data.map((item, index) => ({
				label: item.agama,
				value: item.persen,
				fill: `hsl(var(--chart-${index + 1}))`,
			})),
		[data]
	)

	if (data.length === 0) {
		return null
	}
	return (
		<ChartContainer config={chartConfig} className="mx-auto w-[600px]">
			<PieChart accessibilityLayer>
				<ChartTooltip
					content={
						<ChartTooltipContent labelKey="label" nameKey="agama" />
					}
				/>
				<Pie
					data={chartData}
					dataKey="value"
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
							{payload.label}: {payload.value}%
						</text>
					)}
					nameKey="label"
				/>
			</PieChart>
		</ChartContainer>
	)
}

export default StatistikAgamaPie
