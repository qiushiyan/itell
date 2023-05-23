import { Pager } from "@/lib/pager";
import { cn } from "@itell/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Typography, buttonVariants } from "@itell/ui/server";

type Props = {
	pager: Pager;
};

const PagerTitle = ({
	pagerItem,
}: { pagerItem: NonNullable<Pager["prev"]> }) => {
	return (
		<Typography className="mb-0">
			<Balancer>{`${pagerItem.chapter}. ${pagerItem.title}`}</Balancer>
		</Typography>
	);
};

export default function ({ pager }: Props) {
	return (
		<div className="flex flex-row items-center justify-between mt-5">
			{pager?.prev && (
				<Link
					href={pager.prev.href}
					className={cn(buttonVariants({ variant: "ghost" }), "h-fit max-w-sm")}
				>
					<ChevronLeft className="mr-2 h-4 w-4" />
					<PagerTitle pagerItem={pager.prev} />
				</Link>
			)}
			{pager?.next && (
				<Link
					href={pager.next.href}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"h-fit max-w-sm ml-auto",
					)}
				>
					<PagerTitle pagerItem={pager.next} />
					<ChevronRight className="ml-2 h-4 w-4" />
				</Link>
			)}
		</div>
	);
}
