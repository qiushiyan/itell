export enum ScoreType {
	content = "content",
	wording = "wording",
	similarity = "topicSimilarity",
	containment = "topicBorrowing",
}

export const ScoreThreshold: Record<ScoreType, number> = {
	[ScoreType.content]: 0,
	[ScoreType.wording]: -1,
	[ScoreType.similarity]: 0.5,
	[ScoreType.containment]: 0.6,
};
