import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import DashboardStudentSummaries from "@/components/dashboard/dashboard-student-summaries";
import DashboardSummaryHeader from "@/components/dashboard/dashboard-summary-header";
import SummaryCreateButton from "@/components/dashboard/summary-create-button";
import SummaryList from "@/components/dashboard/summary-list";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser, getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay, relativeDate } from "@/lib/utils";
import { groupby } from "@itell/core";
import { Warning } from "@itell/ui/server";
import { notFound, redirect } from "next/navigation";

export default async function () {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}

	const id = user.id;
	const userSummaries = await db.user.findUnique({
		where: {
			id,
		},
		include: {
			summaries: true,
		},
	});

	if (!userSummaries) {
		return notFound();
	}

	// // convert date here since they will be passed from server components to client components
	const summariesByModule = groupby(
		userSummaries.summaries,
		(summary) => summary.module,
	);

	return (
		<DashboardShell>
			<DashboardSummaryHeader />
			<SummaryList summariesByModule={summariesByModule} />
		</DashboardShell>
	);
}
