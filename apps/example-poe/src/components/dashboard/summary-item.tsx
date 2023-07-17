import Link from "next/link";
import { Summary } from "@prisma/client";

import { relativeDate } from "@itell/core/utils";
import { Skeleton } from "@itell/ui/server";
import { CheckCircle, XCircle } from "lucide-react";

interface PostItemProps {
	summary: Summary;
}

export function SummaryItem({ summary }: PostItemProps) {
	return (
		<div className="p-4">
			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<Link
						href={`/summary/${summary.id}`}
						className="font-semibold hover:underline"
					>
						{summary.text.slice(0, 50)}
					</Link>
					{summary.isPassed ? (
						<CheckCircle className="w-4 h-4 stroke-info" />
					) : (
						<XCircle className="w-4 h-4 stroke-warning" />
					)}
				</div>

				<footer className="flex justify-between text-sm text-muted-foreground">
					<p>{`Chapter ${summary.chapter}.${summary.section}`}</p>
					<p>{relativeDate(summary.created_at)}</p>
				</footer>
			</div>
		</div>
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
