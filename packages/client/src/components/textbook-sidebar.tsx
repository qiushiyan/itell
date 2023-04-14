"use client";

import { Chapter } from "@/types/section";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDownIcon } from "./icons";
import { useLocation } from "@/lib/hooks";

type ModuleSidebarProps = {
	chapters: Chapter[];
};

export function ModuleSidebar({ chapters }: ModuleSidebarProps) {
	const [sectionsCollapsed, setSectionsCollapsed] = useState<
		Record<string, boolean>
	>(() => {
		const output = {};
		chapters.forEach((chapter) => {
			output[chapter.chapter] = false;
		});
		return output;
	});
	const location = useLocation();
	return (
		<nav className="sticky top-20 space-y-1">
			{chapters.map((chapter) => (
				<div key={chapter.chapter}>
					<div
						className={cn("relative hover:text-blue-600", {
							"text-blue-600": chapter.chapter === location.chapter,
						})}
					>
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
							{sectionsCollapsed[chapter.chapter] ? (
								<ChevronDownIcon className="w-5 h-5" />
							) : (
								<ChevronDownIcon className="w-5 h-5 transform rotate-180" />
							)}
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
		</nav>
	);
}

type Heading = {
	level: "one" | "two" | "three";
	text: string | undefined;
	slug: string | undefined;
};
type TocSidebarProps = {
	headings: Heading[];
};

export function TocSidebar({ headings }: TocSidebarProps) {
	return (
		<div className="sticky top-20">
			<Typography variant="small">ON THIS PAGE</Typography>
			<ul className="space-y-2">
				{headings.map((heading) => (
					<li key={heading.slug}>
						<a
							data-level={heading.level}
							href={`#${heading.slug}`}
							className="font-light text-sm hover:underline inline-flex"
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
