import { Chapter } from "contentlayer/generated";
import { allChaptersSorted } from "./chapters";

export type PagerData = {
	prev: { title: string; href: string; chapter: number } | null;
	next: { title: string; href: string; chapter: number } | null;
};

export const getPagerDataForChapter = ({ index }: { index: number }) => {
	const pagerData: PagerData = { prev: null, next: null };

	if (index !== 0) {
		const chapter = allChaptersSorted[index - 1];
		pagerData.prev = {
			title: chapter.title,
			href: `/${chapter.url}`,
			chapter: chapter.chapter,
		};
	}

	if (index !== allChaptersSorted.length - 1) {
		const chapter = allChaptersSorted[index + 1];
		pagerData.next = {
			title: chapter.title,
			href: `/${chapter.url}`,
			chapter: chapter.chapter,
		};
	}

	return pagerData;
};
