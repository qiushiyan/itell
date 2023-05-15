import { Section } from "contentlayer/generated";

export type Pager = {
	prev: { title: string; href: string } | null;
	next: { title: string; href: string } | null;
};

export const getPagerForSection = ({
	allSections,
	index,
}: { allSections: Section[]; index: number }) => {
	const pager: Pager = { prev: null, next: null };

	if (index !== 0) {
		const section = allSections[index - 1];
		pager.prev = { title: section.title, href: `/${section.url}` };
	}

	if (index !== allSections.length - 1) {
		const section = allSections[index + 1];
		pager.next = { title: section.title, href: `/${section.url}` };
	}

	return pager;
};
