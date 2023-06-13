import { env } from "@/env.mjs";
import { protectedProcedure, router } from "../utils";
import { z } from "zod";
import {
	LocationSchema,
	SummaryResponseSchema,
	SummaryScoreSchema,
} from "../schema";

const SummaryRouter = router({
	getAllByUser: protectedProcedure.query(({ ctx }) => {
		const { id } = ctx.user;
		return ctx.prisma.summary.findMany({
			where: {
				userId: id,
			},
		});
	}),

	score: protectedProcedure
		.input(
			z.object({
				text: z.string(),
				location: LocationSchema,
			}),
		)
		.mutation(async ({ input }) => {
			const response = await fetch(env.SCORE_API_URL, {
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
			return SummaryResponseSchema.safeParse(data);
		}),

	create: protectedProcedure
		.input(
			z.object({
				text: z.string(),
				location: LocationSchema,
				score: SummaryScoreSchema,
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
					section: input.location.section || 0,
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

	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				text: z.string(),
				score: SummaryScoreSchema,
				isPassed: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.prisma.summary.update({
				where: {
					id: input.id,
				},
				data: {
					text: input.text,
					contentScore: input.score.content,
					wordingScore: input.score.wording,
					similarityScore: input.score.similarity,
					containmentScore: input.score.containment,
					isPassed: input.isPassed,
				},
			});
		}),

	delete: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.summary.delete({
				where: {
					id: input.id,
				},
			});
		}),
});

export default SummaryRouter;
