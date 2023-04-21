import DashboardStudentSummaries from "@/components/dashboard-student-summaries";
import { Warning } from "@/components/mdx";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { delay, groupby, relativeDate } from "@/lib/utils";

export default async function () {
	await delay(1000);
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
