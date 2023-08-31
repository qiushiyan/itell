"use client";

import {
	createHighlightListeners,
	createNoteElements,
	deleteHighlightListener,
	deserializeRange,
} from "@/lib/note";

import { useNotesStore } from "@/lib/store";
import { usePython } from "@webpy/react";
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
		setTimeout(() => {
			try {
				createNoteElements({
					id,
					range: deserializeRange(range),
					color,
					isHighlight: true,
				});
				createHighlightListeners(id, (event) => {
					deleteHighlightListener(event);
					incrementHighlightCount(-1);
				});
			} catch (err) {
				console.error("create highlight error", err);
			}
		}, 1000);
	}, []);

	return null;
};
