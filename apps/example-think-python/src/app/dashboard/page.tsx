import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UserStatistics } from "@/components/dashboard/user-statistics";
import { DashboardShell } from "@/components/shell";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const title = "Learning Statistics";
const description = "Understand your learning journey";

export const metadata: Metadata = {
	title,
	description,
};

export default async function () {
	const user = await getCurrentUser();

	if (!user) {
		return redirect("/auth");
	}

	const dbUser = await db.user.findUnique({
		where: {
			id: user.id,
		},
	});

	if (!dbUser) {
		return redirect("/auth");
	}

	return (
		<DashboardShell>
			<DashboardHeader heading={title} text={description} />
			<div className="space-y-4">
				<UserStatistics user={dbUser} />
			</div>
		</DashboardShell>
	);
}
