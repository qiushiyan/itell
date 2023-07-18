import NoteCard from "./note-card";
import { SectionLocation } from "@/types/location";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Highlight } from "./highlight";
import { NewNoteList } from "./new-note-list";
import { delay } from "@/lib/utils";
import { NoteCount } from "./note-count";

export const dynamic = "force-dynamic";

export default async function NoteList({
	location,
}: { location: SectionLocation }) {
	const user = await getCurrentUser();
	if (!user) {
		return null;
	}

	const notesAndHighlights = await db.note.findMany({
		where: {
			userId: user.id,
			module: location.module,
			chapter: location.chapter,
			section: location.section,
		},
	});
	const notes = notesAndHighlights.filter((note) => note.noteText !== null);
	const highlights = notesAndHighlights.filter(
		(note) => note.noteText === null,
	);

	return (
		<div>
			{notes.map((note) => (
				// @ts-ignore
				<NoteCard key={note.y} {...note} location={location} />
			))}
			{highlights.map((highlight) => (
				<Highlight key={highlight.y} {...highlight} />
			))}
			<div className="mt-8">
				{/* for rendering notes that are newly created */}
				<NoteCount
					count={{ note: notes.length, highlight: highlights.length }}
				/>
			</div>
			<NewNoteList location={location} />
		</div>
	);
}
