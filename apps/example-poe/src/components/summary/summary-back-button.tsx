"use client";

import { cn } from "@itell/core";
import Link from "next/link";
import { Button } from "../ui-components";
import { ChevronLeft } from "lucide-react";
import { useLastVisitedSectionUrl } from "@/lib/hooks/use-last-visisted-section";

export const SummaryBackButton = () => {
	const lastVisitedSection = useLastVisitedSectionUrl();
	console.log(lastVisitedSection);
	return (
		<Link href={lastVisitedSection || "/dashboard"}>
			<Button variant="ghost">
				<ChevronLeft className="mr-2 h-4 w-4" />
				Back
			</Button>
		</Link>
	);
};
