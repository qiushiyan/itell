import DashboardStudentSummaries from "@/components/dashboard-student-summaries";
import { Warning } from "@/components/mdx";
import { getServerAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { groupby } from "@/lib/utils";

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
			Summary: true,
		},
	});

	if (!user) {
		return <Warning>user not found</Warning>;
	}

	const summariesByModule = groupby(user.Summary, (summary) => summary.module);

	return (
		<div>
			<DashboardStudentSummaries summariesByModule={summariesByModule} />
		</div>
	);
}
