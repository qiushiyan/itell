import { User } from "@prisma/client";
import { Suspense } from "react";
import { StudentBadges } from "./student/student-badges";
import { UserBadges } from "./user/user-badges";
import { Badge } from "./badge";
import { ReadingTime } from "./reading-time";
import { RecentSummaries } from "./recent-summaries";

export const UserStatistics = ({ user }: { user: User }) => {
	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<Badge.Skeletons />}>
					{user.classId ? (
						<StudentBadges user={user} />
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
		</>
	);
};
