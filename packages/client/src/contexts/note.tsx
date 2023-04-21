import { CreateNoteInput, NoteCard } from "@/types/note";
import { createContext, useState } from "react";
import { useImmer } from "use-immer";

type NoteContextType = {
	notes: NoteCard[];
	createNote: (note: CreateNoteInput) => void;
	fillNotes: (notes: NoteCard[]) => void;
	deleteNote: (id: string) => void;
};

export const NoteContext = createContext<NoteContextType>(
	{} as NoteContextType,
);
export default function NoteProvider({ children }) {
	const [notes, setNotes] = useState<NoteCard[]>([]);

	const fillNotes = (notes: NoteCard[]) => {
		setNotes(
			notes.map((note) => ({
				y: note.y,
				highlightedText: note.highlightedText,
				noteText: note.noteText,
				open: false,
				id: note.id,
				updated_at: note.updated_at,
				created_at: note.created_at,
			})),
		);
	};

	const createNote = ({ y, highlightedText }: CreateNoteInput) => {
		setNotes((prevNotes) => [
			...prevNotes,
			{
				y,
				highlightedText,
				noteText: "",
				open: true,
			},
		]);
	};

	const deleteNote = (id: string) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	return (
		<NoteContext.Provider value={{ createNote, fillNotes, deleteNote, notes }}>
			{children}
		</NoteContext.Provider>
	);
}
