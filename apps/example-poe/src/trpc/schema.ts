import { z } from "zod";

export const ScoreSchema = z.object({
	content: z.number().nullable(),
	wording: z.number().nullable(),
	similarity: z.number(),
	containment: z.number(),
});
export type SummaryScore = z.infer<typeof ScoreSchema>;

export const APIResponseSchema = z
	.object({
		profanity: z.boolean(),
		included_keyphrases: z.array(z.string()),
		suggested_keyphrases: z.array(z.string()),
	})
	.merge(ScoreSchema);
export type SummaryResult = z.infer<typeof APIResponseSchema>;

export const LocationSchema = z.object({
	module: z.number(),
	chapter: z.number(),
	section: z.number().optional(),
});
