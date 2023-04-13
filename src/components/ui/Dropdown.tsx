import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
} from "@/components/material-tailwind";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../icons";

type MenuItem = {
	label: string;
	url?: string;
	icon?: React.ReactNode;
	action?: () => void;
};

type Props = {
	children: React.ReactNode;
	items: MenuItem[];
};

export default function Dropdown({ children, items }: Props) {
	const [open, setOpen] = useState(false);
	const triggers = {
		onMouseEnter: () => setOpen(true),
		onMouseLeave: () => setOpen(false),
	};

	return (
		<Menu open={open} handler={setOpen} placement="bottom-end">
			<MenuHandler {...triggers}>{children}</MenuHandler>
			<MenuList {...triggers}>
				{items.map((item) => (
					<MenuItem
						className="capitalize flex items-center gap-4 text-xs"
						key={item.label}
						onClick={() => {
							if (item.action) item.action();
						}}
					>
						{item.icon && item.icon}
						{item.url && (
							<Link href={item.url} className="w-full">
								{item.icon && <span className="mr-2">{item.icon}</span>}
								{item.label}
							</Link>
						)}
						{item.action && <span>{item.label}</span>}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
}
