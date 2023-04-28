import { z } from "zod";
import { ZLocation, protecetdProcedure, router } from "../utils";

const NoteRouter = router({
	getByLocation: protecetdProcedure
		.input(z.object({ location: ZLocation }))
		.query(async ({ ctx, input }) => {
			const { id } = ctx.user;
			const res = await ctx.prisma.note.findMany({
				where: {
					user_id: id,
					module: input.location.module,
					chapter: input.location.chapter,
					section: input.location.section,
				},
			});
			return res;
		}),

	getAll: protecetdProcedure.query(async ({ ctx }) => {
		const { id } = ctx.user;
		return await ctx.prisma.note.findMany({
			where: {
				user_id: id,
			},
		});
	}),

	create: protecetdProcedure
		.input(
			z.object({
				y: z.number(),
				noteText: z.string(),
				highlightedText: z.string(),
				location: ZLocation,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id } = ctx.user;
			return await ctx.prisma.note.create({
				data: {
					noteText: input.noteText,
					highlightedText: input.highlightedText,
					y: input.y,
					module: input.location.module,
					chapter: input.location.chapter,
					section: input.location.section || 0,
					user_id: id,
				},
			});
		}),

	updateContent: protecetdProcedure
		.input(
			z.object({
				id: z.string(),
				noteText: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.note.update({
				where: {
					id: input.id,
				},
				data: {
					noteText: input.noteText,
				},
			});
		}),

	updateColor: protecetdProcedure
		.input(
			z.object({
				id: z.string(),
				color: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.note.update({
				where: {
					id: input.id,
				},
				data: {
					color: input.color,
				},
			});
		}),

	delete: protecetdProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.note.delete({
				where: {
					id: input.id,
				},
			});
		}),
});

export default NoteRouter;
