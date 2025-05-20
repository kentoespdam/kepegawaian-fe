"use client";

import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikUmurBar = ({ data }: { data: StatistikUmurRoot }) => {
	const chartData = data.range.map((item, index) => ({
		range: item.range,
		total: item.total,
	}));

	const chartConfig = {
		total: {
			label: "Jumlah",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] max-h-[400px] w-full">
			<BarChart accessibilityLayer data={chartData} layout="vertical" height={400}>
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis dataKey="range" type="category" tickMargin={10} />
				<ChartTooltip
					content={
						<ChartTooltipContent labelFormatter={(x) => `Umur ${x} Tahun`} />
					}
				/>
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="total"
					stackId="a"
					fill="hsl(var(--chart-1))"
					className="h-2"
				/>
			</BarChart>
		</ChartContainer>
	);
};

export default StatistikUmurBar;
