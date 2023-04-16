"use client";

import { Button, Typography } from "@/components/material-tailwind";
import { cn } from "@/lib/utils";
import { HighlighterIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Popover } from "react-text-selection-popover";
import { toast } from "sonner";
import Spinner from "./spinner";

const commands = [
	{ text: "Highlight", icon: <HighlighterIcon />, action: () => {} },
	{
		text: "Copy",
		icon: <CopyIcon />,
		action: (text: string) => {
			navigator.clipboard.writeText(text);
		},
	},
];

export default function HighlightToolbar() {
	const [target, setTarget] = useState<Element | null>(null);

	function highlightSelection(textContent: string) {
		if (target && textContent) {
			// escape potential characters in selection
			const regexString = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			const regex = new RegExp(regexString, "gi");

			const newText = target.innerHTML.replace(
				regex,
				'<mark class="highlight">$&</mark>',
			);
			target.innerHTML = newText;
		}
	}

	useEffect(() => {
		const el = document.querySelector("#section-content");
		if (el) {
			setTarget(el);
		}
	}, []);

	if (!target) return null;

	return (
		<Popover
			target={target as HTMLElement}
			render={({ clientRect, isCollapsed, textContent }) => {
				if (clientRect == null || isCollapsed) return null;

				const style = {
					left: `${clientRect.left + 75}px`,
					top: `${clientRect.top - 60}px`,
				};

				return (
					<div
						className={cn(
							"fixed w-48 rounded-md shadow-sm px-2 py-1 flex flex-col md:flex-row gap-2 border-2 border-gray-100 items-center justify-between bg-white -ml-[75px]",
						)}
						style={style}
					>
						<Button
							variant="text"
							size="md"
							color="blue-gray"
							className="flex items-center gap-2 p-2"
							onClick={() => {
								if (textContent) highlightSelection(textContent);
							}}
						>
							<HighlighterIcon />
							Note
						</Button>
						<Button
							variant="text"
							size="md"
							color="blue-gray"
							className="flex items-center gap-2 p-2"
							onClick={async () => {
								if (textContent) {
									await navigator.clipboard.writeText(textContent);
									toast.success("Copied to clipboard");
								}
							}}
						>
							<CopyIcon />
							Copy
						</Button>
					</div>
				);
			}}
		/>
	);
}
