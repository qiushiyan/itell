"use client";

import { DefaultSession } from "next-auth";
import { Avatar, Typography } from "@/components/material-tailwind";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropdown from "./ui/dropdown";
import { LogOutIcon, BarChart4Icon, ChevronDownIcon } from "lucide-react";

type Props = {
	user: NonNullable<DefaultSession["user"]>;
};

export default function UserAvatar({ user }: Props) {
	const router = useRouter();
	const [openMenu, setOpenMenu] = useState(false);

	const triggers = {
		onMouseEnter: () => setOpenMenu(true),
		onMouseLeave: () => setOpenMenu(false),
	};
	const handleLogout = async () => {
		await signOut();
	};

	const menuItems = [
		{
			label: "Dashboard",
			icon: <BarChart4Icon />,
			action: () => router.push("/dashboard"),
		},
		{
			label: "logout",
			icon: <LogOutIcon />,
			action: handleLogout,
		},
	];

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
				variant="circular"
				className="w-10 h-10 cursor-pointer"
			/>
		);
	}

	return (
		<Dropdown items={menuItems}>
			<div className="flex items-center gap-2 cursor-pointer">
				{UserDisplay}
				<ChevronDownIcon className="w-5 h-5" />
			</div>
		</Dropdown>
	);
}
