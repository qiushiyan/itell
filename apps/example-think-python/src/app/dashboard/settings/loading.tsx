import { CardSkeleton } from "@/components/card-skeleton";
import { Separator } from "@/components/client-components";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/shell";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Skeleton,
} from "@itell/ui/server";

export default function DashboardSettingsLoading() {
	return (
		<DashboardShell>
			<DashboardHeader
				heading="Settings"
				text="Manage account and website settings."
			/>
			<Card>
				<CardHeader className="gap-2">
					<CardTitle>Edit your settings</CardTitle>
					<CardDescription>configure the textbook to your need</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-8 w-[120px]" />
					<Skeleton className="h-16 w-[400px]" />
					<Separator />
					<Skeleton className="h-8 w-[120px]" />
					<Skeleton className="h-16 w-[400px]" />
				</CardContent>
			</Card>
		</DashboardShell>
	);
}
