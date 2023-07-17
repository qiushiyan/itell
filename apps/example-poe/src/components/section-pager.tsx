import { Pager } from "@/lib/pager";
import { cn } from "@itell/core/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { buttonVariants } from "@itell/ui/server";

type Props = {
	pager: Pager;
};

const PagerTitle = ({
	pagerItem,
	showChapter,
}: { pagerItem: NonNullable<Pager["prev"]>; showChapter: boolean }) => {
	return showChapter ? (
		<Balancer as="div">
			<p className="mb-0 text-sm font-light tracking-tight">{`Chapter ${pagerItem.chapter}`}</p>
			{pagerItem.title}
		</Balancer>
	) : (
		<Balancer>{pagerItem.title}</Balancer>
	);
};

export default function ({ pager }: Props) {
	const showChapter = pager.prev?.chapter !== pager.next?.chapter;

	return (
		<div className="flex flex-row items-center justify-between mt-5">
			{pager?.prev && (
				<Link
					href={pager.prev.href}
					className={cn(buttonVariants({ variant: "ghost" }), "h-fit max-w-sm")}
				>
					<ChevronLeft className="mr-2 h-4 w-4" />
					<PagerTitle pagerItem={pager.prev} showChapter={showChapter} />
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
					<PagerTitle pagerItem={pager.next} showChapter={showChapter} />
					<ChevronRight className="ml-2 h-4 w-4" />
				</Link>
			)}
		</div>
	);
}
