"use client"

import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Pie, PieChart } from "recharts"

const StatistikPendidikan1Pie = ({
	data,
}: {
	data: StatistikPendidikan1[]
}) => {
	const chartData = useMemo(
		() =>
			data.map((item, index) => ({
				label: item.nama,
				value: item.persen,
				fill: `hsl(var(--chart-${index + 1}))`,
			})),
		[data]
	)

	const chartConfig = useMemo(() => {
		const cfg: Record<string, { label: string; color?: string }> = {
			jenjang: { label: "Jumlah" },
		}
		for (const item of data) {
			cfg[item.nama] = {
				label: item.nama,
				color: `hsl(var(--chart-${data.indexOf(item) + 1}))`,
			}
		}
		return cfg satisfies unknown as ChartConfig
	}, [data])

	if (data.length === 0) {
		return null
	}
	return (
		<ChartContainer config={chartConfig} className="mx-auto w-[600px]">
			<PieChart accessibilityLayer>
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelKey="label"
							nameKey="jenjang"
						/>
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
							className="m-2 font-bold"
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

export default React.memo(StatistikPendidikan1Pie)
