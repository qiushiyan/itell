import { Section } from "contentlayer/generated";

export type Pager = {
	prev: { title: string; href: string; chapter: number } | null;
	next: { title: string; href: string; chapter: number } | null;
};

export const getPagerForSection = ({
	allSections,
	index,
}: { allSections: Section[]; index: number }) => {
	const pager: Pager = { prev: null, next: null };

	allSections.sort((a, b) => {
		if (a.location.module === b.location.module) {
			if (a.location.chapter === b.location.chapter) {
				return a.location.section - b.location.section;
			}
			return a.location.chapter - b.location.chapter;
		}
		return a.location.module - b.location.module;
	});

	if (index !== 0) {
		const section = allSections[index - 1];
		pager.prev = {
			title: section.title,
			href: `/${section.url}`,
			chapter: section.location.chapter,
		};
	}

	if (index !== allSections.length - 1) {
		const section = allSections[index + 1];
		pager.next = {
			title: section.title,
			href: `/${section.url}`,
			chapter: section.location.chapter,
		};
	}

	return pager;
};
