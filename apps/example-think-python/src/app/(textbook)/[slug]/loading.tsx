import { Skeleton } from "@itell/ui/server";
import { BookmarkIcon } from "lucide-react";

export default async function () {
	return (
		<>
			<section className="relative col-span-12 md:col-span-10 lg:col-span-8 space-y-4">
				<div className="flex items-center justify-center">
					<Skeleton className="w-80 h-12" />
				</div>

				{Array.from({ length: 10 }).map(() => (
					<Skeleton className="w-full h-28 mb-4" />
				))}
			</section>

			<aside className="toc-sidebar col-span-2 relative">
				<p className="font-medium text-sm flex items-center">
					<span>ON THIS PAGE</span>
					<BookmarkIcon className="ml-2 w-4 h-4" />
				</p>
				<ul className="mt-2 space-y-2">
					{Array.from({ length: 5 }).map(() => (
						<Skeleton className="w-32 h-7" />
					))}
				</ul>
			</aside>
		</>
	);
}
