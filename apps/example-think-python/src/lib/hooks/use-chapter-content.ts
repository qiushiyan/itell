import { useEffect, useRef } from "react";

export const useChapterContent = () => {
	const sectionContentRef = useRef<HTMLElement>();

	useEffect(() => {
		const el = document.getElementById("chapter-content") as HTMLElement;
		if (el) {
			sectionContentRef.current = el;
		}
	}, []);

	return sectionContentRef;
};
