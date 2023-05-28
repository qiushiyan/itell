import { defaultNoteColor } from "@/contexts/note-highlight";

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

export const highlightTextAsNote = async ({
	target,
	textContent,
	color = defaultNoteColor,
	backgroundColor,
	id,
}: {
	target: HTMLElement;
	textContent: string;
	color?: string;
	backgroundColor?: string;
	id?: string;
}) => {
	// escape potential characters in selection
	const regexString = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(regexString, "i");

	let newText = "";
	if (backgroundColor) {
		// highlight
		newText = target.innerHTML.replace(
			regex,
			`<mark class="highlight" id="${id}" style="background-color:${backgroundColor}">$&</mark>`,
		);
	} else {
		// note
		newText = target.innerHTML.replace(
			regex,
			`<span class="note" style="color:${color}">$&</span>`,
		);
	}

	target.innerHTML = newText;
};

const modifyHighlightedText = async ({
	target,
	textContent,
	fn,
	query = ".note",
}: {
	target: HTMLElement;
	textContent: string;
	fn: (mark: HTMLElement) => void;
	query?: string;
}) => {
	const els = target.querySelectorAll(query);
	for (let i = els.length - 1; i >= 0; i--) {
		const el = els[i] as HTMLElement;
		if (el.textContent === textContent) {
			fn(el);
		}
	}
};

export const unHighlightNote = (target: HTMLElement, textContent: string) => {
	modifyHighlightedText({
		target,
		textContent,
		fn: (el) => el.classList.add("unhighlighted"),
	});
};

export const deemphasizeNote = (target: HTMLElement, textContent: string) => {
	modifyHighlightedText({
		target,
		textContent,
		fn: (el) => {
			el.classList.remove("emphasized");
			el.style.border = "none";
			el.style.borderRadius = "0px";
		},
	});
};

export const emphasizeNote = (target: HTMLElement, textContent: string) => {
	modifyHighlightedText({
		target,
		textContent,
		fn: (el) => {
			el.classList.add("emphasized");
			el.style.border = `2px solid ${
				el.style.color ? el.style.color : defaultNoteColor
			}`;
			el.style.borderRadius = "5px";
		},
	});
};
