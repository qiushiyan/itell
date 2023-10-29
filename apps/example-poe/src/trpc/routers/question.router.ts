import { protectedProcedure, router } from "../utils";
import { z } from "zod";
import { SectionLocationSchema } from "../schema";

const QuestionRouter = router({

	create: protectedProcedure
		.input(
			z.object({
				response: z.string(),
				chapter: z.number(),
				section: z.number(),
				subsection: z.number(),
				score: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id } = ctx.user;
			return await ctx.prisma.constructedResponses.create({
				data: {
					response: input.response,
					chapter: input.chapter,
					section: input.section,
					subsection: input.subsection,
					score : input.score,
					userId: id,
				},
			});
		}),

});

export default QuestionRouter;
