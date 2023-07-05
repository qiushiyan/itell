import { Chapter } from "contentlayer/generated";
import { allChaptersSorted } from "./chapters";

export type Pager = {
	prev: { title: string; href: string; chapter: number } | null;
	next: { title: string; href: string; chapter: number } | null;
};

export const getPagerForChapter = ({ index }: { index: number }) => {
	const pager: Pager = { prev: null, next: null };

	if (index !== 0) {
		const chapter = allChaptersSorted[index - 1];
		pager.prev = {
			title: chapter.title,
			href: `/${chapter.url}`,
			chapter: chapter.chapter,
		};
	}

	if (index !== allChaptersSorted.length - 1) {
		const chapter = allChaptersSorted[index + 1];
		pager.next = {
			title: chapter.title,
			href: `/${chapter.url}`,
			chapter: chapter.chapter,
		};
	}

	return pager;
};
