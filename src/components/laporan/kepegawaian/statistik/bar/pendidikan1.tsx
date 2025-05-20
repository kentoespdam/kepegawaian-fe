"use client";

import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikPendidikan1Bar = ({
	data,
}: { data: StatistikPendidikan1[] }) => {
	const chartConfig = {
		total: {
			label: "Jumlah",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	if (data.length === 0) {
		return null;
	}

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] max-h-[400px] w-full">
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
	);
};

export default StatistikPendidikan1Bar;
