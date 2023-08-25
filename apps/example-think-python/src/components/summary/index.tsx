import { Suspense } from "react";
import { SummaryCount } from "./summary-count";
import SummaryDescription from "./summary-description";
import SummaryInput from "./summary-input";

export default async function Summary({ chapter }: { chapter: number }) {
	return (
		<section
			className="flex flex-col lg:flex-row gap-8 mt-10 border-t-2 py-4"
			id="chapter-summary"
		>
			<section className="lg:basis-1/3">
				<SummaryDescription />
			</section>
			<section className="lg:basis-2/3">
				<Suspense fallback={<SummaryCount.Skeleton />}>
					<SummaryCount chapter={chapter} />
				</Suspense>
				<SummaryInput />
			</section>
		</section>
	);
}
