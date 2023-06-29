import db from "../src/lib/db";

const CLASS_ID = "test_class_id";
const TEACHER_EMAIL = "qiushi.yann@gmail.com";
const STUDENT_EMAILS = ["jchoi92@gsu.edu"];

const main = async () => {
	const me = await db.user.findFirst({
		where: {
			email: TEACHER_EMAIL,
		},
	});

	if (me) {
		await db.user.update({
			where: {
				email: TEACHER_EMAIL,
			},
			data: {
				isTeacher: true,
			},
		});

		await db.teacher.upsert({
			where: {
				id: me.id,
			},
			update: {
				isApproved: true,
				classId: CLASS_ID,
			},
			create: {
				id: me.id,
				isApproved: true,
				classId: CLASS_ID,
			},
		});

		await db.user.updateMany({
			where: {
				email: {
					in: STUDENT_EMAILS,
				},
			},
			data: {
				classId: CLASS_ID,
			},
		});
	}
};

main();
