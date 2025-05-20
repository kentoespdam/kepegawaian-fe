"use client";

import type { StatistikGelarAkademik } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikGelarAkademikBar = ({
	data,
}: { data: StatistikGelarAkademik[] }) => {
	let chartConfig = {
		jumlah: {
			label: "Jumlah",
		},
	} satisfies ChartConfig;
	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[index]: {
				label: `${item.jenjang} - ${item.gelar}`,
				color: `hsl(var(--chart-${index + 1}))`,
			},
		};
	});

	const chartData = data.map((item, index) => ({
		index: index,
		nama: `${item.jenjang} - ${item.gelar}`,
		total: item.total,
	}));

	return data.length === 0 ? null : (
		<ChartContainer
			config={chartConfig}
			className="min-h-[200px] max-h-[400px] w-full"
		>
			<BarChart accessibilityLayer data={chartData} layout="vertical">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="total" />
				<YAxis
					dataKey="nama"
					type="category"
					tickLine={false}
					tickMargin={10}
					// axisLine={false}
					className="text-nowrap w-auto"
					width={300}
				/>
				<ChartTooltip content={<ChartTooltipContent nameKey="jumlah" />} />
				<ChartLegend content={<ChartLegendContent nameKey="jumlah" />} />
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

export default StatistikGelarAkademikBar;
