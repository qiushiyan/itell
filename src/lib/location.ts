import { ILocation } from "@/types/location";

export const parseLocation = (x: string) =>
	x ? parseInt(x.split("-")[1]) : undefined;

export const getLocationFromFlattenedPath = (
	path: string,
): Partial<ILocation> => {
	const slugSplit = path.substring(1).split("/");
	const [module, chapter, section] = slugSplit;
	return {
		module: parseLocation(module),
		chapter: parseLocation(chapter),
		section: parseLocation(section),
	};
};
