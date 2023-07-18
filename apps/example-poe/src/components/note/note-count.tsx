"use client";

import { Count, useNotesStore } from "@/lib/store";
import { useEffect } from "react";
import {
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/client-components";

type Props = {
	count: Count;
};

// rendered by NoteList to set the count in the store
export const NoteCount = (props: Props) => {
	const { count, setCount } = useNotesStore();

	useEffect(() => {
		setCount(props.count);
	}, []);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link" className="pl-0">
					{`${count.note} ${count.note > 1 ? "notes" : "note"}`},{" "}
					{`${count.highlight} ${
						count.highlight > 1 ? "highlights" : "highlight"
					}`}
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-40 text-sm">
				<div>Leave a note or highlight by selecting the text</div>
			</HoverCardContent>
		</HoverCard>
	);
};
