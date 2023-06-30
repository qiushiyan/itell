import { Prisma, Summary } from "@prisma/client";
import db from "./db";
import { format, subDays } from "date-fns";

export const getSummaryStatistics = async (summaries: Summary[]) => {
	const scores = summaries.reduce(
		(acc, summary) => {
			acc.totalWordingScore += summary.wordingScore || 0;
			acc.totalContentScore += summary.contentScore || 0;
			acc.passedNum += summary.isPassed ? 1 : 0;
			return acc;
		},
		{ totalWordingScore: 0, totalContentScore: 0, passedNum: 0 },
	);

	return {
		totalNum: summaries.length,
		passedNum: scores.passedNum,
		avgWordingScore:
			scores.passedNum > 0
				? (scores.totalWordingScore / scores.passedNum).toFixed(2)
				: "NA",
		avgContentScore:
			scores.passedNum > 0
				? (scores.totalContentScore / scores.passedNum).toFixed(2)
				: "NA",
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
