import { CardSkeleton } from "@/components/card-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/shell";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@itell/ui/server";

export default function DashboardSettingsLoading() {
	return (
		<DashboardShell>
			<DashboardHeader heading="Class" text="Manage class registration" />
			<Card>
				<CardHeader>
					<CardTitle>Your Class</CardTitle>
					<CardDescription>
						where you monitor students' progress and send notifications
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div>
						<div className="flex items-center py-4 justify-between">
							<Skeleton className="rounded-md h-12 w-64" />
							<Skeleton className="rounded-md h-12 w-40 " />
						</div>
						<Skeleton className="rounded-md h-[300px]" />
						<div className="flex items-center justify-end space-x-2 py-4">
							<Skeleton className="rounded-md h-12 w-28" />
							<Skeleton className="rounded-md h-12 w-16" />
						</div>
					</div>
				</CardContent>
			</Card>
		</DashboardShell>
	);
}
