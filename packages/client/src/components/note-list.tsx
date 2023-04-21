"use client";

import { NoteContext } from "@/contexts/note";
import { useContext, useEffect, useRef } from "react";
import NoteCard from "./note-card";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import { highlightText } from "@/lib/note";
import Spinner from "./spinner";

export default function NoteList({ location }: { location: SectionLocation }) {
	const { notes, fillNotes } = useContext(NoteContext);
	const { data, isLoading } = trpc.note.getByLocation.useQuery({ location });
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const el = document.querySelector("#section-content") as HTMLElement;
		if (el) {
			ref.current = el;
		}
	}, []);

	useEffect(() => {
		if (data) {
			fillNotes(data);
			if (ref.current) {
				data.map((note) => {
					highlightText(ref.current as HTMLElement, note.highlightedText);
				});
			}
		}
	}, [data]);

	return (
		<div className="flex flex-col space-y-4">
			{isLoading ? (
				<div>
					<Spinner /> loading notes
				</div>
			) : (
				notes.map((note) => (
					<NoteCard key={note.y} {...note} location={location} />
				))
			)}
		</div>
	);
}
