import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SummaryCreateButton from "@/components/dashboard/summary-create-button";
import { SummaryList } from "@/components/dashboard/summary-list";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
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

	const userSummaries = await db.summary.findMany({
		where: {
			userId: user.id,
			chapter: chapter ? parseInt(chapter) : undefined,
		},
	});

	if (userSummaries.length === 0) {
		return (
			<DashboardShell>
				<DashboardHeader heading="Summary" text="Create and manage summaries.">
					<SummaryCreateButton />
				</DashboardHeader>
				<p className="p-2">
					You have not made any summary yet. Start with{" "}
					<Link href="/chapter-1" className="underline font-medium">
						Chapter 1
					</Link>
					!
				</p>
			</DashboardShell>
		);
	}

	return (
		<DashboardShell>
			<DashboardHeader heading="Summary" text="Create and manage summaries.">
				<SummaryCreateButton />
			</DashboardHeader>
			<ChapterSelect />
			<SummaryList summaries={userSummaries} />
		</DashboardShell>
	);
}
