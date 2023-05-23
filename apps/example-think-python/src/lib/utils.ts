import { Location } from "@/types/location";
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

	const chapter = getSingleLocation(pathname[1]);
	return { chapter };
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const relativeDate = (date: Date, relativeTo: Date = new Date()) => {
	return formatRelative(new Date(date), relativeTo);
};
