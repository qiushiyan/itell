import { ILocation } from "@/types/location";
import { Section } from "contentlayer/generated";
import { groupby } from "./utils";
import { SidebarSection } from "@/types/section";

export default async function getModuleSections({
	allSections,
	module,
}: {
	allSections: Section[];
	module: number;
}) {
	const sections: SidebarSection[] = allSections
		.filter((section) => section.location.module === module)
		.map((section) => ({
			id: section._id,
			title: section.title,
			chapter: section.location.chapter,
			section: section.location.section,
			url: section.url,
		}));

	return sections;
}
