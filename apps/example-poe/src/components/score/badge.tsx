"use client";

import { ScoreType } from "@/lib/constants";
import {
	Feedback,
	containmentFeedback,
	contentFeedback,
	similarityFeedback,
	wordingFeedback,
} from "@/lib/summary";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@itell/ui/client";
import { Badge } from "@itell/ui/server";

type Props = {
	type: ScoreType;
	score: number | null;
};

const config: Record<
	ScoreType,
	{ description: string; feedbackFn: (score: number) => Feedback }
> = {
	[ScoreType.wording]: {
		description: "Summary",
		feedbackFn: wordingFeedback,
	},
	[ScoreType.content]: {
		description: "Content",
		feedbackFn: contentFeedback,
	},
	[ScoreType.containment]: {
		description: "Containment",
		feedbackFn: containmentFeedback,
	},
	[ScoreType.similarity]: {
		description: "Similarity",
		feedbackFn: similarityFeedback,
	},
};

export const ScoreBadge = ({ type, score }: Props) => {
	if (score === null) {
		return null;
	}

	const feedbackFn = config[type].feedbackFn;
	const feedback = feedbackFn(score);
	const description = config[type].description;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					{/* had to add the outer dive for tooltip to work */}
					<div>
						<Badge variant={feedback.isPassed ? "default" : "destructive"}>
							{`${type}: ${score.toFixed(2)}`}
						</Badge>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
