"use client";

import { useLastVisitedSectionUrl } from "@/lib/hooks/use-last-visited-section";
import { cn } from "@itell/core/utils";
import { buttonVariants } from "@itell/ui/server";
import Link from "next/link";

export const BackToTextbook = () => {
	const url = useLastVisitedSectionUrl();

	return (
		<Link
			href={url}
			className={cn(
				buttonVariants({ variant: "outline" }),
				"flex items-center space-x-2 text-base",
			)}
		>
			<span className="font-bold sm:inline-block">Back to textbook</span>
		</Link>
	);
};
