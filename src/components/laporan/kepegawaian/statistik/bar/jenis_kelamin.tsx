"use client";

import type { StatistikJenisKelamin } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikJenisKelaminBar = ({
	data,
}: { data: StatistikJenisKelamin[] }) => {
	let chartConfig = {} satisfies ChartConfig;
	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.jenis_kelamin]: {
				label: item.jenis_kelamin,
				color: `hsl(var(--chart-${index + 1}))`,
			},
		};
	});

	const chartData = data.map((item) => ({
		nama: item.jenis_kelamin,
		total: item.total,
	}));

	return data.length === 0 ? null : (
		<ChartContainer
			config={chartConfig}
			className="min-h-[200px] max-h-[400px] w-[800px] flex-2"
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
					className="text-nowrap w-auto"
					// width={150}
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
	);
};

export default StatistikJenisKelaminBar;
