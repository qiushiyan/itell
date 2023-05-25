import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import DashboardSummaryHeader from "@/components/dashboard/dashboard-summary-header";
import SummaryCreateButton from "@/components/dashboard/summary-create-button";
import { SummaryItem } from "@/components/dashboard/summary-item";
import { DashboardShell } from "@/components/shell";

export default function DashboardLoading() {
	return (
		<DashboardShell>
			<DashboardSummaryHeader />
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
