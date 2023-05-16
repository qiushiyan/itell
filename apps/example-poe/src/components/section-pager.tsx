import { Pager } from "@/lib/pager";
import { cn } from "@itell/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

type Props = {
	pager: Pager;
};

const PagerLink = ({
	pagerItem,
	prev,
	showChapter,
}: { pagerItem: Pager["prev"]; prev: boolean; showChapter: boolean }) => {
	return (
		pagerItem && (
			<Link
				href={pagerItem.href}
				className={cn(
					"inline-flex items-center rounded-md gap-2 border border-transparent bg-transparent py-2 px-3 text-center font-medium  hover:border-gray-200 hover:bg-gray-100 focus:z-10 focus:outline-none md:w-full",
					{ "justify-end": !prev },
				)}
			>
				{prev && <ChevronLeft />}
				{showChapter ? (
					<Balancer as="div">
						<p className="mb-0 text-sm font-light tracking-tight">{`Chapter ${pagerItem.chapter}`}</p>
						{pagerItem.title}
					</Balancer>
				) : (
					<Balancer>{pagerItem.title}</Balancer>
				)}
				{!prev && <ChevronRight />}
			</Link>
		)
	);
};

export default function ({ pager }: Props) {
	const showChapter = pager.prev?.chapter !== pager.next?.chapter;

	return (
		<div className="flex flex-col md:flex-row items-stretch justify-between pt-5 mt-5 border-t-2">
			<PagerLink pagerItem={pager.prev} prev={true} showChapter={showChapter} />
			<PagerLink
				pagerItem={pager.next}
				prev={false}
				showChapter={showChapter}
			/>
		</div>
	);
}
