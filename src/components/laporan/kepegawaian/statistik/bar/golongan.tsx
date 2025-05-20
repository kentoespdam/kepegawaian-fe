"use client";

import type { StatistikGolongan } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikGolonganBar = ({ data }: { data: StatistikGolongan[] }) => {
	const chartConfig = {
		pria: {
			label: "pria",
			color: "hsl(var(--chart-1))",
		},
		wanita: {
			label: "wanita",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	const chartData = data.map(({ golongan, pangkat, jml_l, jml_p, total }) => ({
		nama: `${golongan}-${pangkat}`,
		pria: jml_l,
		wanita: jml_p,
		total: total,
	}));

	if (data.length === 0) {
		return null;
	}

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] max-h-[400px] w-full">
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
					width={200}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="pria"
					stackId="a"
					fill="hsl(var(--chart-1))"
					className="h-2"
				/>
				<Bar dataKey="wanita" stackId="a" fill="hsl(var(--chart-2))" />
			</BarChart>
		</ChartContainer>
	);
};

export default StatistikGolonganBar;
