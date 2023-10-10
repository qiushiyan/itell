import { User } from "@prisma/client";
import { Suspense } from "react";
import { StudentBadges } from "./student/student-badges";
import { UserBadges } from "./user/user-badges";
import { Badge } from "./badge";
import { ReadingTime } from "./reading-time";
import {
	ReadingTimeChartLevel,
	ReadingTimeChartParams,
} from "@itell/core/types";
import { UserStatisticsControl } from "./user-statistics-control";

type Props = {
	user: User;
	searchParams?: Record<string, string>;
};

export const UserStatistics = ({ user, searchParams }: Props) => {
	// if searchParams is not passed as prop here, readingTimeParams will always be week 1
	// and switching levels in UserStatisticsControl won't work (although query params are set)
	// future work is to restructure the component hierarchy
	const readingTimeParams = {
		level:
			searchParams && searchParams.reading_time_level in ReadingTimeChartLevel
				? searchParams.reading_time_level
				: ReadingTimeChartLevel.week_1,
	} as ReadingTimeChartParams;

	return (
		<div className="space-y-4">
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<Badge.Skeletons />}>
					{user.classId ? (
						<StudentBadges user={user} />
					) : (
						<UserBadges uid={user.id} />
					)}
				</Suspense>
			</div>
			<UserStatisticsControl />
			<Suspense
				key={readingTimeParams.level}
				fallback={<ReadingTime.Skeleton />}
			>
				<ReadingTime uid={user.id} params={readingTimeParams} />
			</Suspense>
		</div>
	);
};
