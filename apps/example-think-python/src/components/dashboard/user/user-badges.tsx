import db from "@/lib/db";
import { Badge } from "../badge";
import {
	FileTextIcon,
	FlagIcon,
	PencilIcon,
	WholeWordIcon,
} from "lucide-react";
import { getSummaryStatistics } from "@/lib/dashboard";

export const UserBadges = async ({ uid }: { uid: string }) => {
	const summaryStats = await getSummaryStatistics({
		where: {
			userId: uid,
		},
	});
	return (
		<>
			<Badge
				title="Total Summaries"
				text={summaryStats.summaryCount}
				description={"description"}
				icon={<PencilIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Passed Summaries"
				text={summaryStats.passedCount}
				description={"description"}
				icon={<FlagIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Content Score"
				text={summaryStats.avgContentScore || "NA"}
				description={"description"}
				rounding
				icon={<FileTextIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Wording Score"
				text={summaryStats.avgWordingScore || "NA"}
				description={"description"}
				rounding
				icon={<WholeWordIcon className="w-4 h-4 text-muted-foreground" />}
			/>
		</>
	);
};
