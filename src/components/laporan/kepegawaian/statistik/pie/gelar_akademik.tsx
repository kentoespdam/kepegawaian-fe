"use client";

import type { StatistikGelarAkademik } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Pie, PieChart } from "recharts";

const StatistikGelarAkademikPie = ({
	data,
}: { data: StatistikGelarAkademik[] }) => {
	const chartData = data.map((item, index) => ({
		index: index,
		label: `${item.jenjang} - ${item.gelar}`,
		value: item.persen.toFixed(2),
		fill: `hsl(var(--chart-${index + 1}))`,
	}));

	let chartConfig = {
		value: {
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

	return data.length === 0 ? null : (
		<ChartContainer config={chartConfig} className="w-[90%] mx-auto">
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent labelKey="label" />} />
				<Pie
					data={chartData}
					dataKey="index"
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
							{payload.label} {payload.value}%
						</text>
					)}
					className="w-full"
				/>
			</PieChart>
		</ChartContainer>
	);
};

export default StatistikGelarAkademikPie;
