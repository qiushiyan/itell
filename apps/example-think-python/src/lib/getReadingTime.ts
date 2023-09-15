import db from "./db";
import { format, subDays } from "date-fns";
import { formatDate, getDatesBetween } from "@itell/core/utils";

export const getReadingTime = async (uid: string) => {
	// fetch reading time during last week
	const today = new Date();
	const startDate = subDays(new Date(), 6);
	const data = await db.focusTime.findMany({
		where: {
			userId: uid,
			created_at: {
				gte: startDate,
			},
		},
	});

	const readingTimeByDay = data.reduce((acc, entry) => {
		const totalViewTime = (entry.data as { totalViewTime: number }[]).reduce(
			(acc, cur) => {
				return acc + cur.totalViewTime;
			},
			0,
		);

		const date = formatDate(entry.created_at, "yyyy-MM-dd");

		acc.set(date, (acc.get(date) || 0) + totalViewTime);
		return acc;
	}, new Map<string, number>());

	const dates = getDatesBetween(startDate, today).map((d) =>
		formatDate(d, "yyyy-MM-dd"),
	);
	const chartData = [];
	let totalViewTime = 0;

	for (const date of dates) {
		totalViewTime += readingTimeByDay.get(date) || 0;

		chartData.push({
			name: format(new Date(date), "LLL, dd"),
			value: (readingTimeByDay.get(date) || 0) / 60,
		});
	}

	return { chartData, totalViewTime };
};
