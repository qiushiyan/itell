"use client";

import { Button } from "@/components/material-tailwind";
import { cn } from "@/lib/utils";
import { HighlighterIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover } from "react-text-selection-popover";
import { toast } from "sonner";
import { useNotes } from "@/lib/hooks";
import { useTextSelection } from "use-text-selection";
import { SectionLocation } from "@/types/location";
import { highlightText } from "@/lib/note";

type SelectionData = ReturnType<typeof useTextSelection>;

export default function HighlightToolbar({
	location,
}: { location: SectionLocation }) {
	const [target, setTarget] = useState<HTMLElement | null>(null);
	const { createNote } = useNotes();

	function highlightSelection(textContent: string) {
		if (target && textContent) {
			highlightText(target, textContent);
		}
	}

	useEffect(() => {
		const el = document.querySelector("#section-content") as HTMLElement;
		if (el) {
			setTarget(el);
		}
	}, []);

	const commands = [
		{
			label: "Note",
			icon: <HighlighterIcon />,
			action: ({ clientRect, textContent }: SelectionData) => {
				if (textContent) {
					highlightSelection(textContent);
					if (clientRect) {
						createNote({
							y: clientRect.y + window.scrollY,
							highlightedText: textContent,
							location,
						});
					}
				}
			},
		},
		{
			label: "Copy",
			icon: <CopyIcon />,
			action: async ({ textContent }: SelectionData) => {
				if (textContent) {
					await navigator.clipboard.writeText(textContent);
					toast.success("Copied to clipboard");
				}
			},
		},
	];

	if (!target) return null;

	return (
		<Popover
			target={target as HTMLElement}
			render={(data) => {
				const { clientRect, isCollapsed, textContent } = data;
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
						{commands.map((command) => (
							<Button
								variant="text"
								size="md"
								color="blue-gray"
								className="flex items-center gap-2 p-2"
								onClick={() => command.action(data)}
								key={command.label}
							>
								{command.icon}
								{command.label}
							</Button>
						))}
					</div>
				);
			}}
		/>
	);
}
