import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
