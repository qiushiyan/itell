import { SectionLocation } from "@/types/location";
import { allSectionsSorted } from "./sections";

export const incrementLocation = (location: SectionLocation) => {
	const { module, chapter, section } = location;
	const currentSectionIndex = allSectionsSorted.findIndex(
		(s) =>
			module === s.location.module &&
			chapter === s.location.chapter &&
			section === s.location.section,
	);

	// If current section is the last one or not found, return the same location
	if (
		currentSectionIndex === -1 ||
		currentSectionIndex === allSectionsSorted.length - 1
	) {
		return location;
	}

	// Get the next section
	const nextSection = allSectionsSorted[currentSectionIndex + 1];

	// Check if next section is "Key Terms"
	if (nextSection) {
		// If the next section is "Key Terms"
		// Find the nearest non-"Key Terms" section with non-zero section number
		if (nextSection.title === "Key Terms") {
			const nonKeyTermsSection = allSectionsSorted
				.slice(currentSectionIndex + 2)
				.find((s) => s.location.section !== 0 && s.title !== "Key Terms");

			// If a non-"Key Terms" section is found, return its location
			if (nonKeyTermsSection) {
				return nonKeyTermsSection.location;
			}

			// If no non-"Key Terms" section is found, return the last section's location
			return allSectionsSorted[allSectionsSorted.length - 1].location;
		}

		// if the next section has section number 0 (which means the current section is "Key Terms", which should not happen in practice)

		if (nextSection.location.section === 0) {
			const nonFirstSection = allSectionsSorted[currentSectionIndex + 2];
			if (nonFirstSection) {
				return nonFirstSection.location;
			}

			return nextSection.location;
		}

		// If next section is not "Key Terms" and has a non-zero section number, return its location
		if (nextSection.location.section !== 0) {
			return nextSection.location;
		}
	}

	return location;
};

export const isLocationUnlockedWithoutUser = (location: SectionLocation) => {
	return location.chapter === 1 && location.section === 0;
};

export const isLocationAfter = (a: SectionLocation, b: SectionLocation) => {
	const aIndex = allSectionsSorted.findIndex(
		(s) => s.location.chapter === a.chapter && s.location.section === a.section,
	);
	const bIndex = allSectionsSorted.findIndex(
		(s) => s.location.chapter === b.chapter && s.location.section === b.section,
	);

	return aIndex > bIndex;
};
