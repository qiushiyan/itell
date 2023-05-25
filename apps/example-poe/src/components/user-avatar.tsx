"use client";

import { Typography } from "@itell/ui/server";
import {
	Avatar,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuGroup,
	DropdownMenuItem,
	Button,
} from "./ui-components";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	LogOutIcon,
	BarChart4Icon,
	ChevronDownIcon,
	SettingsIcon,
	ChevronUpIcon,
} from "lucide-react";
import Spinner from "./spinner";
import Link from "next/link";

export default function UserAvatar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const router = useRouter();
	const { data: session, status } = useSession();
	const user = session?.user;

	const menuItems = [
		{
			text: "Dashboard",
			icon: <BarChart4Icon className="mr-2 h-4 w-4" />,
			action: () => router.push("/dashboard"),
		},
		{
			text: "Logout",
			icon: <LogOutIcon className="mr-2 h-4 w-4" />,
			action: () => signOut(),
		},
	];

	// const menuControls = {
	// 	onMouseEnter: () => setMenuOpen(true),
	// 	onMouseLeave: () => setMenuOpen(false),
	// };

	if (status === "loading") {
		return <Spinner />;
	}

	if (!user) {
		return (
			<Link href="/auth">
				<Button>Sign in</Button>
			</Link>
		);
	}

	let UserDisplay;

	if (!user.image) {
		if (user.name) {
			UserDisplay = <Typography variant="small">{user.name}</Typography>;
		} else if (user.email) {
			UserDisplay = <Typography variant="small">{user.email}</Typography>;
		} else {
			return <Typography variant="small">My Account</Typography>;
		}
	} else {
		UserDisplay = (
			<Avatar
				src={user.image}
				alt={user.name || "user profile"}
				fallback={user.name?.[0]?.toUpperCase()}
			/>
		);
	}

	return (
		<div className="ml-auto flex items-center gap-1">
			<DropdownMenu open={menuOpen} onOpenChange={(val) => setMenuOpen(val)}>
				<DropdownMenuTrigger>{UserDisplay}</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuGroup>
						{menuItems.map((item) => (
							<DropdownMenuItem key={item.text}>
								<Button variant="ghost" size="sm" onClick={item.action}>
									{item.icon}
									{item.text}
								</Button>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{menuOpen ? (
				<ChevronUpIcon className="h-4 w-4" />
			) : (
				<ChevronDownIcon className="h-4 w-4" />
			)}
		</div>
	);
}
