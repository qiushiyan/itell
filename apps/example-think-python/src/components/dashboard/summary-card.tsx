import { Typography } from "@itell/ui/server";
import { Summary } from "@prisma/client";

const SummaryCard = ({ summary }: { summary: Summary }) => {
	return (
		<div className="p-4">
			<div className="line-clamp-5">
				<Typography>{summary.text}</Typography>
			</div>
			<div className="flex justify-end">
				<span className="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ">
					{summary.isPassed ? "✅" : "❌"}
				</span>
			</div>
		</div>
	);
};

export default SummaryCard;
