"use client";

import { allChaptersSorted } from "@/lib/chapters";
import Fuse from "fuse.js";
import { useState } from "react";
import {
	Button,
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/client-components";
import { SearchIcon } from "lucide-react";

const data = allChaptersSorted.map((c) => ({
	title: c.title,
	content: c.body.raw,
}));

const fuse = new Fuse(data, {
	keys: ["title", "content"],
	includeMatches: true,
	includeScore: false,
	isCaseSensitive: false,
	shouldSort: true,
	useExtendedSearch: true,
	minMatchCharLength: 2,
});

export const TextbookSearch = () => {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	const results = query
		? fuse
				.search(`'${query}`)
				.slice(0, 5)
				.map((entry) => {
					const { item, matches } = entry;
					const firstMatch = matches?.at(0);
					return {
						id: crypto.randomUUID(),
						title: item.title,
						key: firstMatch?.key,
						value:
							firstMatch?.key === "title"
								? firstMatch?.value
								: item.content.slice(
										firstMatch?.indices[0][0] - 20,
										firstMatch?.indices[0][1] + 20,
								  ),
						length: firstMatch?.value?.length,
					};
				})
		: null;

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				className="h-8 w-8 px-0"
				onClick={() => setOpen(true)}
			>
				<SearchIcon className="w-6 h-6" />
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Search the textbook"
					value={query}
					onValueChange={(value) => {
						setQuery(value);
					}}
				/>
				<CommandList>
					<pre>{JSON.stringify(results, null, 2)}</pre>
					<CommandGroup heading="results">
						<CommandEmpty>No results found.</CommandEmpty>
						{results?.map(({ id, title }) => {
							return (
								<CommandItem key={id}>
									<p>{title}</p>
								</CommandItem>
							);
						})}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
