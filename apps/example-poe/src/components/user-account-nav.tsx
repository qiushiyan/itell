"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	Button,
	DropdownMenuSeparator,
} from "./client-components";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	ChevronDownIcon,
	ChevronUpIcon,
	FileBoxIcon,
	LineChartIcon,
	LogOutIcon,
	PieChartIcon,
	SettingsIcon,
} from "lucide-react";
import Spinner from "./spinner";
import Link from "next/link";
import UserAvatar from "./user-avatar";

export const UserAccountNav = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { data: session, status } = useSession();
	const user = session?.user;

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

	return (
		<div className="ml-auto flex items-center gap-1">
			<DropdownMenu open={menuOpen} onOpenChange={(val) => setMenuOpen(val)}>
				<DropdownMenuTrigger>
					<UserAvatar
						className="h-8 w-8"
						user={{
							name: user.name || null,
							email: user.email || null,
							image: user.image || null,
						}}
					/>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{/* user name and email */}
					<div className="flex items-center justify-start gap-2 p-2">
						<div className="flex flex-col space-y-1 leading-none">
							{user.name && <p className="font-medium">{user.name}</p>}
							{user.email && (
								<p className="w-[200px] truncate text-sm text-muted-foreground">
									{user.email}
								</p>
							)}
						</div>
					</div>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<div>
							<LineChartIcon className="h-4 w-4 mr-2" />
							<Link href="/dashboard">Dashboard</Link>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<div>
							<FileBoxIcon className="h-4 w-4 mr-2" />
							<Link href="/dashboard/summaries">Summaries</Link>
						</div>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<div>
							<SettingsIcon className="h-4 w-4 mr-2" />
							<Link href="/dashboard/settings">Settings</Link>
						</div>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="cursor-pointer"
						onSelect={(event) => {
							event.preventDefault();
							signOut({
								callbackUrl: `${window.location.origin}/auth`,
							});
						}}
					>
						<LogOutIcon className="h-4 w-4 mr-2" />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{menuOpen ? (
				<ChevronUpIcon className="h-4 w-4" />
			) : (
				<ChevronDownIcon className="h-4 w-4" />
			)}
		</div>
	);
};
