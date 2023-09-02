import * as rs from "range-serializer";

export const noteClass = (id: string) => `note-${id}`;
export const highlightClass = (id: string) => `highlight-${id}`;

const extractHighlightId = (className: string) =>
	className.substring("highlight-".length);

export const serializeRange = (range: Range) => {
	return rs.serializeRange(
		range,
		document.getElementById("chapter-content") || undefined,
	);
};

export const deserializeRange = (serializedRange: string) => {
	return rs.deserializeRange(
		serializedRange,
		document.getElementById("chapter-content") || undefined,
	);
};

const unwrapElement = (el: Element) => {
	if (el.textContent) {
		const text = document.createTextNode(el.textContent);
		el.parentNode?.replaceChild(text, el);
	}
};

export const removeHighlights = async (id: string) => {
	// Remove all existing tags before applying new highlighting
	const target = document.getElementById("chapter-content");
	if (target) {
		const highlights = target.querySelectorAll(`.${highlightClass(id)}`);
		console.log(highlights);
		for (let i = 0; i < highlights.length; i++) {
			const h = highlights[i];
			unwrapElement(h);
		}
	}
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
	if (confirm("Delete this highlight?")) {
		const id = extractHighlightId(el.className);
		removeHighlights(id);
		deleteNote(id);
	}
};

export const getSafeRanges = (dangerousRange: Range) => {
	const commonAncestor = dangerousRange.commonAncestorContainer;

	const s = new Array(0);
	const rs: Range[] = new Array(0);
	if (dangerousRange.startContainer !== commonAncestor) {
		for (
			let i = dangerousRange.startContainer;
			i !== commonAncestor;
			i = i.parentNode as Node
		)
			s.push(i);
	}

	if (s.length > 0) {
		for (let j = 0; j < s.length; j++) {
			const xs = document.createRange();
			if (j) {
				xs.setStartAfter(s[j - 1]);
				xs.setEndAfter(s[j].lastChild);
			} else {
				xs.setStart(s[j], dangerousRange.startOffset);
				xs.setEndAfter(
					s[j].nodeType === Node.TEXT_NODE ? s[j] : s[j].lastChild,
				);
			}
			rs.push(xs);
		}
	}

	const e = new Array(0);
	const re = new Array(0);
	if (dangerousRange.endContainer !== commonAncestor) {
		for (
			let k = dangerousRange.endContainer;
			k !== commonAncestor;
			k = k.parentNode as Node
		)
			e.push(k);
	}

	if (e.length > 0) {
		for (let m = 0; m < e.length; m++) {
			const xe = document.createRange();
			if (m) {
				xe.setStartBefore(e[m].firstChild);
				xe.setEndBefore(e[m - 1]);
			} else {
				xe.setStartBefore(
					e[m].nodeType === Node.TEXT_NODE ? e[m] : e[m].firstChild,
				);
				xe.setEnd(e[m], dangerousRange.endOffset);
			}
			re.unshift(xe);
		}
	}

	const xm = document.createRange();
	if (s.length > 0 && e.length > 0) {
		xm.setStartAfter(s[s.length - 1]);
		xm.setEndBefore(e[e.length - 1]);
	} else {
		return [dangerousRange];
	}

	rs.push(xm);

	const result = rs.concat(re);
	return result.filter((r) => r.toString().trim() !== "");
};

export const createNoteElements = ({
	id,
	range,
	color,
	isHighlight = false,
}: { id: string; range: Range; color: string; isHighlight?: boolean }) => {
	const safeRanges = getSafeRanges(range);
	safeRanges.forEach((r) => {
		if (r.startOffset !== r.endOffset) {
			const newNode = document.createElement("span");
			newNode.classList.add(isHighlight ? highlightClass(id) : noteClass(id));
			newNode.style.backgroundColor = color;
			r.surroundContents(newNode);
		}
	});
	return id;
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
