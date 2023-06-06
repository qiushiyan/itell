import NewSummary from "@/components/dashboard/new-summary";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@itell/core";
import { buttonVariants } from "@itell/ui/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function () {
	const user = await getCurrentUser();
	if (!user) {
		return redirect("/auth");
	}

	return (
		<div className="w-[800px] mx-auto">
			<div className="flex justify-start">
				<Link
					href="/dashboard"
					className={cn(buttonVariants({ variant: "ghost" }))}
				>
					<ChevronLeft className="mr-2 h-4 w-4" />
					Back
				</Link>
			</div>
			<NewSummary />
		</div>
	);
}
