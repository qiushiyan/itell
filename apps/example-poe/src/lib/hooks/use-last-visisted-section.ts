import { SectionLocation } from "@/types/location";
import { useEffect } from "react";
import { useLocalStorage } from "./utils";
import { makeLocationHref } from "../utils";

export const useLastVisitedSection = (location?: SectionLocation) => {
	const [lastVisitedSection, setLastVisitedSection] = useLocalStorage<
		string | undefined
	>("last-visited-section", undefined);

	useEffect(() => {
		if (location) {
			setLastVisitedSection(JSON.stringify(location));
		}
	}, []);

	const url = lastVisitedSection
		? makeLocationHref(JSON.parse(lastVisitedSection) as SectionLocation)
		: undefined;

	return url;
};
