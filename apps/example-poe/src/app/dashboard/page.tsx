import { Badge } from "@/components/dashboard/badge";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ReadingTime } from "@/components/dashboard/reading-time";
import { RecentSummaries } from "@/components/dashboard/recent-summaries";
import { StudentBadges } from "@/components/dashboard/student/student-badges";
import { StudentClassCount } from "@/components/dashboard/student/student-class-description";
import { UserStatistics } from "@/components/dashboard/user-statistics";
import { UserBadges } from "@/components/dashboard/user/user-badges";
import { DashboardShell } from "@/components/shell";
import Spinner from "@/components/spinner";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const title = "Learning Statistics";
const description = "Understand your learning journey";

export const metadata: Metadata = {
	title,
	description,
};

export default async function () {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth");
	}

	const dbUser = await db.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!dbUser) {
		return redirect("/auth");
	}

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<div className="space-y-4">
				{dbUser.classId ? (
					<p className="p-2 text-muted-foreground">
						You are enrolled in a class with{" "}
						<Suspense
							fallback={
								<Spinner className="text-muted-foreground w-5 h-5 inline" />
							}
						>
							<StudentClassCount classId={dbUser.classId} />
						</Suspense>{" "}
						other students.
					</p>
				) : (
					<p className="p-2 text-muted-foreground">
						You are not enrolled in any class. Enter your class code in{" "}
						<Link href="/dashboard/settings#enroll" className="underline">
							Settings
						</Link>{" "}
						to enroll in a class.
					</p>
				)}
				<UserStatistics user={dbUser} />
			</div>
		</DashboardShell>
	);
}
