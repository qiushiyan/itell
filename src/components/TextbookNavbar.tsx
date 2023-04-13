"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from "@/components/material-tailwind";
import { signIn, useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import { motion, useScroll, useSpring } from "framer-motion";
import { toast } from "sonner";
import { getLocationFromPathname, groupby, keyof } from "@/lib/utils";
import { allSections } from "contentlayer/generated";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDownIcon } from "./icons";
import { ILocation } from "@/types/location";

type Props = {
	showProgress?: boolean;
};

const moduleChapters = groupby(
	allSections.filter((section) => section.location.section === undefined),
	(section) => section.location.module,
	(section) => ({
		title: section.title,
		chapter: section.location.chapter,
		url: `/module-${section.location.module}/chapter-${section.location.chapter}`,
	}),
);
const modules = keyof(moduleChapters);

export default function TextbookNavbar({ showProgress = false }: Props) {
	const pathname = usePathname();
	const [location, setLocation] = useState<Partial<ILocation>>({
		module: undefined,
		chapter: undefined,
		section: undefined,
	});

	useEffect(() => {
		if (pathname) {
			setLocation(getLocationFromPathname(pathname));
		}
	}, [pathname]);

	const { data: session } = useSession();
	const [openNav, setOpenNav] = useState(false);

	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const handleSignin = async () => {
		await signIn();
		toast.success("Successfully logged in!");
	};

	useEffect(() => {
		const resizeHandler = () => window.innerWidth >= 640 && setOpenNav(false);

		window.addEventListener("resize", resizeHandler);

		return () => window.removeEventListener("resize", resizeHandler);
	}, []);

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
			{modules.map((module) => {
				const active = location && location.module === Number(module);
				const firstChapter = moduleChapters[module][0].chapter;
				return (
					<Dropdown
						items={[
							...moduleChapters[module].map((chapter) => ({
								label: `${chapter.chapter}. ${chapter.title}`,
								url: chapter.url,
							})),
						]}
						key={module}
					>
						<Button
							variant={active ? "gradient" : "text"}
							className="flex gap-1 items-center px-3"
						>
							<a
								className="inline-flex"
								href={`/module-${module}/chapter-${firstChapter}`}
							>
								Module {module}
							</a>
							<ChevronDownIcon className="w-4 h-4" />
						</Button>
					</Dropdown>
				);
			})}
		</ul>
	);

	return (
		<header className="sticky inset-0 z-10 h-max">
			<Navbar className="max-w-full  py-2 px-4 lg:px-8 lg:py-3 rounded-none">
				<div className="flex items-center gap-4 text-blue-gray-900">
					<Typography
						as="a"
						href="/"
						className="mr-4 cursor-pointer py-1.5 font-handwritten"
						variant="h4"
						color="blue"
						textGradient
					>
						{siteConfig.title}
					</Typography>
					<div className="mr-4 hidden lg:block">{navList}</div>
					<div className="flex items-center gap-4 ml-auto">
						{session?.user ? (
							<UserAvatar user={session.user} />
						) : (
							<Button onClick={handleSignin}>Sign in</Button>
						)}

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

					<Button
						variant="gradient"
						size="sm"
						fullWidth
						className="mb-2"
						onClick={handleSignin}
					>
						Login
					</Button>
				</MobileNav>
			</Navbar>
			{showProgress && !openNav && (
				<motion.div
					className="h-[5px] bg-blue-400 origin-[0%]"
					style={{ scaleX }}
				/>
			)}
		</header>
	);
}
