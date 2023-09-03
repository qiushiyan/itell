export const noteClass = (id: string) => `note-${id}`;
export const highlightClass = (id: string) => `highlight-${id}`;

export const extractHighlightId = (className: string) =>
	className.substring("highlight-".length);

const unwrapElement = (el: Element) => {
	if (el.textContent) {
		const text = document.createTextNode(el.textContent);
		el.parentNode?.replaceChild(text, el);
	}
};

export const removeHighlights = async (id: string) => {
	// Remove all existing tags before applying new highlighting
	const target = document.getElementById("page-content");
	if (target) {
		const highlights = target.querySelectorAll(`.${highlightClass(id)}`);
		for (let i = 0; i < highlights.length; i++) {
			const h = highlights[i];
			unwrapElement(h);
		}
	}
};
