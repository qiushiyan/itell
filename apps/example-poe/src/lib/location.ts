import { Location } from "@/types/location";

export const parseLocation = (
	x: string,
	defaultVal: number | undefined = undefined,
) => (x ? parseInt(x.split("-")[1]) : defaultVal);

export const getLocationFromFlattenedPath = (
	path: string,
): Partial<Location> => {
	const slugSplit = path.substring(1).split("/");
	const [module, chapter, section] = slugSplit;
	return {
		module: parseLocation(module),
		chapter: parseLocation(chapter),
		section: parseLocation(section, 0),
	};
};
