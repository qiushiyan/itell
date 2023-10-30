"use server";

import { Prisma } from "@prisma/client";
import db from "../db";

export const createQuestionAnswer = async (
	input: Prisma.ConstructedResponsesCreateInput,
) => {
	return await db.constructedResponses.create({
		data: input,
	});
};
