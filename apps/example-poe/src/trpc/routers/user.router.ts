import { allSectionsSorted } from "@/lib/sections";
import { SectionLocationSchema } from "../schema";
import { protectedProcedure, router } from "../utils";
import { z } from "zod";
import { forwardLocation } from "@/lib/location";

export const userRouter = router({
	getLocation: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.user.findUnique({
			select: {
				module: true,
				chapter: true,
				section: true,
			},
			where: {
				id: ctx.user.id,
			},
		});
	}),
	forwardSection: protectedProcedure
		.input(SectionLocationSchema)
		.mutation(async ({ ctx, input }) => {
			const { id } = ctx.user;
			const newLocation = forwardLocation(input);
			const {
				module: nextModule,
				chapter: nextChapter,
				section: nextSectionNumber,
			} = newLocation;
			return await ctx.prisma.user.update({
				where: {
					id,
				},
				data: {
					module: nextModule,
					chapter: nextChapter,
					section: nextSectionNumber,
				},
			});
		}),
});
