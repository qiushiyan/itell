import {
	defaultNoteColorDark,
	defaultNoteColorLight,
} from "@/lib/hooks/use-note-color";
import { useSectionContent } from "@/lib/hooks/use-chapter-content";
import { highlightTextAsMark, highlightTextAsNote } from "@/lib/note";
import { CreateNoteInput, Highlight, NoteCard } from "@/types/note";
import { useTheme } from "next-themes";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";

type NoteContextType = {
	notes: NoteCard[];
	highlights: Highlight[];
	setNotes: (notes: NoteCard[]) => void;
	setHighlights: (highlights: Highlight[]) => void;
	createNote: (note: CreateNoteInput) => void;
	deleteNote: (id: string) => void;
	deleteHighlight: (id: string) => void;
	markNote: (args: {
		textContent: string;
		color: string;
	}) => void;
	markHighlight: (args: {
		id: string;
		textContent: string;
		color: string;
	}) => void;
};

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
export default function NoteProvider({
	children,
}: { children: React.ReactNode }) {
	const sectionContentRef = useSectionContent();
	const { theme } = useTheme();
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
						color:
							theme === "light" ? defaultNoteColorLight : defaultNoteColorDark,
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

	const markNote = ({
		textContent,
		color,
	}: {
		textContent: string;
		color: string;
	}) => {
		if (textContent && sectionContentRef.current) {
			highlightTextAsNote({
				target: sectionContentRef.current,
				textContent,
				color,
			});
		}
	};

	const markHighlight = ({
		textContent,
		id,
		color,
	}: {
		textContent: string;
		id: string;
		color: string;
	}) => {
		if (sectionContentRef.current && textContent) {
			highlightTextAsMark({
				target: sectionContentRef.current,
				textContent,
				color,
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
