"use server";

import { Prisma } from "@prisma/client";
import db from "./db";
import { cookies } from "next/headers";
import { isLastChapter } from "./chapters";

export const deleteSummary = async (id: string) => {
	return await db.summary.delete({
		where: {
			id,
		},
	});
};

export const createSummary = async (input: Prisma.SummaryCreateInput) => {
	return await db.summary.create({
		data: input,
	});
};

export const updateSummary = async (
	id: string,
	data: Prisma.SummaryUpdateInput,
) => {
	return await db.summary.update({
		where: {
			id,
		},
		data,
	});
};

export const deleteNote = async (id: string) => {
	return await db.note.delete({
		where: {
			id,
		},
	});
};

export const createConstructedResponse = async (
	input: Prisma.ConstructedResponseCreateInput,
) => {
	return await db.constructedResponse.create({
		data: input,
	});
};

export const createConstructedResponseFeedback = async (
	input: Prisma.ConstructedResponseFeedbackCreateInput,
) => {
	return await db.constructedResponseFeedback.create({
		data: input,
	});
};

export const updateUserClassId = async ({
	userId,
	classId,
}: {
	userId: string;
	classId: string | null;
}) => {
	return await db.user.update({
		where: {
			id: userId,
		},
		data: {
			classId,
		},
	});
};

export const incrementUserChapter = async (userId: string, chapter: number) => {
	const user = await db.user.findUnique({ where: { id: userId } });
	if (user) {
		const userChapter = user.chapter;
		// only update if the call is from the user's current chapter
		if (userChapter === chapter && !isLastChapter(chapter)) {
			return await db.user.update({
				where: {
					id: userId,
				},
				data: {
					chapter: {
						increment: 1,
					},
				},
			});
		}
	}
};

export const getUserChapterSummaryCount = async (
	userId: string,
	chapter: number,
) => {
	return await db.summary.count({
		where: {
			userId,
			chapter,
		},
	});
};

export const getTeacherWithClassId = async (classId: string | null) => {
	if (!classId) {
		return null;
	}
	const teacher = await db.teacher.findFirst({
		where: {
			classId,
		},
	});

	if (!teacher) {
		return null;
	}

	const user = await db.user.findFirst({
		where: {
			id: teacher.id,
		},
	});

	return user;
};

export const createEvent = async (input: Prisma.EventCreateInput) => {
	return await db.event.create({
		data: input,
	});
};

export const createFocusTime = async (input: Prisma.FocusTimeCreateInput) => {
	return await db.focusTime.create({
		data: input,
	});
};

export const updateUser = async (
	userId: string,
	data: Prisma.UserUpdateInput,
) => {
	return await db.user.update({
		where: {
			id: userId,
		},
		data,
	});
};

export const setClassSettings = (classId: string) => {
	if (classId === "wes_class") {
		cookies().set(
			"class_settings",
			JSON.stringify({
				no_feedback_pages: [1, 2],
			}),
		);
	}
};
