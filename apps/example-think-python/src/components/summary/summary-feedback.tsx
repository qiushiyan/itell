import { ScoreType } from "@/lib/constants";
import { SummaryFeedback } from "@/lib/summary";
import { cn, keyof } from "@itell/core";
import { Typography } from "@itell/ui/server";

type Props = {
	feedback: SummaryFeedback;
};

export default function Feedback({ feedback }: Props) {
	return (
		<div
			className={cn(
				"border-l-4 px-4 py-2 rounded-md my-3",
				feedback.isPassed
					? "border-blue-400 bg-blue-50"
					: "border-orange-400 bg-orange-50",
			)}
		>
			<Typography as="div">
				{feedback.prompt}
				<details className="mt-2">
					<summary>Details</summary>
					{keyof(feedback.individualPrompt).map((key) => {
						const individualFeedback = feedback.individualPrompt[key];
						let label: string;
						if (key === ScoreType.similarity) {
							label = "Topic Similarity";
						} else if (key === ScoreType.containment) {
							label = "Topic Borrowing";
						} else {
							label = key;
						}
						return (
							individualFeedback.prompt && (
								<p key={key}>
									<span style={{ textTransform: "capitalize" }}>{`${
										individualFeedback.isPassed ? "✅" : "❌"
									} ${label}: `}</span>
									{feedback.individualPrompt[key].prompt}
								</p>
							)
						);
					})}
				</details>
			</Typography>
		</div>
	);
}
