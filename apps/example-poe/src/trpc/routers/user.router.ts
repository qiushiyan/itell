import { allSectionsSorted } from "@/lib/sections";
import { SectionLocationSchema } from "../schema";
import { protectedProcedure, router } from "../utils";
import { z } from "zod";
import { forwardLocation } from "@/lib/location";

export const userRouter = router({
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
