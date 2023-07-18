"use client";

import { useSectionContent } from "@/lib/hooks/use-section-content";
import { deleteHighlightListener, transformHighlight } from "@/lib/note";
import { useNotesStore } from "@/lib/store";
import { useEffect, useState } from "react";

type Props = {
	id: string;
	highlightedText: string;
	color: string;
};

export const Highlight = ({ id, highlightedText, color }: Props) => {
	const sectionContentRef = useSectionContent();
	const incrementHighlightCount = useNotesStore(
		(store) => store.incrementHighlightCount,
	);
	let el: HTMLElement | null = null;

	useEffect(() => {
		transformHighlight({
			id,
			color,
			textContent: highlightedText,
			target: sectionContentRef.current,
		}).then(() => {
			el = document.getElementById(id);
			if (el) {
				el.addEventListener("click", (event) => {
					deleteHighlightListener(event);
					incrementHighlightCount(-1);
				});
			}
		});

		return () => {
			if (el) {
				el.removeEventListener("click", (event) => {
					deleteHighlightListener(event);
					incrementHighlightCount(-1);
				});
			}
		};
	}, []);

	return null;
};
