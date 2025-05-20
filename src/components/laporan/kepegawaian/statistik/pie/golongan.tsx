"use client";

import type { StatistikGolongan } from "@_types/laporan/kepegawaian/LapStatistik";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@components/ui/chart";
import { Pie, PieChart } from "recharts";

const StatistikGolonganPie = ({ data }: { data: StatistikGolongan[] }) => {
	const chartData = data.map((item, index) => ({
		label: `${item.golongan}-${item.pangkat}`,
		value: item.total,
		fill: `hsl(var(--chart-${index + 1}))`,
	}));

	let chartConfig = {} satisfies ChartConfig;
	data.forEach((item, index) => {
		chartConfig = {
			...chartConfig,
			[item.golongan]: {
				label: `${item.golongan}-${item.pangkat}`,
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
				<ChartTooltip content={<ChartTooltipContent />} />
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
							className="font-bold"
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

export default StatistikGolonganPie;
