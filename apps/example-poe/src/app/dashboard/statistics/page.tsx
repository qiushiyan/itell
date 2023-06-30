import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Badge } from "@/components/dashboard/statistics/badge";
import { ReadingTime } from "@/components/dashboard/statistics/reading-time";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import { getSummaryStatistics } from "@/lib/dashboard";
import db from "@/lib/db";
import { Skeleton } from "@itell/ui/server";
import {
	ActivityIcon,
	PencilIcon,
	FlagIcon,
	WholeWordIcon,
	FileTextIcon,
} from "lucide-react";
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
		redirect("/auth");
	}

	const userSummaries = await db.summary.findMany({
		where: {
			userId: user.id,
		},
	});

	const { totalNum, passedNum, avgContentScore, avgWordingScore } =
		await getSummaryStatistics(userSummaries);

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<div className="container space-y-4 p-8 pt-6 rounded-md border bg-background shadow">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Badge
						title="Total Summaries"
						text={totalNum}
						description={"description"}
						icon={<PencilIcon className="w-4 h-4 text-muted-foreground" />}
					/>
					<Badge
						title="Passed Summaries"
						text={passedNum}
						description={"description"}
						icon={<FlagIcon className="w-4 h-4 text-muted-foreground" />}
					/>
					<Badge
						title="Average Content Score"
						text={avgContentScore}
						description={"description"}
						icon={<FileTextIcon className="w-4 h-4 text-muted-foreground" />}
					/>
					<Badge
						title="Average Wording Score"
						text={avgWordingScore}
						description={"description"}
						icon={<WholeWordIcon className="w-4 h-4 text-muted-foreground" />}
					/>
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Suspense fallback={<Skeleton className="col-span-4 h-[350px]" />}>
						{/* @ts-ignore */}
						<ReadingTime uid={user.id} />
					</Suspense>
				</div>
			</div>
		</DashboardShell>
	);
}
