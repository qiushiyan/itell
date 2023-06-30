"use client";
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type Props = {
	data: { name: string; value: number | string }[];
};

export const ReadingTimeChart = ({ data }: Props) => {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value} min`}
				/>
				<Bar dataKey="value" fill="#adfa1d" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
};
