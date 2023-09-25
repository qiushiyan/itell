import db from "./db";
import { format, subDays } from "date-fns";
import { formatDate, getDatesBetween } from "@itell/core/utils";
import {
	ReadingTimeChartLevel,
	ReadingTimeChartParams,
} from "@/types/reading-time";

export const PrevDaysLookup = {
	[ReadingTimeChartLevel.week_1]: 6,
	[ReadingTimeChartLevel.week_2]: 13,
	[ReadingTimeChartLevel.month_1]: 29,
	[ReadingTimeChartLevel.month_2]: 59,
	[ReadingTimeChartLevel.month_3]: 89,
} as const;

export const getReadingTime = async (
	uid: string,
	params: ReadingTimeChartParams,
) => {
	// fetch reading time during last week
	const today = new Date();
	const prevDays = PrevDaysLookup[params.level];
	const startDate = subDays(new Date(), prevDays);
	const data = await db.focusTime.findMany({
		where: {
			userId: uid,
			created_at: {
				gte: startDate,
			},
		},
	});

	const intervalDates = getDatesBetween(startDate, today);

	const readingTimeByGroup = data.reduce((acc, entry) => {
		// for some legacy records, totalViewTime is null
		const totalViewTime = entry.totalViewTime
			? entry.totalViewTime
			: (entry.data as { totalViewTime: number }[]).reduce(
					(acc, cur) => acc + cur.totalViewTime,
					0,
			  );
		const entryDate = new Date(entry.created_at);
		// find the smallest date in intervalDates that is greater than entryDate
		const thresholdDate = intervalDates.find((date) => entryDate <= date);

		if (thresholdDate) {
			const formattedDate = formatDate(thresholdDate, "yyyy-MM-dd");
			acc.set(formattedDate, (acc.get(formattedDate) || 0) + totalViewTime);
		}

		return acc;
	}, new Map<string, number>());

	const chartData = [];
	let totalViewTime = 0;

	for (const [i, date] of intervalDates.entries()) {
		const formattedDate = formatDate(date, "yyyy-MM-dd");
		totalViewTime += readingTimeByGroup.get(formattedDate) || 0;

		const value = (readingTimeByGroup.get(formattedDate) || 0) / 60;
		// depending on the time span, format the date differently
		// when it's 1 week, format each individual date directly
		// when it's other time spans, format the date as a range: "Jan 1-7", "Jan 8-14", etc.
		let name: string;
		if (params.level === ReadingTimeChartLevel.week_1) {
			name = format(new Date(date), "LLL, dd");
		} else {
			const start = format(new Date(date), "LLL, dd");
			let end: string;
			if (i === intervalDates.length - 1) {
				end = "Now";
			} else {
				const nextDate = new Date(intervalDates[i + 1]);
				if (nextDate.getMonth() !== date.getMonth()) {
					end = format(nextDate, "LLL, dd");
				} else {
					end = format(nextDate, "dd");
				}
			}
			name = `${start}-${end}`;
		}
		chartData.push({
			name,
			value,
		});
	}

	return { chartData, totalViewTime };
};
