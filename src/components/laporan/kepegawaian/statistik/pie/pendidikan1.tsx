"use client";

import type { StatistikPendidikan1 } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Pie, PieChart } from "recharts";

const StatistikPendidikan1Pie = ({
	data,
}: { data: StatistikPendidikan1[] }) => {
	const chartData = data.map((item, index) => ({
		label: item.nama,
		value: item.persen,
		fill: `hsl(var(--chart-${index + 1}))`,
	}));

	let chartConfig = {
		jenjang: {
			label: "jumlah",
		},
	} satisfies ChartConfig;
	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.nama]: {
				label: item.nama,
				color: `hsl(var(--chart-${index + 1}))`,
			},
		};
	});

	if (data.length === 0) {
		return null;
	}
	return (
		<ChartContainer config={chartConfig} className="w-[600px] mx-auto">
			<PieChart accessibilityLayer>
				<ChartTooltip
					content={<ChartTooltipContent labelKey="label" nameKey="jenjang" />}
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
							className="font-bold m-2"
						>
							{payload.label}: {payload.value}%
						</text>
					)}
					nameKey="label"
				/>
			</PieChart>
		</ChartContainer>
	);
};

export default StatistikPendidikan1Pie;
