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
import { getClassStudentStats } from "@/lib/dashboard";
import { Suspense } from "react";
import { TeacherBadges } from "./teacher-badges";

export const TeacherClass = async ({ classId }: { classId: string }) => {
	const students = await getClassStudentStats(classId);

	const studentData: StudentData[] = students.map((s) => ({
		id: s.id,
		name: s.name,
		email: s.email,
		created_at: s.created_at,
		progress: `Chapter ${s.chapter}`,
		summaryCounts: s._count.summaries,
	}));

	return (
		<Card>
			<CardHeader>
				<CardTitle>Your Class</CardTitle>
				<CardDescription>
					<p>
						{`You have ${students.length} ${
							students.length > 1 ? "students" : "student"
						} under class code `}
						<span className="font-medium">{classId}</span>
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<h3 className="mb-4 text-lg font-medium">Average Class Statistics</h3>

				<Suspense fallback={<TeacherBadges.Skeleton />}>
					<TeacherBadges studentIds={students.map((student) => student.id)} />
				</Suspense>

				<h3 className="mb-4 text-lg font-medium">All Students</h3>

				<StudentsTable columns={columns} data={studentData} />{" "}
			</CardContent>
		</Card>
	);
};
