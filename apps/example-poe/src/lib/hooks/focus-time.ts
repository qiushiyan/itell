import { useEffect } from "react";
import { getTrackingElements } from "../focus-time";

export const useFocusTime = () => {
	useEffect(() => {
		const sectionContent = document.querySelector("#section-content");
		if (sectionContent) {
			const els = sectionContent.querySelectorAll(
				":scope > h2, :scope > p, :scope > div",
			);
			const subsectionEls = [];
			for (const [index, el] of els.entries()) {
				if (el.tagName === "H2") {
					subsectionEls.push(el);
				} else if (index < els.length - 1 && els[index + 1].tagName === "H2") {
					subsectionEls.push(el);
				}
			}
			console.log(subsectionEls);
		}
	}, []);
};
