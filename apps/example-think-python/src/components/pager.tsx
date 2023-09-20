import type { PagerData } from "@/lib/pager";
import { cn } from "@itell/core/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { buttonVariants } from "@itell/ui/server";

type Props = {
	data: PagerData;
};

const PagerTitle = ({
	pagerItem,
}: { pagerItem: NonNullable<PagerData["prev"]> }) => {
	return (
		<p className="font-light leading-relaxed">
			<Balancer>{`${pagerItem.chapter}. ${pagerItem.title}`}</Balancer>
		</p>
	);
};

export const Pager = ({ data }: Props) => {
	return (
		<div className="flex flex-row items-center justify-between mt-5">
			{data?.prev && (
				<Link
					href={data.prev.href}
					className={cn(buttonVariants({ variant: "ghost" }), "h-fit max-w-sm")}
				>
					<ChevronLeft className="mr-2 h-4 w-4" />
					<PagerTitle pagerItem={data.prev} />
				</Link>
			)}
			{data?.next && (
				<Link
					href={data.next.href}
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"h-fit max-w-sm ml-auto",
					)}
				>
					<PagerTitle pagerItem={data.next} />
					<ChevronRight className="ml-2 h-4 w-4" />
				</Link>
			)}
		</div>
	);
};
