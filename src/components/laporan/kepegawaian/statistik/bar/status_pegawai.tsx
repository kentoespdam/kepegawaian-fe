"use client"

import type { StatistikStatusPegawai } from "@_types/laporan/kepegawaian/lap_statistik"
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart"
import React, { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

const StatistikStatusPegawaiBar = ({
	data,
}: {
	data: StatistikStatusPegawai[]
}) => {
	const chartConfig = useMemo(() => {
		const cfg: Record<string, { label: string }> = {
			status_pegawai: { label: "Jumlah" },
		}
		for (const item of data) {
			cfg[item.status_pegawai] = { label: item.status_pegawai }
		}
		return cfg
	}, [data])

	const chartData = useMemo(
		() =>
			data.map((item) => ({
				status_pegawai: item.status_pegawai,
				jumlah: item.total,
			})),
		[data]
	)

	if (data.length === 0) {
		return null
	}

	return (
		<ChartContainer
			config={chartConfig}
			className="max-h-[400px] min-h-[200px] w-[800px] border lg:w-[1000px]"
		>
			<BarChart
				accessibilityLayer
				data={chartData}
				layout="vertical"
				className="pr-2"
			>
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="jumlah" />
				<YAxis
					dataKey="status_pegawai"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="w-auto text-nowrap"
					width={125}
				/>
				<ChartTooltip
					content={<ChartTooltipContent labelKey="status_pegawai" />}
				/>
				<ChartLegend
					content={<ChartLegendContent nameKey="status_pegawai" />}
				/>
				<Bar
					dataKey="jumlah"
					stackId="a"
					fill="hsl(var(--chart-2))"
					className="h-2"
					label={{ position: "right" }}
				/>
			</BarChart>
		</ChartContainer>
	)
}

export default StatistikStatusPegawaiBar
