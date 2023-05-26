import { Skeleton } from "@itell/ui/server";

export default function Loading() {
	return (
		<div className="space-y-6">
			<div className="flex max-w-3xl mx-auto items-center justify-between">
				<Skeleton className="h-[38px] w-[90px]" />
				<Skeleton className="h-8 w-8 rounded-full" />
			</div>
			<div className="max-w-2xl mx-auto space-y-6">
				<Skeleton className="h-[50px] w-full" />
				<Skeleton className="h-[30px] w-full" />
				<div className="max-w-2xl mx-auto">
					<Skeleton className="h-[300px] w-full" />
				</div>
				<div className="flex justify-end">
					<Skeleton className="h-[38px] w-[100px]" />
				</div>
			</div>
		</div>
	);
}
