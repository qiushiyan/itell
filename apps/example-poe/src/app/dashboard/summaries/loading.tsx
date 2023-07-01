import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import SummaryCreateButton from "@/components/dashboard/summary-create-button";
import { SummaryItem } from "@/components/dashboard/summary-item";
import { DashboardShell } from "@/components/shell";

export default function DashboardLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading="Summary" text="Create and manage summaries.">
				<SummaryCreateButton />
			</DashboardHeader>
			<div className="divide-border-200 divide-y rounded-md border">
				<SummaryItem.Skeleton />
				<SummaryItem.Skeleton />
				<SummaryItem.Skeleton />
				<SummaryItem.Skeleton />
				<SummaryItem.Skeleton />
			</div>
		</DashboardShell>
	);
}
