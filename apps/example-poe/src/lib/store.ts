import {
	CreateNoteInput,
	Highlight,
	NoteCard,
	UpdateNoteInput,
} from "@/types/note";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { highlightTextAsMark, highlightTextAsNote } from "./note";

type State = {
	notes: NoteCard[];
	highlights: Highlight[];
};

export const markNote = ({
	textContent,
	color,
	target,
}: {
	textContent: string;
	color: string;
	target: HTMLElement | undefined;
}) => {
	if (textContent && target) {
		highlightTextAsNote({
			target,
			textContent,
			color,
		});
	}
};

export const markHighlight = ({
	textContent,
	id,
	color,
	target,
}: {
	textContent: string;
	id: string;
	color: string;
	target: HTMLElement | undefined;
}) => {
	if (textContent && target) {
		highlightTextAsMark({
			target,
			textContent,
			color,
			id,
		});
	}
};

type Actions = {
	setNotes: (notes: NoteCard[]) => void;
	setHighlights: (highlights: Highlight[]) => void;
	createNote: (note: CreateNoteInput, theme?: string) => void;
	updateNote: (note: UpdateNoteInput) => void;
	deleteNote: (id: string) => void;
	deleteHighlight: (id: string) => void;
};

export const useNotesStore = create(
	immer<State & Actions>((set) => ({
		notes: [],
		highlights: [],
		setNotes: (notes) => set(() => ({ notes })),
		setHighlights: (highlights) => set(() => ({ highlights })),
		createNote: ({ y, highlightedText, color }) =>
			set((state) => {
				state.notes.push({
					y,
					highlightedText,
					noteText: "",
					color,
				});
			}),
		updateNote: ({ id, noteText }) =>
			set((state) => {
				const index = state.notes.findIndex((n) => n.id === id);
				if (index !== -1) {
					state.notes[index].noteText = noteText;
				}
			}),
		deleteNote: (id) =>
			set((state) => {
				const index = state.notes.findIndex((n) => n.id === id);
				if (index !== -1) {
					state.notes.splice(index, 1);
				}
			}),
		deleteHighlight: (id) =>
			set((state) => {
				const index = state.highlights.findIndex((h) => h.id === id);
				if (index !== -1) {
					state.highlights.splice(index, 1);
				}
			}),
	})),
);
