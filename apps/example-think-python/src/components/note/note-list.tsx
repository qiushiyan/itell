import NoteCard from "./note-card";
import { getCurrentUser } from "@/lib/auth";
import db from "@/lib/db";
import { Highlight } from "./highlight";
import { NewNoteList } from "./new-note-list";
import { NoteCount, SetNoteCount } from "./note-count";

export const dynamic = "force-dynamic";

export default async function NoteList({ chapter }: { chapter: number }) {
	const user = await getCurrentUser();
	if (!user) {
		return null;
	}

	const notesAndHighlights = await db.note.findMany({
		where: {
			userId: user.id,
			chapter,
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
				<NoteCard
					key={note.id}
					{...note}
					serializedRange={note.range}
					chapter={chapter}
					newNote={false}
				/>
			))}
			{highlights.map((highlight) => (
				<Highlight key={highlight.id} {...highlight} />
			))}
			<div className="mt-8">
				{/* for rendering notes that are newly created */}
				<SetNoteCount
					count={{ note: notes.length, highlight: highlights.length }}
				/>
			</div>
			<NewNoteList chapter={chapter} />
		</div>
	);
}
