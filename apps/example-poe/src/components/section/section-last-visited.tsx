"use client";

import { useLastVisitedSection } from "@/lib/hooks/use-last-visisted-section";
import { SectionLocation } from "@/types/location";

export const TrackLastVisitedSection = ({
	location,
}: { location?: SectionLocation }) => {
	useLastVisitedSection(location);

	return null;
};
