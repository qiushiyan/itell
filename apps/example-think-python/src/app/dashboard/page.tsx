import DashboardStudentSummaries from "@/components/dashboard/dashboard-student-summaries";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay, relativeDate } from "@/lib/utils";
import { groupby } from "@itell/core";

const Warning = ({ children }: { children: React.ReactNode }) => (
	<div className="border-l-4 border-orange-400 bg-orange-50 px-4 py-2">
		<p className="ml-3">{children}</p>
	</div>
);

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
	const summariesByChapter = groupby(
		user.summaries,
		(summary) => summary.chapter,
	);

	// .map((s) => ({
	// 	...s,
	// 	created_at: relativeDate(s.created_at),
	// 	updated_at: relativeDate(s.updated_at),
	// })),

	return <DashboardStudentSummaries summariesByChapter={summariesByChapter} />;
}
