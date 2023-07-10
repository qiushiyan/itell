import { z } from "zod";
import { protectedProcedure, router } from "../utils";
import { getTeacherWithClassId, updateUserWithClassId } from "@/lib/class";
import { getUser } from "@/lib/user";

export const ClassRouter = router({
	getTeacherWithCode: protectedProcedure
		.input(
			z.object({
				code: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await getTeacherWithClassId(input.code);
		}),

	getCurrentClass: protectedProcedure.mutation(async ({ ctx }) => {
		return (await getUser(ctx.user.id))?.classId;
	}),

	joinClass: protectedProcedure
		.input(
			z.object({
				code: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await updateUserWithClassId({
				userId: ctx.user.id,
				classId: input.code,
			});
		}),

	quitClass: protectedProcedure.mutation(async ({ ctx }) => {
		return await updateUserWithClassId({
			userId: ctx.user.id,
			classId: null,
		});
	}),
});
