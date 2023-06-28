"use client";

import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@itell/core";
import { MobileNav } from "@/components/nav/mobile-nav";
import { DashboardNavItem } from "@/types/nav";
import { XIcon } from "lucide-react";
import { useState } from "react";

interface Props {
	title: string;
	items?: DashboardNavItem[];
	children?: React.ReactNode;
}

export function DashboardNavMenu({ title, items, children }: Props) {
	const segment = useSelectedLayoutSegment();
	const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

	return (
		<>
			{items?.length ? (
				<nav className="hidden gap-6 md:flex">
					{items?.map((item) => (
						<Link
							key={item.href}
							href={item.disabled ? "#" : item.href}
							className={cn(
								"flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
								item.href.startsWith(`/${segment}`)
									? "text-foreground"
									: "text-foreground/60",
								item.disabled && "cursor-not-allowed opacity-80",
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
			<button
				className="flex items-center space-x-2 md:hidden"
				onClick={() => setShowMobileMenu(!showMobileMenu)}
			>
				{showMobileMenu && <XIcon />}
				<span className="font-bold">Menu</span>
			</button>
			{showMobileMenu && items && (
				<MobileNav items={items} title={title}>
					{children}
				</MobileNav>
			)}
		</>
	);
}
