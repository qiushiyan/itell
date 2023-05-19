"use client";

import { useEffect, useRef } from "react";
import NoteCard from "./note-card";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import Spinner from "../spinner";
import { useNotes } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { Typography } from "@itell/ui/server";
import { Highlight, NoteCard as NoteCardType } from "@/types/note";
import { removeExistingMarks } from "@/lib/note";

export default function NoteList({ location }: { location: SectionLocation }) {
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
	const { data, isLoading } = trpc.note.getByLocation.useQuery(
		{ location },
		{ enabled: Boolean(session?.user) },
	);
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const el = document.getElementById("section-content") as HTMLElement;
		if (el) {
			ref.current = el;
		}
	}, []);

	useEffect(() => {
		if (data) {
			if (ref.current) {
				removeExistingMarks(ref.current as HTMLElement);
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
							textContent: entry.highlightedText,
							id: entry.id,
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
			{isLoading ? (
				<div className="flex items-center">
					<Spinner className="w-8 h-8" />
					<Typography as="div" variant="small">
						loading notes
					</Typography>
				</div>
			) : (
				notes.map((note) => (
					<NoteCard key={note.y} {...note} location={location} />
				))
			)}
		</div>
	);
}
