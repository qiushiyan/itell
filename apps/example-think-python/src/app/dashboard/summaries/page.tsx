import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SummaryCreateButton from "@/components/dashboard/summary-create-button";
import { SummaryList } from "@/components/dashboard/summary-list";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { ChapterSelect } from "@/components/dashboard/summaries/chapter-select";

type PageProps = {
	searchParams: {
		chapter?: string;
	};
};

export default async function ({ searchParams }: PageProps) {
	const { chapter } = searchParams;
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}

	const queryChapter = chapter ? parseInt(chapter) : undefined;
	const userSummaries = await db.summary.findMany({
		where: {
			userId: user.id,
			chapter: queryChapter,
		},
		orderBy: {
			created_at: "desc",
		},
	});

	return (
		<DashboardShell>
			<DashboardHeader heading="Summary" text="Create and manage summaries.">
				<SummaryCreateButton />
			</DashboardHeader>
			<ChapterSelect defaultChapter={queryChapter} />
			{userSummaries.length === 0 ? (
				<p className="p-2 text-muted-foreground text-sm">
					There is no summary for Chapter {searchParams.chapter}.
				</p>
			) : (
				<SummaryList summaries={userSummaries} />
			)}
		</DashboardShell>
	);
}
