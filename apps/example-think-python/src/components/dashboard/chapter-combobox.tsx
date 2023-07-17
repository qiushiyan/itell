"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@itell/core/utils";
import { Button } from "@/components/client-components";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@itell/ui/client";
import { allChaptersSorted } from "@/lib/chapters";

export default function ({
	onValueChange,
}: {
	onValueChange: (arg: number | null) => void;
}) {
	const [value, setValue] = React.useState("");

	const [open, setOpen] = React.useState(false);
	const chapters = allChaptersSorted
		.filter((c) => c.chapter !== 0)
		.map((c) => ({
			chapter: c.chapter,
			label: `${c.chapter}. ${c.title}`,
		}));
	const [selectedChapter, setSelectedChapter] = React.useState<
		typeof chapters[0] | undefined
	>(undefined);

	const findChapterByValue = (value: string) => {
		const [chapter, _] = value.split(" ")[0].split(".");
		return chapters.find((c) => String(c.chapter) === chapter);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[400px] justify-between text-left"
				>
					{value ? selectedChapter?.label : "Select a section"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0">
				<Command className="h-[300px]">
					<CommandInput placeholder="Search a section" />
					<CommandEmpty>No section found.</CommandEmpty>
					<CommandGroup className="justify-start overflow-y-auto">
						{chapters.map((chapter) => (
							<CommandItem
								key={chapter.label}
								onSelect={(currentValue) => {
									const nextVal = currentValue === value ? "" : currentValue;
									setValue(nextVal);
									const selectedChapter = findChapterByValue(nextVal);
									setSelectedChapter(selectedChapter);
									onValueChange(
										selectedChapter ? selectedChapter.chapter : null,
									);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === chapter.label ? "opacity-100" : "opacity-0",
									)}
								/>
								{chapter.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
