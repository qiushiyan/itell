import { Location } from "@/types/location";

export const parseLocation = (
	x: string,
	defaultVal: number | undefined = undefined,
) => (x ? parseInt(x.split("-")[1]) : defaultVal);

export const getLocationFromFlattenedPath = (
	path: string,
): Partial<Location> => {
	const slugSplit = path.substring(1).split("/");
	const [chapter, section] = slugSplit;
	return {
		chapter: parseLocation(chapter),
	};
};
