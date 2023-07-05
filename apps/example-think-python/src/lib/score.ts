import { env } from "@/env.mjs";
import { SummaryResponseSchema } from "@/trpc/schema";

export const getScore = async ({
	input,
	chapter,
}: { input: string; chapter: number }) => {
	const response = await fetch(env.NEXT_PUBLIC_SCORE_API_URL, {
		method: "POST",
		body: JSON.stringify({
			summary: input,
			chapter_index: chapter,
			section_index: 1,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();
	return SummaryResponseSchema.safeParse(data);
};
