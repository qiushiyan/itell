"use client";

import { Chapter } from "@/types/section";
import { Typography } from "@/components/material-tailwind";
import Balancer from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDownIcon } from "./icons";
import { useLocation } from "@/lib/hooks";
import Link from "next/link";
import { PencilIcon, ArrowUpIcon } from "lucide-react";
import { Disclosure, Transition } from "@headlessui/react";
import { SectionLocation } from "@/types/location";

type ModuleSidebarProps = {
	chapters: Chapter[];
	currentLocation: SectionLocation;
};

export function ModuleSidebar({
	chapters,
	currentLocation,
}: ModuleSidebarProps) {
	const [sectionsVisible, setSectionsVisible] = useState<
		Record<string, boolean>
	>(() => {
		const output = {};
		chapters.forEach((chapter) => {
			output[chapter.chapter] = chapter.chapter === currentLocation.chapter;
		});
		return output;
	});

	return (
		<nav className="sticky top-20 space-y-1">
			{chapters.map((chapter) => (
				<div key={chapter.chapter}>
					<div
						className={cn("relative hover:text-blue-600", {
							"text-blue-600": chapter.chapter === currentLocation.chapter,
						})}
					>
						<a href={`/${chapter.url}`} className="block mb-1">
							<Typography variant="h6" className={cn("m-0 px-2 pr-1", {})}>
								<Balancer>{chapter.title}</Balancer>
							</Typography>
						</a>
						<button
							className="absolute top-1 -left-4"
							onClick={() => {
								setSectionsVisible((prev) => {
									return {
										...prev,
										[chapter.chapter]: !prev[chapter.chapter],
									};
								});
							}}
						>
							{sectionsVisible[chapter.chapter] ? (
								<ChevronDownIcon className="w-5 h-5 transform rotate-180" />
							) : (
								<ChevronDownIcon className="w-5 h-5" />
							)}
						</button>
					</div>

					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
						show={sectionsVisible[chapter.chapter]}
					>
						<ul className="space-y-1">
							{chapter.sections.map((section) => (
								<li
									className={cn(
										"px-2 py-1 transition ease-in-out duration-200 relative rounded-md hover:bg-gray-100",
										{
											"bg-gray-100":
												section.chapter === currentLocation.chapter &&
												section.section === currentLocation.section,
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
					</Transition>
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

const AnchorLink = ({
	text,
	href,
	icon,
}: { text: string; href: string; icon: React.ReactNode }) => {
	return (
		<a
			href={href}
			className="flex gap-1 items-center hover:underline text-gray-800"
		>
			{icon}
			<Typography variant="small" className="mb-0">
				{text}
			</Typography>
		</a>
	);
};

export function TocSidebar({ headings }: TocSidebarProps) {
	return (
		<div className="sticky top-20">
			<Typography variant="small" className="text-gray-800">
				ON THIS PAGE
			</Typography>
			<ul>
				{headings.map((heading) => (
					<li
						key={heading.slug}
						className="font-light tracking-tighter line-clamp-2"
					>
						<a
							data-level={heading.level}
							href={`#${heading.slug}`}
							className={cn("hover:underline inline-flex ", {
								"text-base mb-3": heading.level === "one",
								"text-sm mb-2": heading.level === "two",
								"text-gray-700 text-[0.8rem] mb-1 pl-2":
									heading.level === "three",
							})}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>

			<div className="mt-12 flex flex-col gap-2">
				<AnchorLink
					icon={<PencilIcon className="w-4 h-4" />}
					text="Write a Summary"
					href="#section-summary"
				/>
				<AnchorLink
					icon={<ArrowUpIcon className="w-4 h-4" />}
					text="Back to Top"
					href="#section-title"
				/>
			</div>
		</div>
	);
}
