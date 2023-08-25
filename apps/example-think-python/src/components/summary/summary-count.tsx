import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { delay } from "@/lib/utils";
import { cn } from "@itell/core/utils";
import { Skeleton, buttonVariants } from "@itell/ui/server";
import Link from "next/link";

export const SummaryCount = async ({ chapter }: { chapter: number }) => {
	let summaryCount: number | undefined = undefined;
	const user = await getCurrentUser();
	if (user) {
		summaryCount = await db.summary.count({
			where: {
				userId: user.id,
				chapter: chapter,
			},
		});
	}

	if (!summaryCount) {
		return null;
	}

	return (
		<p className="text-sm">
			<Link
				href="/dashboard/summaries"
				className={cn(buttonVariants({ variant: "link" }), "pl-0")}
			>
				You have written{" "}
				{`${summaryCount} ${summaryCount > 1 ? "summaries" : "summary"}`} for
				this chapter.
			</Link>
		</p>
	);
};

SummaryCount.Skeleton = () => <Skeleton className="w-48 h-8" />;
