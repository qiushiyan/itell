import { cn } from "@itell/core";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { NavigationMenuLink } from "../ui-components";
import { Typography } from "@itell/ui/server";
import React from "react";
import TextbookScrollProgress from "./textbook-scroll-progress";
import SiteNav from "./site-nav";
import UserAvatar from "../user-avatar";
import ThemeToggle from "../theme/theme-toggle";

type Props = {
	showProgress?: boolean;
};

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
	return (
		<SiteNav>
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 bg-background opacity-100">
				<Link href="/" className={cn(navigationMenuTriggerStyle)}>
					<Typography as="span" variant="lead">
						{siteConfig.title}
					</Typography>
				</Link>
				<div className="ml-auto flex items-center gap-4">
					<ThemeToggle />
					<UserAvatar />
				</div>
			</div>

			{/* mobile navigation */}
			{showProgress && <TextbookScrollProgress />}
		</SiteNav>
	);
}
