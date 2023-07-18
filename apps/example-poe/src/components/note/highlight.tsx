"use client";

import { useSectionContent } from "@/lib/hooks/use-section-content";
import { deleteHighlight, deleteNote } from "@/lib/note";
import { markHighlight } from "@/lib/store";
import { trpc } from "@/trpc/trpc-provider";
import { useEffect } from "react";

type Props = {
	id: string;
	highlightedText: string;
	color: string;
};

export const Highlight = ({ id, highlightedText, color }: Props) => {
	const sectionContentRef = useSectionContent();

	let el: HTMLElement | null = null;

	useEffect(() => {
		markHighlight({
			id,
			color,
			textContent: highlightedText,
			target: sectionContentRef.current,
		});

		if (id) {
			el = document.getElementById(`${id}`);
			if (el) {
				el.addEventListener("click", deleteHighlight);
			}
		}

		() => {
			if (el) {
				el.removeEventListener("click", deleteHighlight);
			}
		};
	}, []);

	return null;
};
