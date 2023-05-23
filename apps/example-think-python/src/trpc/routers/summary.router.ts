import { env } from "@/env.mjs";
import { ZLocation, protectedProcedure, router } from "../utils";
import { z } from "zod";
import { ZScore } from "@/lib/summary";

const SummaryRouter = router({
	getAllByUser: protectedProcedure.query(({ ctx }) => {
		const { id } = ctx.user;
		return ctx.prisma.summary.findMany({
			where: {
				userId: id,
			},
		});
	}),

	getScore: protectedProcedure
		.input(
			z.object({
				text: z.string(),
				location: ZLocation,
			}),
		)
		.output(ZScore)
		.mutation(async ({ input }) => {
			const response = await fetch(`${env.SCORE_API_URL}`, {
				method: "POST",
				body: JSON.stringify({
					summary: input.text,
					chapter_index: input.location.chapter,
					section_index: input.location.chapter,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			return ZScore.parse(data);
		}),

	create: protectedProcedure
		.input(
			z.object({
				text: z.string(),
				location: ZLocation,
				score: ZScore,
				isPassed: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id } = ctx.user;
			return await ctx.prisma.summary.create({
				data: {
					text: input.text,
					chapter: input.location.chapter,
					isPassed: input.isPassed,
					contentScore: input.score.content,
					wordingScore: input.score.wording,
					similarityScore: input.score.similarity,
					containmentScore: input.score.containment,
					user: {
						connect: {
							id,
						},
					},
				},
			});
		}),
});

export default SummaryRouter;
