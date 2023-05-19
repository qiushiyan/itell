"use client";

import { useEffect, useState } from "react";
import { cn, groupby, keyof } from "@itell/core";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLocation } from "@/lib/hooks";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui-components";
import { Typography } from "@itell/ui/server";
import React from "react";
import TextbookScrollProgress from "./textbook-scroll-progress";
import { allSectionsSorted } from "@/lib/sections";

type Props = {
	showProgress?: boolean;
};

const moduleChapters = groupby(
	allSectionsSorted.filter((section) => section.location.section === 0),
	(section) => section.location.module,
	(section) => ({
		title: section.title,
		chapter: section.location.chapter,
		url: `/module-${section.location.module}/chapter-${section.location.chapter}`,
	}),
);
const modules = keyof(moduleChapters);
const navigationMenuTriggerStyle =
	"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10 py-2 px-4 group w-max";
const ChapterItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ChapterItem.displayName = "ChapterItem";

export default function TextbookNavbar({ showProgress = false }: Props) {
	const location = useLocation();

	return (
		<header
			className={cn("sticky top-0 z-40 w-full bg-background shadow-md", {
				"border-b": !showProgress,
			})}
		>
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<Link
					href="/"
					className={cn(navigationMenuTriggerStyle, "text-primary-foreground")}
				>
					<Typography as="span" variant="lead">
						{siteConfig.title}
					</Typography>
				</Link>
				<NavigationMenu className="textbook-navbar w-full px-8 lg:px-4 py-2 bg-white border border-white/80">
					<NavigationMenuList>
						{modules.map((module) => (
							<NavigationMenuItem key={module}>
								<NavigationMenuTrigger>Module {module}</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[750px] ">
										{moduleChapters[module].map((chapter) => (
											<ChapterItem
												key={chapter.title}
												title={`Chapter ${chapter.chapter}`}
												href={chapter.url}
											>
												{chapter.title}
											</ChapterItem>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			</div>

			{/* mobile navigation */}
			{showProgress && <TextbookScrollProgress />}
		</header>
	);
}
