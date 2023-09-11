import db from "./db";

export const getTeacherWithClassId = async (
	classId: string | null | undefined,
) => {
	if (!classId) {
		return null;
	}

	// there could be multiple teachers for a class?
	// but for now, we'll just assume there's one
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

export const updateUserWithClassId = async ({
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
