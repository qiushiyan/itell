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

export const unHighlightText = (target: HTMLElement, textContent: string) => {
	const marks = target.getElementsByTagName("mark");

	for (let i = marks.length - 1; i >= 0; i--) {
		const mark = marks[i];

		if (mark.innerHTML === textContent) {
			const text = document.createTextNode(textContent);
			mark.parentNode?.replaceChild(text, mark);
		}
	}
};
