import { Badge } from "@/components/dashboard/badge";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ReadingTime } from "@/components/dashboard/reading-time";
import { RecentSummaries } from "@/components/dashboard/recent-summaries";
import { StudentBadges } from "@/components/dashboard/student/student-badges";
import { UserBadges } from "@/components/dashboard/user/user-badges";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { Metadata } from "next";
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

	const isStudent = Boolean(dbUser.classId);

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<div className="container space-y-4 p-8 pt-6 rounded-md border bg-background shadow">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Suspense fallback={<Badge.Skeletons />}>
						{isStudent ? (
							<StudentBadges user={dbUser} />
						) : (
							<UserBadges uid={user.id} />
						)}
					</Suspense>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Suspense fallback={<ReadingTime.Skeleton />}>
						<ReadingTime uid={user.id} />
					</Suspense>
					<Suspense fallback={<RecentSummaries.Skeleton />}>
						<RecentSummaries uid={user.id} />
					</Suspense>
				</div>
			</div>
		</DashboardShell>
	);
}
