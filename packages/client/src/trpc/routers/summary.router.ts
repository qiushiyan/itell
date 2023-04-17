import { env } from "@/env.mjs";
import { procedure, protecetdProcedure, router } from "../utils";
import { z } from "zod";
import { ZScore } from "@/lib/summary";

const ZLocation = z.object({
	module: z.number(),
	section: z.number(),
	chapter: z.number(),
});

const SummaryRouter = router({
	getAllByUser: protecetdProcedure.query(({ ctx }) => {
		const { id } = ctx.user;
		return ctx.prisma.summary.findMany({
			where: {
				userId: id,
			},
		});
	}),

	getScore: protecetdProcedure
		.input(
			z.object({
				text: z.string(),
				location: ZLocation,
			}),
		)
		.output(ZScore)
		.mutation(async ({ input }) => {
			const response = await fetch(`${env.SCORE_API_URL}/score`, {
				method: "POST",
				body: JSON.stringify({
					summary: input.text,
					chapter_index: input.location.chapter,
					section_index: input.location.section,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			return ZScore.parse(data);
		}),

	create: protecetdProcedure
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
					module: input.location.module,
					chapter: input.location.chapter,
					section: input.location.section,
					isPassed: input.isPassed,
					content_score: input.score.content,
					wording_score: input.score.wording,
					similarity_score: input.score.similarity,
					containment_score: input.score.containment,
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
