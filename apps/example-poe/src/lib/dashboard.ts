import { Prisma, Summary } from "@prisma/client";
import db from "./db";

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
	// fetch reading time from a week ago
	const weekAgo = new Date();
	weekAgo.setDate(weekAgo.getDate() - 7);
	const targetDate = weekAgo.toISOString();
	const data = await db.focusTime.findMany({
		where: {
			userId: uid,
			created_at: {
				gte: targetDate,
			},
		},
	});

	const dateOptions = { month: "short", day: "numeric" } as const;
	const readingTimeByDay = data.reduce((acc, entry) => {
		const date = new Date(entry.created_at)
			.toLocaleTimeString("en-GB", dateOptions)
			.split(",")[0] as string;
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
