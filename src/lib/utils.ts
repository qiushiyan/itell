import { ILocation } from "@/types/location";
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

export const groupby = <
	TData extends Object,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	TTransformer extends (arg: TData) => any = (arg: TData) => TData,
>(
	data: TData[],
	selector: (item: TData) => string,
	transformer?: TTransformer,
) =>
	data.reduce(
		(acc, cur) => ({
			...acc,
			[selector(cur)]: (acc[selector(cur)] ?? []).concat(
				transformer ? transformer(cur) : cur,
			),
		}),
		{} as Record<string, ReturnType<TTransformer>[]>,
	);

const getSingleLocation = (s: string | undefined) => {
	if (!s) return undefined;
	const [_, number] = s.split("-");
	return number ? Number(number) : undefined;
};
export const getLocationFromPathname = (path: string): Partial<ILocation> => {
	const pathname = path.split("/");

	const module = getSingleLocation(pathname[1]);
	const chapter = getSingleLocation(pathname[2]);
	const section = getSingleLocation(pathname[3]);
	return { module, chapter, section };
};
