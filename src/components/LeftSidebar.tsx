"use client";

import { ILocation } from "@/types/location";
import { Chapter, SidebarSection } from "@/types/section";
import { Menu, Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { cn, getLocationFromPathname, groupby } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "./icons";

type Props = {
	chapters: Chapter[];
};

export default function LeftSidebar({ chapters }: Props) {
	const pathname = usePathname();
	const [sectionsCollapsed, setSectionsCollapsed] = useState<
		Record<string, boolean>
	>(() => {
		const output = {};
		chapters.forEach((chapter) => {
			output[chapter.chapter] = false;
		});
		return output;
	});
	const [location, setLocation] = useState<Partial<ILocation>>({
		module: undefined,
		chapter: undefined,
		section: undefined,
	});

	useEffect(() => {
		if (pathname) {
			setLocation(getLocationFromPathname(pathname));
		}
	}, [pathname]);

	return (
		<nav className="sticky top-20">
			{chapters.map((chapter) => (
				<div key={chapter.chapter}>
					<div className={cn("relative hover:text-blue-600")}>
						<a href={`/${chapter.url}`} className="block mb-1 ">
							<Typography variant="h6" className={cn("m-0 px-2 pr-1", {})}>
								<Balancer>{chapter.title}</Balancer>
							</Typography>
						</a>
						<button
							className="absolute top-1 -left-4"
							onClick={() => {
								setSectionsCollapsed((prev) => {
									return {
										...prev,
										[chapter.chapter]: !prev[chapter.chapter],
									};
								});
							}}
						>
							<ChevronDownIcon className="w-5 h-5" />
						</button>
					</div>

					{!sectionsCollapsed[chapter.chapter] && (
						<ul className="space-y-1">
							{chapter.sections.map((section) => (
								<li
									className={cn(
										"px-2 py-2 transition ease-in-out duration-200 relative rounded-md hover:bg-gray-100",
										{
											"bg-gray-100":
												section.chapter === location.chapter &&
												section.section === location.section,
										},
									)}
									key={section.url}
								>
									<a href={`/${section.url}`}>
										<Typography variant="small" className="m-0 p-0">
											<Balancer>{section.title}</Balancer>
										</Typography>
									</a>
								</li>
							))}
						</ul>
					)}
				</div>
			))}
			{/* <ul>
				{moduleSections.map((section) => {
					return (
						<li
							className={cn(
								"pl-2 py-2 transition ease-in-out duration-200 relative",
								{
									"rounded-md  hover:bg-gray-100 hover:shadow-md":
										section.section !== undefined,
									"hover:text-blue-600": section.section === undefined,
									"text-blue-600":
										section.section === undefined &&
										section.chapter === location.chapter,
									"bg-gray-100":
										section.chapter === location.chapter &&
										section.section === location.section &&
										section.section !== undefined,
								},
							)}
							key={section.url}
						>
							<a href={`/${section.url}`}>
								<Typography
									variant={section.section === undefined ? "h6" : "small"}
									className={"m-0 p-0"}
								>
									<Balancer>
										{section.section
											? section.title
											: `Chapter ${section.chapter}: ${section.title}`}
									</Balancer>
								</Typography>
							</a>
							{section.section === undefined && (
								<button className="absolute top-[9px] right-0">
									<ChevronDownIcon />
								</button>
							)}
						</li>
					);
				})}
			</ul> */}
		</nav>
	);
}
