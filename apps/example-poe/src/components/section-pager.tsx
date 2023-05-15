import { Pager } from "@/lib/pager";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

type Props = {
	pager: Pager;
};

export default function ({ pager }: Props) {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between pt-5 mt-5 border-t-2">
			{pager.prev && (
				<Link
					href={pager.prev.href}
					className="inline-flex items-center justify-start rounded-lg border border-transparent bg-transparent py-2 px-3 text-center font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:w-full"
				>
					<ChevronLeft />
					<Balancer>{pager.prev.title}</Balancer>
				</Link>
			)}
			{pager?.next && (
				<Link
					href={pager.next.href}
					className="ml-auto inline-flex items-center justify-end rounded-lg border border-transparent bg-transparent py-2 px-3 text-center font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 md:w-full"
				>
					<Balancer>{pager.next.title}</Balancer>
					<ChevronRight className="ml-2 h-4 w-4" />
				</Link>
			)}
		</div>
	);
}
