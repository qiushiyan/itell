import { Badge } from "../badge";
import {
	FileTextIcon,
	FlagIcon,
	PencilIcon,
	WholeWordIcon,
} from "lucide-react";
import { getSummaryStats } from "@/lib/dashboard";

export const UserBadges = async ({ uid }: { uid: string }) => {
	const summaryStats = await getSummaryStats({
		where: {
			userId: uid,
		},
	});
	return (
		<>
			<Badge
				title="Total Summaries"
				value={summaryStats.totalCount}
				icon={<PencilIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Passed Summaries"
				value={summaryStats.passedCount}
				icon={<FlagIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Content Score"
				value={summaryStats.avgContentScore}
				icon={<FileTextIcon className="w-4 h-4 text-muted-foreground" />}
			/>
			<Badge
				title="Average Wording Score"
				value={summaryStats.avgWordingScore}
				icon={<WholeWordIcon className="w-4 h-4 text-muted-foreground" />}
			/>
		</>
	);
};
