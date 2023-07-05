import db from "@/lib/db";

export const StudentClassCount = async ({ classId }: { classId: string }) => {
	const numStudents = await db.user.count({
		where: {
			classId,
		},
	});

	return <span>{numStudents}</span>;
};
