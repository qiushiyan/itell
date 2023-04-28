"use client";

import { useEffect, useRef } from "react";
import NoteCard from "./note-card";
import { trpc } from "@/trpc/trpc-provider";
import { SectionLocation } from "@/types/location";
import { highlightText, removeExistingMarks } from "@/lib/note";
import Spinner from "../spinner";
import { useNotes } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import { Typography } from "@material-tailwind/react";

export default function NoteList({ location }: { location: SectionLocation }) {
	const { notes, fillNotes } = useNotes();
	const { data: session } = useSession();
	const { data, isLoading } = trpc.note.getByLocation.useQuery(
		{ location },
		{ enabled: Boolean(session?.user) },
	);
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
			removeExistingMarks(ref.current as HTMLElement);
			if (ref.current) {
				data.map((note) => {
					highlightText(
						ref.current as HTMLElement,
						note.highlightedText,
						note.color,
					);
				});
			}
		}
	}, [data]);

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
