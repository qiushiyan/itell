import { allSectionsSorted } from "@/lib/sections";
import { makeLocationHref } from "@/lib/utils";

export const CommandMenuConfig = {
	sections: allSectionsSorted.map((s) => {
		return {
			title: `${s.location.chapter}.${s.location.section} ${s.title}`,
			href: makeLocationHref(s.location),
		};
	}),
	tools: [
		{
			title: "Dashboard",
			href: "/dashboard",
			description: "View your learning statistics",
		},
		{
			title: "Summaries",
			href: "/dashboard/summaries",
			description: "Manage your summaries",
		},
		{
			title: "Settings",
			href: "/dashboard/settings",
			description: "Configure personal settings",
		},
		{
			title: "User Guide",
			href: "/guide",
			description: "Learn how to use the website",
		},
	],
};
