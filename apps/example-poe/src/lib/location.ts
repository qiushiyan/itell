import { SectionLocation } from "@/types/location";
import { allSectionsSorted } from "./sections";

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
