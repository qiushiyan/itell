import { CardSkeleton } from "@/components/card-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/shell";
import { Skeleton } from "@itell/ui/server";

export default function DashboardSettingsLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading="Class" text="Manage class registration" />
			<div>
				<Skeleton className="w-[600px] h-[300px]" />
			</div>
		</DashboardShell>
	);
}
