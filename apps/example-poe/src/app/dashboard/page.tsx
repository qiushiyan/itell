import DashboardStudentSummaries from "@/components/dashboard/dashboard-student-summaries";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay, relativeDate } from "@/lib/utils";
import { groupby } from "@itell/core";
import { Warning } from "@itell/ui/server";

export default async function () {
	const session = await getServerAuthSession();
	if (!session) {
		return null;
	}

	const id = session.user.id;
	const user = await db.user.findUnique({
		where: {
			id,
		},
		include: {
			summaries: true,
		},
	});

	if (!user) {
		return <Warning>user not found</Warning>;
	}

	if (user.summaries.length === 0) {
		return <Warning>no summaries found</Warning>;
	}

	// convert date here since they will be passed from server components to client components
	const summariesByModule = groupby(
		user.summaries,
		(summary) => summary.module,
	);

	// .map((s) => ({
	// 	...s,
	// 	created_at: relativeDate(s.created_at),
	// 	updated_at: relativeDate(s.updated_at),
	// })),

	return <DashboardStudentSummaries summariesByModule={summariesByModule} />;
}
