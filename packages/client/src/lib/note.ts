export const highlightText = (target: HTMLElement, textContent: string) => {
	// escape potential characters in selection
	const regexString = textContent.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const regex = new RegExp(regexString, "gi");

	const newText = target.innerHTML.replace(
		regex,
		'<mark class="highlight">$&</mark>',
	);
	target.innerHTML = newText;
};

const modifyhighlightedText = (
	target: HTMLElement,
	textContent: string,
	fn: (mark: HTMLElement) => void,
) => {
	const marks = target.getElementsByTagName("mark");

	for (let i = marks.length - 1; i >= 0; i--) {
		const mark = marks[i];
		if (mark.innerHTML === textContent) {
			fn(mark);
			break;
		}
	}
};

export const unHighlightText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(target, textContent, (mark) => {
		const text = document.createTextNode(textContent);
		mark.parentNode?.replaceChild(text, mark);
	});
};

export const unemphasizeText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(target, textContent, (mark) => {
		mark.classList.remove("emphasized");
	});
};

export const emphasizeText = (target: HTMLElement, textContent: string) => {
	modifyhighlightedText(target, textContent, (mark) => {
		mark.classList.add("emphasized");
	});
};
