"use client";

import {
	createHighlightListeners,
	createNoteElements,
	deleteHighlightListener,
	deserializeRange,
} from "@/lib/note";

import { useNotesStore } from "@/lib/store";
import { useEffect } from "react";
type Props = {
	id: string;
	color: string;
	range: string;
};

export const Highlight = ({ id, color, range }: Props) => {
	const incrementHighlightCount = useNotesStore(
		(store) => store.incrementHighlightCount,
	);

	useEffect(() => {
		const deserializedRange = deserializeRange(range);

		createNoteElements({
			id,
			range: deserializedRange,
			color,
			isHighlight: true,
		});

		createHighlightListeners(id, (event) => {
			deleteHighlightListener(event);
			incrementHighlightCount(-1);
		});
	}, []);

	return null;
};
