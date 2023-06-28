import { cn } from "@itell/core";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Typography } from "@itell/ui/server";
import TextbookScrollProgress from "./textbook-scroll-progress";
import SiteNav from "./site-nav";
import { getSiteConfig } from "@/lib/config";
import TextbookNavMenu from "./textbook-nav-menu";

export default async function TextbookNavbar() {
	const { title } = await getSiteConfig();

	return (
		<SiteNav>
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<Link href="/" className={navigationMenuTriggerStyle}>
					<Typography as="span" variant="lead">
						{title}
					</Typography>
				</Link>
				<TextbookNavMenu />
			</div>

			<TextbookScrollProgress />
		</SiteNav>
	);
}
