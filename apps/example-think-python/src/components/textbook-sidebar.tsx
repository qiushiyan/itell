"use client";

import { Typography } from "@itell/ui/server";
import Balancer from "react-wrap-balancer";
import { cn } from "@itell/core";
import { SectionLocation } from "@/types/location";
import { Chapter } from "contentlayer/generated";

type ChapterSidebarProps = {
	chapters: Chapter[];
	currentLocation: SectionLocation;
};

export function ChapterSidebar({
	chapters,
	currentLocation,
}: ChapterSidebarProps) {
	return (
		<nav>
			<ol className="space-y-2">
				{chapters.map((chapter) => (
					<li
						className={cn(
							"px-2 py-1 transition ease-in-out duration-200 relative rounded-md hover:bg-accent",
							{
								"bg-accent":
									chapter.location.chapter === currentLocation.chapter,
							},
						)}
						key={chapter.url}
					>
						<a href={`/${chapter.url}`}>
							<Typography variant="small" className="m-0 p-0">
								<Balancer>{chapter.title}</Balancer>
							</Typography>
						</a>
					</li>
				))}
			</ol>
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
			<ul className="space-y-1">
				{headings
					.filter(
						(heading) => !heading.text?.startsWith("Please write your summary"),
					)
					.map((heading) => (
						<li
							key={heading.slug}
							className="font-light tracking-tighter line-clamp-2"
						>
							<a
								data-level={heading.level}
								href={`#${heading.slug}`}
								className={cn("hover:underline inline-flex ", {
									"text-base": heading.level === "one",
									"text-sm": heading.level === "two",
									"text-primary/50 text-[0.8rem] pl-2":
										heading.level === "three",
								})}
							>
								{heading.text}
							</a>
						</li>
					))}
			</ul>
		</div>
	);
}
