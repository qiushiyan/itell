import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@itell/ui/server";
import { StudentsTable } from "./students-table";
import db from "@/lib/db";
import { StudentData, columns } from "./students-columns";

export const TeacherClass = async ({ classId }: { classId: string }) => {
	const students = await db.user.findMany({
		where: {
			classId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			chapter: true,
			section: true,
			created_at: true,
			_count: {
				select: {
					summaries: true,
				},
			},
		},
	});

	const studentData: StudentData[] = students.map((s) => ({
		id: s.id,
		name: s.name,
		email: s.email,
		created_at: s.created_at,
		progress: `${s.chapter}.${s.section}`,
		summaryCounts: s._count.summaries,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Class</CardTitle>
				<CardDescription>
					where you monitor students' progress and send notifications
				</CardDescription>
			</CardHeader>
			<CardContent>
				<StudentsTable columns={columns} data={studentData} />
			</CardContent>
		</Card>
	);
};
