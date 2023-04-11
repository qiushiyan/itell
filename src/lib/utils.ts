import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const keyof = <T extends Object>(obj: T) =>
	Object.keys(obj) as (keyof T)[];

export const getYoutubeLinkFromEmbed = (url: string) => {
	const regex = /embed\/([\w-]+)\?/;
	const match = url.match(regex);

	if (match) {
		return `https://www.youtube.com/watch?v=${match[1]}`;
	}

	return url;
};

export const groupby = <T extends Object>(
	arr: T[],
	selector: (item: T) => string,
): Record<string, T[]> => {
	return arr.reduce((acc, cur) => {
		const group = selector(cur);
		if (!acc[group]) {
			acc[group] = [];
		}
		acc[group].push(cur);
		return acc;
	}, {} as Record<string, T[]>);
};
