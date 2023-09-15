import {
	removeHighlights,
	getHighlightId,
	getElementsByNoteId,
} from "@itell/core/note";

export const deleteNote = async (id: string) => {
	return await fetch("/api/note", {
		method: "POST",
		body: JSON.stringify({
			id,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const deleteHighlightListener = (event: Event) => {
	event.preventDefault();
	const el = event.currentTarget as HTMLSpanElement;
	if (confirm("Delete this highlight?")) {
		const id = getHighlightId(el);
		console.log(id);
		if (id) {
			removeHighlights(id);
			deleteNote(id);
		}
	}
};

export const createHighlightListeners = (
	id: string,
	cb: (e: Event) => void,
) => {
	const highlightElements = getElementsByNoteId(id);
	if (!highlightElements) {
		return;
	}
	Array.from(highlightElements).forEach((el) => {
		if (el) {
			el.addEventListener("click", cb);
		}
	});
};
