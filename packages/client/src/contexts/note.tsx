import { highlightText } from "@/lib/note";
import { CreateNoteInput, NoteCard } from "@/types/note";
import { createContext, useEffect, useRef, useState } from "react";

type NoteContextType = {
	notes: NoteCard[];
	createNote: (note: CreateNoteInput) => void;
	fillNotes: (notes: NoteCard[]) => void;
	deleteNote: (id: string) => void;
	highlightNote: (text: string, color: string) => void;
};

export const defaultNoteColor = "#3730a3";

export const NoteContext = createContext<NoteContextType>(
	{} as NoteContextType,
);
export default function NoteProvider({ children }) {
	const [notes, setNotes] = useState<NoteCard[]>([]);
	const targetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const target = document.querySelector("#section-content") as HTMLDivElement;
		if (target) {
			targetRef.current = target;
		}
	}, []);

	const fillNotes = (notes: NoteCard[]) => {
		setNotes(
			notes.map((note) => ({
				y: note.y,
				highlightedText: note.highlightedText,
				noteText: note.noteText,
				id: note.id,
				color: note.color,
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
				color: defaultNoteColor,
			},
		]);
	};

	const deleteNote = (id: string) => {
		setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
	};

	const highlightNote = (textContent: string, color: string) => {
		if (targetRef.current && textContent) {
			highlightText(targetRef.current, textContent, color);
		}
	};

	return (
		<NoteContext.Provider
			value={{ createNote, fillNotes, deleteNote, highlightNote, notes }}
		>
			{children}
		</NoteContext.Provider>
	);
}
