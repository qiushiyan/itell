import { Summary } from "@prisma/client";
import { SummaryItem } from "./summary-item";

export const SummaryList = ({ summaries }: { summaries: Summary[] }) => {
	return (
		<div className="p-2">
			<div className="divide-y divide-border rounded-md border">
				{summaries.map((summary) => (
					<SummaryItem summary={summary} key={summary.id} />
				))}
			</div>
		</div>
	);
};
