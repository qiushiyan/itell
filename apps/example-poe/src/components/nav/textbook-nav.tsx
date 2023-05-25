"use client";

import { cn, groupby, keyof } from "@itell/core";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLocation } from "@/lib/hooks/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Typography } from "@itell/ui/server";
import React from "react";
import TextbookScrollProgress from "./textbook-scroll-progress";
import { allSectionsSorted } from "@/lib/sections";
import SiteNav from "./site-nav";
import UserAvatar from "../user-avatar";
import ThemeToggle from "../theme/theme-toggle";

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
		<SiteNav>
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<Link href="/" className={cn(navigationMenuTriggerStyle)}>
					<Typography as="span" variant="lead">
						{siteConfig.title}
					</Typography>
				</Link>
				<NavigationMenu className="w-full px-8 lg:px-4 py-2">
					<NavigationMenuList>
						{modules.map((module) => {
							const active = location && location.module === Number(module);
							const firstChapter = moduleChapters[module][0].chapter;
							const moduleUrl = `/module-${module}/chapter-${firstChapter}`;
							return (
								<NavigationMenuItem key={module}>
									<NavigationMenuTrigger
										className={cn({
											"bg-accent": active,
										})}
									>
										<Link href={moduleUrl}>Module {module}</Link>
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
							);
						})}
					</NavigationMenuList>
					<div className="ml-auto flex items-center gap-2">
						<ThemeToggle />
						<UserAvatar />
					</div>
				</NavigationMenu>
			</div>

			{/* mobile navigation */}
			{showProgress && <TextbookScrollProgress />}
		</SiteNav>
	);
}
