import { Badge } from "@/components/dashboard/badge";
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

export default function () {
	return (
		<DashboardShell>
			<DashboardHeader heading="Student Details" />
			<Card>
				<CardHeader>
					<CardTitle>
						<div className="flex items-center justify-between">
							<Skeleton className="w-24 h-8" />
							<Skeleton className="w-40 h-8" />
						</div>
					</CardTitle>
					<CardDescription>
						<div className="flex items-center justify-between">
							<Skeleton className="w-40 h-8" />
							<Skeleton className="w-64 h-8" />
						</div>
						<Skeleton className="w-48 h-8 mt-4" />
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Badge.Skeletons />
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Skeleton className="col-span-4 h-[350px]" />
							<Skeleton className="col-span-3 h-[350px]" />
						</div>
					</div>
				</CardContent>
			</Card>
		</DashboardShell>
	);
}
