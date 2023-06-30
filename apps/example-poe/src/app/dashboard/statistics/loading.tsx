import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/shell";
import { Skeleton } from "@itell/ui/server";

export default function () {
	return (
		<DashboardShell>
			<DashboardHeader
				heading="Learning Statistics"
				text="Understand your learning journey"
			/>
			<div className="container space-y-4 p-8 pt-6 rounded-md border bg-background shadow">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{[1, 2, 3, 4].map(() => (
						<Skeleton className="h-40" />
					))}
				</div>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Skeleton className="col-span-4 h-[350px]" />
					<Skeleton className="col-span-3 h-[350px]" />
				</div>
			</div>
		</DashboardShell>
	);
}
