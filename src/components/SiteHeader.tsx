"use client";

import { useEffect, useState } from "react";
import { env } from "@/env.mjs";
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import Link from "next/link";

type MenuItem = {
	title: string;
	href: string;
};

const menuItems: MenuItem[] = [
	{ title: "Module 1", href: "/module-1" },
	{ title: "Module 2", href: "/module-2" },
	{ title: "Module 3", href: "/module-3" },
	{ title: "Module 4", href: "/module-4" },
	{ title: "Module 5", href: "/module-5" },
];

export default function SiteHeader() {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		const resizeHandler = () => window.innerWidth >= 640 && setOpenNav(false);

		window.addEventListener("resize", resizeHandler);

		return () => window.removeEventListener("resize", resizeHandler);
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			{menuItems.map((item) => (
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="p-1 font-normal"
					key={item.title}
				>
					<a href={item.href} className="flex items-center">
						{item.title}
					</a>
				</Typography>
			))}
		</ul>
	);

	return (
		<Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-3">
			<div className="flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="/"
					className="mr-4 cursor-pointer py-1.5 font-handwritten"
					variant="h4"
					color="blue"
					textGradient
				>
					{env.NEXT_PUBLIC_SITE_TITLE}
				</Typography>
				<div className="flex items-center gap-4">
					<div className="mr-4 hidden lg:block">{navList}</div>

					<Link href="/auth">
						<Button variant="gradient" size="sm" className="hidden lg:flex">
							login
						</Button>
					</Link>

					<IconButton
						variant="text"
						className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
						ripple={false}
						onClick={() => setOpenNav(!openNav)}
					>
						{openNav ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								className="h-6 w-6"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</IconButton>
				</div>
			</div>
			<MobileNav open={openNav}>
				{navList}

				<Link href="/auth">
					<Button variant="gradient" size="sm" fullWidth className="mb-2">
						Login
					</Button>
				</Link>
			</MobileNav>
		</Navbar>
	);
}
