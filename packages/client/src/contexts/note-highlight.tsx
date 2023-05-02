import { highlightText } from "@/lib/note";
import { CreateNoteInput, Highlight, NoteCard } from "@/types/note";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useImmerReducer } from "use-immer";

type NoteContextType = {
	notes: NoteCard[];
	highlights: Highlight[];
	setNotes: (notes: NoteCard[]) => void;
	setHighlights: (highlights: Highlight[]) => void;
	createNote: (note: CreateNoteInput) => void;
	deleteNote: (id: string) => void;
	deleteHighlight: (id: string) => void;
	markNote: (text: string, color?: string) => void;
	markHighlight: (text: string, id: string, color?: string) => void;
};

export const defaultNoteColor = "#3730a3";
export const defaultHighlightColor = "yellow";
type State = {
	notes: NoteCard[];
	highlights: Highlight[];
};

type Action =
	| {
			type: "set_notes";
			payload: NoteCard[];
	  }
	| {
			type: "set_highlights";
			payload: Highlight[];
	  }
	| {
			type: "create_note";
			payload: CreateNoteInput;
	  }
	| {
			type: "delete_note";
			payload: string;
	  }
	| { type: "delete_highlight"; payload: string };
export const NoteContext = createContext<NoteContextType>(
	{} as NoteContextType,
);
export default function NoteProvider({ children }) {
	const [state, dispatch] = useImmerReducer<State, Action>(
		(draft, action) => {
			switch (action.type) {
				case "set_notes":
					draft.notes = action.payload;
					break;
				case "set_highlights":
					draft.highlights = action.payload;
					break;
				case "create_note":
					draft.notes.push({
						...action.payload,
						noteText: "",
						color: defaultNoteColor,
					});
					break;
				case "delete_note":
					draft.notes = draft.notes.filter(
						(note) => note.id !== action.payload,
					);
					break;
				case "delete_highlight":
					draft.highlights = draft.highlights.filter(
						(highlight) => highlight.id !== action.payload,
					);
			}
		},
		{
			notes: [],
			highlights: [],
		},
	);
	const targetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const target = document.querySelector("#section-content") as HTMLDivElement;
		if (target) {
			targetRef.current = target;
		}
	}, []);

	const setNotes = (notes: NoteCard[]) => {
		dispatch({ type: "set_notes", payload: notes });
	};

	const setHighlights = (highlights: Highlight[]) => {
		dispatch({ type: "set_highlights", payload: highlights });
	};

	const createNote = (note: CreateNoteInput) => {
		dispatch({ type: "create_note", payload: note });
	};

	const deleteNote = (id: string) => {
		dispatch({ type: "delete_note", payload: id });
	};
	const deleteHighlight = (id: string) => {
		dispatch({ type: "delete_highlight", payload: id });
	};

	const markNote = (textContent: string, color: string = defaultNoteColor) => {
		if (targetRef.current && textContent) {
			highlightText({
				target: targetRef.current,
				textContent,
				color,
			});
		}
	};

	const markHighlight = (
		textContent: string,
		id: string,
		backgroundColor: string = defaultHighlightColor,
	) => {
		if (targetRef.current && textContent) {
			highlightText({
				target: targetRef.current,
				textContent,
				backgroundColor,
				id,
			});
		}
	};

	return (
		<NoteContext.Provider
			value={{
				notes: state.notes,
				highlights: state.highlights,
				setNotes,
				setHighlights,
				createNote,
				deleteNote,
				deleteHighlight,
				markNote,
				markHighlight,
			}}
		>
			{children}
		</NoteContext.Provider>
	);
}
