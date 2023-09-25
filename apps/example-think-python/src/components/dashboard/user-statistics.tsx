import { User } from "@prisma/client";
import { Suspense } from "react";
import { StudentBadges } from "./student/student-badges";
import { UserBadges } from "./user/user-badges";
import { Badge } from "./badge";
import { ReadingTime } from "./reading-time";
import {
	ReadingTimeChartLevel,
	ReadingTimeChartParams,
} from "@/types/reading-time";
import { UserStatisticsControl } from "./user-statistics-control";

type Props = {
	user: User;
	searchParams?: Record<string, string>;
};

export const UserStatistics = ({ user, searchParams }: Props) => {
	const readingTimeParams = {
		level:
			searchParams && searchParams.reading_time_level in ReadingTimeChartLevel
				? searchParams.reading_time_level
				: ReadingTimeChartLevel.week_1,
	} as ReadingTimeChartParams;

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
			<UserStatisticsControl />
			<Suspense
				key={readingTimeParams.level}
				fallback={<ReadingTime.Skeleton />}
			>
				<ReadingTime uid={user.id} params={readingTimeParams} />
			</Suspense>
		</>
	);
};
