"use client"

import type { StatistikStatusPegawai } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Pie, PieChart } from "recharts"

const StatistikStatusPegawaiPie = ({
	data,
}: {
	data: StatistikStatusPegawai[]
}) => {
	const chartData = useMemo(
		() =>
			data.map((item, index) => ({
				label: item.status_pegawai,
				value: Number(item.persen.toFixed(2)),
				fill: `hsl(var(--chart-${index + 1}))`,
			})),
		[data]
	)

	const chartConfig = useMemo(() => {
		const cfg: Record<string, { label: string; color?: string }> = {
			status_pegawai: {
				label: "Jumlah",
			},
		} satisfies ChartConfig
		for (const item of data) {
			cfg[item.status_pegawai] = {
				label: item.status_pegawai,
				color: `hsl(var(--chart-${data.indexOf(item) + 1}))`,
			}
		}
		return cfg
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
							nameKey="status_pegawai"
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

export default StatistikStatusPegawaiPie
