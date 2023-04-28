import { defaultNoteColor } from "@/contexts/note";

export const removeExistingMarks = async (target: HTMLElement) => {
	// Remove all existing 'mark' tags before applying new highlighting
	const existingMarks = target.querySelectorAll("mark.highlight");
	for (let i = 0; i < existingMarks.length; i++) {
		const mark = existingMarks[i];
		if (mark.textContent) {
			const text = document.createTextNode(mark.textContent);
			mark.parentNode?.replaceChild(text, mark);
		}
	}
};

export const highlightText = async (
	target: HTMLElement,
	textContent: string,
	color: string = defaultNoteColor,
) => {
	// escape potential characters in selection
	const regexString = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(regexString, "gi");

	const newText = target.innerHTML.replace(
		regex,
		`<mark class="highlight" style="color:${color}"}>$&</mark>`,
	);

	target.innerHTML = newText;
};

const modifyhighlightedText = (
	target: HTMLElement,
	textContent: string,
	fn: (mark: HTMLElement) => void,
	query: string = "mark",
) => {
	const marks = target.querySelectorAll(query);

	for (let i = marks.length - 1; i >= 0; i--) {
		const mark = marks[i] as HTMLElement;
		if (mark.innerHTML === textContent) {
			fn(mark);
		}
	}
};

export const unHighlightText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(
		target,
		textContent,
		(mark) => {
			mark.classList.add("unhighlighted");
		},
		"mark.highlight",
	);
};

export const unemphasizeText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(target, textContent, (mark) => {
		mark.classList.remove("emphasized");
		mark.id = "";
	});
};

export const emphasizeText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(target, textContent, (mark) => {
		mark.classList.add("emphasized");
		mark.id = "emphasized";
	});
};
