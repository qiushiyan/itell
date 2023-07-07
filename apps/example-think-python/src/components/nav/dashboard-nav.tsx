import React from "react";
import Link from "next/link";

import { DashboardNavItem } from "@/types/nav";
import { DashboardNavMenu } from "./dashboard-nav-menu";
import { getSiteConfig } from "@/lib/config";

interface Props {
	items?: DashboardNavItem[];
	children?: React.ReactNode;
}

export async function DashboardNav(props: Props) {
	const { title } = await getSiteConfig();

	return (
		<div className="flex gap-6 md:gap-10 justify-between">
			<Link href="/" className="hidden items-center space-x-2 md:flex">
				<span className="hidden font-bold sm:inline-block">{title}</span>
			</Link>
			<DashboardNavMenu {...props} />
		</div>
	);
}
