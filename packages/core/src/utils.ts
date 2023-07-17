import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { addDays, formatRelative } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const keyof = <T extends Object>(obj: T) =>
	Object.keys(obj) as (keyof T)[];

export const groupby = <
	TData extends Object,
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	TTransformer extends (arg: TData) => any = (arg: TData) => TData,
>(
	data: TData[],
	selector: (item: TData) => string | number,
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

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const isObject = (obj: any) => {
	return typeof obj === "object" && obj !== null;
};

export const getDatesBetween = (startDate: Date, endDate: Date) => {
	const dates = [];
	let currentDate = startDate;
	while (currentDate <= endDate) {
		dates.push(currentDate);
		currentDate = addDays(currentDate, 1);
	}
	return dates;
};

export const numOfWords = (str: string): number => {
	if (str.trim() === "") {
		return 0;
	}
	const strWithoutSpace = str.replace(/[\s\t]+/g, " ");
	return strWithoutSpace.split(" ").length;
};

export const relativeDate = (date: Date, relativeTo: Date = new Date()) => {
	return formatRelative(new Date(date), relativeTo);
};
