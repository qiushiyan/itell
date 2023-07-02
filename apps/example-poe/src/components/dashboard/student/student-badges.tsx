import db from "@/lib/db";
import { Badge } from "../badge";
import {
	FileTextIcon,
	FlagIcon,
	PencilIcon,
	WholeWordIcon,
} from "lucide-react";
import { User } from "@prisma/client";
import { getSummaryStatistics } from "@/lib/dashboard";

export const StudentBadges = async ({ user }: { user: User }) => {
	const classId = user.classId;
	const students = await db.user.findMany({
		select: {
			id: true,
		},
		where: {
			classId: classId,
		},
	});
	const studentStats = await getSummaryStatistics({
		where: {
			userId: user.id,
		},
	});
	const otherStats = await getSummaryStatistics({
		where: {
			userId: {
				in: students.map((student) => student.id),
				not: user.id,
			},
		},
	});

	const comparisons = {
		summaryCount: studentStats.summaryCount - otherStats.summaryCount,
		passedCount: studentStats.passedCount - otherStats.passedCount,
		avgContentScore:
			studentStats.avgContentScore && otherStats.avgContentScore
				? studentStats.avgContentScore - otherStats.avgContentScore
				: null,
		avgWordingScore:
			studentStats.avgWordingScore && otherStats.avgWordingScore
				? studentStats.avgWordingScore - otherStats.avgWordingScore
				: null,
	};

	return (
		<>
			<Badge
				className={
					comparisons.summaryCount > 0 ? "border-info" : "border-destructive"
				}
				title="Total Summaries"
				text={studentStats.summaryCount}
				description={comparisons.summaryCount}
				comparing
				icon={<PencilIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				className={
					comparisons.passedCount > 0 ? "border-info" : "border-destructive"
				}
				title="Passed Summaries"
				text={studentStats.passedCount}
				description={comparisons.passedCount}
				comparing
				icon={<FlagIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				className={
					comparisons.avgContentScore && comparisons.avgContentScore > 0
						? "border-info"
						: "border-destructive"
				}
				title="Average Content Score"
				text={studentStats.avgContentScore || "NA"}
				description={comparisons.avgContentScore}
				rounding
				comparing
				icon={<FileTextIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				className={
					comparisons.avgWordingScore && comparisons.avgWordingScore > 0
						? "border-info"
						: "border-destructive"
				}
				title="Average Wording Score"
				text={studentStats.avgWordingScore || "NA"}
				description={comparisons.avgWordingScore}
				rounding
				comparing
				icon={<WholeWordIcon className="w-4 h-4 text-muted-foreground" />}
			/>
		</>
	);
};
