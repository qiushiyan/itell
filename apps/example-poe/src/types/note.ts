import { SectionLocation } from "./location";

export type CreateNoteInput = {
	y: number;
	highlightedText: string;
	location: SectionLocation;
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
