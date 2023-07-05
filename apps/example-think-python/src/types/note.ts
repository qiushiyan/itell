export type CreateNoteInput = {
	y: number;
	highlightedText: string;
	chapter: number;
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
