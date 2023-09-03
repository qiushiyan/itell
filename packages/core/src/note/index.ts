import { highlightClass, noteClass } from "./dom";
import { getSafeRanges } from "./range";
export { serializeRange, deserializeRange } from "./range";
export {
	extractHighlightId,
	removeHighlights,
	highlightClass,
	noteClass,
} from "./dom";

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
