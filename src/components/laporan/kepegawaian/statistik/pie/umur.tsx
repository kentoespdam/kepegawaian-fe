"use client";

import type { StatistikUmurRoot } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Pie, PieChart } from "recharts";

const StatistikUmurPie = ({ data }: { data: StatistikUmurRoot }) => {
	const chartData = data.range.map((item, index) => ({
		label: item.range,
		value: item.persen,
		fill: `hsl(var(--chart-${index + 1}))`,
	}));

	let chartConfig = {
		value: {
			label: "Jumlah",
		},
	} satisfies ChartConfig;

	data.range.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.range]: {
				label: item.range,
				color: `hsl(var(--chart-${index + 1}))`,
			},
		};
	});

	return (
		<ChartContainer config={chartConfig} className="w-[600px] mx-auto">
			<PieChart>
				<ChartTooltip
					content={
						<ChartTooltipContent
							labelKey="label"
							labelFormatter={(x) => `Umur ${x} Tahun`}
						/>
					}
				/>
				<Pie
					data={chartData}
					dataKey="value"
					nameKey="label"
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
							Umur {payload.label} Tahun: {payload.value}%
						</text>
					)}
				/>
			</PieChart>
		</ChartContainer>
	);
};

export default StatistikUmurPie;
