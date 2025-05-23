"use client";

import type { StatistikStatusPegawai } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const StatistikStatusPegawaiBar = ({ data }: { data: StatistikStatusPegawai[] }) => {
	let chartConfig = {
		status_pegawai: {
			label: "Jumlah",
		},
	} satisfies ChartConfig;

	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.status_pegawai]: {
				label: item.status_pegawai,
			},
		};
	});

	const chartData = data.map((item) => ({
		status_pegawai: item.status_pegawai,
		jumlah: item.total,
	}));

	if (data.length === 0) {
		return null;
	}

	return (
		<ChartContainer
			config={chartConfig}
			className="w-[800px] lg:w-[1000px] min-h-[200px] max-h-[400px] border"
		>
			<BarChart accessibilityLayer data={chartData} layout="vertical" className="pr-2">
				<CartesianGrid horizontal={true} />
				<XAxis type="number" dataKey="jumlah" />
				<YAxis
					dataKey="status_pegawai"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					className="text-nowrap w-auto"
					width={125}
				/>
				<ChartTooltip content={<ChartTooltipContent labelKey="status_pegawai" />} />
				<ChartLegend content={<ChartLegendContent nameKey="status_pegawai" />} />
				<Bar
					dataKey="jumlah"
					stackId="a"
					fill="hsl(var(--chart-2))"
					className="h-2"
					label={{ position: "right" }}
				/>
			</BarChart>
		</ChartContainer>
	);
};

export default StatistikStatusPegawaiBar;
