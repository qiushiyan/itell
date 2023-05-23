import { Chapter } from "contentlayer/generated";

export type Pager = {
	prev: { title: string; href: string; chapter: number } | null;
	next: { title: string; href: string; chapter: number } | null;
};

export const getPagerForChapter = ({
	allChapters,
	index,
}: { allChapters: Chapter[]; index: number }) => {
	const pager: Pager = { prev: null, next: null };

	if (index !== 0) {
		const section = allChapters[index - 1];
		pager.prev = {
			title: section.title,
			href: `/${section.url}`,
			chapter: section.location.chapter,
		};
	}

	if (index !== allChapters.length - 1) {
		const section = allChapters[index + 1];
		pager.next = {
			title: section.title,
			href: `/${section.url}`,
			chapter: section.location.chapter,
		};
	}

	return pager;
};
