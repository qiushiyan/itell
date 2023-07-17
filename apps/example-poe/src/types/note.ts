import { SectionLocation } from "./location";

export type CreateNoteInput = {
	y: number;
	highlightedText: string;
	color: string;
};

export type UpdateNoteInput = {
	id: string;
	noteText: string;
};

export type NoteCard = {
	y: number;
	noteText: string;
	highlightedText: string;
	color: string;
	id?: string;
	updated_at?: Date;
	created_at?: Date;
};

export type Highlight = {
	id?: string;
};
