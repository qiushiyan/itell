import { SidebarSection } from "@/types/section";
import { addDays, formatRelative } from "date-fns";

export const getYoutubeLinkFromEmbed = (url: string) => {
	const regex = /embed\/([\w-]+)\?/;
	const match = url.match(regex);

	if (match) {
		return `https://www.youtube.com/watch?v=${match[1]}`;
	}

	return url;
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

export const makeInputKey = (chapter: number) => {
	return `think-python-chapter-${chapter}-summary`;
};

export const makeChapterHref = (chapter: number) => {
	return `/chapter-${chapter}`;
};

export const getDates = (startDate: Date, endDate: Date) => {
	const dates = [];
	let currentDate = startDate;
	while (currentDate <= endDate) {
		dates.push(currentDate);
		currentDate = addDays(currentDate, 1);
	}
	return dates;
};
