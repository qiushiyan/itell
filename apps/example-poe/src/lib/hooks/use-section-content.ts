import { useEffect, useRef } from "react";

export const useSectionContent = () => {
	const sectionContentRef = useRef<HTMLElement>();

	useEffect(() => {
		const el = document.getElementById("section-content") as HTMLElement;
		if (el) {
			sectionContentRef.current = el;
		}
	}, []);

	return sectionContentRef;
};
