import { Location } from "@/types/location";
import { SidebarSection } from "@/types/section";
import { formatRelative } from "date-fns";

export const getYoutubeLinkFromEmbed = (url: string) => {
	const regex = /embed\/([\w-]+)\?/;
	const match = url.match(regex);

	if (match) {
		return `https://www.youtube.com/watch?v=${match[1]}`;
	}

	return url;
};

const getSingleLocation = (s: string | undefined) => {
	if (!s) return undefined;
	const [_, number] = s.split("-");
	return number ? Number(number) : undefined;
};
export const getLocationFromPathname = (path: string): Location => {
	const pathname = path.split("/");

	const module = getSingleLocation(pathname[1]);
	const chapter = getSingleLocation(pathname[2]);
	const section = getSingleLocation(pathname[3]);
	return { module, chapter, section };
};

export const sortSections = (sections: SidebarSection[]) => {
	const sectionsSorted = sections.slice(0).sort((a, b) => {
		if (a.chapter === b.chapter) {
			if (!a.section) {
				return -1;
			}
			if (!b.section) {
				return 1;
			}

			return a.section - b.section;
		}
		return a.chapter - b.chapter;
	});

	return sectionsSorted;
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const relativeDate = (date: Date, relativeTo: Date = new Date()) => {
	return formatRelative(new Date(date), relativeTo);
};

export const numOfWords = (str: string): number => {
	if (str.trim() === "") {
		return 0;
	}
	const strWithoutSpace = str.replace(/[\s\t]+/g, " ");
	return strWithoutSpace.split(" ").length;
};

export const makeInputKey = (location: Location) => {
	return `chapter-${location.chapter}-section-${location.section}-summary`;
};

export const makeLocationHref = (location: Location) => {
	return `/module-${location.module}/chapter-${location.chapter}/section-${location.section}`;
};

export const isTextbookPage = (location: Location) => {
	return (
		location.module !== undefined &&
		location.chapter !== undefined &&
		location.section !== undefined
	);
};
