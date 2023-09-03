import {
	removeHighlights,
	highlightClass,
	extractHighlightId,
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
	const el = event.currentTarget as HTMLElement;
	if (confirm("Delete this highlight?")) {
		const id = extractHighlightId(el.className);
		removeHighlights(id);
		deleteNote(id);
	}
};

export const createHighlightListeners = (
	id: string,
	cb: (e: Event) => void,
) => {
	const highlightElements = document.getElementsByClassName(highlightClass(id));
	Array.from(highlightElements).forEach((el) => {
		if (el) {
			el.addEventListener("click", cb);
		}
	});
};
