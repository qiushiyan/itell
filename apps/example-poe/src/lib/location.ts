import { Location, SectionLocation } from "@/types/location";
import { allSectionsSorted } from "./sections";

export const parseLocation = (
	x: string,
	defaultVal: number | undefined = undefined,
) => (x ? parseInt(x.split("-")[1]) : defaultVal);

export const getLocationFromFlattenedPath = (
	path: string,
): Partial<Location> => {
	const slugSplit = path.substring(1).split("/");
	const [_, module, chapter, section] = slugSplit;
	return {
		module: parseLocation(module),
		chapter: parseLocation(chapter),
		section: parseLocation(section, 0),
	};
};

export const forwardLocation = (location: SectionLocation): SectionLocation => {
	const { module, chapter, section } = location;

	const currentSectionIndex = allSectionsSorted.findIndex(
		(s) =>
			module === s.location.module &&
			s.location.chapter === chapter &&
			s.location.section === section,
	);

	if (
		currentSectionIndex === -1 ||
		currentSectionIndex === allSectionsSorted.length - 1
	) {
		return location;
	}
	let nextSection = allSectionsSorted.at(currentSectionIndex + 1);
	if (nextSection && nextSection.title === "Key Terms") {
		nextSection = allSectionsSorted.at(currentSectionIndex + 2) || nextSection;
	} else {
		return location;
	}

	const {
		module: nextModule,
		chapter: nextChapter,
		section: nextSectionNumber,
	} = nextSection.location;

	return {
		module: nextModule,
		chapter: nextChapter,
		section: nextSectionNumber,
	};
};
