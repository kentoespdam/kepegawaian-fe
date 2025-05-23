"use client";

import type { StatistikAgama } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikAgamaBar = ({ data }: { data: StatistikAgama[] }) => {
	let chartConfig = {
		agama: {
			label: "Jumlah",
		},
	} satisfies ChartConfig;
	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.agama]: {
				label: item.agama,
			},
		};
	});

	const chartData = data.map((item) => ({
		agama: item.agama,
		total: item.total,
	}));

	if (data.length === 0) {
		return null;
	}

	return (
		<ChartContainer
			config={chartConfig}
			className="w-[800px] lg:w-[1000px] min-h-[200px] max-h-[400px] border"
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
					className="text-nowrap w-auto"
					width={150}
				/>
				<ChartTooltip content={<ChartTooltipContent labelKey="agama" />} />
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
	);
};

export default StatistikAgamaBar;
