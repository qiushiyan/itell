import { NoteContext } from "@/contexts/note-highlight";
import { useContext } from "react";

export const useNotes = () => {
	const noteContext = useContext(NoteContext);

	return noteContext;
};
