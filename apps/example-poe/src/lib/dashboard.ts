import { type Prisma, type Summary } from "@prisma/client";
import db from "./db";
import { format, subDays } from "date-fns";

export const getSummaryStatistics = async ({
	where,
}: { where: Prisma.SummaryWhereInput }) => {
	const summaryStats = await db.summary.aggregate({
		_avg: {
			wordingScore: true,
			contentScore: true,
		},
		_count: true,
		where: where,
	});
	const passedCount = await db.summary.count({
		where: {
			...where,
			isPassed: true,
		},
	});

	return {
		avgContentScore: summaryStats._avg.contentScore,
		avgWordingScore: summaryStats._avg.wordingScore,
		summaryCount: summaryStats._count,
		passedCount: passedCount,
	};
};

export const getReadingTime = async (uid: string) => {
	// fetch reading time during last week
	const targetDate = subDays(new Date(), 7);
	const data = await db.focusTime.findMany({
		where: {
			userId: uid,
			created_at: {
				gt: targetDate,
			},
		},
	});

	const readingTimeByDay = data.reduce((acc, entry) => {
		const date = format(entry.created_at, "LLL, dd");
		const totalViewTime = (entry.data as { totalViewTime: number }[]).reduce(
			(acc, cur) => {
				return acc + cur.totalViewTime;
			},
			0,
		);

		acc.set(date, (acc.get(date) || 0) + totalViewTime);
		return acc;
	}, new Map());

	return readingTimeByDay;
};

export const getRecentSummaries = async (uid: string) => {
	// fetch summaries during last week
	const targetDate = subDays(new Date(), 7);
	const summaries = await db.summary.findMany({
		where: {
			userId: uid,
			created_at: {
				gt: targetDate,
			},
		},
		orderBy: {
			created_at: "desc",
		},
	});
	return summaries;
};
