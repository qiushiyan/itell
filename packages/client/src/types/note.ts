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
	open?: boolean;
	id?: string;
	updatedAt?: string;
};
