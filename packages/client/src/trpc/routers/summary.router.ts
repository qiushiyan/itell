import { procedure, protecetdProcedure, router } from "../utils";
import { z } from "zod";

const ZLocation = z.object({
	module: z.number(),
	section: z.number(),
	chapter: z.number(),
});

const ZScore = z.object({
	content: z.number(),
	wording: z.number(),
	similarity: z.number(),
	contaiment: z.number(),
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
		.query(({ ctx, input }) => {}),

	create: protecetdProcedure
		.input(
			z.object({
				text: z.string(),
				location: ZLocation,
				score: ZScore,
				isPassed: z.boolean(),
			}),
		)
		.mutation(({ ctx, input }) => {
			const { id } = ctx.user;
			return ctx.prisma.summary.create({
				data: {
					text: input.text,
					userId: id,
					module: input.location.module,
					chapter: input.location.chapter,
					section: input.location.section,
					isPassed: input.isPassed,
					content_score: input.score.content,
					wording_score: input.score.wording,
					similarity_score: input.score.similarity,
					containment_score: input.score.contaiment,
				},
			});
		}),
});

export default SummaryRouter;
