"use client";

import { cn } from "@itell/core/utils";
import { HighlighterIcon, CopyIcon, PencilIcon } from "lucide-react";
import { Popover } from "react-text-selection-popover";
import { toast } from "sonner";
import { useTextSelection } from "use-text-selection";
import { SectionLocation } from "@/types/location";
import { trpc } from "@/trpc/trpc-provider";
import {
	defaultHighlightColor,
	useNoteColor,
} from "@/lib/hooks/use-note-color";
import Spinner from "../spinner";
import { Button } from "../client-components";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useNotesStore } from "@/lib/store";
import { deleteHighlightListener, generateNoteElement } from "@/lib/note";

type SelectionData = ReturnType<typeof useTextSelection>;

export default function HighlightToolbar({
	location,
}: { location: SectionLocation }) {
	const [target, setTarget] = useState<HTMLElement | undefined>(undefined);
	const noteColor = useNoteColor();
	const { createNote, incrementHighlightCount, incrementNoteCount } =
		useNotesStore();
	const createHighlight = trpc.note.create.useMutation();
	const { data: session } = useSession();

	useEffect(() => {
		const el = document.getElementById("section-content") as HTMLElement;
		if (el) {
			setTarget(el);
		}
	}, []);

	const commands = [
		{
			label: "Note",
			icon: <PencilIcon className="w-5 h-5" />,
			action: async ({ clientRect, textContent }: SelectionData) => {
				if (textContent && target) {
					const id = crypto.randomUUID();
					await generateNoteElement({
						textContent,
						color: noteColor,
						target,
						id,
					});
					if (clientRect) {
						createNote({
							id,
							y: clientRect.y + window.scrollY,
							highlightedText: textContent,
							color: noteColor,
						});

						incrementNoteCount();
					}
				}
			},
		},
		{
			label: "Highlight",
			icon: <HighlighterIcon className="w-5 h-5" />,
			action: async ({ clientRect, textContent }: SelectionData) => {
				if (textContent) {
					if (clientRect && target) {
						const newHighlight = await createHighlight.mutateAsync({
							y: clientRect.y + window.scrollY,
							highlightedText: textContent,
							location,
							color: defaultHighlightColor,
						});

						await generateNoteElement({
							id: newHighlight.id,
							textContent,
							target,
							color: defaultHighlightColor,
							highlight: true,
						});

						incrementHighlightCount();

						const highlightElement = document.getElementById(newHighlight.id);
						if (highlightElement) {
							highlightElement.addEventListener("click", (event) => {
								deleteHighlightListener(event);
								incrementHighlightCount(-1);
							});
						}
					}
				}
			},
		},
		{
			label: "Copy",
			icon: <CopyIcon className="w-5 h-5" />,
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
				const { clientRect, isCollapsed } = data;
				if (clientRect == null || isCollapsed) return null;

				const style = {
					left: `${clientRect.left + 75}px`,
					top: `${clientRect.top - 60}px`,
				};

				return (
					<div
						className={cn(
							"fixed rounded-md shadow-sm px-2 py-1 flex flex-row gap-2 border-2 border-gray-100 items-center justify-between bg-background -ml-[75px]",
						)}
						style={style}
					>
						{createHighlight.isLoading ? (
							<Spinner />
						) : (
							commands.map((command) => (
								<Button
									variant="ghost"
									color="blue-gray"
									className="flex items-center gap-2 p-2"
									onClick={() => {
										if (!session?.user && command.label !== "Copy") {
											return toast.error("You need to be logged in.");
										}
										command.action(data);
									}}
									key={command.label}
								>
									{command.icon}
									{command.label}
								</Button>
							))
						)}
					</div>
				);
			}}
		/>
	);
}
