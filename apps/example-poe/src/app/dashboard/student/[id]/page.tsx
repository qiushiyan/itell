import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Settings } from "@/components/dashboard/settings";
import { StudentProfile } from "@/components/dashboard/student/student-profile";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getUserWithClass, getUserTeacherStatus } from "@/lib/dashboard";
import db from "@/lib/db";
import { Errorbox } from "@itell/ui/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Student Details";
const description = "Check on individual student";

export const metadata: Metadata = {
	title,
	description,
};

interface PageProps {
	params: {
		id: string;
	};
}

export default async function ({ params }: PageProps) {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth");
	}

	const teacher = await getUserTeacherStatus(user.id);

	if (!teacher) {
		return (
			<DashboardShell>
				<DashboardHeader heading={title} />
				<Errorbox>You have to be a teacher to view this page.</Errorbox>
			</DashboardShell>
		);
	}

	const student = await getUserWithClass({
		userId: params.id,
		classId: teacher.classId,
	});
	if (!student) {
		return (
			<DashboardShell>
				<DashboardHeader heading={title} />
				<Errorbox>The student does not exist in your class</Errorbox>
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			<DashboardHeader heading={title} />
			<StudentProfile student={student} />
		</DashboardShell>
	);
}
