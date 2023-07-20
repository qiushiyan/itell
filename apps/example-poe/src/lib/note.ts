const textContentToRegex = (textContent: string) => {
	// escape potential characters in selection
	const regexString = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return new RegExp(`(${regexString})(?![^<]*<\/span>)`, "gi");
};

export const removeExistingMarks = async (target: HTMLElement) => {
	// Remove all existing tags before applying new highlighting
	const existingMarks = target.querySelectorAll(".highlight, .note");
	for (let i = 0; i < existingMarks.length; i++) {
		const mark = existingMarks[i];
		if (mark.textContent) {
			const text = document.createTextNode(mark.textContent);
			mark.parentNode?.replaceChild(text, mark);
		}
	}
};

export const generateNoteElement = async ({
	target,
	textContent,
	color,
	id,
	highlight,
}: {
	target: HTMLElement | undefined;
	textContent: string;
	color: string;
	id: string;
	highlight?: boolean;
}) => {
	if (target) {
		const regex = textContentToRegex(textContent);
		let newText = "";
		if (highlight) {
			newText = target.innerHTML.replace(
				regex,
				`<span class="highlight" id="${id}" style="background-color:${color}">$&</span>`,
			);
		} else {
			newText = target.innerHTML.replace(
				regex,
				`<span class="note" style="color:${color}" id="${id}">$&</span>`,
			);
		}
		target.innerHTML = newText;
		return id;
	}

	return undefined;
};

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
	if (el.id) {
		const id = el.id;
		if (confirm("Delete this highlight?")) {
			el.style.backgroundColor = "";
			el.id = "";
			el.classList.remove("highlight");
			deleteNote(id);
		}
	}
};
