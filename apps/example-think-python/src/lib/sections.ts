import { allChapters } from "contentlayer/generated";

export const allChaptersSorted = allChapters
	.slice(0)
	.sort((a, b) => a.location.chapter - b.location.chapter);
