import {
	FileTextIcon,
	FlagIcon,
	PencilIcon,
	WholeWordIcon,
} from "lucide-react";
import { Badge } from "../badge";
import { getSummaryStats } from "@/lib/dashboard";

type Props = {
	studentIds: string[];
};

export const TeacherBadges = async ({ studentIds }: Props) => {
	const classSummaryStats = await getSummaryStats({
		where: {
			userId: {
				in: studentIds,
			},
		},
	});

	const classStats = {
		avgTotalCount: classSummaryStats.totalCount / studentIds.length,
		avgPassedCount: classSummaryStats.passedCount / studentIds.length,
		avgWordingScore: classSummaryStats.avgWordingScore,
		avgContentScore: classSummaryStats.avgContentScore,
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Badge
				title="Average Submitted Summaries"
				value={classStats.avgTotalCount}
				icon={<PencilIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Passed Summaries"
				value={classStats.avgPassedCount}
				icon={<FlagIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Content Score"
				value={classStats.avgContentScore}
				icon={<FileTextIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Wording Score"
				value={classStats.avgWordingScore}
				icon={<WholeWordIcon className="w-4 h-4 text-muted-foreground" />}
			/>
		</div>
	);
};

TeacherBadges.Skeleton = () => (
	<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Badge.Skeleton />
		<Badge.Skeleton />
		<Badge.Skeleton />
		<Badge.Skeleton />
	</div>
);
