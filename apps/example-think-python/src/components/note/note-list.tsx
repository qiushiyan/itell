"use client";

import { useEffect } from "react";
import NoteCard from "./note-card";
import { trpc } from "@/trpc/trpc-provider";
import Spinner from "../spinner";
import { useNotes } from "@/lib/hooks/use-notes";
import { useSession } from "next-auth/react";
import { Typography } from "@itell/ui/server";
import { Highlight, NoteCard as NoteCardType } from "@/types/note";
import { removeExistingMarks } from "@/lib/note";
import { useSectionContent } from "@/lib/hooks/use-chapter-content";
import { useCurrentChapter } from "@/lib/hooks/utils";

export default function NoteList({ chapter }: { chapter: number }) {
	const {
		notes,
		setNotes,
		setHighlights,
		highlights,
		markNote,
		markHighlight,
	} = useNotes();
	const { data: session } = useSession();
	const deleteNote = trpc.note.delete.useMutation();
	const { data, isFetching } = trpc.note.getByChapter.useQuery(
		{ chapter },
		{ enabled: Boolean(session?.user) },
	);
	const sectionContentRef = useSectionContent();

	useEffect(() => {
		if (data) {
			if (sectionContentRef.current) {
				removeExistingMarks(sectionContentRef.current as HTMLElement);
				const notes: NoteCardType[] = [];
				const highlights: Highlight[] = [];
				for (const entry of data) {
					if (entry.noteText) {
						markNote({
							textContent: entry.highlightedText,
							color: entry.color,
						});
						notes.push(entry as NoteCardType);
					} else {
						markHighlight({
							id: entry.id,
							textContent: entry.highlightedText,
							color: entry.color,
						});
						highlights.push({ id: entry.id });
					}
				}
				setNotes(notes);
				setHighlights(highlights);
			}
		}
	}, [data]);

	useEffect(() => {
		const deleteHighlight = (event: Event) => {
			event.preventDefault();
			const el = event.currentTarget as HTMLElement;
			if (el.id) {
				const id = el.id;
				if (confirm("Delete this highlight?")) {
					el.style.backgroundColor = "";
					el.id = "";
					deleteNote.mutateAsync({ id });
				}
			}
		};

		const els: Element[] = [];
		highlights.forEach((highlight) => {
			if (highlight.id) {
				const el = document.getElementById(`${highlight.id}`);
				if (el) {
					el.addEventListener("click", deleteHighlight);
					els.push(el);
				}
			}
		});

		return () => {
			els.forEach((el) => {
				el.removeEventListener("click", deleteHighlight);
			});
		};
	}, [highlights]);

	return (
		<div className="flex flex-col space-y-4 mt-4">
			{isFetching ? (
				<div className="flex items-center">
					<Spinner className="w-6 h-6 mr-2 text-foreground" />
					<Typography as="div" variant="small">
						loading notes
					</Typography>
				</div>
			) : (
				notes.map((note) => (
					<NoteCard key={note.y} {...note} chapter={chapter} />
				))
			)}
		</div>
	);
}
