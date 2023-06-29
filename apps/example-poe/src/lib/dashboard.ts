import { Summary } from "@prisma/client";
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
