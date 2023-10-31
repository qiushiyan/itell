import Link from "next/link";
import { Summary } from "@prisma/client";

import { cn, relativeDate } from "@itell/core/utils";
import { Skeleton, buttonVariants } from "@itell/ui/server";
import { CheckCircle, XCircle } from "lucide-react";

interface PostItemProps {
	summary: Summary;
}

export function SummaryItem({ summary }: PostItemProps) {
	return (
		<Link
			href={`/summary/${summary.id}`}
			className={cn(
				buttonVariants({ variant: "ghost", className: "h-fit" }),
				"block p-4",
			)}
		>
			<header className="flex justify-between text-sm text-muted-foreground">
				<p className="font-semibold text-lg leading-relaxed">{`Chapter ${summary.chapter}.${summary.section}`}</p>
				<p>{relativeDate(summary.created_at)}</p>
			</header>
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<p className="line-clamp-2">{summary.text}</p>
					{summary.isPassed ? (
						<CheckCircle className="w-4 h-4 stroke-info" />
					) : (
						<XCircle className="w-4 h-4 stroke-warning" />
					)}
				</div>
			</div>
		</Link>
	);
}

SummaryItem.Skeleton = function PostItemSkeleton() {
	return (
		<div className="p-4">
			<div className="space-y-3">
				<Skeleton className="h-5 w-2/5" />
				<Skeleton className="h-4 w-4/5" />
			</div>
		</div>
	);
};
